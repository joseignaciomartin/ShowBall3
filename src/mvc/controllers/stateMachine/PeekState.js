(function(window){

	function PeekState(gameState, gameController, onComplete, prevStateToRemove, prevGameType){ //(gameState:Function, gameController:GameController, onComplete:Function, prevStateToRemove:IGameState = null, prevGameType:int = -1){
			
		if(prevStateToRemove) prevStateToRemove = null; //esto?? mas raro!
		if(!prevGameType) prevGameType = -1;

		var _gameStateChangeCallback = gameState;
		var _gameController          = gameController;
		var _onComplete              = onComplete;
		var _prevGameType            = prevGameType;

		this.getType = function(){ 
			return GameStates.PEEK;
		}
		
		this.turboBtn = function(){ 
			//_gameController.view.getMixerView().peek();
			ApplicationController.getApplicationController().sendNotification(Notifications.PEEK_NOTIFICATION);
		}
		
		this.playBtn = function(){
			ApplicationController.getApplicationController().sendNotification(Notifications.AUTOMATIC_PEEK_NOTIFICATION);
		}
		
		this.backToPrevState = function(){
			switch(_prevGameType){
				case GameStates.PLAYING:
					_gameStateChangeCallback(new PlayingState(_gameStateChangeCallback, _gameController, this));
					_onComplete();
				break;
				case GameStates.WAIT_SERVER:
					_gameStateChangeCallback(new WaitServerState(_gameStateChangeCallback, _gameController, this));
					_onComplete();
				break;
			}
		}
		
		this.getPrevState = function(){
			return _prevGameType; 
		}
		
		this.enableNextCard            = function(){}
		this.enableCard                = function(cardIndex, enabled){}
		this.changeNumbers             = function(){}
		this.betUp                     = function(){}
		this.betDown                   = function(){}
		this.coinUp                    = function(){}
		this.coinDown                  = function(){}
		this.changeConfigCardsResponse = function(response){}
		this.changeStage               = function(){}
		this.playResponse              = function(response){}
		this.changeNumberResponse      = function(response){}
		this.getExtraBallResponse      = function(response){}
		this.cancelExtraBallResponse   = function(response){}
		this.changeBetResponse         = function(response){}
		this.changeCoinResponse        = function(response){}
		this.changeToPeekState         = function(onComplete){}
		this.showHelp                  = function(){}
		this.hideHelp                  = function(){}
		this.beginExtras               = function(){}
		this.playEnded                 = function(){}
		this.multipleUse               = function(_function){}
	}

	window.PeekState = PeekState;
}(window));