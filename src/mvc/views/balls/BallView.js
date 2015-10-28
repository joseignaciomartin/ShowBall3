(function(window){

	function BallView(asset, finPosition, indexPosition, iniRotation){  //(asset:MovieClip, finPosition:Point, indexPosition:int, iniRotation:int = 0){
		
		function Point(x, y) {
 			this.x = x;
  			this.y = y;
		}
		var _this = this;
		var _initPosition = new Point(430, 58,25); //391
		var _firstCorner  = new Point(127, 58,25);

		var _finalPoints;
		
		var _applicationController = ApplicationController.getApplicationController();
		var _countersController    = _applicationController.getController("CountersController");
		//var _gameSoundController   = _applicationController.getController("GameSoundController");
		
		var _finPosition   = finPosition
		var _indexPosition = indexPosition;
		var _initRotation  = iniRotation;	
		var _ballAsset     = asset;  

		this.ballsFinalPoints = function(value){
			_finalPoints = value;
		}
		

		this.throwMe = function(ball, onComplete, response, isTurbo, ballSoundCounter){  //(ball:int, onComplete:Function, response:BaseResponse, isTurbo:Boolean, ballSoundCounter:int):void {
			
			//var _this = this; //OJO con estos _this, ahora se refieren al contenedor
			_ballAsset.visible = true;
			var speed;
			_ballAsset.x = _initPosition.x;
			_ballAsset.y = _initPosition.y;
			//_ballAsset.cancel.visible = false;
			
			//_gameSoundController.playSound(SoundNames.SND_BALL_  + ballSoundCounter.toString(), true);
			
			var index = _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);
			
			//EXTRAS (31 -> 40)
			if(index > 30){

				var rot = 0;
				
				extraFirstStep();
				
				function extraFirstStep(){
					if(index > 35){
						//extra fila arriba (36 -> 40)
						speed = .05;
						rot   = 360;
						TweenMax.to(asset, speed, {angle:rot, x: _finPosition.x, onComplete:turn, ease:Linear.easeNone});
					}else{
						//extra fila bajo (31 -> 35)
						speed = .06;
						rot   = 360;
						TweenMax.to(asset, speed, {angle:rot, x: _firstCorner.x, onComplete:extraSecondStep, ease:Linear.easeNone});
					}

				}
				
				function extraSecondStep(){
					rot  = 180;
					TweenMax.to(asset, speed/2, {angle:rot, y: _finPosition.y, onComplete:extraThirdStep, ease:Linear.easeNone}); //Turn5ToFinal cambiar por extraThirdStep
					
				}
				
				function extraThirdStep(){
					rot  = 180;
					TweenMax.to(asset, speed/2, {angle:rot, x: _finPosition.x, onComplete:turn, ease:Linear.easeNone});
				}
				
				function turn(){
					rot = -180;
					speed = speed * 2;
					TweenMax.to(asset, speed, {angle:  rot, repeat:1, onComplete:turnTofinal,ease:Linear.easeNone});
				}
				
				function turnTofinal(){
					rot = rot  - 90 - 180 +  45;
					TweenMax.to(asset, speed, {angle: rot, onComplete:onComplete,ease:Linear.easeNone});
				}
				
			}
			//NORMAL
			
			else{
				
				//TURBO
				
				if(isTurbo){
	
					
					speed = Game.gameConfig.turboVelocity;
						
					asset.x        = _initPosition.x -40;
					asset.y        = _initPosition.y;
					asset.rotation = _initRotation;
					rot            = _initRotation - 360;
					
					firstSegment();
					
					function firstSegment(){

						TweenMax.to(asset, speed/2, {x:_firstCorner.x + 125, angle:rot, onComplete:firstSegment2});
						
					}
					
					function firstSegment2(){
						
						onComplete();
						TweenMax.to(asset, speed/2, {x:_firstCorner.x, angle:rot, onComplete:secondSegment});
						
					}
					
					function secondSegment(){
						
						var ballIndex = _countersController.getCounterValue(OwnCounters.INTERNAL_DRAWNBALLS_COUNTER);
						
						var toRest = 100;
						
						if(ballIndex > 12 && ballIndex < 23) toRest = 77;
						if(ballIndex > 22)	toRest = 52;
						
						TweenMax.to(asset, speed, {y:_finPosition.y - toRest, angle:rot, onComplete:secondSegment2});
						
					}
					
					function secondSegment2(){
						
						rot = _initRotation + 360;
						TweenMax.to(asset, speed, {y:_finPosition.y, angle:rot, onComplete:thirdSegment});
						
					}
					
					function thirdSegment(){
						//la ultima la rotacion es llevarla a 0
						TweenMax.to(asset, speed, {x:_finPosition.x, angle:360});
						
					}

		
				}
				else{

					//DIFERENTS PLAYS SPEED
					//TODO
					speed               = _countersController.getCounterValue(OwnCounters.GAME_SPEED_COUNTER);
					//BORRAR falta standardBar y setear contador desde alli
					speed               = 0.067;//este es la mas rapida de las normales

					_ballAsset.angle    = getStartRotation(_indexPosition); 

					var currentStep     = 40;
					var rotationConst   = 72;
					
					function goNextStep(){

						var rot = _ballAsset.angle - rotationConst;

						function finThisStep(){
							if(_finalPoints[currentStep-1].x == _finPosition.x && _finalPoints[currentStep-1].y == _finPosition.y){
								//aca termina animacion bola, no llama a goNextStep(), fin recursividad
								if(index == 30) onComplete();
							}else{
								
								var newCurrentStep = currentStep - 1;
								
								//bola posicion 38, complete() para que lance la siguiente
								if(_finalPoints[currentStep-1].x == _finalPoints[38-1].x && _finalPoints[currentStep-1].y == _finalPoints[38-1].y){
									if(index < 30) onComplete();
								}
									
									//bola posicion 36, cambio rotacion
								else if(_finalPoints[currentStep-1].x == _finalPoints[36-1].x && _finalPoints[currentStep-1].y == _finalPoints[36-1].y){
									rotationConst = -rotationConst;
								}
									
									//fila extra
								else if(_finalPoints[currentStep-1].x == _finalPoints[35-1].x && _finalPoints[currentStep-1].y == _finalPoints[35-1].y){
									if(_finalPoints[currentStep-1].y == _finPosition.y){
										newCurrentStep = currentStep - 1;
									}else{
										newCurrentStep = currentStep - 5;
									}
								}
									
									//fila arriba
								else if(_finalPoints[currentStep-1].x == _finalPoints[30-1].x && _finalPoints[currentStep-1].y == _finalPoints[30-1].y){
									//ultima normal
									if(_finalPoints[currentStep-1].x == _finPosition.x && _finalPoints[currentStep-1].y == _finPosition.y){ 
										//ULTIMA NORMAL
									}
									
									if(_finalPoints[currentStep-1].y == _finPosition.y){
										newCurrentStep = currentStep - 1;
									}else{
										newCurrentStep = currentStep - 10;
									}
								}
									
									//fila medio
								else if(_finalPoints[currentStep-1].x == _finalPoints[20-1].x && _finalPoints[currentStep-1].y == _finalPoints[20-1].y){
									if(_finalPoints[currentStep-1].y == _finPosition.y){
										newCurrentStep = currentStep - 1;
									}else{
										newCurrentStep = currentStep - 10;
									}	
								}
									
									//fila bajo
								else if(_finalPoints[currentStep-1].x == _finalPoints[10-1].x && _finalPoints[currentStep-1].y == _finalPoints[10-1].y){
									if(_finalPoints[currentStep-1].y == _finPosition.y){
										newCurrentStep = currentStep - 1;
									}else{
										newCurrentStep = currentStep - 10;
									}
								}
								
								currentStep = newCurrentStep;
								goNextStep();
								//setTimeout(goNextStep, 500);
							}
						}

						TweenMax.to(asset, speed, {angle:rot, x: _finalPoints[currentStep -1].x,  y: _finalPoints[currentStep-1].y, onComplete:finThisStep, ease:Linear.easeNone});
					}

					goNextStep();

				}				

			}
	
		}
		
		
		function getStartRotation(_indexPosition){

			var numberOfSteps;
			
			if(_finalPoints[10-1].y == _finPosition.y){
				numberOfSteps = 19 - _indexPosition;
			}
			
			else if(_finalPoints[20-1].y == _finPosition.y){
				//17 = x - 11
				numberOfSteps = 28 - _indexPosition;
			}
			
			else if(_finalPoints[30-1].y == _finPosition.y){
				//16 = x - 21
				numberOfSteps = 37 - _indexPosition;
			}

			return (-72 * 5) + (72 * (5 - (numberOfSteps - 5)));
		}

		this.simpleShowMe = function(win, onComplete) {  //(win:int = 0, onComplete:Function = null):void {

			_ballAsset.visible = true;
			_ballAsset.alpha   = .7;
			_ballAsset.x       = _finPosition.x;
			_ballAsset.y       = _finPosition.y;
			_ballAsset.angle   = -45;
			
			//_ballAsset.cancel.visible = true;
			
			/*if(win !=0){
				_ballAsset.cancel.win.text = win.toString();
			}else{
				_ballAsset.cancel.win.text = "";
			}*/
			
			if(onComplete!=null){
				onComplete();
			}
		}

		/*public function get ballAsset(){
			return _ballAsset;
		}*/

	}

	window.BallView = BallView;

}(window));