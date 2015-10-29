(function(window){

	function ButtonsContainer(){
		var _this = this;
		var _buttonContainer;
		var _buttonsVec = [];

		setupSubscriptions();
		
		var _cardsBtn;//:   ButtonView;
		var _numbersBtn;//: ButtonView;
		var _betBtn;//:   	 ButtonView;
		var _autoBtn;//:  	 ButtonView;
		var _playBtn;//:    ButtonView;
		var _turboBtn;//:   ButtonView;

		var _playBtn_iniX  = 142;
		var _turboBtn_iniX = 725;
		var _playBtn_outX  = _playBtn_iniX  - 300;
		var _turboBtn_outX = _turboBtn_iniX + 300;

		var _applicationController =  ApplicationController.getApplicationController();
		//var _gameSoundController   = _applicationController.getController(GameSoundController) as GameSoundController;
		var _gameController        = _applicationController.getController("GameController");
		//var _translatorController  = _applicationController.getController(TranslatorController) as TranslatorController;
		var _countersController    = _applicationController.getController("CountersController");
		//var _standardBarController = _applicationController.getController(StandardBarController) as StandardBarController;
		//var _currentLanguage       = _translatorController.currentLanguage;
		

		function createButtons(){
			 
			_buttonContainer = game.add.group();

			/*
			_cardsBtn   	  = new ButtonView(-384.45 + xPlus, 622,"cardsBtn",   _this.onButtonClicked);   _buttonsVec.push(_cardsBtn);
			_numbersBtn   	  = new ButtonView(-204.6 + xPlus,  622,"numbersBtn", _this.onButtonClicked);   _buttonsVec.push(_numbersBtn);
			_betBtn   	      = new ButtonView(-114.35 + xPlus, 622,"betBtn",     _this.onButtonClicked);   _buttonsVec.push(_betBtn);
			_autoBtn          = new ButtonView(31.3 + xPlus,    622,"autoBtn",    _this.onButtonClicked);   _buttonsVec.push(_autoBtn);                  
			_playBtn          = new ButtonView(122 + xPlus,     622,"playBtn",    _this.onButtonClicked);   _buttonsVec.push(_playBtn);                     
			_turboBtn         = new ButtonView(224.3 + xPlus,   622,"turboBtn",   _this.onButtonClicked);   _buttonsVec.push(_turboBtn);
			
			_buttonContainer.add(_cardsBtn.getView());
			_buttonContainer.add(_numbersBtn.getView());
			_buttonContainer.add(_betBtn.getView());
			_buttonContainer.add(_autoBtn.getView());
			_buttonContainer.add(_playBtn.getView());
			_buttonContainer.add(_turboBtn.getView());*/

			_playBtn  = new ButtonView(_playBtn_iniX,  91,"playBtn",  _this.onButtonClicked); _buttonsVec.push(_playBtn);   
			_turboBtn = new ButtonView(_turboBtn_iniX, 91,"turboBtn", _this.onButtonClicked); _buttonsVec.push(_turboBtn);

			_buttonContainer.add(_playBtn.getView());
			_buttonContainer.add(_turboBtn.getView());
		}

		this.onButtonClicked = function(_name){
			switch(_name){
				case "playBtn":// play  - cancel
					_gameController.gameState.playBtn();
				break;
				case "turboBtn": // turbo - extra - peek
					_gameController.gameState.turboBtn();
					if(_gameController.gameState.getType() == GameStates.PEEK || _gameController.gameState.getType() == GameStates.AUTO) _turboBtn.setEnabled();
					
				break;
				case "cardsBtn":
					/*
					_gameController.gameState.enableNextCard();
					*/
				break;
				case "numbersBtn":
					console.log(_gameController);
					console.log(_gameController.gameState);
					_gameController.gameState.changeNumbers();
				break;
				case "betBtn":
					/*
					_gameController.gameState.betUp();
					*/
				break;
				case "autoBtn":
					/*
					if(!_standardBarController.isAutoOn){
						_gameSoundController.playSound("sound_fx_buttonAuto");
						_standardBarController.activateAutoPanel();
					}else{
						_gameSoundController.playSound('standardClickSnd');
						_standardBarController.autoOff();
					}
					_autoBtn.setEnabled();
					*/
				break;
			}
		}

		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				Notifications.STATE_CHANGED_NOTIFICATION, 
				Notifications.AUTOMATIC_PEEK_NOTIFICATION,
				Notifications.RESET_NOTIFICATION,
				//TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION,
				Notifications.AUTOPLAY_INTERNAL_STATE_CHANGED);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}

		this.notificationReceived = function(type, data){
			
			switch(type){
				case Notifications.STATE_CHANGED_NOTIFICATION:
					configureButtonState(data);
				break;
				case Notifications.AUTOPLAY_INTERNAL_STATE_CHANGED:
					//autoButtons(data.gameState as int, data.stopOnExtra);
				break;
				case Notifications.AUTOMATIC_PEEK_NOTIFICATION:
					//handlerPeekEvents(false);
				break;
				/*case TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION:
					changeLanguage();
				break;*/
				case Notifications.RESET_NOTIFICATION:
					//configureButtonState(int(data));
				break;
			}
		}

		function configureButtonState(state){ //(state:int):void{
			switch(state){
				case GameStates.WAIT:
					//_cardsBtn.setEnabled();
					//_numbersBtn.setEnabled();
					//_betBtn.setEnabled();
					//_autoBtn.setEnabled();
					_playBtn.setEnabled();   
					_turboBtn.setEnabled(); 
					moveButtons("in"); 
				break;
				case GameStates.WAIT_SERVER:					
					//_cardsBtn.setDisabled();
					//_numbersBtn.setDisabled();
					//_betBtn.setDisabled();
					_playBtn.setDisabled();  
					_turboBtn.setDisabled();  
					moveButtons("out"); 
				break;                       
				case GameStates.PLAYING:
				break;                                                                                                         
				case GameStates.EXTRA:
					_playBtn.setEnabled();	 
					_turboBtn.setEnabled();  
					moveButtons("in"); 
				break;                       
				case GameStates.PEEK:
					_turboBtn.setEnabled();  
					_playBtn.setDisabled();
					//_autoBtn.setDisabled();
					//handlerPeekEvents(true);
					moveButtons("in"); 
				break;      
				case GameStates.AUTO:
					//_autoBtn.setEnabled();
					//_cardsBtn.setDisabled();
					//_numbersBtn.setDisabled();
					//_betBtn.setDisabled();
					_playBtn.setDisabled();  
					_turboBtn.setDisabled(); 
					moveButtons("out"); 
				break;
			}
		}


		function moveButtons(type){
			if(type == "in" && _playBtn.getView().x != _playBtn_iniX){
				TweenMax.to(_playBtn.getView(),  .2, {x: _playBtn_iniX});
				TweenMax.to(_turboBtn.getView(), .2, {x:_turboBtn_iniX});
			}
			else if(type == "out" && _playBtn.getView().x != _playBtn_outX){
				TweenMax.to(_playBtn.getView(),  .2, {x:_playBtn_outX});
				TweenMax.to(_turboBtn.getView(), .2, {x:_turboBtn_outX});
			}
		}




		this.getView = function(){
			return _buttonContainer;
		}

		createButtons();
	}


    window.ButtonsContainer = ButtonsContainer;

}(window));