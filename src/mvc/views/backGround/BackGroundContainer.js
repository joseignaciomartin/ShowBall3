(function(window){

	function BackGroundContainer(){
		var _this = this;
		var _backGroundContainer;
		var _tope;
		var _smallBallsContainer;
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

			//extra tope
			_tope = game.add.sprite(122, 150, 'tope'); 
			_backGroundContainer.add(_tope);
			_tope.visible = false;

			//extra background
			var Xs = [317.8, 270.1, 222.4, 174.7, 127 , 317.8, 270.1, 222.4, 174.7, 127];
			var Ys = [110.5, 110.5, 110.5, 110.5, 110.5, 58.25, 58.25, 58.25, 58.25, 58.25];
			_smallBallsContainer   = game.add.group();
			_smallBallsContainer.x = -4; 
			_smallBallsContainer.y = -5;
			for(var i = 0; i < 10; i++){
				var ball   = game.add.sprite(Xs[i], Ys[i], 'ball');
				ball.frame = 3;
				ball.alpha = .4;
				_smallBallsContainer.add(ball);
			}
			_smallBallsContainer.visible = false;
			_backGroundContainer.add(_smallBallsContainer);

			display = game.add.sprite(638, 196, 'display');
			_backGroundContainer.add(display);
		}

		this.getView = function(){
			return _backGroundContainer;
		}

		function setupSubscriptions(){
			var notifications = [];
			notifications.push(
				Notifications.RESET_NOTIFICATION,
				Notifications.NORMAL_DRAW_END_NOTIFICATION
			);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);
		}

		this.notificationReceived = function(type, data){
			switch(type){
				case Notifications.RESET_NOTIFICATION:
					reset();	
				break;
				case Notifications.NORMAL_DRAW_END_NOTIFICATION:
					normalBallEnd(data);
				break;
			}
		}

		function reset(){
			if(_tope.visible){
				TweenMax.to(_tope, 1, {alpha:0});
				TweenMax.to(_smallBallsContainer, 1, {alpha:0});
			}
		}

		function normalBallEnd(data){
			if(data.hasExtra){
				_tope.visible = true;
				TweenMax.to(_tope, 1, {alpha:1});
				_smallBallsContainer.visible = true;
				TweenMax.to(_smallBallsContainer, 1, {alpha:1});
			}
		}

		setupSubscriptions();
	}

    window.BackGroundContainer = BackGroundContainer;

}(window));