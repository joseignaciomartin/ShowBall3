(function(window){

	function ServerCommunicationsModel(){
		var _this = this;
		var _initCompleteDelegate;

		this.server;
		
		init();

		function init(){
			_this.server = ApplicationController.getApplicationController().getServer(null, null/*new DummyServerWorker()*/, Game.gameConfig.forceDummy);

			//nuevo
			setupSubscriptions();

			//anterior
			//window.addEventListener("CONNECTION_OK", onConnectionOk);
			window.addEventListener("SERVER_RESPONSE_EVENT", onServerResponse);
		}	

		//public functions

		this.initializeServer = function(initComplete){   //(initComplete:Function):void{
			_initCompleteDelegate = initComplete;
			//var hostName = ApplicationController.getApplicationController().parameters.hostName; //ws://localhost:2012/
			_this.server.connect(Game.gameConfig.parametersIfTesting.hostName);
		}

		this.getServer = function(){ 
			return _this.server.gameType; 
		}

		//private functions

		//anterior
		//function onServerResponse(event){
		function onServerResponse(data){  
			var response = data;
			//if(response && response.type){
			if(response && response.type){
				//switch(response.type){
				switch(response.type){
					case "LoginResponse":
						_this.server.gameType.initialization(); //BingoGameType
					break;
					case "InitResponse":
						if( _initCompleteDelegate != null){
							_initCompleteDelegate(response);
						}
					break;
					default:
						(ApplicationController.getApplicationController().getController("GameController")).serverResponse(response);
					break;
				}
			}
		}


		this.notificationReceived = function(type, data){
			switch(type){
				case EngineNotificationsEnum.CONNECTION_OK:
					onConnectionOk();
				break;
				case EngineNotificationsEnum.SERVER_RESPONSE_EVENT:
					onServerResponse(data);
				break;
			}
		}

		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				EngineNotificationsEnum.CONNECTION_OK,
				EngineNotificationsEnum.SERVER_RESPONSE_EVENT);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}


		function onConnectionOk(){
			_this.server.gameType.login(Game.gameConfig.gameName, ApplicationController.getApplicationController().parameters.session);
		}

		/*anterior
		function onConnectionOk(event){
			_this.server.gameType.login(Game.gameConfig.gameName, ApplicationController.getApplicationController().parameters.session);
		}*/




	}


	//to global scope access:
	window.ServerCommunicationsModel = ServerCommunicationsModel;

}(window));