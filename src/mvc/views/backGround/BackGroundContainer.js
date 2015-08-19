(function(window){

	var backGroundContainer;

	function BackGroundContainer(container){
		createBackGround(container);
	}

	function createBackGround(container){

		backGroundContainer = game.add.group();
		backGroundContainer.x = -400;
		backGroundContainer.y =  23;


		console.log(Game.gameConfig.gameName);

		var bg;
		Game.gameConfig.gameName == "Show Ball 3"? bg = game.add.sprite(249, 177, 'bg_SB3') : bg = game.add.sprite(249, 177, 'bg_SBL');

		backGroundContainer.add(bg);
		container.add(backGroundContainer);
	}


    window.BackGroundContainer = BackGroundContainer;

}(window));