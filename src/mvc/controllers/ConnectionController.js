(function(window){

	var _this;

	function ConnectionController( view, model, dependencies){  //(view:IView, model:Model, dependencies:Vector.<Class>=null){
		
		_this     = this;
		this.type = "ConnectionController";

		Controller.prototype.model = model;   //que pasa con el Type que espera el controller, es mas cada controller espera eso, hay algo mal no?

		setupSubscriptions();

		this.initConnection = function(){
			model.initializeServer(onInitializationComplete);
		}

		this.notificationReceived = function(type, data){
			switch(type){
				case Notifications.CONNECTING_VIEW_READY_NOTIFICATION:
					_this.initConnection();
				break;
			}
		}
	}

	function onInitializationComplete(response){  //(response:InitResponse):void{
		ApplicationController.getApplicationController().sendNotification(Notifications.INITIAL_RESPONSE_NOTIFICATION, response);
	}

	function setupSubscriptions(){
		var notifications = []; 
		notifications.push(
			Notifications.CONNECTING_VIEW_READY_NOTIFICATION); 
		ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
	}



	//to global scope access:
	window.ConnectionController = ConnectionController;

	//Extends GameTypeController
	ConnectionController.prototype = Controller.prototype;

}(window));