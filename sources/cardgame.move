module my_addr::CardGame {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;
    use aptos_framework::account;
    use std::vector;
    struct GameSession has store, key {
        player: address,           
        bet_amount: u64,        
        player_cards: vector<u8>, 
        dealer_cards: vector<u8>,
        game_active: bool,
        player_score: u8,         
        dealer_score: u8,
    }
    const E_GAME_NOT_FOUND: u64 = 1;
    const E_GAME_NOT_ACTIVE: u64 = 2;
    const E_INSUFFICIENT_FUNDS: u64 = 3;
    public fun start_game(player: &signer, bet_amount: u64) {
        let player_addr = signer::address_of(player);
        
        assert!(coin::balance<AptosCoin>(player_addr) >= bet_amount, E_INSUFFICIENT_FUNDS);
        
        let seed = timestamp::now_microseconds() + account::get_sequence_number(player_addr);
        let player_card1 = ((seed % 13) + 1) as u8;
        let player_card2 = (((seed / 13) % 13) + 1) as u8;
        let dealer_card = (((seed / 169) % 13) + 1) as u8;
        
        let player_cards = vector::empty<u8>();
        vector::push_back(&mut player_cards, player_card1);
        vector::push_back(&mut player_cards, player_card2);
        
        let dealer_cards = vector::empty<u8>();
        vector::push_back(&mut dealer_cards, dealer_card);
        
        let player_score = calculate_score(&player_cards);
        let dealer_score = calculate_score(&dealer_cards);
        
        let game = GameSession {
            player: player_addr,
            bet_amount,
            player_cards,
            dealer_cards,
            game_active: true,
            player_score,
            dealer_score,
        };
        
        let bet = coin::withdraw<AptosCoin>(player, bet_amount);
        coin::deposit<AptosCoin>(player_addr, bet);
        
        move_to(player, game);
    }

    public fun finish_game(player: &signer) acquires GameSession {
        let player_addr = signer::address_of(player);
        assert!(exists<GameSession>(player_addr), E_GAME_NOT_FOUND);
        
        let game = borrow_global_mut<GameSession>(player_addr);
        assert!(game.game_active, E_GAME_NOT_ACTIVE);
        
        let seed = timestamp::now_microseconds() + vector::length(&game.dealer_cards);
        while (game.dealer_score < 17) {
            let new_card = ((seed % 13) + 1) as u8;
            vector::push_back(&mut game.dealer_cards, new_card);
            game.dealer_score = calculate_score(&game.dealer_cards);
            seed = seed + 1;
        };
        
        let payout = 0u64;
        if (game.player_score > 21) {
            payout = 0;
        } else if (game.dealer_score > 21 || game.player_score > game.dealer_score) {
            payout = game.bet_amount * 2;
        } else if (game.player_score == game.dealer_score) {
            payout = game.bet_amount;
        };
        

        game.game_active = false;
    }

    fun calculate_score(cards: &vector<u8>): u8 {
        let score = 0u8;
        let i = 0;
        while (i < vector::length(cards)) {
            let card = *vector::borrow(cards, i);
            if (card > 10) {
                score = score + 10; // Face cards worth 10
            } else {
                score = score + card;
            };
            i = i + 1;
        };
        score
    }
}
