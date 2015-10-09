(function(window){

	function OwnCounters(){}
				
		//numeric
		OwnCounters.INTERNAL_DRAWNBALLS_COUNTER = "INTERNAL_DRAWNBALLS_COUNTER";
		OwnCounters.TOSHOW_DRAWNBALLS_COUNTER   = "TOSHOW_DRAWNBALLS_COUNTER";
		OwnCounters.CARDS_ENABLED_COUNTER       = "CARDS_ENABLED_COUNTER";
		OwnCounters.GAME_SPEED_COUNTER          = "GAME_SPEED_COUNTER";
		OwnCounters.EXTRA_COST_COUNTER          = "EXTRA_COST_COUNTER";
		OwnCounters.TOTAL_ALMOST_COUNTER        = "TOTAL_ALMOST_COUNTER";
		OwnCounters.WIN_CARD_COUNTER_           = "WIN_CARD_COUNTER_";
		
		//boolean
		OwnCounters.FIN_INIT                    = "FIN_INIT";
		OwnCounters.SHOWING_HELP                = "SHOWING_HELP";
		OwnCounters.ALMOST_BINGO                = "ALMOST_BINGO";
		OwnCounters.JACKPOT_PAYED               = "JACKPOT_PAYED";
		OwnCounters.HAS_EXTRA                   = "HAS_EXTRA";
		OwnCounters.RESET_FINISHED              = "RESET_FINISHED";

	window.OwnCounters = OwnCounters;

}(window));