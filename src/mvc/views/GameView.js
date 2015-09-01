(function(window){


	var _gameContainer;

	//ApplicationView.prototype.type = "GameView";


	function GameView(){
		this.type      = "GameView";
		_gameContainer = game.add.group(); 

		//TODO
		/*
			va en el onShow() de la View
		*/

		//createViewElements(); //esto es provisorio hasta que se llame onShow()


		/*
		como "hereda de application view, deberia reconocer el onHide y onShow de su padre..."
		this.onShow = function(event){
			//_gameController = ApplicationController.getApplicationController().getController(GameController) as GameController; //TODO
			createViewElements();
		}*/
	}


	//private functions

	function createViewElements(){

		setupBackgroundContainer();
		//setupBallAndMixerContainer();
		//setupDataPanel();
		setupButtonsContainer();
		//setupJackpotContainer();
		//setupPayCards();
		setupCardsContainer();
		//setUpClickRegions();
		//setupMenu();
		
		//showStandardBar(); 
		//ApplicationController.getApplicationController().showFreePlayMark();
	}

	function setupBackgroundContainer(){
		var backGroundContainer = new BackGroundContainer();
		_gameContainer.add(backGroundContainer.getView());
	}

	function setupBallAndMixerContainer(){
		//TODO
	}
	
	function setupDataPanel(){
		//TODO
	}
	
	function setupButtonsContainer(){
        var buttonsContainer = new ButtonsContainer(_gameContainer);
        _gameContainer.add(buttonsContainer.getView());
	}
	
	function setupJackpotContainer(){
		//TODO
	}
	
	function setupPayCards(){
		//TODO
	}

	function setupCardsContainer(){
		var cardsContainer = new CardsContainer(_gameContainer);
		_gameContainer.add(cardsContainer.getView());
		/* to test
		var cardView = new CardView();
        var numbers = [88,89,90,04,05,06,07,08,09,10,11,12,12,13,14];
        cardView.setNumbers(numbers);
        cardView.mark(9);*/
	}

	function setUpClickRegions(){
		//TODO
	}








	


	GameView.prototype.getView = function(){
		return _gameContainer;
	}

	
	GameView.prototype = ApplicationView.prototype;
    window.GameView    = GameView;

}(window));

