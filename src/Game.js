


(function(window){







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

		var LanguageXmlEmbed;

		var IS_TESTING = _gameConfig.isTesting;
		//console.log(IS_TESTING);

		if(IS_TESTING){
			
			_applicationController = new ApplicationController(this, _gameConfig.gameName, LanguageXmlEmbed, _gameConfig.supportedLanguages, _gameConfig, _roundConfig, _gameConfig.parametersIfTesting, 100000);
		
		}else{
			
			_applicationController = new ApplicationController(this, _gameConfig.gameName, LanguageXmlEmbed, _gameConfig.supportedLanguages, _gameConfig, _roundConfig, null, 5);
		
		}



		/*
		var _logController:LogController = new LogController();
		_applicationController.registerController(_logController);
		
		var serverModel:ServerCommunicationsModel = new ServerCommunicationsModel();
		var connectingView:ConnectingView         = new ConnectingView();
		_gameView                                 = new GameView();
		
		var gameController:GameController         = new GameController(_gameView, serverModel);
		_applicationController.registerController(gameController);
		
		var cardController:CardController = new CardController()
		_applicationController.registerController(cardController);
		_applicationController.registerController(new ConnectionController(connectingView, serverModel));
		
		configureCounters();
		
		var keyboardController:KeyboardController = new KeyboardController(stage);
		_applicationController.registerController(keyboardController);
		_applicationController.init();
		_applicationController.registerApplicationView(_gameView);
		_applicationController.registerApplicationView(connectingView);
		
		var soundController:GameSoundController = new GameSoundController();
		_applicationController.registerController(soundController);
		
		//show first screen -------------------------------------------------
		_applicationController.showApplicationView(ConnectingView);
		*/

		var _gameView = new GameView();
	}

	window.create = create;
	window.Game = Game;

}(window));
