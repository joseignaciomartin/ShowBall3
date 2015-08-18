(function(window){

	var buttonContainer;
	var _this;

	function ButtonsContainer(container){
		createButtons(container);
	}

	function createButtons(container){
		_this = this;
		buttonContainer= game.add.group();

	    var Button   = game.add.sprite(249, 177, 'Button');
	    var Cards    = game.add.sprite(367, 177, 'Cards');
	    var Cartelas = game.add.sprite(271, 177, 'Cartelas');
	    var Tarjetas = game.add.sprite(177, 177, 'Tarjetas');
 	
 		buttonContainer.add(Button);
 		buttonContainer.add(Cards);
 		buttonContainer.add(Cartelas);
 		buttonContainer.add(Tarjetas);

 		buttonContainer.y = 600;
		container.add(buttonContainer);

		setupSubscriptions();

		ApplicationController.getApplicationController().sendNotification(Notifications.RESET_NOTIFICATION, {print:"yea"});
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

	CardsContainer.prototype.notificationReceived = function(type, data){
		
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
				console.log("RESET_NOTIFICATION botonera");
				//configureButtonState(int(data));
			break;
		}
	}

    window.ButtonsContainer = ButtonsContainer;

}(window));