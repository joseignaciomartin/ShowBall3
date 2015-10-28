
(function(window){

	function MixerView(){
		

		var _this = this;
		var _mixerContainer;

		var _mixer; //:MovieClip;
		var _extraCost; //:int;
		var _currentBallNumber; //:int;
		var _canChangeSpeed; //:Boolean =true;
		var _lastPeekNotificacionSended; //:Boolean;

		var _automaticFrame; //:int;
		var _lastPeekFrame;  //:int;
		var _peekSoundCount;  //:int = 0; 

		var _extraSignBlink;
		
		var _applicationController =  ApplicationController.getApplicationController();
		var _gameController        = _applicationController.getController("GameController");
		//var _translatorController  = _applicationController.getController("TranslatorController");
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		var _countersController    = _applicationController.getController("CountersController");
		//var _standardBarController = _applicationController.getController("StandardBarController");
		
		//(_mixer.bg as MovieClip).gotoAndStop(ShowBall3._gameConfig.gameName);
		//(_mixer.auto as MovieClip).addEventListener(MouseEvent.CLICK, autoHandle);
		//(_mixer.speedBar as MovieClip).addEventListener(MouseEvent.CLICK, speedHandler);
		//_translatorController.addTranslatable(_mixer.ballText, "BALL_COUNT", "BALL_COUNT");
		//_translatorController.addTranslatable(_mixer.speedTxt, "SPEED", "SPEED");
		
		//reset();


		//SET UP
		///////////////////////////////////////////////////////////////////
		_mixerContainer = game.add.group();
		//mixer
        var mixer   = _mixerContainer.create(382, 42, 'mixer');
        mixer.frame =   1;
        
        //big balls
		var bigBall = _mixerContainer.create(404, 49, 'bigBall');

		//ball number
		var bigBallNum = game.add.text(396, 73, "70", {boundsAlignH: 'center', font: 'Roboto', fontSize: '55px', fill: '#000' });
		_mixerContainer.add(bigBallNum);
		bigBallNum.setTextBounds(0, 0, 100, 100);

		//big ball tapa
		var bigBallCover     = _mixerContainer.create(399, 44, 'bigBallCover');  
		bigBallCover.frame   = 3;
		bigBallCover.visible = false;

		//extra cost number
		var extraCostNum = game.add.text(402, 85, "50", {boundsAlignH: 'center', font: 'Roboto', fontSize: '25px', fill: '#000' });
		_mixerContainer.add(extraCostNum);
		extraCostNum.setTextBounds(0, 0, 100, 50);		
		extraCostNum.visible = false;

		//ball index
		var ballIndex = game.add.text(479, 105, "01", {boundsAlignH: 'center', font: 'digital', fontSize: '30px', fill: '#40FF00' });
		_mixerContainer.add(ballIndex);
		ballIndex.setTextBounds(0, 0, 100, 50);		
		ballIndex.visible = true;


        //vel

        //auto


        //TEST
        /*function prueba(){
        	ballIndex.setText("20");
        }
		setTimeout(prueba, 1000);*/

		///////////////////////////////////////////////////////////////////


		
		this.showBigBall = function(ball, frame, numColor, onComplete, response, filar){   //(ball:int, onComplete:Function, response:BaseResponse, filar:Boolean):void{

			//color big ball
			bigBall.frame = frame; //getFrameBigBall(ball);
			//num big ball
			bigBallNum.style.fill = numColor; //getNumColor(ball);
			bigBallNum.setText(ball);

			onComplete(); 
			
			/*
			_mixer.gotoAndStop("BALLS");
			_mixer.extraSign.visible = false;
			_currentBallNumber       = ball;
			
			if(!filar)
				_mixer.peekDoor.visible = false;
			
			_mixer.bigBalls.gotoAndStop(ball);
			_mixer.bigBalls.alpha   = 1;
			_mixer.bigBalls.visible = true;
			_mixer.cancel.visible   = false;
			onComplete();  */ 
		}
		
		this.goIdle = function(){
			//_mixer.gotoAndStop("IDLE");
			_mixer.extraSign.visible = false;
		}
		
		this.goToBigBall = function(){
			/*
			_mixer.gotoAndStop("BALLS");
			_mixer.extraSign.visible = false;

			if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 0) _mixer.peekDoor.visible = false;
			
			_mixer.cancel.visible   = false;
			_mixer.bigBalls.gotoAndStop(_currentBallNumber);
			(_mixer.bigBalls as MovieClip).alpha = 1;*/
		}
		
		this.alphaHideBigBall = function(onComplete){
			/*
			_mixer.gotoAndStop("BALLS");
			TweenMax.to(_mixer.bigBalls, .4, {alpha:0, onComplete: complete});
			_mixer.cancel.visible = false;
			
			function complete():void{
				if(onComplete != null) onComplete();
			}
			*/
		}
		
		this.showExtraCostSign = function(){
			
			//TODO LENGUAJES...

			_extraCost = _countersController.getCounterValue(OwnCounters.EXTRA_COST_COUNTER);

			bigBallCover.frame   = 4;
			bigBallCover.visible = true;

			extraCostNum.visible    = true;
			extraCostNum.style.fill = '#FF0000';
			extraCostNum.setText(_extraCost);

			_extraSignBlink = true;

			function goBlack(){
				bigBallCover.frame = 4;
				extraCostNum.style.fill = '#000';
				
				extraCostNum.setText(_extraCost);
				if(_extraSignBlink) TweenMax.to(extraCostNum, .5, {onComplete:goRed});
			}

			function goRed(){
				bigBallCover.frame = 5;
				extraCostNum.style.fill = '#FF0000';
				extraCostNum.setText(_extraCost);
				if(_extraSignBlink) TweenMax.to(extraCostNum, .5, {onComplete:goBlack});
			}

			goRed();
		}
		
		this.hideExtraCostSign = function(onComplete){

			_extraSignBlink      = false; //stop blink extra sign
			bigBallCover.visible = false;
			extraCostNum.visible = false;

			function complete(){
				if(onComplete != null) onComplete();
			}

			/*
			if(_mixer.extraSign){
				(_mixer.extraSign.inner as MovieClip).addFrameScript(0,  null);
				(_mixer.extraSign.inner as MovieClip).addFrameScript(15, null);
			}

			function complete():void{
				if(onComplete != null) onComplete();
			}*/
		}
		
		this.showPeekSign = function(onComplete){
			/*
			function callBack(){
				_mixer.peekDoor.addFrameScript(28, null);
				_mixer.peekDoor.gotoAndStop(29);
				_automaticFrame = 50; //UtilsView.getFrameByLabel(_mixer.peekDoor, "AUTOMATIC_PEEK_FRAME"); 
				_lastPeekFrame  = 70; //UtilsView.getFrameByLabel(_mixer.peekDoor, "LAST_PEEK_FRAME"); 
				
				//lang
				_mixer.peekDoor.door1.gotoAndStop(lang);
				_mixer.peekDoor.door2.gotoAndStop(lang);
				
				(_mixer.bigBalls as MovieClip).alpha = 1;
				_lastPeekNotificacionSended = false;
				
				onComplete(); // execute -> drawBigBall() from ExtraController
			}


			_mixer.gotoAndStop("BALLS");
			_mixer.extraSign.visible = false;
			_mixer.bigBalls.gotoAndStop(_currentBallNumber)
			
			_mixer.peekDoor.gotoAndStop(1);
			_mixer.peekDoor.visible = true;
			
			//lang
			var lang:String = _translatorController.getCurrentLanguage();
			_mixer.peekDoor.door1.gotoAndStop(lang);
			_mixer.peekDoor.door2.gotoAndStop(lang);

			TweenMax.to(_mixer.bigBalls, 1, {alpha:0}); 
			
			_mixer.peekDoor.gotoAndPlay(2);

			_mixer.cancel.visible = false;
			
			_mixer.peekDoor.addFrameScript(28, callBack);
			*/
		}
		
		this.peek = function(){
			/*
			(_mixer.bigBalls as MovieClip).alpha = 1;
			var currentFrame:int = (_mixer.peekDoor as MovieClip).currentFrame;
			
			if(currentFrame <  _automaticFrame){
				(_peekSoundCount == 3)? _peekSoundCount = 0 : _peekSoundCount++;
				_gameSoundController.playSound(SoundNames.SND_PEEK_ + _peekSoundCount.toString(), true);

				var nextFrame:int = currentFrame + 1;
				switch(nextFrame){
					case _automaticFrame:
						(_mixer.peekDoor as MovieClip).gotoAndStop(nextFrame);
						_applicationController.sendNotification(Notifications.AUTOMATIC_PEEK_NOTIFICATION);
					break;
					default:
						(_mixer.peekDoor as MovieClip).gotoAndStop(nextFrame);
					break;
				}
			}*/
		}

		this.automaticPeek = function(){
			/*
			if(!(_mixer.peekDoor as MovieClip).hasEventListener(Event.ENTER_FRAME))
				(_mixer.peekDoor as MovieClip).addEventListener(Event.ENTER_FRAME, update);
			
			(_mixer.bigBalls as MovieClip).alpha = 1;
			
			function update(e:Event):void{

				if(!_lastPeekNotificacionSended){
					(_mixer.bigBalls as MovieClip).alpha = 1;
					
					var nextFrame:int = (_mixer.peekDoor as MovieClip).currentFrame + 1;
					switch(nextFrame){
						case _lastPeekFrame:
							(_mixer.peekDoor as MovieClip).removeEventListener(Event.ENTER_FRAME, update);
							_lastPeekNotificacionSended = true;
							_applicationController.sendNotification(Notifications.PEEK_END_NOTIFICATION);
						break;
						default:
							(_mixer.peekDoor as MovieClip).gotoAndStop(nextFrame);
							if(nextFrame <  _automaticFrame){ //only in auto
								(_peekSoundCount == 3)? _peekSoundCount = 0 : _peekSoundCount++;
								_gameSoundController.playSound(SoundNames.SND_PEEK_ + _peekSoundCount.toString(), true);
							}
						break;
					}
				}
			}*/
		}
		
		this.showCancelBigBall = function(ball, onComplete, win){  //(ball:int, onComplete:Function, win:int):void{
			/*
			_currentBallNumber = ball;
			_mixer.gotoAndStop("BALLS");
			
			_mixer.extraSign.visible = false;
			_mixer.peekDoor.visible = false;
			
			_mixer.bigBalls.gotoAndStop(ball);
			(_mixer.bigBalls as MovieClip).alpha = 1;
			(_mixer.bigBalls as MovieClip).visible = true;
			
			_mixer.cancel.visible = true;
			if(win != 0){
				_mixer.cancel.win.text = win;
			}else{
				_mixer.cancel.win.text = "";
			}
				
			onComplete();*/
		}
	
		this.changeSpeed = function(frame){
			/*if(_canChangeSpeed)
				(_mixer.speedBar as MovieClip).gotoAndStop(frame);*/
		}
		
		this.speedHandler = function(e){
			/*if(_canChangeSpeed)
				_gameController.speedChangedFromGame();*/
		}
		
		this.enableChangeSpeed = function(value){
			/*if(value){
				_canChangeSpeed = true;
				(_mixer.speedBar as MovieClip).alpha = 1;
			}else{
				_canChangeSpeed = false;
				(_mixer.speedBar as MovieClip).alpha = .6;
			}*/
		}
		
		this.enableAuto = function(value){
			/*if(value){
				(_mixer.auto as MovieClip).alpha = 1;
			}else{
				(_mixer.auto as MovieClip).alpha = .6;
			}*/
		}
		
		this.autoHandle = function(e){
			/*if((_standardBarController.view as StandardBarView).isAutoEnable()){
				if(!_standardBarController.isAutoOn){
					_gameSoundController.playSound("sound_fx_buttonAuto");
					_standardBarController.activateAutoPanel();
				}else{
					autoState("MANUAL");
					_gameSoundController.playSound('standardClickSnd');
					_standardBarController.autoOff();
				}
			}*/
		}

		this.autoState = function(type){
			//(_mixer.auto as MovieClip).gotoAndStop(type);
		}
		
		this.setColorBallIndex = function(index){
			if(index > 30){
				//EXTRA  -> RED;
				ballIndex.style.fill = '#FF0000';
			}else{
				//NORMAL  -> GREEN
				ballIndex.style.fill = '#40FF00';
			}
			ballIndex.setText(index);
		}	
		
		this.reset = function(){ 
			/*goIdle();
			(_mixer.ballIndex as MovieClip).gotoAndStop("GREEN");
			_mixer.ballIndex.index.text = "0";*/
		}

		this.speedBar = function(){
			//return _mixer.speedBar;
		}
		
		this.changeLang = function(){
			/*if(_mixer.currentFrame == 3){
				showExtraCostSign();
			}*/
		}

		this.getView = function(){
			return _mixerContainer;
		}
	}

	window.MixerView = MixerView;

}(window));