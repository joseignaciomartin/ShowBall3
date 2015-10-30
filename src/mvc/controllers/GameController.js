(function(window){

	

	function GameController( view, model, dependencies){  //(view:IView, model:Model, dependencies:Vector.<Class>=null){

		var _this = this;
		this.type = "GameController";
		this.gameState;

		var _applicationController = ApplicationController.getApplicationController();
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		//var _translatorController  = _applicationController.getController("TranslatorController");
		var _countersController    = _applicationController.getController("CountersController");
		//var _keyboardController    = _applicationController.getController("KeyboardController");

		this.model = model;
		this.view  = view;
		setupSubscriptions();

		function setGameState(value){
			console.log("new state: " + GameStates.getNameState(value.getType()));
			_this.gameState = value;
			//configureKeyboardByState(gameState.getType());
			_applicationController.sendNotification(Notifications.STATE_CHANGED_NOTIFICATION, _this.gameState.getType());
		}

		this.serverResponse = function(response){
			
			switch(response.type){
				case BingoResponseTypes.CHANGE_CONFIG_CARDS:
					_this.gameState.changeConfigCardsResponse(response);
				break;
				case BingoResponseTypes.PLAY :
					_this.gameState.playResponse(response);
				break;
				case BingoResponseTypes.CHANGE_CARD_NUMBERS:
					_this.gameState.changeNumberResponse(response);
					_cardController.setCardsData(response.cards);
					//todo
					//ApplicationController.getApplicationController().getCurrentApplicationView().reset();
				break;
				case BingoResponseTypes.GET_EXTRA_BALL :
					_this.gameState.getExtraBallResponse(response);
				break;
				case BingoResponseTypes.CANCEL_EXTRA_BALL:
					_this.gameState.cancelExtraBallResponse(response);
				break;
				case BingoResponseTypes.CHANGE_BET_RESPONSE:
					_this.gameState.changeBetResponse(response);
				break;
				case BingoResponseTypes.CHANGE_COIN_RESPONSE:
					_this.gameState.changeCoinResponse(response);
				break;	
			}
		}

		this.notificationReceived = function(type, data){
			switch(type){
				/*
				case EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION:
					if(data == CountersController.SPEED_COUNTER) speedChangedFromBar();
				break;
				case Notifications.RESET_NOTIFICATION:
					reset();
				break;
				case Notifications.AUTOPLAY_INTERNAL_STATE_CHANGED:
					autoKeyBoard(data.gameState as int, data.stopOnExtra);
				break;
				case EngineNotificationsEnum.AUTOPLAY_START_NOTIFICATION:
					autoPlayStartNotificacion();
				break;
				case EngineNotificationsEnum.AUTOPLAY_MODIFIED_NOTIFICATION:
					if(gameState.getType() == GameStates.AUTO){ (gameState as AutoIdleState).updateConfigurationData();}
				break;
				case EngineNotificationsEnum.AUTOPLAY_STOP_NOTIFICATION:
					if(gameState.getType() == GameStates.AUTO){ 
						(gameState as AutoIdleState).stopAuto(); 
					}
				break;
				case EngineNotificationsEnum.BAR_HELP_CLICK_NOTIFICATION:
					gameState.showHelp();
				break;
				case Notifications.HIDDEN_MENU:
					gameState.backToPrevState();
				break;
				case Notifications.AUTOMATIC_PEEK_NOTIFICATION:
					handlerPeekEvents(false);
				break;*/
				case Notifications.INITIAL_RESPONSE_NOTIFICATION:
					setInitialResponse(data);
				break;
			}
		}

		this.newBallDrawn = function(){ 
			_countersController.addValueToCounter(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER, 1); 
		}

		function setInitialResponse(response){
			
			_this._iniResponse = response;

			var cardsEnable = 0;
			for(var i = 0; i< response.cards.length; i++){
				if(response.cards[i].enabled)
					cardsEnable ++;
			}

			
			_countersController.setCounterValue(OwnCounters.CARDS_ENABLED_COUNTER, cardsEnable);
			
			_applicationController.showApplicationView("GameView");
			
			
			setGameState(new WaitState(setGameState, _this));
			//speedChangedFromBar();
			
			if(Game.gameConfig.gameName == "Show Ball Light"){
				//(gameState as WaitState).changeCoin(10);
			}else{
				_countersController.setCounterValue(CountersController.COIN_COUNTER,    response.coin); 
				_countersController.setCounterValue(CountersController.CREDITS_COUNTER, response.credits);
				_countersController.setCounterValue(CountersController.JACKPOT_COUNTER, response.jackpot);
			}
			_countersController.setCounterValue(CountersController.WIN_COUNTER, response.win);
			_countersController.setCounterValue(CountersController.TOTAL_BET_COUNTER, response.bet * cardsEnable);
			_countersController.setCounterValue(CountersController.BET_COUNTER, response.bet);
			

			_cardController = _applicationController.getController("CardController");
			_cardController.setCardsData(response.cards);

			/*
			_standardBarController.takeOutButton(StandardBarController.MUSIC_BUTTON);
			_countersController.setCounterValue(OwnCounters.FIN_INIT, 1);
			
			if(_applicationController.parameters.is_log)
				(_applicationController.getController(LogController) as LogController).startLog();
			*/
		}


		//private functions

		function onInitializationComplete(response){  //(response:InitResponse):void{
			_applicationController.sendNotification(Notifications.INITIAL_RESPONSE_NOTIFICATION, response);
		}

		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				Notifications.INITIAL_RESPONSE_NOTIFICATION,
				EngineNotificationsEnum.AUTOPLAY_START_NOTIFICATION,
				EngineNotificationsEnum.AUTOPLAY_MODIFIED_NOTIFICATION,
				EngineNotificationsEnum.AUTOPLAY_STOP_NOTIFICATION,
				Notifications.AUTOPLAY_INTERNAL_STATE_CHANGED,
				EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION,
				EngineNotificationsEnum.BAR_HELP_CLICK_NOTIFICATION,
				Notifications.HIDDEN_MENU,
				Notifications.AUTOMATIC_PEEK_NOTIFICATION,
				Notifications.RESET_NOTIFICATION);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}


	}





	//to global scope access:
	window.GameController = GameController;

	//Extends Controller
	GameController.prototype = Controller.prototype;

}(window));