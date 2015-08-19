(function(window){

	var buttonContainer;
	var _this;

	function ButtonsContainer(container){
		_this = this;
		setupSubscriptions();

		createButtons(container);
	}

	function createButtons(container){
		
		buttonContainer= game.add.group();

	    var btn      = game.add.sprite(249, 177, 'Button');
	    var Cards    = game.add.sprite(367, 177, 'Cards');
	    var Cartelas = game.add.sprite(271, 177, 'Cartelas');
	    var Tarjetas = game.add.sprite(177, 177, 'Tarjetas');
 	
 		buttonContainer.add(btn);
 		buttonContainer.add(Cards);
 		buttonContainer.add(Cartelas);
 		buttonContainer.add(Tarjetas);

 		buttonContainer.x = 100;
 		buttonContainer.y = 645;
		container.add(buttonContainer);
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

    window.ButtonsContainer = ButtonsContainer;

}(window));