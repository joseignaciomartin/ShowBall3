(function(window){

	function Notifications(){}
	
	Notifications.CONNECTING_VIEW_READY_NOTIFICATION    = "CONNECTING_VIEW_READY_NOTIFICATION"; 

	Notifications.INITIAL_RESPONSE_NOTIFICATION         = "INITIAL_RESPONSE_NOTIFICATION";   
	Notifications.STATE_CHANGED_NOTIFICATION            = "STATE_CHANGED_NOTIFICATION";                                                            
	Notifications.CARDS_NUMBERS_CHANGED_NOTIFICATION    = "CARDS_NUMBERS_CHANGED_NOTIFICATION";
	Notifications.CARDS_CONFIG_CHANGED_NOTIFICATION     = "CARDS_CONFIG_CHANGED_NOTIFICATION";
	Notifications.CARDS_ADDED_NOTIFICATION              = "CARDS_ADDED_NOTIFICATION";
	                                                                 
	Notifications.PLAY_SENT_TO_SERVER_NOTIFICATION      = "PLAY_SENT_TO_SERVER_NOTIFICATION";
	Notifications.EXTRA_SENT_TO_SERVER_NOTIFICATION     = "EXTRA_SENT_TO_SERVER_NOTIFICATION";
	Notifications.DRAW_BIG_BALL_NOTIFICATION            = "DRAW_BIG_BALL_NOTIFICATION";
	Notifications.DRAW_SMALL_BALL_NOTIFICATION          = "DRAW_SMALL_BALL_NOTIFICATION";
	Notifications.NORMAL_DRAW_END_NOTIFICATION          = "NORMAL_DRAW_END_NOTIFICATION";
	Notifications.HAS_EXTRA_NOTIFICATION                = "HAS_EXTRA_NOTIFICATION";
	                                                                 
	Notifications.BIG_BALL_DRAWN_NOTIFICATION           = "BIG_BALL_DRAWN_NOTIFICATION";
	Notifications.CANCEL_EXTRA_BALL_NOTIFICATION        = "CANCEL_EXTRA_BALL_NOTIFICATION";
	                                                                 
	Notifications.MARK_BALL_NOTIFICATION                = "MARK_BALL_NOTIFICATION";
	Notifications.MARK_ALMOST_NOTIFICATION              = "MARK_ALMOST_NOTIFICATION";
	Notifications.CHANGE_ALMOST_NOTIFICATION            = "CHANGE_ALMOST_NOTIFICATION";
	Notifications.PAUSE_ALMOST_NOTIFICATION             = "PAUSE_ALMOST_NOTIFICATION";
	Notifications.MARK_WINS_NOTIFICATION                = "MARK_WINS_NOTIFICATION";
	Notifications.UPDATE_PAY_TABLE_NOTIFICATION         = "UPDATE_PAY_TABLE_NOTIFICATION";
	                                                                 
	Notifications.PEEK_SETUP_NOTIFICATION               = "PEEK_SETUP_NOTIFICATION";
	Notifications.AUTOMATIC_PEEK_NOTIFICATION           = "AUTOMATIC_PEEK_NOTIFICATION";
	Notifications.PEEK_END_NOTIFICATION                 = "PEEK_END_NOTIFICATION";
	
	Notifications.UPDATE_MIXER_SPEED_NOTIFICATION       = "UPDATE_MIXER_SPEED_NOTIFICATION";
	Notifications.EXTRA_SIGN_NOTIFICATION               = "EXTRA_SIGN_NOTIFICATION";                                                             
	Notifications.RESET_NOTIFICATION                    = "RESET_NOTIFICATION";
	                                                                 
	Notifications.AUTOPLAY_INTERNAL_STATE_CHANGED       = "AUTOPLAY_INTERNAL_STATE_CHANGED";                                                            
	Notifications.HIDDEN_MENU                           = "HIDDEN_MENU";
	Notifications.START_PAID                            = "START_PAID"; 
	Notifications.END_PAID                              = "END_PAID";

	Notifications.HIDE_JACKPOT_ANIMATION                = "HIDE_JACKPOT_ANIMATION";
	Notifications.KEYBOARD_PRESSED_NOTIFICATION         = "KEYBOARD_PRESSED_NOTIFICATION";
	Notifications.WIN_BLINK_NOTIFICATION                = "WIN_BLINK_NOTIFICATION";
	Notifications.SET_PAY_NOTIFICATION                  = "SET_PAY_NOTIFICATION";

	window.Notifications = Notifications;

}(window));