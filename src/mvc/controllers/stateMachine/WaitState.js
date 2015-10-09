
(function(window){

	this.WaitState = function(gameState, gameController){  //(gameState:Function, gameController:GameController){
		var _this = this;
		var _gameStateChangeCallback = gameState;
		var _gameController          = gameController;
		var _model                   = _gameController.model;
		var _applicationController   = ApplicationController.getApplicationController();
		var _countersController      = ApplicationController.getApplicationController().getController("CountersController");


		this.getType = function(){
			return GameStates.WAIT;
		}

		this.enableNextCard = function(){
			_this.reset();
			_gameStateChangeCallback(new WaitServerState(_gameStateChangeCallback, _gameController, _this));
			_gameController._cardController.enableNextCard();
			_model.server.gameType.changeCardsConfiguration(_gameController._cardController.getOpenCards());
		}
		
		this.enableCard = function(cardIndex, enabled){  //(cardIndex:int, enabled:Boolean){
			_this.reset();
			_gameStateChangeCallback(new WaitServerState(_gameStateChangeCallback, _gameController, _this));
		}
		
		this.changeNumbers = function(){
			_this.reset();
			_gameStateChangeCallback(new WaitServerState(_gameStateChangeCallback, _gameController, _this));
			
			console.log(_model);
			console.log(_model.server);
			_model.server.gameType.changeNumbers();
		}

		this.playBtn = function(){
			_this.reset();
			var creditOk = _model.server.gameType.Play();
			var state;
			
			if(creditOk){
				state = new WaitServerState(_gameStateChangeCallback, _gameController, _this);
				state._playedInTurbo = false;
				_gameStateChangeCallback(state);
				_applicationController.sendNotification(Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION);
				
			}else{
				state = new WaitState(_gameStateChangeCallback, _gameController);
				_gameStateChangeCallback(state);
			}
		}
		
		this.turboBtn = function(){
			_this.reset();
			var creditOk = _model.server.gameType.Play();
			var state;
			
			if(creditOk){
				state = new WaitServerState(_gameStateChangeCallback, _gameController, _this);
				_gameStateChangeCallback(state);
				state._playedInTurbo = true;
				_applicationController.sendNotification(Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION);
			}else{
				state = new WaitState(_gameStateChangeCallback, _gameController);
				_gameStateChangeCallback(state);
			}
		}
		
		this.betUp = function(){
			var currentBet = _countersController.getCounterValue(CountersController.BET_COUNTER);
			currentBet++;
			
			if(currentBet > ShowBall3._gameConfig.maxBet){
				currentBet = 1;
			}
			else if(currentBet == 11){
				currentBet = 15;
			}
			else if (currentBet == 16){
				currentBet = 20;
			}
			
			_countersController.setCounterValue(CountersController.BET_COUNTER, currentBet);
			changeBet(currentBet);
		}
		
		this.betDown = function(){
			var currentBet = _countersController.getCounterValue(CountersController.BET_COUNTER);
			currentBet--;
			
			if(currentBet < 1){
				currentBet = ShowBall3._gameConfig.maxBet;
			}
			else if(currentBet == 19){
				currentBet = 15;
			}
			else if(currentBet == 14){
				currentBet = 10;
			}
			
			_countersController.setCounterValue(CountersController.BET_COUNTER, currentBet);
			changeBet(currentBet);
		}
		
		this.coinUp = function(){
			var currentCoin = _countersController.getCounterValue(CountersController.COIN_COUNTER);
			var index       = ShowBall3._gameConfig.coinValues.indexOf(currentCoin);
			
			if(index != -1){
				index++;
				if(index > Gamne.gameConfig.coinValues.length-1){
					index = 0;
				}
			}else{
				index = 0;
			}
			
			currentCoin = Game.gameConfig.coinValues[index];
			changeCoin(currentCoin);
			
		}
		
		this.coinDown = function(){
			var currentCoin = _countersController.getCounterValue(CountersController.COIN_COUNTER);
			var index       = Game.gameConfig.coinValues.indexOf(currentCoin);
			
			if(index != -1){
				index--;
				if(index < 0){
					index = Game.gameConfig.coinValues.length-1;
				}
			}else{
				index = 0;
			}
			
			currentCoin = Game.gameConfigcoinValues[index];
			changeCoin(currentCoin);
		}

		this.changeBet = function(bet){
			var state = new WaitServerState(_gameStateChangeCallback, _gameController, _this);
			_gameStateChangeCallback(state);
			_model.server.gameType.changeBet(bet);
			_this.reset();
		}
		
		this.changeCoin = function(coin){
			var state = new WaitServerState(_gameStateChangeCallback, _gameController, _this);
			_gameStateChangeCallback(state);
			_model.server.gameType.changeCoin(coin);
		}
		
		this.reset = function(){
			//alert("HACER OwnCounters  - reset de wait satate")
			_countersController.setCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER, 0);
			_countersController.setCounterValue(OwnCounters.EXTRA_COST_COUNTER, 0);
			_countersController.setCounterValue(CountersController.WIN_COUNTER, 0);
			
			_applicationController.sendNotification(Notifications.RESET_NOTIFICATION);
		}
		
		this.showHelp = function(){
			
		   var state = new WaitServerState(_gameStateChangeCallback, _gameController, _this, _this.getType());
		   _gameStateChangeCallback(state);
		   _gameController.view.menuView.showMenu();
		}

		
		this.changeToPeekState = function(onComplete){}
		this.hideHelp          = function(){}
		this.backToPrevState   = function(){}//ver ejemplo en WaitServerState
		this.beginExtras       = function(){}
		this.playEnded         = function(){}
		this.multipleUse       = function(_function){}

	}


	window.WaitState = WaitState;


}(window));