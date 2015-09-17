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

		var _applicationController =  ApplicationController.getApplicationController();
		//var _gameSoundController   = _applicationController.getController(GameSoundController) as GameSoundController;
		var _gameController        = _applicationController.getController("GameController");
		//var _translatorController  = _applicationController.getController(TranslatorController) as TranslatorController;
		var _countersController    = _applicationController.getController("CountersController");
		//var _standardBarController = _applicationController.getController(StandardBarController) as StandardBarController;

		//var _currentLanguage       = _translatorController.currentLanguage;

		

		function createButtons(){
			 
			_buttonContainer = game.add.group();
			var xPlus = 460;

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
			_buttonContainer.add(_turboBtn.getView());


			/*
	 		var xPlus = 460;
			var cardsBtn = game.make.button(-384.45 + xPlus, 622, 'cardsBtn', disable, this, 1, 0, 0);
			_buttonContainer.add(cardsBtn);

			var numbersBtn = game.make.button(-204.6 + xPlus, 622, 'numbersBtn', disable, this, 1, 0, 0);
			_buttonContainer.add(numbersBtn);

			var betBtn = game.make.button(-114.35 + xPlus, 622, 'betBtn', disable, this, 1, 0, 0);
			_buttonContainer.add(betBtn);

			var autoBtn = game.make.button(31.3 + xPlus, 622, 'autoBtn', disable, this, 1, 0, 0);
			_buttonContainer.add(autoBtn);

			var playBtn = game.make.button(122 + xPlus, 622, 'playBtn', disable, this, 1, 0, 0);
			_buttonContainer.add(playBtn);

    		var turboBtn   = game.make.button(224.3 + xPlus, 622, 'turboBtn', disable, this, 1, 0, 0);
			_buttonContainer.add(turboBtn);


			function disable() {
    			turboBtn.frame = 3;
    			//turboBtn.inputEnabled  = false;
			}

			function over() {
			    console.log('button over');
			}

			function out() {
			    console.log('button out');
			}
			*/


		}

		this.onButtonClicked = function(_name){
			switch(_name){
				case "playBtn":// play  - cancel
					_gameController.gameState.playBtn();
				break;
				case "turboBtn": // turbo - extra - peek
					/*
					_gameController.gameState.turboBtn();
					if(_gameController.gameState.getType() == GameStates.PEEK || _gameController.gameState.getType() == GameStates.AUTO) _turboBtn.setEnabled();
					*/
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
					//configureButtonState(int(data));
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

		this.getView = function(){
			return _buttonContainer;
		}

		createButtons();
	}


    window.ButtonsContainer = ButtonsContainer;

}(window));