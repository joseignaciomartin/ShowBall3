(function(window){

	function GameView(){
		
		var cardView = new CardView();

        var numbers = [88,89,90,04,05,06,07,08,09,10,11,12,12,13,14];
        cardView.setNumbers(numbers);
        cardView.mark(9);

        var buttonsContainer = new ButtonsContainer();

	}


    //to global scope access:
    window.GameView = GameView;


}(window));