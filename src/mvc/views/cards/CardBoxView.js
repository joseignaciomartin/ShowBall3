(function(window){


	function CardBoxView(n){

		var _this   = this;
		var _number = n; //:int;
		var _almostMarked; //:Boolean;
		//var _boxMovie     :MovieClip;
		var _loopingBox; //:Boolean;
		var _almostBlinking; //:Boolean;
		var _almostBlinkingCount; //:int;

		var numTxt; //phaser text 
		var box;
		
		const WHITE     = 0;
		const BLACK     = 1;
		const RED       = 2;
		const ALMOST1   = 3;
		const ALMOST2   = 4;

		//var shoot;        //phaser bg - van mas TODO
		/*var redBox;       //phaser Sprite
		var blackBox;       //phaser Sprite
		var alomostBox1;    //phaser Sprite
		var alomostBox2;    //phaser Sprite*/

		this.almostMarked = function(){
			return _almostMarked;
		}

		this.setNumber = function(n){
			_number = n;
			_this.updateTextNumber();
		}
		
		this.updateTextNumber = function(){
			//_boxMovie.num.text = _number.toString();	

            _number < 9?  num = "0" + (_number) : num = (_number); 
           // numTxt = new Phaser.Text(game, x + 12, y + 8, num, {fontSize: '30px', fill: '#000' });
           // view.add(numTxt);
            numTxt.text = num;
			//numTxt.text = _number.toString();	
		}

		this.mark = function(type){  //(type:String):void{

			if(_almostMarked) resetAlmost();
			
			switch(type){
				case "PLAY":
					//_boxMovie.gotoAndStop('BLACK');
					//shoot.visible = true;
					box.frame = BLACK;
            		numTxt.style.fill = '#FFF';

					_this.updateTextNumber();
					resetAlmost();

				break;
				case "EXTRA":
					
					function goBlack(){
						if(c < 5 ) {
							TweenMax.to(_boxMovie, .1, {onComplete:goWhite});
							//_boxMovie.gotoAndStop('BLACK');
							box.frame = BLACK;
							_this.updateTextNumber();
						}
					}
					
					function goWhite(){
						c++;
						if(c < 5 ) {
							TweenMax.to(_boxMovie,.1, {onComplete:goBlack});
							//_boxMovie.gotoAndStop('WHITE');
							box.frame = WHITE;
							_this.updateTextNumber();
						}
					}

					//BLINCK 5 TIMES BEFORE
					var c = 0;
					goBlack();
					resetAlmost();

				break;
				case "LOOP":

					function goBig(){
						if(_loopingBox) {
							_boxMovie.scaleX = 1.05;
							_boxMovie.scaleY = 1.05;
							TweenMax.to(_boxMovie, .1, {onComplete:goSmall});
						}
					}
					
					function goSmall(){
						_boxMovie.scaleX = 1;
						_boxMovie.scaleY = 1;
						TweenMax.to(_boxMovie,.1, {onComplete:goBig});
					}

					_loopingBox = true;
					//_boxMovie.gotoAndStop('BLACK');
					box.frame = BLACK;
					_this.updateTextNumber();
					
					goBig();
				break;
			}
		}
		

		
		this.markAlmost = function(willPay, type){  //(willPay:int, type:String):void{
			_almostMarked = true;
			
			switch(type){
				case "DURINGPLAY":
					
					//_boxMovie.gotoAndStop("ALMOST");
					box.frame = RED;
					_this.updateTextNumber();
				break;
				case "NORMAL":
					
					//_boxMovie.almostValue.text = willPay.toString();
					box.frame = RED;
					_almostBlinking            = true;
					_almostBlinkingCount       = 0;
				break;
			}
		}
		
		this.upDate = function(){
			if(_almostBlinking && _almostMarked){
				
				(_almostBlinkingCount > 23) ? _almostBlinkingCount = 1 : _almostBlinkingCount++;
				
				if(_almostBlinkingCount == 12){
					
					//_boxMovie.gotoAndStop('WHITE');
					_this.updateTextNumber();
				}
				else if(_almostBlinkingCount == 1){
					
					//_boxMovie.gotoAndStop('RED');
					_this.updateTextNumber();
				}
			}
		}
		
		this.pauseAlmost = function(value){  //(value:Boolean):void{
			if(value && _almostMarked){
				
				_almostBlinking = false;
				//_boxMovie.gotoAndStop('RED');
				_this.updateTextNumber();
			}
			
			else if(!value && _almostMarked){
				_almostBlinkingCount = 0;
				_almostBlinking      = true;
			}
		}
		
		this.changeAlmostState = function(type){  //(type:String):void{
			switch(type){
				case "DURINGPLAY":
					resetAlmost();
					//_boxMovie.gotoAndStop("ALMOST"); 
					_this.updateTextNumber();
				break;
			}
		}
		
		this.reset = function(){
			resetAlmost();
			//shoot.visible  = false;
			box.frame = WHITE;
			numTxt.style.fill = '#000';
	        //marksContainer[i].visible  = false;
	        //numContainer[i].style.fill = '#000';

			//_boxMovie.gotoAndStop('WHITE');
			//_this.updateTextNumber();


		}
		
		
		function resetAlmost(){
			_almostMarked   = false;
			_almostBlinking = false;
			//_boxMovie.almostValue.text = "";
		}

		this.isLooping = function(value){  //(value:Boolean):void{
			var aux = _loopingBox;
			_loopingBox = value ;
			
			if(!_loopingBox && aux){
				
				function goBlack(){
					//_boxMovie.gotoAndStop('BLACK');
					_this.updateTextNumber();
				}
				setTimeout(goBlack,200);
			}
		}

		this.createBoxes = function(container, x, y){
			
			view   = game.add.group();  //view 'podria ser algo como _boxMovie
            view.x = x; 
            view.y = y;
            container.add(view);

            //create bg match bg
            //shoot = view.create(x, y, 'shoot');
            //shoot.visible = false;

   
            /*whiteBox = game.add.sprite(x, y, 'whiteBox');
            whiteBox.visible = true;
			view.add(whiteBox);

            redBox = game.add.sprite(x, y, 'redBox');
            redBox.visible = false;
			view.add(redBox);

			blackBox = game.add.sprite(x, y, 'blackBox');
			blackBox.visible = false;
			view.add(blackBox);

			alomostBox1 = game.add.sprite(x, y, 'alomostBox1');
			alomostBox1.visible = false;
			view.add(alomostBox1);

			alomostBox2 = game.add.sprite(x, y, 'alomostBox2');
			alomostBox2.visible = false;
			view.add(alomostBox2);*/

			box = game.add.sprite(x, y, 'box');
			view.add(box);
 			box.frame = WHITE;





            //create numbers
            _number < 9?  num = "0" + (_number + 1) : num = (_number+1); 
            numTxt = new Phaser.Text(game, x + 12, y + 8, num, {fontSize: '30px', fill: '#000' });
            view.add(numTxt);
            numTxt.text = num;
           	// numContainer.push(numTxt);

            


		}	

		//this.reset();

	}


	window.CardBoxView = CardBoxView;

}(window));
