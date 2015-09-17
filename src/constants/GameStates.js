(function(window){

	function GameStates(){}

	GameStates.WAIT        = 0;
	GameStates.WAIT_SERVER = 1;
	GameStates.PLAYING     = 2;
	GameStates.EXTRA       = 3;
	GameStates.PEEK        = 4;
	GameStates.AUTO        = 5;

	GameStates.getNameState = function(_numberState){
		switch(_numberState){
			case GameStates.WAIT:
				return "WAIT";
			break;
			case GameStates.WAIT_SERVER:
				return "WAIT_SERVER";
			break;
			case GameStates.PLAYING:
				return "PLAYING";
			break;
			case GameStates.EXTRA:
				return "EXTRA";
			break;
			case GameStates.PEEK:
				return "FILAR";
			break;
			case GameStates.AUTO:
				return "AUTO";
			break;
		}
		return "STATE NO VALID";
	}

	window.GameStates = GameStates;

}(window));