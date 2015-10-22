(function(window){

	function CardsContainer(){
		
		var _this = this;

		var _applicationController; //:ApplicationController;
		var _countersController;    //:CountersController;
		var _gameSoundController;   //:GameSoundController;
		var _cardController;        //:CardController;
		var _cards   = [];          //:Vector.<CardView>;
		var _cardBet = 0;
		
		var _cardsContainer = game.add.group();
		var Xpositions      = [122, 303, 483, 663];
        var Ypositions      = [366, 366, 366, 366];  

        init();

		function init(){
			for(var i = 0; i < 4; i++) { 
				_cards.push(new CardView(i)); 
				_cards[i].createCards(_cardsContainer, Xpositions[i], Ypositions[i]);
				/*
				if(!(_applicationController.getController(GameController) as GameController)._iniResponse.cards[i-1].enabled){
					_cards[i-1].setEnabled(false);
				}*/
			}
			setupSubscriptions();
		}


		//public functions

		this.notificationReceived = function(type, data){ //(type:String, data:Object=null):void{
			switch(type){
				case Notifications.RESET_NOTIFICATION:
					reset();
				break;
				case Notifications.INITIAL_RESPONSE_NOTIFICATION: 
					//alert("INITIAL_RESPONSE_NOTIFICATION  - cardCOntainer");
					initCardsState(data); // as InitResponse
				break;
				/*case TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION:
					//updateLanguage();
				break;*/
				case Notifications.CARDS_CONFIG_CHANGED_NOTIFICATION:
					//alert("CARDS_CONFIG_CHANGED_NOTIFICATION  - cardCOntainer");
					//enabledCards(data as Vector.<Boolean>);
				break;
				case Notifications.MARK_BALL_NOTIFICATION:
					mark(data);
				break;
				case Notifications.MARK_ALMOST_NOTIFICATION:
					markAlmost(data);
				break;
				case Notifications.CHANGE_ALMOST_NOTIFICATION:
					//changeAlmostState(data);
				break;
				case Notifications.PAUSE_ALMOST_NOTIFICATION:
					//pauseAlmost(data as Boolean);
				break;	
				case Notifications.MARK_WINS_NOTIFICATION:
					//markWin(data);
				break;
				case Notifications.CARDS_NUMBERS_CHANGED_NOTIFICATION:
					//alert("CARDS_NUMBERS_CHANGED_NOTIFICATION  - cardCOntainer");
					this.setCardNumbers(data); //as Vector.<BingoCardsData>
				break;
				case EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION:
					//countersChange(data);
				break;
			}	
		}

		function initCardsState(response){  //(response:InitResponse):void{
			for(var i = 0; i < _cards.length; i++){
				_cards[i].setEnabled(response.cards[i].enabled);
				_cards[i].setCardBet(response.bet);
			}
		}

		function countersChange(data){
			switch(data){
				case CountersController.BET_COUNTER:
					//setCardBet(_countersController.getCounterValue(CountersController.BET_COUNTER));
				break;
				case OwnCounters.WIN_CARD_COUNTER_ + "0":
					//_cards[0].setWinCard(_countersController.getCounterValue(OwnCounters.WIN_CARD_COUNTER_ + "0"));
				break;
				case OwnCounters.WIN_CARD_COUNTER_ + "1":
					//_cards[1].setWinCard(_countersController.getCounterValue(OwnCounters.WIN_CARD_COUNTER_ + "1"));
				break;
				case OwnCounters.WIN_CARD_COUNTER_ + "2":
					//_cards[2].setWinCard(_countersController.getCounterValue(OwnCounters.WIN_CARD_COUNTER_ + "2"));
				break;
				case OwnCounters.WIN_CARD_COUNTER_ + "3":
					//_cards[3].setWinCard(_countersController.getCounterValue(OwnCounters.WIN_CARD_COUNTER_ + "3"));
				break;
			}
		}
		
		function setCardBet(_value){ 
			if(_cardBet != _value){
				_cardBet = _value;
				if(_countersController.getCounterValue(OwnCounters.FIN_INIT) == 1)
					_gameSoundController.playSound(SoundNames.SND_BET, true);
				for(var i = 0; i < 4; i++){ 
					_cards[i].setCardBet(_value);
				}
			}
		}
		
		this.setCardNumbers = function(cards){ 
			for(var i = 0; i < _cards.length; i++){ 
				_cards[i].setNumbers(cards[i].numbers); 
			}
		}
		
		this.setCardsData = function(cards){  //(cards:Vector.<BingoCardsData>):void{
			for(var i = 0; i < cards.length; i++){
				_cards[i].setNumbers(cards[i].numbers);
				_cards[i].setEnabled(cards[i].enabled);
			}
		}
		
		function enabledCards(_value){ //(_value:Vector.<Boolean>):void{
			_gameSoundController.playSound(SoundNames.SND_CARD, true);
			for(var i = 0; i<_cards.length; i++){
				_cards[i].setEnabled(_value[i]);
			}
		}

		function updateLanguage(){
			for(var i = 0; i < cards.length; i++){ 
				_cards[i].updateLanguage();
			}
		}
		
		function mark(data){
			if(_cards[data.card].enabled){
				_cards[data.card].mark(data.position, data.type);
			}
			data.onComplete();
		}

		function markWin(data){  //(data:Object):void{
			_cards[data.card].markWin(data.onComplete, data.response, data.prizeIndex, data.showType);
		}

		function animationToDontShow(card, prize){  //(card:int, prize:int):void{
			_cards[card].animationToDontShow(prize);
		}
		
		//card n: value 0 -> 3
		function markAlmost(data){ //(data:Object):void{
			var almostVector = data.willPay//var almostVector: Vector.<WillPay>
			for(var i = 0;i < almostVector.length;i++){ 

				console.log(almostVector[i].card);
				_cards[almostVector[i].card].markAlmost(almostVector[i].boxIndex, almostVector[i].boxTotalWin, data.type);
			}
			if(data.onComplete) data.onComplete();
		}

		function changeAlmostState(data){  //(data:Object):void{
			for(var c = 0; c < cards.length; c++){
				_cards[c].changeAlmostState(data.type);
			}
			if(data.onComplete)
				data.onComplete();
		}

		this.pauseAlmost = function(value){  //(value:Boolean):void{
			for(var c = 0; c < cards.length; c++){
				_cards[c].pauseAlmost(value);
			}
		}
		
		function reset(){ 
			for(var i = 0; i < 4; i++){ 
				_cards[i].reset(); 
			}
		}

		this.getView = function(){
			return _cardsContainer;
		}


		//private function 

		function setupSubscriptions(){
			var notifications = []; 
			notifications.push(
				Notifications.RESET_NOTIFICATION,
				Notifications.INITIAL_RESPONSE_NOTIFICATION,
				//TranslatorController.TRANSLATION_COMPLETED_NOTIFICATION,
				//EngineNotificationsEnum.COUNTER_CHANGED_NOTIFICATION,
				Notifications.CARDS_CONFIG_CHANGED_NOTIFICATION,
				Notifications.MARK_BALL_NOTIFICATION,
				Notifications.MARK_ALMOST_NOTIFICATION,
				Notifications.CHANGE_ALMOST_NOTIFICATION,
				Notifications.PAUSE_ALMOST_NOTIFICATION,
				Notifications.MARK_WINS_NOTIFICATION,
				Notifications.CARDS_NUMBERS_CHANGED_NOTIFICATION);
			ApplicationController.getApplicationController().addSubscriber(notifications, _this);	
		}



	}


	window.CardsContainer = CardsContainer;

}(window));