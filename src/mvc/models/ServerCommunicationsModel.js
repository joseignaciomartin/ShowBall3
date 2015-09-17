(function(window){

	function ServerCommunicationsModel(){
		var _this = this;
		var _initCompleteDelegate;

		this.server;
		
		init();

		function init(){
			_this.server = ApplicationController.getApplicationController().getServer(null, null/*new DummyServerWorker()*/, Game.gameConfig.forceDummy);
			window.addEventListener("CONNECTION_OK", onConnectionOk);
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

		function onServerResponse(event){  //(event:ServerResponseEvent):void{
			var response = event.detail;
			if(response && response.type){
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
						//TODO
						(ApplicationController.getApplicationController().getController("GameController")).serverResponse(response);
					break;
				}
			}
		}

		function onConnectionOk(event){
			_this.server.gameType.login(Game.gameConfig.gameName, ApplicationController.getApplicationController().parameters.session);
		}
	}


	//to global scope access:
	window.ServerCommunicationsModel = ServerCommunicationsModel;

}(window));