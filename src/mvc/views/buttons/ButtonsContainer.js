(function(window){

	function ButtonsContainer(){
		createButtons();
	}

	function createButtons(){
	    var Button = game.add.sprite(249, 404, 'Button');
	    var Cards = game.add.sprite(367, 177, 'Cards');
	    var Cartelas = game.add.sprite(271, 177, 'Cartelas');
	    var Tarjetas = game.add.sprite(177, 177, 'Tarjetas');
	}

    window.ButtonsContainer = ButtonsContainer;

}(window));