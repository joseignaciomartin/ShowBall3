(function(window){

    function CardView(n){
        var _this = this;
        var view;
        var _cardNumber = n;
        var _cardBet;
        var _boxes          = [];
        var numContainer    = [];
        var marksContainer  = [];
        var currentNumbers  = [];
        var numOfBoxes = Game.gameConfig.cardsSize.x * Game.gameConfig.cardsSize.y;
        this.enabled;

        var  _applicationController = ApplicationController.getApplicationController();
       // var  _gameSoundController   = _applicationController.getController("GameSoundController");
       // var  _translatorController  = _applicationController.getController("TranslatorController");
        var  _countersController    = _applicationController.getController("CountersController");

        //public functions
        
        //En el ShowBall3 es muchisimo mas largo, revisar si da problemas
        this.setNumbers = function(numbers){
            currentNumbers = numbers;
            /*for(i = 0; i < 15; i++){
                numbers[i] < 10?  num = "0" + numbers[i] : num = numbers[i]; 
                numContainer[i].text = num;
            }*/ 

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
             
            //marksContainer[index].visible = true;
            //numContainer[index].style.fill = '#FFF';
        }

        this.markAlmost = function(i, willPayValue, type){  //(i:int, willPayValue:int, type:String):void{
            _boxes[i].markAlmost(willPayValue, type);
        }

        this.reset = function(){
            for(i = 0; i < numOfBoxes; i++){
                //marksContainer[i].visible  = false;
                //numContainer[i].style.fill = '#000';
                _boxes[i].reset();
            }
        }

        this.createCards = function(container, x, y){

            cardViewContainer   = game.add.group();
            cardViewContainer.x = x; 
            cardViewContainer.y = y;
            container.add(cardViewContainer);

            var bg = cardViewContainer.create(0, 0, 'bg');


/*
            var Xpositions = [15, 70, 126, 182, 237, 15, 70, 126, 182, 237,  15,  70, 126, 182, 237];
            var Ypositions = [44, 44,  44,  44,  44, 88, 88,  88,  88,  88, 132, 132, 132, 132, 132];*/

            var Xpositions = [8, 35, 62, 89, 118, 8, 35, 62, 89, 118, 8, 35, 62, 89, 118];
            var Ypositions = [22, 22,  22,  22,  22, 44, 44,  44,  44,  44, 66, 66, 66, 66, 66];
            

            for(i = 0; i < numOfBoxes; i++){
              
               //boxes
               _boxes.push(new CardBoxView(i)); 
               _boxes[i].createBoxes(cardViewContainer, Xpositions[i], Ypositions[i]);


            }

            //TODO se borran no?, osea esta todo denro de boxes, en una clase
           // marksContainer
           // numContainer



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