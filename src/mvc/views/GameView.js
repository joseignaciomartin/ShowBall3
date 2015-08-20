(function(window){


	var _gameContainer;

	function GameView(){
		
		//cards
		_gameContainer      = game.add.group(); 

		var backGroundContainer = new BackGroundContainer();
		_gameContainer.add(backGroundContainer.getView());

		var cardsContainer = new CardsContainer(_gameContainer);
		_gameContainer.add(cardsContainer.getView());
		/* to test
		var cardView = new CardView();
        var numbers = [88,89,90,04,05,06,07,08,09,10,11,12,12,13,14];
        cardView.setNumbers(numbers);
        cardView.mark(9);*/


        var buttonsContainer = new ButtonsContainer(_gameContainer);
        _gameContainer.add(buttonsContainer.getView());
	}

	GameView.prototype.getView = function(){
		return _gameContainer;
	}

    window.GameView = GameView;

}(window));

