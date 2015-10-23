(function(window){

    function CardView(n){
        var _this = this;
        var view;
        var _cardNumber = n;
        var _cardBet;
        var _boxes = [];

        var betTxt;
        var betValue;
        var winTxt;
        var winValue;

        var numOfBoxes = Game.gameConfig.cardsSize.x * Game.gameConfig.cardsSize.y;
        this.enabled;

        var _cardLinePriezesView;

        var  _applicationController = ApplicationController.getApplicationController();
       // var  _gameSoundController   = _applicationController.getController("GameSoundController");
       // var  _translatorController  = _applicationController.getController("TranslatorController");
        var  _countersController    = _applicationController.getController("CountersController");

        var _showingPrizes  = [];
        var _animatedPrizes = [];
        for(var i = 0; i < Game.gameConfig.prizes.length; i++){
            _showingPrizes[i]  = false;
            _animatedPrizes[i] = false;
        }

        var _mapping_prizes_payCards = Game.gameConfig.mapping_prizes_payCards_Dictionary;

        //public functions
        
        //En el ShowBall3 es muchisimo mas largo, revisar si da problemas
        this.setNumbers = function(numbers){
            for(var i = 0; i < numOfBoxes; i++){
               _boxes[i].setNumber(numbers[i]); 
            }
        }


        this.setCardBet = function(i){
            _cardBet = i;
            
            if(i == 15) i = 11;
            if(i == 20) i = 12;
            //TODO: cambiar fondo de cartones

           // var lang = _translatorController.getCurrentLanguage();
           // _card.back.gotoAndStop(lang);
           // _card.back['inner' + lang].gotoAndStop(i);
        }
        
        this.setWinCard = function(value){ 
            _card.win.text = value.toString(); 
        }
        
        this.setEnabled = function(e, onComplete){ //(e:Boolean, onComplete:Function = null):void{
            //_card.disable.visible = !e;
            _this.enabled = e;
            if (onComplete) onComplete();
        }

        this.mark = function(i, type){
            _boxes[i].mark(type);
        }

        this.markAlmost = function(i, willPayValue, type){  //(i:int, willPayValue:int, type:String):void{
            //console.log("i " + i);
            _boxes[i].markAlmost(willPayValue, type);
        }

        this.changeAlmostState = function(type){ //(type:String):void{
            for(var i = 0; i < numOfBoxes; i++){
                if(_boxes[i].almostMarked){
                    _boxes[i].changeAlmostState(type);
                }
            }
        }
        this.pauseAlmost = function(value){ //(value:Boolean):void{
            for(var i = 0; i < numOfBoxes; i++){
                if(_boxes[i].almostMarked){
                    _boxes[i].pauseAlmost(value);
                }
            }
        }


        this.markWin = function(onComplete, response, prizeIndex, showType){  //markWin(onComplete:Function, response:BaseResponse, prizeIndex:int, showType:String):void{
            
            if(_showingPrizes[prizeIndex] && showType != "ANIMATION"){
                onComplete();
                return;
            }
            
            if(_animatedPrizes[prizeIndex] && showType == "ANIMATION"){
                onComplete();
                return;
            }
                    
            _showingPrizes[prizeIndex] = true;
            
            if(showType == "ANIMATION") _animatedPrizes[prizeIndex] = true;
            
            //Sound
            /*if(prizeIndex < 9 && showType == "ANIMATION" || prizeIndex > 8)
                prizeSound(prizeIndex, onComplete, response);*/
            
            //Boxes
            for(var i = 0; i < numOfBoxes; i++){
                if(prizeIndex < 9 && showType == "ANIMATION"){
                    if(Game.gameConfig.prizes[prizeIndex].definition[i] == 1){
                        _boxes[i].mark("LOOP"); 
                    }
                }
            }
            
            //Lines
            if(prizeIndex < 9 && showType == "ANIMATION"){
                _cardLinePriezesView.showLine(null, prizeIndex);
                _applicationController.sendNotification(Notifications.WIN_BLINK_NOTIFICATION, true);
            }else{
                _cardLinePriezesView.showLine(onComplete, prizeIndex);
            }

        }

        this.animationToDontShow = function(prize){ //(prize:int):void{
            _animatedPrizes[prize] = true;
        }

        this.stopBoxesLoop = function(){
            for(var i = 0;i < numOfBoxes; i++){
                _boxes[i].isLooping = false;
            }
        }

        function prizeSound(index, onComplete, response){ //(index:int, onComplete:Function, response:BaseResponse):void{
            
            function prizeSoundFinish(){
                _applicationController.sendNotification(Notifications.WIN_BLINK_NOTIFICATION, false);
                stopBoxesLoop();
                if(onComplete != null) onComplete();
                
            }

            //check last extra ball to remove
            var totalBallsAmount = Game.gameConfig.numberOfBalls + Game.gameConfig.numberOfExtraBalls;
            if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1 && _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER) == totalBallsAmount)
                _countersController.setCounterValue(OwnCounters.ALMOST_BINGO, 0);
            
            switch(index){
                
                case 0:
                    //check almost bingo to remove
                    var almostInOthercard = _applicationController.getController("CardController").checkFilar();
                    if(_countersController.getCounterValue(OwnCounters.ALMOST_BINGO) == 1 && !almostInOthercard) 
                        _countersController.setCounterValue(OwnCounters.ALMOST_BINGO, 0); 
                    
                    var bet = _countersController.getCounterValue(CountersController.BET_COUNTER);
                    var jackPotPayed = _countersController.getCounterValue(OwnCounters.JACKPOT_PAYED) == 1;

                    if(response.getType == GameStates.PLAYING && bet > 2 && !jackPotPayed){   
                        //jackpot
                        _countersController.setCounterValue(OwnCounters.JACKPOT_PAYED, 1);
                        //_gameSoundController.playSound(SoundNames.SND_JACKPOT, true);
                        setTimeout(prizeSoundFinish, 14000);

                    }else{
                        //Bingo
                        //_gameSoundController.playSound(SoundNames.SND_WIN_12, true);
                        setTimeout(prizeSoundFinish, 10000);
                    }
                break;  
                case 1:
                    //perimetro
                    //_gameSoundController.playSound(SoundNames.SND_WIN_11, true);
                    setTimeout(prizeSoundFinish, 12000);
                break;  
                case 2:
                     //doble triangulo
                    //_gameSoundController.playSound(SoundNames.SND_WIN_10, true);
                    setTimeout(prizeSoundFinish, 9000);
                break;  
                case 3:
                    //MW
                    //_gameSoundController.playSound(SoundNames.SND_WIN_9, true);
                    setTimeout(prizeSoundFinish, 8000);
                break;                                                              
                case 4:                                                             
                case 5:                                                             
                case 6:                                                             
                    //LINEA 2                                                       
                    //_gameSoundController.playSound(SoundNames.SND_WIN_8, true);
                    setTimeout(prizeSoundFinish, 8000);
                break;                                                              
                case 7:                                                             
                    //W                                                             
                    //_gameSoundController.playSound(SoundNames.SND_JPS_W, true);
                    setTimeout(prizeSoundFinish, 5000);
                break;
                case 8:
                    //M
                    //_gameSoundController.playSound(SoundNames.SND_WIN_7, true);
                    setTimeout(prizeSoundFinish, 5000);
                break;  
                case 9: 
                    //cuadrado
                    //_gameSoundController.playSound(SoundNames.SND_TADAA, true);
                break;
                default:
                    //_gameSoundController.playSound(SoundNames.SND_BONK, true);
                break;  
            }
        }

        this.updateLanguage = function(){
            setCardBet(_cardBet);
        }

        this.reset = function(){

            //TODO:
            _cardLinePriezesView.reset();
            //_card.win.setText("");

            for(var i = 0; i < numOfBoxes; i++){
                _boxes[i].reset();
            }

            for(i = 0; i < Game.gameConfig.prizes.length; i++){
                _showingPrizes[i]  = false;
                _animatedPrizes[i] = false;
            }
        }

        this.almostMarked = function(i){ 
            return _boxes[i].almostMarcked;
        }

        this.createCards = function(container, x, y){

            cardViewContainer   = game.add.group();
            cardViewContainer.x = x; 
            cardViewContainer.y = y;
            container.add(cardViewContainer);

            //CARD BACKGROUND
            var cardBg = cardViewContainer.create(0, 0, 'card');
            cardBg.frame = 1;

            //BOXES
            var Xpositions = [1.3, 18.5, 35, 52.5, 69.5,  1.3, 18.5, 35, 52.5, 69.5, 1.3, 18.5, 35, 52.5, 69.5];
            var Ypositions = [14.5, 14.5,  14.5,  14.5,  14.5, 33, 33,  33,  33,  33, 51.5, 51.5, 51.5, 51.5, 51.5];
            for(i = 0; i < numOfBoxes; i++){
               _boxes.push(new CardBoxView(i)); 
               _boxes[i].createBoxes(cardViewContainer, Xpositions[i], Ypositions[i]);
            }

            //LINES
            _cardLinePriezesView = new CardLinePriezesView();
            _cardLinePriezesView.createLines(cardViewContainer);
            
            //CARD TEXT -  BET && WIN
            betTxt = game.add.text(-37,   12, "APUESTA:", {boundsAlignH: 'right', font: 'futura', fontSize: '14px', fill: '#FFF' });
            betTxt.stroke = '#000';
            betTxt.strokeThickness = 2;
            betTxt.setTextBounds(0, 0, 100, 20); 
            cardViewContainer.add(betTxt);

            betValue = game.add.text(63,   12, "1", {boundsAlignH: 'left', font: 'futura', fontSize: '14px', fill: '#FFF' });
            betValue.setTextBounds(0, 0, 100, 20); 
            betValue.stroke = '#000';
            betValue.strokeThickness = 2;
            cardViewContainer.add(betValue);
           

            winTxt = game.add.text(35,   12, "PREMIO:", {boundsAlignH: 'right', font: 'futura', fontSize: '14px', fill: '#FFFF00' });
            winTxt.stroke = '#000';
            winTxt.strokeThickness = 2;
            winTxt.setTextBounds(0, 0, 100, 20); 
            cardViewContainer.add(winTxt);

            winValue = game.add.text(136,   12, "2000", {boundsAlignH: 'left', font: 'futura', fontSize: '14px', fill: '#FFFF00' });
            winValue.stroke = '#000';
            winValue.strokeThickness = 2;
            winValue.setTextBounds(0, 0, 100, 20); 
            cardViewContainer.add(winValue);

            //TODO:
            /*_card.win.text         = "";
            _card.betZone.alpha    = 0;
            _card.closeZone.alpha  = 0;
            _card.numberZone.alpha = 0;
            _card.disable.visible  = false;*/
            

            //"ENTER_FRAME" - almost
            function upDate(){
                for(i = 0; i < numOfBoxes; i++){
                    _boxes[i].upDate();
                }
                clearTimeout(id);
                id = setTimeout(upDate, 500);
            }
            var id = setTimeout(upDate, 500);


        }
    }




    window.CardView = CardView;

}(window));





            /*PRUEBAS*/
            //*************************************************** estaba en: this.createCards = function(container, x, y){



/*

        this.createCards = function(container, x, y){

            view   = game.add.group();
            view.x = x; 
            view.y = y;
            container.add(view);

            var bg = view.create(0, 0, 'bg');

            var Xpositions = [15, 70, 126, 182, 237, 15, 70, 126, 182, 237, 15, 70, 126, 182, 237];
            var Ypositions = [44, 44, 44, 44, 44, 88, 88, 88, 88, 88, 132, 132, 132, 132, 132];

            //create bg match bg
            for(i = 0; i < 15; i++){
                shoot = view.create(Xpositions[i], Ypositions[i], 'shoot');
                shoot.visible = false;
                marksContainer.push(shoot);
            }

            //create numbers
           for(i = 0; i < 15; i++){
                i < 9?  num = "0" + (i+1) : num = (i+1); 
                var numTxt = new Phaser.Text(game, Xpositions[i] + 12, Ypositions[i] + 8, num, {fontSize: '30px', fill: '#000' });
                view.add(numTxt);
                numContainer.push(numTxt);
            }



        }
    }

*/

            // 10;20;39;57;73;11;26;44;60;75;16;30;53;68;76
            // 1;21;40;56;84;6;22;45;58;86;15;32;46;63;90
            // 2;24;48;61;80;7;27;51;66;81;9;34;52;72;88
            // 3;25;37;55;74;8;31;47;59;78;14;36;50;69;89

            /*
            var arr;
            if(cardNumber == 0) {
                arr = [10,20,39,57,73,11,26,44,60,75,16,30,53,68,76];
            }

            if(cardNumber == 1){
                arr =  [1,21,40,56,84,6,22,45,58,86,15,32,46,63,90];
            }

            
            if(cardNumber == 2){
                arr =  [2,24,48,61,80,7,27,51,66,81,9,34,52,72,88];
            }

            
            if(cardNumber == 3) {
                arr =  [3,25,37,55,74,8,31,47,59,78,14,36,50,69,89];
            }

            for(i = 0; i < 15; i++){
               
                arr[i] < 9?  num = "0" + arr[i] : num = arr[i]; 
                var numTxt = new Phaser.Text(game, Xpositions[i] + 12, Ypositions[i] + 8, num, {fontSize: '30px', fill: '#000' });
                view.add(numTxt);
                numContainer.push(numTxt);
            }*/


            //var numbers = [88,89,90,04,05,06,07,08,09,10,11,12,12,13,14];
            //setNumbers(numbers);

            //mark(0);