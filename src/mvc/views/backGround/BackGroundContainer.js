(function(window){

	var _backGroundContainer;

	function BackGroundContainer(){
		createBackGround();
	}

	function createBackGround(){

		_backGroundContainer  = game.add.group();

		var bg;
		Game.gameConfig.gameName == "Show Ball 3"? bg = game.add.sprite(-151, 0, 'bg_SB3') : bg = game.add.sprite(-151, 0, 'bg_SBL');
		_backGroundContainer.add(bg);
	}

	BackGroundContainer.prototype.getView = function(){
		return _backGroundContainer;
	}

    window.BackGroundContainer = BackGroundContainer;

}(window));