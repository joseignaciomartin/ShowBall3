(function(window){

	function CardsModel(cards){  //(view:IView, model:Model, dependencies:Vector.<Class>=null){

		var _this  = this;
		var _cards = cards;

		var _applicationController;
		var _marksOnCard  = [];
		var _playedPrizes = [];
		var _amountOfPrizes;

		init();
		
		function init(){
			_marksOnCard.push(0,0,0,0);
			_applicationController = ApplicationController.getApplicationController();

			_amountOfPrizes  = (Game.gameConfig).prizes.length;
			for(var i = 0; i < 4; i++){
				var _playedPrizesCard = [];
				_playedPrizes.push(_playedPrizesCard);
				for(var j = 0; j < _amountOfPrizes; j++){ 
					_playedPrizesCard.push(false);
				}
			}
		}

		this.upDateCards = function(newCardsData){   //(newCardsData:Vector.<BingoCardsData>):void{ 
			_cards = newCardsData; 
		}
		
		
		this.enableNextCard = function(){
			
			var openCards = 0;
			for(var j = 0; j < _cards.length; j++){
				openCards += parseInt(_cards[j].enabled);
			}
			openCards++;
			if(openCards > _cards.length) { 
				openCards = 1; 
			}
			
			_applicationController.sendNotification(OwnCounters.CARDS_ENABLED_COUNTER, openCards);
				
			for(var i = 0; i < _cards.length; i++){
				_cards[i].enabled = (i < openCards);
			}
			
		}

		/*
		this.enableNextCard = function(){
			var openCards = 0;
			for(var j = 0; j < _cards.length; j++){
				openCards += parseInt(_cards[j].enabled);
			}
			openCards++;
			if(openCards > _cards.length) { 
				openCards = 1; 
			}
				
			for(var i = 0; i < _cards.length; i++){
				_cards[i].enabled = (i < openCards);
			}
			(_applicationController.getController("CountersController")).setCounterValue(OwnCounters.CARDS_ENABLED_COUNTER, openCards);
			_applicationController.sendNotification(Notifications.CARDS_CONFIG_CHANGED_NOTIFICATION, getOpenCards());
		}*/
		
		this.enableCard = function(cardIndex, enabled){ //(cardIndex:int, enabled:Boolean):void{
			var openCards = 0;
			if(!enabled){
				var open = getOpenCardsAmount();
				if(open <= 1){
					return;
				}
			}
			if(cardIndex < _cards.length){
				_cards[cardIndex].enabled = enabled;
			}
			
			for(var i = 0; i < _cards.length; i++){
				if(_cards[i].enabled)
					openCards++;
			}
			(_applicationController.getController("CountersController")).setCounterValue(OwnCounters.CARDS_ENABLED_COUNTER, openCards);
		}
		
		this.getOpenCardsAmount = function(){
			var openCards = getOpenCards();
			var amount = 0;
			for(var i = 0; i < openCards.length; i++){
				if(openCards[i] == true){
					amount++;
				}
			}
			(_applicationController.getController("CountersController")).setCounterValue(OwnCounters.CARDS_ENABLED_COUNTER, amount);			
			_applicationController.sendNotification(Notifications.CARDS_CONFIG_CHANGED_NOTIFICATION, getOpenCards());
			return amount;
		}
		
		this.getOpenCards = function(){   //:Vector.<Boolean>{
			var openCards = [];
			for(var i = 0; i < _cards.length; i++){
				openCards.push(_cards[i].enabled);
			}
			return openCards;
		}
		
		
		this.getMarks = function(){  //():Vector.<int>{ 
			return _marksOnCard; 
		}
		
		this.tryToMarkNumber = function(ball, onComplete, response, filar){   //(ball:int, onComplete:Function, response:BaseResponse, filar:Boolean):Object{
			for(var i = 0; i< _cards.length;i++){
				if(_cards[i].enabled && _cards[i].hasChanged){
					for(var j = 0; j < _cards[i].numbers.length; j++){
						if(_cards[i].numbers[j] == ball){
							_marksOnCard[i]++;
							return {match:true, onComplete:onComplete, card:i, position:j};
						}
					}
				}
			}
			return {match:false};
		}

		this.loadAlmostPayData = function(){  //:Vector.<Almost>{
			var _cardNumber;
			var _index;
			var _totalToWin;
			var _theCard;//:BingoCardsData;

			var _returnVector = [];
			for(var i = 0; i < _cards.length; i++){
				_cardNumber = i;
				_theCard    = _cards[i];
				if(_cards[i].enabled && _cards[i].hasChanged){
					for(var j = 0; j <_theCard.boxes.length; j++){
						if( _theCard.boxes[j].hasChanged && _theCard.boxes[j].totalToWin > 0){
							
							_totalToWin = _theCard.boxes[j].totalToWin;
							_index = j;
							var almost = new Almost(_index ,_totalToWin, _cardNumber);
							_returnVector.push(almost);
						}
					}
				}
			}
			return _returnVector;
		}
		
		this.getWinCard = function(_cardIndex){
			return _cards[_cardIndex].totalWin;
		}
		
		this.reset = function(){
			_marksOnCard[0] = _marksOnCard[1] = _marksOnCard[2] = _marksOnCard[3] = 0;
			_playedPrizes = [];
			for(var i = 0; i < 4; i++){
				var _playedPrizesCard = [];
				_playedPrizes.push(_playedPrizesCard);
				for(var j = 0; j < _amountOfPrizes; j++){ 
					_playedPrizesCard.push(false);
				}
			}
		}
		
		this.setCardsData = function(cards){  //(cards:Vector.<BingoCardsData>):void{
			_cards = cards;
			ApplicationController.getApplicationController().sendNotification(Notifications.CARDS_NUMBERS_CHANGED_NOTIFICATION, _cards);
		}

		this.hasToPlayPrize = function(_indexPrize,_cardNumber){  //(_indexPrize:int,_cardNumber:int):Boolean{
			if(_playedPrizes[_cardNumber][_indexPrize] == false){
				_playedPrizes[_cardNumber][_indexPrize] = true;
				return true;
			}else{
				return false;
			}
		}
		
		this.isEnabledThisCard = function(indexCard){  //(indexCard:int):Boolean{
			return _cards[indexCard].enabled;
		}

	}


	//private function 

	function getIndex(_column,_line){  //(_column:int,_line:int):int{
		var num = _column + (_line * 5)
		return num;
	}


	function filterOpenCards(element, index, array){  //(element:WinPrizes, index:int, array:Vector.<WinPrizes>):Boolean{
		return _cards[element.cardNumber].enabled;
	}



	//to global scope access:
	window.CardsModel = CardsModel;

}(window));