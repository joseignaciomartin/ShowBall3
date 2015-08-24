(function(window){


	function ConnectionController( view, model, dependencies){  //(view:IView, model:Model, dependencies:Vector.<Class>=null){
		//super(view, model, dependencies);
		/*Controller.prototype.view         = view;
		Controller.prototype.dependencies = dependencies;*/

		Controller.prototype.model = model;   //que pasa con el Type que espera el controller, es mas cada controller espera eso, hay algo mal no?

		this.initConnection = function():void{
			_model.initializeServer(onInitializationComplete);
		}
	}

	function onInitializationComplete(response){  //(response:InitResponse):void{
		ApplicationController.getApplicationController().sendNotification(Notifications.INITIAL_RESPONSE_NOTIFICATION, response);
	}

	//to global scope access:
	window.ConnectionController = ConnectionController;

	//Extends GameTypeController
	ConnectionController.prototype = Controller.prototype;

}(window));