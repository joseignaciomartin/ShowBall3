(function(window){

	/*
	imgs -> Array que contiene lista de key (nombre con que se cargaron las imagenes)
	*/
	function phaserMovieClip(imgs, x, y, container){
		
		var movie = game.add.sprite(0, 0, imgs[0]);
		movie.x = x
		movie.y = y;
		container.add(movie);

		this.gotoAndPlay = function(frame){

		}

		this.gotoAndStop = function(frame){
			if(imgs[frame - 1]) background.loadTexture(imgs[frame - 1]);
		}

		this.play = function(){

		}

		this.stop = function(){
			
		}

		this.changeLang = function(lang){
			if(lang == "ES"){
				_this.gotoAndStop(0);
			}
			else if(lang == "PT"){
				_this.gotoAndStop(1);
			}
			else if(lang == "EN"){
				_this.gotoAndStop(2);
			}
		}

	}

}(window));