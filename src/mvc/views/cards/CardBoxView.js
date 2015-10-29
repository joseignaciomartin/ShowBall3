(function(window){

	function CardBoxView(n){

		var _this   = this;
		var _number = n;     //:int;
		var _almostMarked;   //:Boolean;
		var _loopingBox;     //:Boolean;
		var _almostBlinking; //:Boolean;
		var _almostBlinkingCount; //:int;

		var numTxt; //phaser text 
		var box;
		
		const ALMOST1   = 0;
		const ALMOST2   = 1;
		const RED       = 2;
		const WHITE     = 3;
		const BLACK     = 4;
		


		this.almostMarked = function(){
			return _almostMarked;
		}

		this.setNumber = function(n){
			_number = n;
			_this.updateTextNumber();
		}
		
		this.updateTextNumber = function(fillStyle){
            _number < 9?  num = "0" + (_number) : num = (_number); 
            numTxt.setText(num);
		}

		this.mark = function(type){  //(type:String):void{

			if(_almostMarked) resetAlmost();
			
			switch(type){
				case "PLAY":
					box.frame = BLACK;
            		numTxt.style.fill = '#FFF';
					_this.updateTextNumber('#FFF');
					resetAlmost();
				break;
				case "EXTRA":
					
					function goBlack(){
						if(c < 5 ) {
							TweenMax.to(box, .1, {onComplete:goWhite});
							numTxt.style.fill = '#FFF';
							box.frame = BLACK;
							_this.updateTextNumber();
						}
					}
					
					function goWhite(){
						c++;
						if(c < 5 ) {
							TweenMax.to(box,.1, {onComplete:goBlack});
							box.frame = WHITE;
							numTxt.style.fill = '#000';
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
							box.scaleX = 1.05;
							box.scaleY = 1.05;
							TweenMax.to(box, .1, {onComplete:goSmall});
						}
					}
					
					function goSmall(){
						box.scaleX = 1;
						box.scaleY = 1;
						TweenMax.to(box,.1, {onComplete:goBig});
					}

					_loopingBox = true;
					box.frame   = BLACK;
					_this.updateTextNumber();
					
					goBig();
				break;
			}
		}
		
		this.markAlmost = function(willPay, type){  //(willPay:int, type:String):void{
			_almostMarked = true;
			
			switch(type){
				case "DURINGPLAY":
					box.frame = RED;
					_this.updateTextNumber();
				break;
				case "NORMAL":
					box.frame = RED;
					_almostBlinking      = true;
					_almostBlinkingCount = 0;
				break;
			}
		}
		
		this.upDate = function(){
			if(_almostBlinking && _almostMarked){
				if(_almostBlinkingCount == 0){
					box.frame = WHITE;
					_this.updateTextNumber();
					_almostBlinkingCount = 1;
				}else{
					box.frame = RED;
					_this.updateTextNumber();
					_almostBlinkingCount = 0;
				}

				/*(_almostBlinkingCount > 23) ? _almostBlinkingCount = 1 : _almostBlinkingCount++;
				if(_almostBlinkingCount == 12){
					box.frame = WHITE;
					_this.updateTextNumber();
				}
				else if(_almostBlinkingCount == 1){
					box.frame = RED;
					_this.updateTextNumber();
				}*/
			}
		}
		
		this.pauseAlmost = function(value){  //(value:Boolean):void{
			if(value && _almostMarked){
				_almostBlinking = false;
				box.frame = RED;
				_this.updateTextNumber();
			}
			
			else if(!value && _almostMarked){
				_almostBlinkingCount = 1;
				_almostBlinking      = true;
			}
		}
		
		this.changeAlmostState = function(type){  //(type:String):void{
			switch(type){
				case "DURINGPLAY":
					resetAlmost();
					box.frame = ALMOST1;
					_this.updateTextNumber();
				break;
			}
		}
		
		this.reset = function(){
			resetAlmost();
			box.frame = WHITE;
			numTxt.style.fill = '#000';
			this.updateTextNumber()
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
					box.frame = BLACK;
					_this.updateTextNumber();
				}
				setTimeout(goBlack,200);
			}
		}

		this.createBoxes = function(container, x, y){
			
			view   = game.add.group();  //view 'podria ser algo como _boxMovie
            view.x = x ; 
            view.y = y +5;
            container.add(view);

			box = game.add.sprite(x, y, 'box');
			view.add(box);
 			box.frame = WHITE;
 			//box.visible = false; //BORRARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

            //create numbers
            _number < 9?  num = "0" + (_number + 1) : num = (_number + 1); 
            numTxt = game.add.text(x + 12 , y + 11, num, {fontSize: '22px', fill: '#000', boundsAlignH: "center"/*, font: 'futura'*/});
           // numTxt.setTextBounds(0, 0, 80, 30);
			view.add(numTxt);
			

		}	

		//this.reset();

	}


	window.CardBoxView = CardBoxView;

}(window));
