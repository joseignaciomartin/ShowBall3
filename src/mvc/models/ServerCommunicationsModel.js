(function(window){

	//public variables

	//private variables
	var _server;
	var _initCompleteDelegate;

	function ServerCommunicationsModel(){

		_server = ApplicationController.getApplicationController().getServer(null, null/*new DummyServerWorker()*/, Game.gameConfig.forceDummy);
		console.log("ServerCommunicationsModel server: " + _server);

		window.addEventListener("CONNECTION_OK", onConnectionOk);
		window.addEventListener("SERVER_RESPONSE_EVENT", onServerResponse);
	}

	//public functions

	ServerCommunicationsModel.prototype.initializeServer = function(initComplete){   //(initComplete:Function):void{
		_initCompleteDelegate = initComplete;
		//var hostName = ApplicationController.getApplicationController().parameters.hostName; //ws://localhost:2012/
		_server.connect(Game.gameConfig.parametersIfTesting.hostName);
	}

	ServerCommunicationsModel.prototype.getServer = function(){ 
		return _server.gameType; 
	}

	//private functions

	function onServerResponse(event){  //(event:ServerResponseEvent):void{
		var response = event.detail;
		if(response && response.type){
			switch(response.type){
				case "LoginResponse":
					_server.gameType.initialization(); //BingoGameType
				break;
				case "InitResponse":
					if( _initCompleteDelegate != null){
						_initCompleteDelegate(response);
					}
				break;
				default:
					//TODO
					(ApplicationController.getApplicationController().getController("GameController")).serverResponse(response);
				break;
			}
		}
	}

	function onConnectionOk(event){
		_server.gameType.login(Game.gameConfig.gameName, ApplicationController.prototype.parameters.session);
	}


	//to global scope access:
	window.ServerCommunicationsModel = ServerCommunicationsModel;

}(window));