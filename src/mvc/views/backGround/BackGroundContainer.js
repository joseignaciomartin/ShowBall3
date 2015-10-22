(function(window){

	function BackGroundContainer(){
		
		var _backGroundContainer;
		createBackGround();

		function createBackGround(){

			_backGroundContainer  = game.add.group();
			var bg;
			Game.gameConfig.gameName == "Show Ball 3"? bg = game.add.sprite(0, 0, 'bg_SB3') : bg = game.add.sprite(0, 0, 'bg_SBL');
			_backGroundContainer.add(bg);

			barra = game.add.sprite(0, 0, 'barra');
			_backGroundContainer.add(barra);



			//referencia
			/*bg_referencia = game.add.sprite(0, 0, 'ref');
			_backGroundContainer.add(bg_referencia);*/

			display = game.add.sprite(638, 196, 'display');
			_backGroundContainer.add(display);
		}

		this.getView = function(){
			return _backGroundContainer;
		}
	}

    window.BackGroundContainer = BackGroundContainer;

}(window));