(function(window){

	//public variables

	//private variables
	var _server;
	var _initCompleteDelegate;

	function ServerCommunicationsModel(){


		
		_server = ApplicationController.getApplicationController().getServer(null, null/*new DummyServerWorker()*/, Game.gameConfig.forceDummy);
		console.log("ServerCommunicationsModel server: " + _server);

		window.addEventListener("CONNECTION_OK", onConnectionOk);
		/* TODO:
		
		_server.addEventListener(ServerResponseEvent.SERVER_RESPONSE_EVENT, onServerResponse);*/
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
		/*switch(event.response.type){
			case BingoResponseTypes.LOGIN:
				(_server.gameType as BingoGameType).initialization();
			break;
			case BingoResponseTypes.INIT:
				if( _initCompleteDelegate != null){
					_initCompleteDelegate(event.response as InitResponse);
				}
			break;
			default:
				(ApplicationController.getApplicationController().getController(GameController) as GameController).serverResponse(event.response);
			break;
		}*/
	}

	function onConnectionOk(event){
		_server.gameType.login(Game.gameConfig.gameName, ApplicationController.prototype.parameters.session);
	}


	//to global scope access:
	window.ServerCommunicationsModel = ServerCommunicationsModel;

}(window));