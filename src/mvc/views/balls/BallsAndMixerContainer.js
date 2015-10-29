(function(window){

	function BallsAndMixerContainer(){
		var _this = this;
		var _ballsAndMixerContainer;
		var _applicationController = ApplicationController.getApplicationController();
		var _countersController    = _applicationController.getController("CountersController");
		var _gameController        = _applicationController.getController("GameController"); 
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		
		var _mixer;                        //:MixerView;
		var _smallBallsContainer;          //:Sprite;
		var _ballIndex               = [];
		var _balls                   = []; //:Dictionary;
		var _ballsView               = []; //:Vector.<BallView> = new Vector.<BallView>();
		//var _smallBallsFinalPosition = []; //:Dictionary = new Dictionary();
		var _canceledToReset         = []; //:Vector.<BallView> = new Vector.<BallView>();
		
		var smallBallAssetsVec       = [];
		var smallBallNumVec          = [];
		var cancelCrossVec           = [];
		var cancelNumVec             = [];

		var _ballSoundCounter        = 0;
		var _resetFinished           = true;
		var  LASTBALL_INDEX          = 41;
		
		function setupSubscriptions(){
			var notifications = [];
			notifications.push(
				Notifications.RESET_NOTIFICATION,
				Notifications.STATE_CHANGED_NOTIFICATION,
				Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION,
				Notifications.DRAW_BIG_BALL_NOTIFICATION,
				Notifications.BIG_BALL_DRAWN_NOTIFICATION,
				Notifications.NORMAL_DRAW_END_NOTIFICATION,
				Notifications.EXTRA_SIGN_NOTIFICATION,
				Notifications.CANCEL_EXTRA_BALL_NOTIFICATION,
				Notifications.PEEK_SETUP_NOTIFICATION,
				Notifications.AUTOMATIC_PEEK_NOTIFICATION,
				Notifications.PEEK_END_NOTIFICATION,
				Notifications.DRAW_SMALL_BALL_NOTIFICATION,
				Notifications.UPDATE_MIXER_SPEED_NOTIFICATION,
				//TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION,
				EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION,
				EngineNotificationsEnum.AUTOPLAY_START_NOTIFICATION,
				EngineNotificationsEnum.AUTOPLAY_STOP_NOTIFICATION
			);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);
		}
		
		this.notificationReceived = function(type, data){
			
			_ballIndex = _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);
			
			switch(type){
				case Notifications.STATE_CHANGED_NOTIFICATION:
					changeStaste(data);
				break;
				case Notifications.RESET_NOTIFICATION:
					//reset();	
				break;
				case EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION:
					countersChange(data);
				break;
				case Notifications.NORMAL_DRAW_END_NOTIFICATION:
					normalBallEnd(data);
				break;
				case Notifications.DRAW_BIG_BALL_NOTIFICATION:
					drawBigBall(data);
				break;
				case Notifications.DRAW_SMALL_BALL_NOTIFICATION:
					drawSmallBall(data);
				break;			
				case Notifications.BIG_BALL_DRAWN_NOTIFICATION:
					(data.filar)? _gameController.gameState.changeToPeekState(data.onComplete) : data.onComplete();
				break;
				case  Notifications.EXTRA_SIGN_NOTIFICATION:
					showExtraSign();
				break;	
				case Notifications.CANCEL_EXTRA_BALL_NOTIFICATION:
					showCanceledExtras(data);
				break;
				case Notifications.PEEK_SETUP_NOTIFICATION:
					_mixer.showPeekSign(data.onComplete);
				break;
				case  Notifications.AUTOMATIC_PEEK_NOTIFICATION:
					_mixer.automaticPeek();
				break;	
				case  Notifications.PEEK_END_NOTIFICATION:
					_gameController.gameState.backToPrevState();
				break;	
				case EngineNotificationsEnum.AUTOPLAY_START_NOTIFICATION:
					_mixer.autoState("AUTO");
				break;	
				case EngineNotificationsEnum.AUTOPLAY_STOP_NOTIFICATION:
					_mixer.autoState("MANUAL");
				break;
				case Notifications.UPDATE_MIXER_SPEED_NOTIFICATION:
					changeVel(data);
				break;
				/*case TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION:
					_mixer.changeLang();
				break;*/
			}
		}
		
		function countersChange(data){
			switch(data){
				case OwnCounters.TOSHOW_DRAWNBALLS_COUNTER:
					_mixer.setColorBallIndex(_countersController.getCounterValue(OwnCounters.TOSHOW_DRAWNBALLS_COUNTER));
				break;
			}
		}
		
		function changeStaste(newState){
			switch(newState){
				case GameStates.WAIT:
					_mixer.enableChangeSpeed(true);
					_mixer.enableAuto(true);
				break;
				case GameStates.WAIT_SERVER:
					_mixer.enableChangeSpeed(false);
					_mixer.enableAuto(true);
				break;
				case GameStates.EXTRA:
					_mixer.enableChangeSpeed(false);
					_mixer.enableAuto(true);
				break;
				case GameStates.AUTO:
					_mixer.enableChangeSpeed(false);
				break;
				case GameStates.PEEK:
					_mixer.enableAuto(false);
				break;
			}
		}
		
		function normalBallEnd(data){
			if(data.hasExtra){
				//_gameSoundController.playSound(SoundNames.SND_EXTRA_SETUP,true);
				_mixer.showExtraCostSign();
			}else{
				_mixer.goIdle();
			}
		}
		
		function drawBigBall(data){
			
			//EXTRA BALLS
			if(_ballIndex > Game.gameConfig.numberOfBalls){

				if(_ballIndex == LASTBALL_INDEX){
					_mixer.showBigBall(data.ball, getFrameBigBall(data.ball), getNumColor(data.ball), data.onComplete, data.response, data.filar);
				}else{
					if(!data.filar){

						function showNewBall(){
							function waitShowExtraSign(){
								data.onComplete();
							}
							_mixer.showBigBall(data.ball, getFrameBigBall(data.ball), getNumColor(data.ball), waitShowExtraSign, data.response, data.filar);
						}
						_mixer.hideExtraCostSign();
						//_mixer.goToBigBall();
						_mixer.alphaHideBigBall(showNewBall);

					}else{
						_mixer.showBigBall(data.ball, data.onComplete, data.response, data.filar);
					}
				}
			}else{
				//NORMAL BALLS
				_mixer.showBigBall(data.ball, getFrameBigBall(data.ball), getNumColor(data.ball), data.onComplete, data.response, data.filar);
			}
		}
		
		function showExtraSign(){
			_mixer.showExtraCostSign();
		}
		
		function drawSmallBall(data){
			
			if(_ballIndex == LASTBALL_INDEX){
				data.onComplete();
			}else{
				/*_ballsView[_ballIndex -1].ballAsset.gotoAndStop(data.ball);
				_smallBallsContainer.addChild(_ballsView[_ballIndex-1]);
				(_ballSoundCounter == 3)? _ballSoundCounter = 0 : _ballSoundCounter++; */
				
				smallBallAssetsVec[_ballIndex-1].frame   = getFrameSmallBall(data.ball);
				smallBallNumVec[_ballIndex-1].style.fill = getNumColor(data.ball);
				smallBallNumVec[_ballIndex-1].setText(getNum(data.ball));

				_ballsView[_ballIndex-1].throwMe(data.ball, data.onComplete, data.response, data.isTurbo, _ballSoundCounter);
			}
		}

		function showCanceledExtras(data){
			var _ball;
			var _win;
			var _lastBall = data.response.remainingBalls.length - 1;
			var duration  = .06;

			for(var i = 0; i < data.response.remainingBalls.length; i++){

				function show(i){

					_canceledToReset.push(_balls[data.response.remainingBalls[i].ballNumber.toString()]);
					_gameController.newBallDrawn();
					_ballIndex = _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);
					_ball      = data.response.remainingBalls[i].ballNumber;
					_win       = data.response.remainingBalls[i].win;

					if(i != _lastBall){

						smallBallAssetsVec[_ballIndex-1].frame   = getFrameSmallBall(_ball);
						smallBallNumVec[_ballIndex-1].style.fill = getNumColor(_ball);
						smallBallNumVec[_ballIndex-1].setText(getNum(_ball));
						smallBallNumVec[_ballIndex-1].visible    = true;
						cancelCrossVec[_ballIndex-1].visible     = true;
						if(_win > 0){
							cancelNumVec[_ballIndex-1].visible   = true;
							cancelNumVec[_ballIndex-1].setText(_win);
						}
						_ballsView[_ballIndex-1].simpleShowMe(_win, null);

					}else{
						_mixer.showCancelBigBall(_ball, getFrameBigBall(_ball), getNumColor(_ball), data.onComplete, _win);
					}
				}

				TweenMax.to(this, duration, {delay:duration * i , onCompleteParams:[i], onComplete:show });
			}
		}
		
		function changeVel(vel){
			_mixer.changeSpeed(vel);
		}
 
		this.reset = function(){

			function onComplete(){
				_smallBallsContainer.alpha = 1;
				_countersController.setCounterValue(OwnCounters.RESET_FINISHED, 1);
			}
			_countersController.setCounterValue(OwnCounters.RESET_FINISHED, 0);
			TweenMax.to(_smallBallsContainer, .6,{alpha:0, onComplete:onComplete});

			_mixer.reset();
		}

		this.getMixerView = function(){
			return _mixer;
		}

		this.getView = function(){
			return _ballsAndMixerContainer;
		}

		function getNumColor(ball){
			var color;
			if((ball<20 && ball>9) || (ball<40 && ball>29) || (ball<60 && ball>49) || (ball<80 && ball>69)){
				color = '#FFF';
			}else{
				color = '#000';
			}
			return color;
		}

		function getFrameBigBall(ball){
			var frame;
			if(ball<10){
				frame = 0;
			}else if(ball<20 && ball>9){
				frame = 1;
			}else if(ball<30 && ball>19){
				frame = 3;
			}else if(ball<40 && ball>29){
				frame = 4;
			}else if(ball<50 && ball>39){
				frame = 6;
			}else if(ball<60 && ball>49){
				frame = 7;
			}else if(ball<70 && ball>59){
				frame = 2;
			}else if(ball<80 && ball>69){
				frame = 5;
			}else if(ball>79){
				frame = 8;
			}
			return frame;
		}

		function getFrameSmallBall(ball){
			var frame;
			if(ball<10){
				frame = 0;
			}else if(ball<20 && ball>9){
				frame = 1;
			}else if(ball<30 && ball>19){
				frame = 2;
			}else if(ball<40 && ball>29){
				frame = 3;
			}else if(ball<50 && ball>39){
				frame = 4;
			}else if(ball<60 && ball>49){
				frame = 5;
			}else if(ball<70 && ball>59){
				frame = 6;
			}else if(ball<80 && ball>69){
				frame = 7;
			}else if(ball>79){
				frame = 8;
			}
			return frame;
		}

		function getNum(num){
			return num < 10? ("0" + num) : num;
		}

		function init(){
			
			//contenedor
			_ballsAndMixerContainer = game.add.group();
			
			//mixer
			function createMixer(){
				_mixer   = new MixerView();
				_ballsAndMixerContainer.add(_mixer.getView());
			}

			//bolas chicas
			function createSmallBalls(){	
				_smallBallsContainer   = game.add.group();
				_smallBallsContainer.x = 23; _smallBallsContainer.y = 22;
				_ballsAndMixerContainer.add(_smallBallsContainer);

				var ballsPoints     = [];
				var finalXPositions = [556.3, 508.6, 460.9, 413.2, 365.5, 317.8, 270.1, 222.4, 174.7, 127, 556.3, 508.6, 460.9, 413.2, 365.5, 317.8, 270.1, 222.4, 174.7, 127, 556.3, 508.6, 460.9, 413.2, 365.5, 317.8, 270.1, 222.4, 174.7, 127 , 317.8, 270.1, 222.4, 174.7, 127 , 127, 174.7, 222.4, 270.1, 317.8 ];
				var finalYPositions = [266,   266 ,  266 ,  266 ,  266 ,  266 ,  266 ,  266 ,  266 ,  266, 214,   214,   214,   214,   214,   214,   214,   214,   214,   214, 161.75, 161.75 , 161.75, 161.75, 161.75, 161.75, 161.75, 161.75, 161.75, 161.75, 110.5, 110.5, 110.5, 110.5, 110.5, 58.25, 58.25, 58.25, 58.25, 58.25];

				var ballView;      //tipo BallView -> ballContainer (ballAsset + ballNum) + funciones de movimiento;
				var ballContainer; //(ballAsset + ballNum)
				var ballAsset;
				var ballNum;

				var oneRowNormalBallInitRotation = [0,0,0,0,90,90,180,180,180,360];
				var initRotation;

				for(var i = 0; i < 40; i++){
					
					ballContainer   = game.add.group();
					ballContainer.x = finalXPositions[i];
					ballContainer.y = finalYPositions[i];
					
					ballAsset = game.add.sprite(0, 0, 'ball'); 
					ballAsset.anchor.setTo(.5, .5); 
					ballNum   = game.add.text(-3, 16, (i+1), {boundsAlignH: 'center', font: 'Roboto', fontSize: '24px', fill: '#000' }); 
					ballNum.anchor.setTo(1.0, .8);
					ballNum.setTextBounds(0, 0, 50, 50);

					smallBallAssetsVec.push(ballAsset);
					smallBallNumVec.push(ballNum);

					ballContainer.add(ballAsset);
					ballContainer.add(ballNum);
					
					//extras - cruz de cancel
					if(i > 29){
						var cancelCross    = game.add.sprite(0, 0, 'cancelCross'); 
						cancelCross.angle  = 45;
						cancelCross.alpha  = .6;
						cancelCross.scale.setTo(.7,.7);
						cancelCross.anchor.setTo(.5, .5); 
						cancelCross.visible = false;
						ballContainer.add(cancelCross);

						cancelCrossVec[i] = cancelCross;

						var cancelNum             = game.add.text(-30, -10, (i-25), {boundsAlignH: 'center', font: 'Roboto', fontSize: '17px', fill: '#113EEE' });
						cancelNum.setTextBounds(0, 0, 50, 50);
						cancelNum.stroke          = '#FFF';
				        cancelNum.strokeThickness = 2;
				        cancelNum.angle           = 45;
				        cancelNum.visible         = false;
				        ballContainer.add(cancelNum);

				        cancelNumVec[i] = cancelNum;
					}
					
					function Point(x, y) {
 						this.x = x;
  						this.y = y;
					}
					
					var point      = new Point(finalXPositions[i], finalYPositions[i]);
					ballsPoints[i] = point;
					initRotation   = 0;

					//normal lower row
					if(i+1 < 11){
						initRotation = oneRowNormalBallInitRotation[i];
					}
					//normal middle row
					else if(i+1 > 10 && i+1 < 21){
						initRotation = oneRowNormalBallInitRotation[i -10];
					}
					//normal top row
					else if(i+1 > 20 && i+1 < 31){
						initRotation = oneRowNormalBallInitRotation[i -20];
					}
					
					ballView = new BallView(ballContainer, point, i +1, initRotation);
					_ballsView.push(ballView);

					ballAsset.frame    = getFrameSmallBall(i+1);
					ballNum.style.fill = getNumColor(i+1);
					ballNum.setText(getNum(i+1));
					

					ballContainer.visible = false;
					_smallBallsContainer.add(ballContainer);
				}

				for(i = 0; i < 40; i++){
					_ballsView[i].ballsFinalPoints(ballsPoints);
				}
				
			}
			
			createSmallBalls();
			createMixer();
			setupSubscriptions();
		}
		
		init();
	}

	window.BallsAndMixerContainer = BallsAndMixerContainer;

}(window));