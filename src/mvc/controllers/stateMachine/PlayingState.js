(function(window){

	this.PlayingState = function(gameState, gameController){

		var _this = this;
		
		this._playController         = new PlayController();
		var _gameStateChangeCallback = gameState;
		var _gameController          = gameController;
		var _applicationController   = ApplicationController.getApplicationController();


		this.playEnded = function(){
			_gameStateChangeCallback(new WaitState(_gameStateChangeCallback, _gameController));
		}
		
		this.beginExtras = function(){
			_gameStateChangeCallback(new ExtraState(_gameStateChangeCallback, _gameController));
		}

		this.changeToPeekState = function(onComplete){
			_gameStateChangeCallback(new PeekState(_gameStateChangeCallback, _gameController, onComplete, this, getType()));
		}
		
		this.getType = function(){
			return GameStates.PLAYING;
		}

		/**IGameState SEND**/

		this.enableNextCard = function(){}
		this.enableCard     = function(cardIndex, enabled){}
		this.changeNumbers  = function(){}
		this.turboBtn       = function(){}
		this.playBtn        = function(){}
		this.betUp          = function(){}
		this.betDown        = function(){}
		this.coinUp         = function(){}
		this.coinDown       = function(){}
		this.changeStage    = function(){}
		
		/**IGameState RECEIVED**/
		
		this.changeConfigCardsResponse = function(response){}
		this.playResponse              = function(response){}
		this.changeNumberResponse      = function(response){}
		this.getExtraBallResponse      = function(response){}
		this.cancelExtraBallResponse   = function(response){}
		this.changeBetResponse         = function(response){}
		this.changeCoinResponse        = function(response){}
		this.showHelp                  = function(){}
		this.hideHelp                  = function(){}
		this.backToPrevState           = function(){}//ver ejemplo en WaitServerState
		this.multipleUse               = function(_function){}

	}




	window.PlayingState = PlayingState;

}(window));