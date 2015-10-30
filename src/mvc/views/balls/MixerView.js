
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
 		
 		var MASK_INI = 0;
 		var MASK_FIN = 100;

		_mixerContainer = game.add.group();

		//mixer
        var mixer   = _mixerContainer.create(382, 42, 'mixer');
        mixer.frame =   1;
        _mixerContainer.add(mixer);
        
        //big balls
		var bigBall     = _mixerContainer.create(403, 49, 'bigBall');
		bigBall.visible = false;
		_mixerContainer.add(bigBall);

		//ball number
		var bigBallNum = game.add.text(396, 73, "70", {boundsAlignH: 'center', font: 'Roboto', fontSize: '55px', fill: '#000' });
		bigBallNum.setTextBounds(0, 0, 100, 100);
		bigBallNum.visible = false;
		_mixerContainer.add(bigBallNum);


		//cancel cross
		var bigCancelCross     = game.add.sprite(408, 55, 'cancelCross'); 
		bigCancelCross.alpha   = .6;
		bigCancelCross.visible = false;
		bigCancelCross.scale.setTo(1.2, 1.2);
		_mixerContainer.add(bigCancelCross);

		//cancel win value
		var cancelNum             = game.add.text(426, 118, "00", {boundsAlignH: 'center', font: 'Roboto', fontSize: '30px', fill: '#113EEE' });
		cancelNum.setTextBounds(0, 0, 50, 50);
		cancelNum.stroke          = '#FFF';
        cancelNum.strokeThickness = 2;
        cancelNum.visible         = false;
        _mixerContainer.add(cancelNum);

		//big ball tapa
		var bigBallCover     = _mixerContainer.create(399, 44, 'bigBallCover');  
		bigBallCover.frame   = 3;
		bigBallCover.visible = false;
		_mixerContainer.add(bigBallCover);

		//extra cost number
		var extraCostNum     = game.add.text(402, 85, "50", {boundsAlignH: 'center', font: 'Roboto', fontSize: '25px', fill: '#000' });
		extraCostNum.setTextBounds(0, 0, 100, 50);		
		extraCostNum.visible = false;
		_mixerContainer.add(extraCostNum);

		//mask coverball
		var coverMask     = game.add.graphics(0, 0);
	    coverMask.beginFill(0xFFFFF);
	    coverMask.drawRect(400, 50, 110, 110);
	   	bigBallCover.mask = coverMask;

	   	//ballGif
	   	//  And this starts the animation playing by using its key ("walk")
    	//  30 is the frame rate (30fps)
   		//  true means it will loop when it finishes
	   	var ballGif = game.add.sprite(399, 44, 'ballGif');
	   	var moving  = ballGif.animations.add('moving');
	   	ballGif.animations.play('moving', 30, true);
	   	_mixerContainer.add(ballGif);


		//ball index
		var ballIndex     = game.add.text(479, 105, "01", {boundsAlignH: 'center', font: 'digital', fontSize: '30px', fill: '#40FF00' });
		ballIndex.setTextBounds(0, 0, 100, 50);		
		ballIndex.visible = true;
		_mixerContainer.add(ballIndex);

		//auto text
		var auto     = _mixerContainer.create(510, 52, 'auto');
		_mixerContainer.add(auto);
		auto.visible = false;
		
		//manual text
		var manual = _mixerContainer.create(504, 52, 'manual');
		_mixerContainer.add(manual);

        //vel


        //TEST
        /*function prueba(){
        	ballIndex.setText("20");
        }
		setTimeout(prueba, 1000);*/

		///////////////////////////////////////////////////////////////////


		
		this.showBigBall = function(ball, frame, numColor, onComplete, response, filar){   //(ball:int, onComplete:Function, response:BaseResponse, filar:Boolean):void{

			//color big ball
			bigBall.frame = frame;            //getFrameBigBall(ball);
			//num big ball
			bigBallNum.style.fill = numColor; //getNumColor(ball);
			bigBallNum.setText(ball);

			bigBall.alpha    = 1;
			bigBallNum.alpha = 1;

			if(onComplete) onComplete(); 
			
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

			bigCancelCross.visible   = false;
			cancelNum.visible        = false;
		}
		
		this.goToBigBall = function(){
			/*
			_mixer.gotoAndStop("BALLS");
			_mixer.extraSign.visible = false;

			if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 0) _mixer.peekDoor.visible = false;
			
			_mixer.cancel.visible   = false;
			_mixer.bigBalls.gotoAndStop(_currentBallNumber);
			(_mixer.bigBalls as MovieClip).  = 1;*/
		}
		
		this.alphaHideBigBall = function(onComplete){
			
			//_mixer.gotoAndStop("BALLS");
			//TweenMax.to(_mixer.bigBalls, .4, {alpha:0, onComplete: complete});
			TweenMax.to(bigBallNum, .3, {alpha:0});	
			TweenMax.to(bigBall,    .4, {alpha:0, onComplete: complete});
			

			bigCancelCross.visible   = false;
			cancelNum.visible        = false;
			
			function complete(){
				if(onComplete != null) onComplete();
			}
		}
		
		this.showExtraCostSign = function(){
			
			//TODO LENGUAJES...

			_extraCost = _countersController.getCounterValue(OwnCounters.EXTRA_COST_COUNTER);

			bigCancelCross.visible  = false;
			cancelNum.visible       = false;

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
		}
		
		this.showPeekSign = function(onComplete){
			
			_this.hideExtraCostSign();
 
			function setupPeek(){
				
				bigBallCover.frame   = 0;    //muestra bola con signo amarillo "?".
				bigBallCover.visible = true; //porque hideExtraCostSign lo pasa a false..
				bigBall.alpha    = 1;
				bigBallNum.alpha = 1;
				coverMask.y      = MASK_INI;

				onComplete(); 
			}

			TweenMax.to(bigBallNum, .3, {alpha:0});	
			TweenMax.to(bigBall,    .4, {alpha:0, onComplete: setupPeek});



			/*
			function callBack(){
				_mixer.peekDoor.addFrameScript(28, null);
				_mixer.peekDoor.gotoAndStop(29);
				_automaticFrame = 50; 
				_lastPeekFrame  = 70; 
				
				//lang
				_mixer.peekDoor.door1.gotoAndStop(lang);
				_mixer.peekDoor.door2.gotoAndStop(lang);
				
				(_mixer.bigBalls as MovieClip).alpha = 1;
				_lastPeekNotificacionSended = false;
				
				onComplete(); 
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
			
			var newY = coverMask.y + 10;
			

			console.log("newY //////////////////////" + newY);
			
			if(newY < 50){
				TweenMax.to(coverMask, .5, {y:newY}); 
			}else{
				this.automaticPeek();
			}

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


			TweenMax.to(coverMask, 1.3, {y:MASK_FIN, onComplete:peekEnd});


			function peekEnd(){
				_applicationController.sendNotification(Notifications.PEEK_END_NOTIFICATION);
			}

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
		
		this.showCancelBigBall = function(ball, frame, numColor, onComplete, win){  //(ball:int, onComplete:Function, win:int):void{
			
			_currentBallNumber = ball;
			_this.hideExtraCostSign(null);
			_this.showBigBall(ball, frame, numColor);

			bigCancelCross.visible = true;
			if(win > 0){
				cancelNum.visible  = true;
				cancelNum.setText(win);
			}
			
			
			/*
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
			}*/
				
			onComplete();
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
			goIdle();
			ballIndex.style.fill('#40FF00');
			ballIndex.setText("0");
			/*(_mixer.ballIndex as MovieClip).gotoAndStop("GREEN");
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