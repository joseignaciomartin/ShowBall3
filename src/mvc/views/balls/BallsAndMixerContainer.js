(function(window){

	function BallsAndMixerContainer(){
		var _this = this;
		var _ballsAndMixerContainer;
		var _applicationController = ApplicationController.getApplicationController();
		var _countersController    = _applicationController.getController("CountersController");
		var _gameController        = _applicationController.getController("GameController"); 
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		
		var _mixer; //:MixerView;
		var _smallBallsContainer;          //:Sprite;
		var _ballIndex               = [];
		var _balls                   = []; //:Dictionary;
		var _ballsView               = []; //:Vector.<BallView> = new Vector.<BallView>();
		var _bigBalls                = []; //:Dictionary;
		var _smallBallsFinalPosition = []; //:Dictionary = new Dictionary();
		var _canceledToReset         = []; //:Vector.<BallView> = new Vector.<BallView>();
		
		var _ballSoundCounter                 = 0;
		var _resetFinished                    = true;
		BallsAndMixerContainer.LASTBALL_INDEX = 41;
		
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

		function init(){
			
			//contenedor
			_ballsAndMixerContainer = game.add.group();
			
			//mixer

			//bolas grande

			//bolas chicas

			function createMixer(){
				_mixer   = new MixerView(_bigBalls);
				//_mixer.x = 524;
				//_mixer.y =  55;
				_ballsAndMixerContainer.add(_mixer.getView());
			}

			function createBalls(){	
				/*_smallBallsContainer.x = ShowBall3.STAGE_WIDTH/2  - 47;
				_smallBallsContainer.y = ShowBall3.STAGE_HEIGHT/2 - 35;
				addChild(_smallBallsContainer);*/
				//BallsSetUp.createBalls(_ballsView);
			}
			
			createMixer();
			createBalls();
			setupSubscriptions();
		}
		


		init();
		
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
			if(_ballIndex > ShowBall3._gameConfig.numberOfBalls){

				if(_ballIndex == LASTBALL_INDEX){
					_mixer.showBigBall(data.ball, data.onComplete, data.response, data.filar);
				}else{
					if(!data.filar){

						function showNewBall(){
							function waitShowExtraSign(){
								data.onComplete();
							}
							_mixer.showBigBall(data.ball, waitShowExtraSign, data.response, data.filar);
						}
						_mixer.hideExtraCostSign();
						_mixer.goToBigBall();
						_mixer.alphaHideBigBall(showNewBall);

					}else{
						_mixer.showBigBall(data.ball, data.onComplete, data.response, data.filar);
					}
				}
			}else{
				//NORMAL BALLS
				_mixer.showBigBall(data.ball, data.onComplete, data.response, data.filar);
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
						/*_ballsView[_ballIndex -1].ballAsset.gotoAndStop(_ball);
						_smallBallsContainer.addChild(_ballsView[_ballIndex-1]);*/
						_ballsView[_ballIndex-1].simpleShowMe(_win, null);
					}else{
						_mixer.showCancelBigBall(_ball, data.onComplete, _win);
					}
				}

				TweenMax.to(this, duration, {delay:duration * i,onCompleteParams:[i], onComplete:show });
			}
		}
		
		function changeVel(vel){
			_mixer.changeSpeed(vel);
		}
 
		this.reset = function(){

			function onComplete(){
				//_smallBallsContainer.removeChildren();
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

	}

	window.BallsAndMixerContainer = BallsAndMixerContainer;

}(window));