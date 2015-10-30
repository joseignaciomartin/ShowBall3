(function(window){

	function ExtraController(gameStateChangeCallback){
		
		var _gameStateChangeCallback = gameStateChangeCallback;
		var _applicationController   = ApplicationController.getApplicationController();
		var _countersController      = _applicationController.getController("CountersController");
		var _gameController          = _applicationController.getController("GameController");
		var _cardsController         = _applicationController.getController("CardController");

		var _cantBall = Game.gameConfig.numberOfBalls + Game.gameConfig.numberOfExtraBalls;
		
                           
		
		this.play = function(response){  //(response:GetExtraBallResponse):void{

			_cardsController.upDateCards(response.cardsData);	
			
			_gameController.newBallDrawn();
			var ballIndex = _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);
			_countersController.setCounterValue(OwnCounters.TOSHOW_DRAWNBALLS_COUNTER, ballIndex);
			
			var ball = response.ball;
			var onComplete;
			var almostVector;

			var peek = _countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1;
			if(ballIndex == 41) peek = true;
			(peek) ? peekSetUp() : drawBigBall();
			
			function peekSetUp(){

				onComplete = drawBigBall;                                                         
				_applicationController.sendNotification(Notifications.PEEK_SETUP_NOTIFICATION,    {ball:ball, onComplete:onComplete, response:response, filar:peek});
				
			}  
			
			function drawBigBall(){ 
				
				_countersController.setCounterValue(OwnCounters.EXTRA_COST_COUNTER, response.nextExtraCost);
				(peek) ? onComplete = peekState : onComplete = boxMatch;                           
				_applicationController.sendNotification(Notifications.DRAW_BIG_BALL_NOTIFICATION,  {ball:ball, onComplete:onComplete, response:response, filar:peek});
				
			}  
			
			function peekState(){

				onComplete = boxMatch;                                                            
				_applicationController.sendNotification(Notifications.BIG_BALL_DRAWN_NOTIFICATION, {ball:ball, onComplete:onComplete, response:response, filar:peek});
				
			}    
			
			function boxMatch(){                                                                                                

				onComplete = drawSmallBall;
				
				var objMatch = _cardsController.tryToMarkNumber(ball, onComplete, response, peek);
				if(objMatch.match){
					
					_applicationController.sendNotification(Notifications.MARK_BALL_NOTIFICATION,  {onComplete:onComplete, card:objMatch.card, position:objMatch.position, isTurbo:true, type:"EXTRA"});
				}else{    
					drawSmallBall();  
				}  
			}
			
			function drawSmallBall(){
				onComplete = markAlmost;
				_applicationController.sendNotification(Notifications.DRAW_SMALL_BALL_NOTIFICATION,{ball:ball, onComplete:onComplete, response:response, filar:peek});
			}
			
			function markAlmost(){

				//TO TEST
				updatePayTable();

				/*onComplete = updatePayTable;
				if(response.willPay.length > 0){
					_cardsController.setGameTotalAlmost(response.willPay);
					_applicationController.sendNotification(Notifications.MARK_ALMOST_NOTIFICATION, {onComplete:onComplete, willPay:response.willPay, type:"NORMAL"});
					
				}else{
					updatePayTable();
				}*/
			}
			
			function updatePayTable(){
				
				onComplete = markWins;
				//_applicationController.sendNotification(Notifications.UPDATE_PAY_TABLE_NOTIFICATION, {winPaid:response.winPaid, willPay:response.willPay});
				onComplete();

			}
			
			function markWins(){
				
				//TO TEST
				endPlay();

				/*onComplete = endPlay; 
				_countersController.setCounterValue(CountersController.WIN_COUNTER, response.win);
				_cardsController.markWins(onComplete, response); */  

			} 
			
			function endPlay(){

				var _state = _gameController.gameState;
				ApplicationController.getApplicationController().sendNotification(Notifications.PAUSE_ALMOST_NOTIFICATION, false);
				
				if(ballIndex != _cantBall){

					//almost bingo control
					//if(_cardsController.checkFilar()) _countersController.setCounterValue(OwnCounters.ALMOST_BINGO, 1);
					
					//_cardsController.updateCardsWinCounter(response.winPaid);
					_applicationController.sendNotification(Notifications.EXTRA_SIGN_NOTIFICATION);
					
					final();
					
				}else{
					
					_countersController.setCounterValue(CountersController.WIN_COUNTER, response.win);
					//_cardsController.updateCardsWinCounter(response.winPaid);
					
					pay();
				}
				
			}
			
			function pay(){

				//TEST
				final();

				/*
				//almost bingo control to remove
				if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1) 
					_countersController.setCounterValue(OwnCounters.ALMOST_BINGO, 0); 
				
				onComplete = final;
				var finalCredit       = response.credits + response.win;
				var finalCreditInCash = response.credits_in_cash + response.win_in_cash;
				_applicationController.sendNotification(Notifications.START_PAID, { onComplete:onComplete, win:response.win, winInCash:response.win_in_cash, finalCredit:finalCredit, finalCreditInCash:finalCreditInCash});
				*/
			}
			
			function final(){
				
				if(ballIndex != _cantBall){

					_gameStateChangeCallback(new ExtraState(_gameStateChangeCallback, _gameController));
					
				}else{
					
					_applicationController.sendNotification(Notifications.CHANGE_ALMOST_NOTIFICATION, {type: "DURINGPLAY", onComplete:null}); 
					
					_gameStateChangeCallback(new WaitState(_gameStateChangeCallback,  _gameController));
					
				}
			}
		}
	}

	window.ExtraController = ExtraController;

}(window));