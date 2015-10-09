(function(window){

	function PlayController(){



		var _applicationController =  ApplicationController.getApplicationController();
		var _cardsController       = _applicationController.getController("CardController");
		var _gameController        = _applicationController.getController("GameController");
		var _countersController    = _applicationController.getController("CountersController");
		var _internalBallIndex = 0; 
		var _response; //PlayResponse
		var _isTurbo;
		var _onComplete; //:Function;
		var _ball;// :int; 
		var _peek = false;


		this.play = function(isTurbo, playData){   //(isTurbo:Boolean, playData:PlayResponse):void{
			
			_response     = playData;
			_isTurbo      = isTurbo;

			_countersController.setCounterValue(OwnCounters.EXTRA_COST_COUNTER, playData.extraCost);
			if(_response.hasExtra) _countersController.setCounterValue(OwnCounters.HAS_EXTRA, 1);
			
			var timeOutIds  = [];
			checkResetToContinue();
			
			function checkResetToContinue(){
				var resetFinished = _countersController.getCounterValue(OwnCounters.RESET_FINISHED);
				if(resetFinished == 0){
					var timeOutToId = setTimeout(checkResetToContinue, 500);
					timeOutIds.push(timeOutToId);
				}else{
					_countersController.setCounterValue(OwnCounters.RESET_FINISHED, 0);
					showNextBall();
					for(var i = 0; i < timeOutIds.length; i++){
						clearTimeout(timeOutIds[i]);
					}
					timeOutIds = null;
				}
			}


		function showNextBall(){
			
			if(_internalBallIndex < _response.drawnBalls.length){
				
				_ball = _response.drawnBalls[_internalBallIndex];
			    _gameController.newBallDrawn();
				_internalBallIndex = _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);

				_peek = _countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1;
				(_peek) ? filarSetUp() : drawBigBall();
				
				function filarSetUp(){
					_onComplete = drawBigBall;  
					_applicationController.sendNotification(Notifications.PEEK_SETUP_NOTIFICATION,    {ball:_ball, onComplete:_onComplete, response:_response, filar:_peek, almostBingo:_peek});
				} 
				
				function drawBigBall(){                                                           
					
					//TEST
					boxMatch();
					
					/*
					(_peek) ? _onComplete = peekState : _onComplete = boxMatch;                           
					_applicationController.sendNotification(Notifications.DRAW_BIG_BALL_NOTIFICATION,  {ball:_ball, onComplete:_onComplete, response:_response, filar:_peek});*/
				}   
				
				function peekState(){  
					_onComplete = boxMatch; 
					_applicationController.sendNotification(Notifications.BIG_BALL_DRAWN_NOTIFICATION, {ball:_ball, onComplete:_onComplete, response:_response, filar:_peek});
				}  
				
				function boxMatch(){                                                              
					_onComplete  = drawSmallBall;
					var objMatch = _cardsController.tryToMarkNumber(_ball, _onComplete, _response, _peek);
					if(objMatch.match){
						_applicationController.sendNotification(Notifications.MARK_BALL_NOTIFICATION,  {onComplete:_onComplete, card:objMatch.card, position:objMatch.position, isTurbo:_isTurbo, type:"PLAY"});
					}else{                                                                             
						drawSmallBall();                                                               
					}                                                                                  
				}
				
				function drawSmallBall(){
					//TEST
					markAlmostDuringPlay()

					/*
					(Game.gameConfig.loadCardsStateDuringPlay)? _onComplete = markAlmostDuringPlay: _onComplete = nextStep;
					_applicationController.sendNotification(Notifications.DRAW_SMALL_BALL_NOTIFICATION,{ball:_ball, onComplete:_onComplete, response:_response, filar:_peek, isTurbo:_isTurbo});
					*/
				}
				
				function markAlmostDuringPlay(){

					//TEST
					updatePayTable();

					/*
					_onComplete = updatePayTable;
					if(_response.cardsStateDuringPlay[_ball]){
						_cardsController.markAlmostDuringPlay(_onComplete, _response, _ball);
					}else{
						nextStep();
					}*/
				}
				
				function updatePayTable(){
					_onComplete = markWinsDuringPlay;
					//TODO:
					/*
					var winPaid:Vector.<WinPrizes> = _response.cardsStateDuringPlay[_ball].winPrizes;
					var willPay:Vector.<WillPay>   = _response.cardsStateDuringPlay[_ball].almostVec;
					_applicationController.sendNotification(Notifications.UPDATE_PAY_TABLE_NOTIFICATION, {winPaid:winPaid, willPay:willPay});*/
					_onComplete();
				}
				
				function markWinsDuringPlay(){
					//TEST
					showNextBall();

					/*
					_onComplete = showNextBall;
					_cardsController.markWinsDuringPlay(_onComplete, _response, _ball);*/
				}

				
			}else{
				
				markWins();

				function markWins(){
					//Hay que pasar por arriba con el win del servidor, si o si, por el tema del jackpot
					_countersController.setCounterValue(CountersController.WIN_COUNTER, _response.win);
					markAlmost();
				} 
				
				function markAlmost(){
					_onComplete = endPlay;
					if(_response.willPay.length > 0){
						if(_response.hasExtra){
							_cardsController.setGameTotalAlmost(_response.willPay);
							_applicationController.sendNotification(Notifications.MARK_ALMOST_NOTIFICATION, {onComplete:_onComplete, willPay:_response.willPay, type:"NORMAL"});
						}else{
							_onComplete();
						}
					}else{
						_onComplete();
					}
				}
				
				function endPlay(){
					if(_response.hasExtra){
						_countersController.setCounterValue(OwnCounters.EXTRA_COST_COUNTER, _response.extraCost);
						final();
					}else{
						_applicationController.sendNotification(Notifications.NORMAL_DRAW_END_NOTIFICATION, {hasExtra:_response.hasExtra, freeExtraPos:_response.freeExtraPos});
						pay();
					}
				}
				
				function pay(){
					
					//almost bingo control to remove
					if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1) 
						_countersController.setCounterValue(OwnCounters.ALMOST_BINGO, 0);
					
					_onComplete = final;
					var finalCredit = _response.credits + _response.win;
					var finalCreditInCash = _response.credits_in_cash + _response.win_in_cash;
					_applicationController.sendNotification(Notifications.START_PAID, {onComplete:_onComplete, win:_response.win, winInCash:_response.win_in_cash , finalCredit:finalCredit, finalCreditInCash:finalCreditInCash});
					
				}
				
				function final(){
					if(_response.hasExtra){
						var idTimeOut = setTimeout(beginExtras, 300);
						
						function beginExtras(){
							 clearTimeout(idTimeOut);
							 _applicationController.sendNotification(Notifications.NORMAL_DRAW_END_NOTIFICATION, {hasExtra:_response.hasExtra, freeExtraPos:_response.freeExtraPos});
							 _gameController.gameState.beginExtras();
							_applicationController.sendNotification(Notifications.EXTRA_SIGN_NOTIFICATION);
						}
					}else{
						_gameController.gameState.playEnded();
					}
				}

			}
		}




		}

	}

	window.PlayController = PlayController;


}(window));