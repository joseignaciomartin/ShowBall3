(function(window){

	var _buttonContainer;
	var _this;

	function ButtonsContainer(){
		_this = this;
		setupSubscriptions();

		createButtons();
	}

	function createButtons(){
		
		_buttonContainer   = game.add.group();

	    var btn      = game.add.sprite(349, 622, 'Button');
	    var Cards    = game.add.sprite(467, 622, 'Cards');
	    var Cartelas = game.add.sprite(371, 622, 'Cartelas');
	    var Tarjetas = game.add.sprite(277, 622, 'Tarjetas');
 	
 		_buttonContainer.add(btn);
 		_buttonContainer.add(Cards);
 		_buttonContainer.add(Cartelas);
 		_buttonContainer.add(Tarjetas);
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

	ButtonsContainer.prototype.notificationReceived = function(type, data){
		
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

	ButtonsContainer.prototype.getView = function(){
		return _buttonContainer;
	}

    window.ButtonsContainer = ButtonsContainer;

}(window));