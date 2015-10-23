(function(window){

	function CardLinePriezesView(){

		var _this = this;
		var _lineContainer;
		var _playedPrizes;
		var _prizesRemovedFromStage = false; //:Boolean = false;
		var _prizeLenght            = Game.gameConfig.prizes.length; //(ApplicationController.getApplicationController().gameType.gameConfig as BingoGameConfig).prizes.length;
		var _applicationController  = ApplicationController.getApplicationController();
		//var _gameSoundController    = _applicationController.getController(GameSoundController) as GameSoundController;
		
		
		this.showLine = function(_onComplete, _indexPrize){  //(_onComplete:Function, _indexPrize:int):void{
			removeCoverPrizes(_indexPrize);
			//_lineContainer["prize" +_indexPrize].visible = true;

			/*switch(_indexPrize){
				case '1':*/
					line = game.add.sprite(18, 41, 'line');
					line.frame = _indexPrize;
					_lineContainer.add(line);
			/*	break;
			}*/


			_playedPrizes[_indexPrize] = true;

			if(_onComplete != null){
				_onComplete();
			}

		}
		
		function removeCoverPrizes(_indexPrize){  //(_indexPrize:int):void{
			var overriddenIndexes = Game.gameConfig.prizes[_indexPrize].overriddenIndexes;
			for(var i = 0; i < overriddenIndexes.length; i++){
				if(_playedPrizes[overriddenIndexes[i]]){
					//_lineContainer["prize" + overriddenIndexes[i]].visible = false;
				}
			}
		}

		this.reset = function(){
			_playedPrizes = [];
			for(var i = 0; i < _prizeLenght; i++){
				//_lineContainer["prize" + i].visible = false;
				_playedPrizes.push(false); 
			}
		}

		this.createLines = function(container){
			_lineContainer = game.add.group();
			container.add(_lineContainer);
			_lineContainer.alpha = .7;


			//_this.showLine(null, '1');
		}


		this.reset();
	}



	window.CardLinePriezesView = CardLinePriezesView;

}(window));
