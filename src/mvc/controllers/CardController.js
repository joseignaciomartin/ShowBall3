(function(window){

	function CardController(){  //(view:IView, model:Model, dependencies:Vector.<Class>=null){
		
		var _this = this;
		var _applicationController;
		var _counterController;
		var _model; //Esto va en el controller del Engine

		this.type = "CardController";

		_applicationController =  ApplicationController.getApplicationController();
		_countersController    = _applicationController.getController("CountersController");

		this.tryToMarkNumber = function(ball, onComplete, response, filar){  //(ball:int, onComplete:Function, response:BaseResponse, filar:Boolean): Object{ 
			return _model.tryToMarkNumber(ball, null, response, filar); //_model as CardsModel
		}
		
		this.setGameTotalAlmost = function(willPay){  //(willPay:Vector.<WillPay>):void{
			if(willPay.length > 0){
				var totalAlmostCounter = 0;
				for(var i = 0;i < willPay.length; i++){
					totalAlmostCounter += willPay[i].boxTotalWin;
				}
				_countersController.setCounterValue(OwnCounters.TOTAL_ALMOST_COUNTER, totalAlmostCounter);
			}
		}

		this.loadAlmostPayData = function(){  //:Vector.<Almost>
			return _model.loadAlmostPayData(); 
		}
		
		this.upDateCards = function(newCardsData){ //( newCardsData:Vector.<BingoCardsData>):void{
			_model.upDateCards(newCardsData); 
		}
		
		this.markWins = function(onComplete, response){  //(onComplete:Function, response:BaseResponse):void{
			var _winPaid;
			var _prizesIndexes = [];
			var _cardNumber;
			var _prizeIndex;
			
			if(response.type == "PlayResponse"){          _winPaid = response.winPaid;}
			if(response.type == "GetExtraBallResponse"){  _winPaid = response.winPaid;}
			
			var i = 0; // se mantiene el estado de i, porque esta funcion va a ser llamada nuevamente...con i++;
			checkCards();
			function checkCards(){
				for(i; i < _winPaid.length; i++){
					if(_winPaid[i].prizesIndexes.length > 0){
						_prizesIndexes = _winPaid[i].prizesIndexes;
						_cardNumber    = _winPaid[i].cardNumber;
						break;
					}
				}
				playNextAnimation();
			}

			function playNextAnimation(){
				if(_prizesIndexes.length > 0){
					_prizeIndex = _prizesIndexes.shift();

					var hasTopPlay = _model.hasToPlayPrize(_prizeIndex, _cardNumber);
					if(hasTopPlay){
						_applicationController.sendNotification(Notifications.MARK_WINS_NOTIFICATION, {onComplete:playNextAnimation, response:response, card:_cardNumber, prizeIndex:_prizeIndex});
					}else{
						playNextAnimation();
					}
					
				}
				else{
					i++;
					_winPaid.length > i ? checkCards(): markWinPayTable();
				}
			}

			function markWinPayTable(){
				var _winPrizesIndex = [];
				for(i = 0; i< _winPaid.length;i++){
					for(var j = 0; j < _winPaid[i].prizes.length; j++){
						if(_winPrizesIndex.indexOf(_winPaid[i].prizes[j].index) == -1){
							_winPrizesIndex.push(_winPaid[i].prizes[j].index);
						}
					}	
				}
				_applicationController.sendNotification(Notifications.MARK_WINS_TABLE_NOTIFICATION, {indexAllPrizes:_winPrizesIndex});
				onComplete();
			}
		}
		
		this.getOpenCards = function(){ 
			return _model.getOpenCards(); 
		}
		
		this.getOpenCardsAmount = function(){
			var openCards = getOpenCards();
			var amount = 0;
			for(var i = 0; i < openCards.length; i++){
				if(openCards[i] == true){ amount++; }
			}
			return amount;
		}
		
		this.enableNextCard = function(){ 
			_model.enableNextCard(); 
		}
		
		this.enableCard = function(cardIndex, enabled){  //(cardIndex:int, enabled:Boolean):void{
			_model.enableCard(cardIndex, enabled);
		}		
		
		this.isEnabledThisCard = function(indexCard){ 
			return _model.isEnabledThisCard(indexCard);
		}
		
		this.getWinCard = function(_cardIndex){  //(_cardIndex:int):int{ 
			return _model.getWinCard(_cardIndex);
		}
		
		this.reset = function(){ 
			_model.reset(); 
		}
		
		this.setCardsData = function(cards){  //(cards:Vector.<BingoCardsData>):void{
			if(!_model){ 
				_model = new CardsModel(cards);
			}
			_model.setCardsData(cards);
		}
		
		this.getMarks = function(){ 
			return _model.getMarks();
		}
		
		this.checkFilar = function(){
			var marks = getMarks();
			var limit = (Game.gameConfig.cardsSize.x * Game.gameConfig.cardsSize.y) - 1;
			for(var i = 0; i < marks.length; i++){
				if(marks[i] == limit){
					return true;
				}
			}
			return false;
		}
		
		this.updateCardsWinCounter = function(winPaid){  //(winPaid:Vector.<WinPrizes>):void{
			
			//todo
			//var countersController = ApplicationController.getApplicationController().getController("CountersController"); 
			//var coin  = countersController.getCounterValue(CountersController.COIN_COUNTER);
			var cards = [];
			cards.push(0,0,0,0);

		}
	}


	//to global scope access:
	window.CardController = CardController;
	//Extends Controller
	CardController.prototype = Controller.prototype;

}(window));