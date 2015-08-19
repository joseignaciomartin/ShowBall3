(function(window){


	var gameContainer;

	function GameView(){
		

		//cards
		gameContainer      = game.add.group(); 
		gameContainer.y    = -200;


		var backGroundContainer = new BackGroundContainer(gameContainer);


		var cardsContainer = new CardsContainer(gameContainer);
		/*
		var cardView = new CardView();
        var numbers = [88,89,90,04,05,06,07,08,09,10,11,12,12,13,14];
        cardView.setNumbers(numbers);
        cardView.mark(9);*/


        var buttonsContainer = new ButtonsContainer(gameContainer);


        
	}

    window.GameView = GameView;


}(window));

