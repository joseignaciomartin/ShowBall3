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
		var Xpositions      = [103, 495, 103, 495];
        var Ypositions      = [263, 263, 435, 435];

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
					//reset();
				break;
				case Notifications.INITIAL_RESPONSE_NOTIFICATION: 
					//alert("INITIAL_RESPONSE_NOTIFICATION  - cardCOntainer");
					//initCardsState(data); // as InitResponse
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
					//markAlmost(data);
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

		this.getView = function(){
			return _cardsContainer;
		}

		this.setCardNumbers = function(cards){ 
			for(var i = 0; i < _cards.length; i++){ 
				_cards[i].setNumbers(cards[i].numbers); 
			}
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

		function mark(data){
			if(_cards[data.card].enabled){
				_cards[data.card].mark(data.position, data.type);
			}
			data.onComplete();
		}

	}


	window.CardsContainer = CardsContainer;

}(window));