
(function(window){
	
	var _gameStateChangeCallback;
	var _controller;
	var _model;
	var _prevGameType = -1;
	var _gameSoundController;
	
	function ExtraState(gameState, gameController, prevStateToRemove){  //(gameState:Function, gameController:GameController, prevStateToRemove:IGameState = null){
		
		if(prevStateToRemove) prevStateToRemove = null;
		_gameStateChangeCallback = gameState;
		_controller              = gameController;
		_model                   = gameController.model;
		//_gameSoundController     = ApplicationController.getApplicationController().getController(GameSoundController) as GameSoundController;
		
	
		/**IGameState SEND**/
		
		this.getType = function(){
			return GameStates.EXTRA;
		}
		
		this.turboBtn = function(){
			var creditOk = _model.server.getExtraBall();
			var state;
			
			if(creditOk){
				//_gameSoundController.playSound(SoundNames.SND_EXTRA_BALL, true);
				state = new WaitServerState(_gameStateChangeCallback, _controller, this);
				_gameStateChangeCallback(state);
				
				ApplicationController.getApplicationController().sendNotification(Notifications.EXTRA_SENT_TO_SERVER_NOTIFICATION);
				ApplicationController.getApplicationController().sendNotification(Notifications.PAUSE_ALMOST_NOTIFICATION, true);
			}else{
				state = new ExtraState(_gameStateChangeCallback, _controller, this);
				_gameStateChangeCallback(state);
			}
		}
		
		this.playBtn = function(){
			_gameStateChangeCallback(new WaitServerState(_gameStateChangeCallback, _controller, this));
			_model.server.cancelExtraBall();
		}
		
		this.showHelp = function(){
			var state = new WaitServerState(_gameStateChangeCallback, _controller, this, this.getType());
			_gameStateChangeCallback(state);
			
			_controller.view.menuView.showMenu();
		}
		
		this.getPrevState = function(){
			return _prevGameType; 
		}
		

		this.enableNextCard = function(){}//ver ejemplo en WaitServerState
		this.enableCard = function(cardIndex, enabled){}
		this.changeNumbers = function(){}
		this.betUp = function(){}
		this.betDown = function(){}
		this.coinUp = function(){}
		this.coinDown = function(){}
		this.changeStage = function(){}
		
		/**IGameState RECEIVED**/
		
		this.changeConfigCardsResponse = function(response){}
		this.playResponse = function(response){}
		this.changeNumberResponse = function(response){}
		this.getExtraBallResponse = function(response){}
		this.cancelExtraBallResponse = function(response){}
		this.changeBetResponse = function(response){}
		this.changeCoinResponse = function(response){}
		this.changeToPeekState = function(){}
		this.backToPrevState = function(){}
		this.beginExtras = function(){}
		this.playEnded = function(){}
		this.multipleUse = function(_function){}
		this.hideHelp = function(){}

	}
	window.ExtraState = ExtraState;

}(window));