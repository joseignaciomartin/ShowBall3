(function(window){

	var _gameRootContainer; //el contenedor mas general del juego, el que se manda al Engine para que administre.

	function create() {
		var theGame = new Game();
	}

	function Game(){
		
		var _applicationController;
		var _gameConfig  = new BingoGameConfig();
		Game.gameConfig  = _gameConfig;
		var _roundConfig = new BingoRoundConfig();
		Game.roundConfig = _roundConfig
		//var _externalConfig = ExternalLoadConfig();
		//Game.externalConfig = _externalConfig


		var languageXml = game.cache.getText('languageXml');
		/*
		NO BORRAR VA PARA EL ENGINE.

		var parser = new DOMParser();
		languageXml = parser.parseFromString(languageXml, "text/xml");
		for(var i = 0; i < languageXml.getElementsByTagName("translate").length; i++){
			console.log(languageXml.getElementsByTagName("translate")[i].id);
		}
		*/

		_gameRootContainer = game.add.group(); //agrega el contenedor principal del juego al stage


		var IS_TESTING = _gameConfig.isTesting;
		if(IS_TESTING){
			_applicationController = new ApplicationController(_gameRootContainer, _gameConfig.gameName, languageXml, _gameConfig.supportedLanguages, _gameConfig, _roundConfig, _gameConfig.parametersIfTesting, 100000);
		}else{
			_applicationController = new ApplicationController(_gameRootContainer, _gameConfig.gameName, languageXml, _gameConfig.supportedLanguages, _gameConfig, _roundConfig, null, 5);
		}


		/*
		var _logController:LogController = new LogController();
		_applicationController.registerController(_logController);*/


		
		var _gameView   = new GameView();
		var serverModel = new ServerCommunicationsModel(); 
		//var gameController:GameController = new GameController(_gameView, serverModel);
		
		//TO TEST 
		_applicationController.registerApplicationView(_gameView);

		


		/*_applicationController.registerController(gameController);
		var cardController:CardController = new CardController()
		_applicationController.registerController(cardController);
		*/


		 
		
		var connectingView = new ConnectingView();
		_applicationController.registerController(new ConnectionController(  /*null, null */connectingView, serverModel)); //todo
		_applicationController.registerApplicationView(connectingView);
		


		/*
		configureCounters();
		var keyboardController:KeyboardController = new KeyboardController(stage);
		_applicationController.registerController(keyboardController);
		*/


		_applicationController.init();


		
		/*
		
		var soundController:GameSoundController = new GameSoundController();
		_applicationController.registerController(soundController);
		//show first screen -------------------------------------------------
		
		*/
		_applicationController.showApplicationView(connectingView.type);

		//var _gameView = new GameView();
	}


	window.create = create;
	window.Game   = Game;

}(window));
