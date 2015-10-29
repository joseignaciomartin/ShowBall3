(function(window){

	DataPanelView.STATE_WINNER       = "WINNER";
	DataPanelView.STATE_EXTRA        = "EXTRA";
	DataPanelView.STATE_NOCREDIT     = "NOCREDIT";
	DataPanelView.STATE_PRESSPLAY    = "PRESSPLAY";
	DataPanelView.STATE_DRAWINGBALLS = "DRAWINGBALLS";

	function DataPanelView(){

		var _this = this;
		var _dataPanelContainer;

		var creditsText;
		var betText;
		var winText;

		var creditsValue;
		var betValue; 
		var winValue;

		var pressPlay
		var pressPlayText = "PRESIONE JUGAR";

		var _applicationController = ApplicationController.getApplicationController();
		var _gameController        = _applicationController.getController("GameController");
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		//var _translatorController  = _applicationController.getController("TranslatorController");
		var _countersController    = _applicationController.getController("CountersController");
		//var _keyboardController    = _applicationController.getController("KeyboardController");
		
		/*
		_translatorController.addTranslatable((_asset.textPanel as MovieClip),    "TEXTPANEL");
		_translatorController.addTranslatable((_asset.messagePanel as MovieClip), "MESSAGEPANEL");
		_translatorController.addTranslatable((_asset.freeBall as MovieClip),     "FREEBALL");*/
		
		/*_asset.freeBall.visible = false;
		_asset.totalAlmost.text = "";*/
		
		setupSubscriptions();
		createDataPanel();

		changeMessagePanel(DataPanelView.STATE_PRESSPLAY);


		function createDataPanel(){
			
			_dataPanelContainer   = game.add.group();

			creditsText = game.add.text(340,   8, "CREDITS", {boundsAlignH: 'center', fontSize: '14px', fill: '#FFF' }); creditsText.setTextBounds(0, 0, 200, 30);  _dataPanelContainer.add(creditsText);
			betText     = game.add.text(576, 209, "BET",     {boundsAlignH: 'center', fontSize: '16px', fill: '#FFF' }); betText.setTextBounds(0, 0, 200, 30);      _dataPanelContainer.add(betText);
			winText     = game.add.text(695, 209, "WIN",     {boundsAlignH: 'center', fontSize: '16px', fill: '#FFF' }); winText.setTextBounds(0, 0, 200, 30);      _dataPanelContainer.add(winText);

			creditsValue = game.add.text(356, 6,   "000", {boundsAlignH: 'right',  fontSize: '16px', fill: '#FFFF00' }); creditsValue.setTextBounds(0, 0, 200, 30); _dataPanelContainer.add(creditsValue);
			betValue     = game.add.text(578, 228, "000", {boundsAlignH: 'center', fontSize: '24px', fill: '#FFFF00' }); betValue.setTextBounds(0, 0, 200, 30);     _dataPanelContainer.add(betValue);
			winValue     = game.add.text(697, 228, "000", {boundsAlignH: 'center', fontSize: '24px', fill: '#FFFF00' }); winValue.setTextBounds(0, 0, 200, 30);     _dataPanelContainer.add(winValue);
			
			//cambiar nombre a: message
			pressPlay = game.add.text(638, 272, pressPlayText, {font: 'futura', fontSize: '20px', fill: '#FFFF00', boundsAlignH: "center" }); pressPlay.setTextBounds(0, 0, 200, 30); _dataPanelContainer.add(pressPlay);
		}

		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				//TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION,
				Notifications.RESET_NOTIFICATION,
				Notifications.START_PAID,
				Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION,
				Notifications.EXTRA_SIGN_NOTIFICATION,
				Notifications.EXTRA_SENT_TO_SERVER_NOTIFICATION,
				Notifications.WIN_BLINK_NOTIFICATION,
				EngineNotificationsEnum.NO_MORE_CREDITS_NOTIFICATION,
				EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION,
				Notifications.SET_PAY_NOTIFICATION);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}

		this.notificationReceived = function(type, data){
			
			switch(type){
				case EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION:
					countersChange(data);
				break;
				case Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION:
					//changeMessagePanel(STATE_DRAWINGBALLS);
				break;
				case Notifications.RESET_NOTIFICATION:
					//changeMessagePanel(STATE_PRESSPLAY);
				break;
				case Notifications.EXTRA_SIGN_NOTIFICATION:
					//changeMessagePanel(STATE_EXTRA);
				break;
				case Notifications.EXTRA_SENT_TO_SERVER_NOTIFICATION:
					//changeMessagePanel(STATE_DRAWINGBALLS);
				break;
				case Notifications.START_PAID:
					_this.startPaid(data);
				break
				case EngineNotificationsEnum.NO_MORE_CREDITS_NOTIFICATION:
					//changeMessagePanel(STATE_NOCREDIT);
				break;
				/*case TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION:
					(_asset.messagePanel.lang as MovieClip).gotoAndStop(_currentMessageLabel);
				break;*/
				case Notifications.WIN_BLINK_NOTIFICATION:
					//winBlink(data);
				break;
				case Notifications.SET_PAY_NOTIFICATION:
					//setPayText(data as int);
				break;
			}
		}

		this.getView = function(){
			return _dataPanelContainer;
		}

		//private functions

		function countersChange(data){  //(data:Object):void{
			switch(data){
				case CountersController.CREDITS_COUNTER:
					setCredit(_countersController.getCounterValue(CountersController.CREDITS_COUNTER));
				break;
				case CountersController.TOTAL_BET_COUNTER:
					//_asset.totalBet.text = _countersController.getCounterValue(CountersController.TOTAL_BET_COUNTER).toString();
					betValue.text = _countersController.getCounterValue(CountersController.TOTAL_BET_COUNTER);
				break;
				case CountersController.BET_COUNTER:
					//_asset.totalBet.text = _countersController.getCounterValue(CountersController.TOTAL_BET_COUNTER).toString();
				break;
				case CountersController.WIN_COUNTER:
					//_asset.win.text = _countersController.getCounterValue(CountersController.WIN_COUNTER).toString();
					winValue.text = _countersController.getCounterValue(CountersController.WIN_COUNTER);
				break;
				/*case OwnCounters.TOTAL_ALMOST_COUNTER:
					if(_countersController.getCounterValue(OwnCounters.HAS_EXTRA) == 1){
						var totalAlmost:int =  _countersController.getCounterValue(OwnCounters.TOTAL_ALMOST_COUNTER);
						(totalAlmost != 0) ? _asset.totalAlmost.text = totalAlmost.toString() : _asset.totalAlmost.text = "";
					}
				break;*/
			}
		}

		function setCredit(credit){ //(credit:int):void{
			
			if(credit < 0){
				
				//red number
				/*(_asset.mc_credits as MovieClip).gotoAndStop("RED");
				_asset.mc_credits.credits.text = credit.toString();
				TextUtils.scaleTextToFitAligned(_asset.mc_credits.credits, true);*/
				creditsValue.setText(credit);
				alert("hacer numero rojo, en panelView");
					
			}else{
				
				//yellow number
				//(_asset.mc_credits as MovieClip).gotoAndStop("YELLOW");
				creditsValue.setText(credit);
				//TweenMax.to(creditsValue,2,{x:500});
				//_asset.mc_credits.credits.text = credit.toString();
				//TextUtils.scaleTextToFitAligned(_asset.mc_credits.credits, true); //hacer
				
			}
		}

		function changeMessagePanel(newState){  //(newState:String):void{
			
			switch(newState){
				case DataPanelView.STATE_PRESSPLAY:	
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
					
					_asset.extraCost.visible = false;
					_asset.pay.visible       = false;
					*/
					currentMessageLabel = DataPanelView.STATE_PRESSPLAY;
					
					
					function changeToBlack(){
		 				pressPlay.style.fill = '#000';
		 				pressPlay.setText(pressPlayText);
						TweenMax.to(pressPlay, .2, {delay:.2, onComplete:changeToYellow});
					}

					function changeToYellow(){
		 				pressPlay.style.fill = '#FFFF00';
		 				pressPlay.setText(pressPlayText);
		 				TweenMax.to(pressPlay, .2, {delay:.2, onComplete:changeToBlack});
					}
					
					TweenMax.to(pressPlay, .2, {delay:.2, onComplete:changeToBlack});

				break; 
				case DataPanelView.STATE_DRAWINGBALLS:
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
					
					if((_applicationController.getController(GameController) as GameController).gameState.getType() == GameStates.PLAYING){
						drawing()
					}else{
						setTimeout(drawing,300);
					}
					function drawing():void{
						currentMessageLabel      = STATE_DRAWINGBALLS;
						_asset.extraCost.visible = false;
						_asset.pay.visible       = false;
					}
					*/
				break; 
				case DataPanelView.STATE_EXTRA:
					/*
					currentMessageLabel      = STATE_EXTRA;
					_asset.extraCost.text    = _countersController.getCounterValue(OwnCounters.EXTRA_COST_COUNTER).toString();
					_asset.extraCost.visible = true;
					TextUtils.scaleTextToFitAligned(_asset.extraCost, true);
					_asset.pay.visible       = false;
					
					(_asset.extraCost.text == "0")? showFreeBallSign(true) : showFreeBallSign(false);
					*/
				break; 
				case DataPanelView.STATE_WINNER:	
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
					
					currentMessageLabel      = STATE_WINNER;
					_asset.extraCost.visible = false;
					_asset.pay.visible       = true;
					*/
				break; 
				case DataPanelView.STATE_NOCREDIT:
					/*
					if(_asset.freeBall.visible == true) showFreeBallSign(false);
						
					currentMessageLabel      = STATE_NOCREDIT;
					_asset.extraCost.visible = false;
					_asset.pay.visible       = false;
					
					(_asset.messagePanel.lang as MovieClip).mc_noCredit.gotoAndPlay(1);
					
					_gameSoundController.playSound(SoundNames.SND_WHEEL_WIN, true);
					
					var framesCount:int = 0;
					(_asset.messagePanel.lang as MovieClip).removeEventListener(Event.ENTER_FRAME, update);
					(_asset.messagePanel.lang as MovieClip).addEventListener(Event.ENTER_FRAME, update);
					
					function update():void{ 
						
						framesCount++;
						
						if(framesCount > (24 * 3)){
							
							if((_asset.messagePanel.lang as MovieClip).mc_noCredit)(_asset.messagePanel.lang as MovieClip).mc_noCredit.gotoAndStop(1);
							(_asset.messagePanel.lang as MovieClip).removeEventListener(Event.ENTER_FRAME, update);
							
						}
					}
					*/
				break; 
			} 
			
		}

		/*private function set currentMessageLabel(newValue:String):void{
			
			_currentMessageLabel = newValue;
			(_asset.messagePanel.lang as MovieClip).gotoAndStop(_currentMessageLabel);
			
		}*/
		


		function showFreeBallSign(value){
			/*value? _asset.freeBall.visible = true : _asset.freeBall.visible = false;
			if(value) _gameSoundController.playSound(SoundNames.SND_EXTRA_SETUP, true);*/
		}
		
		function winBlink(value){
			/*
			if(value){
				_isBlinking = true;
				tweenTo0();
				function tweenTo0():void{
					if(_isBlinking)
						TweenMax.to((_asset.win as TextField), .2, {alpha:0, onComplete:tweenTo1});
				}
				function tweenTo1():void{
					TweenMax.to((_asset.win as TextField), .2, {alpha:1, onComplete:tweenTo0});
				}
			}else{

				_isBlinking = false
				setTimeout(on,300);
				function on():void{
					(_asset.win as TextField).alpha = 1;
				}
			}*/
		}

		this.startPaid = function(data){  //(data:Object):void{
			
			if(data.win > 0){
				
				//_applicationController.gameType.gcActive = false;
				//_gameSoundController.playSound(SoundNames.SND_CASH, true);
				
				changeMessagePanel(DataPanelView.STATE_WINNER);
				//_asset.pay.text= "0";
				var idTimeOut = setTimeout(waitSoundCashFinish, 800);
				
				function waitSoundCashFinish(){
					clearTimeout(idTimeOut);
					doValuesTransitions(data.onComplete, data.winInCash, data.finalCreditInCash, data.finalCredit);
				}
				
			}else{
				
				//_asset.totalAlmost.text = "";
				changeMessagePanel(DataPanelView.STATE_PRESSPLAY); 
				data.onComplete();
				_applicationController.sendNotification(Notifications.END_PAID); //to LOG VISUAL patch
			}
			
		}
		
		function doValuesTransitions(onComplete, winInCash, finalCreditInCash, finalCredit){  //(onComplete:Function, winInCash:Number, finalCreditInCash:Number, finalCredit:int):void{
			
			//var _this:Sprite = this;
			var coin     = _countersController.getCounterValue(CountersController.COIN_COUNTER);
			var credits  = parseInt(creditsValue.text); //int(_asset.mc_credits.credits.text); 
			//var win      = parseInt(_asset.win.text);
			//var pay      = parseInt(_asset.pay.text);
			var dec      = 0;
			
			//_this.stage.addEventListener(MouseEvent.CLICK, forceTransition);
			
			/*_keyboardController.registerKeyCommand(Keyboard.ENTER,    forceTransition, [null]);
			_keyboardController.registerKeyCommand(Keyboard.SPACE,    forceTransition, [null]);
			_keyboardController.registerKeyCommand(Keyboard.NUMBER_0, forceTransition, [null]);
			_keyboardController.registerKeyCommand(Keyboard.NUMPAD_0, forceTransition, [null]);*/
			
			
			//addEventListener(Event.ENTER_FRAME, upDate);
			var stopEnterFrame = false;
			var id = setTimeout(enterFrame,1000/30);
			function enterFrame(){
				clearTimeout(id);
				if(!stopEnterFrame){
					upDate();
					id = setTimeout(enterFrame,1000/30);
				}
			}
			
			function upDate(){
				if(win == 0){
					
					removeListeners();
					updateCounters(true);
					return;
				}
				
				dec = parseInt(win/20);
				if(dec == 0) dec = 1;
				
				credits += dec;
				win     -= dec;
				pay     += dec;
				
				updateTexts();
				updateCounters();
				
				(_paySoundCount == 3)? _paySoundCount = 0 : _paySoundCount++;
				_gameSoundController.playSound(SoundNames.SND_PAY_COUNT_ + _paySoundCount.toString(), true);
			}
			
			function forceTransition(e){
				removeListeners();
				
				credits += win;
				pay     += win;
				win     = 0;
				
				updateTexts();
				updateCounters(true);
			}
			
			function updateTexts(){
				/*credits < 0 ? (_asset.mc_credits as MovieClip).gotoAndStop("RED") : (_asset.mc_credits as MovieClip).gotoAndStop("YELLOW");
				_asset.mc_credits.credits.text = credits.toString();
				TextUtils.scaleTextToFitAligned(_asset.mc_credits.credits, true);
				_asset.win.text                = win.toString();
				_asset.pay.text                = pay.toString();*/

				setCredit(credit);
			}
			
			function updateCounters(fin){
				if(fin){
					//_asset.totalAlmost.text = "";
					_applicationController.gameType.gcActive = true;
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, finalCreditInCash);
					_countersController.setCounterValue(CountersController.PAID_IN_CASH_STANDARDBAR_COUNTER, winInCash);
					_countersController.setCounterValue(CountersController.CREDITS_COUNTER, finalCredit);
					
					onComplete();
					
					_applicationController.sendNotification(Notifications.END_PAID); //to LOG VISUAL patch
				}else{
					_countersController.setCounterValue(CountersController.CREDITS_IN_CASH_COUNTER, credits * (coin/100));
					_countersController.setCounterValue(CountersController.PAID_IN_CASH_STANDARDBAR_COUNTER, pay * (coin /100));
				}
			}
			
			function removeListeners(){
				stopEnterFrame = true;
				/*removeEventListener(Event.ENTER_FRAME, upDate);
				_this.stage.removeEventListener(MouseEvent.CLICK, forceTransition);
				_keyboardController.deregisterKeyCommand(Keyboard.ENTER);
				_keyboardController.deregisterKeyCommand(Keyboard.SPACE);
				_keyboardController.deregisterKeyCommand(Keyboard.NUMBER_0);
				_keyboardController.deregisterKeyCommand(Keyboard.NUMPAD_0);*/
			}
		}

		function setPayText(pay){
			//_asset.pay.text = pay.toString();
		}

	}


    window.DataPanelView = DataPanelView;

}(window));