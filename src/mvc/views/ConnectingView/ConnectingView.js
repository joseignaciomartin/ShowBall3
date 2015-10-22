(function(window){

	function ConnectingView(){
		var _connectingViewContainer  = game.add.group();

		this.type = "ConnectingView";

		this.getView = function(){
			return _connectingViewContainer;
		}


		// se va este evento no?
	    // hay que agregar un alert de control en el ApplicationController, cuando se registra una ApplicationView, debe tener
	    // onShow y onHide
	
	    //ConnectingView.prototype.onShow = function(event){
		this.onShow = function(event){

			var bg;
			Game.gameConfig.gameName == "Show Ball 3"? bg = game.add.sprite(0, 0, 'conn_SB3') : bg = game.add.sprite(0, 0, 'conn_SBL');
			_connectingViewContainer.add(bg);
			

			//translatorController = ApplicationController.getApplicationController().getController(TranslatorController) as TranslatorController;
			//translatorController.addTranslatable((asset as Object).con_text, "CONNECTING", "CONNECTING", false, false);
			


			//Esto no puede ir aca, tiene que mandar una notificacion de que la vista esta lista.
			//(_controller as ConnectionController).initConnection();
			
			ApplicationController.getApplicationController().sendNotification(Notifications.CONNECTING_VIEW_READY_NOTIFICATION, true);
		}

		this.onHide = function(event){
			/*
			super.onHide(e);
			translatorController.removeTranslatable("CONNECTING");
			if(asset && asset.parent){
				asset.parent.removeChild(asset);
				asset = null;
			}*/
		}
	}



// TODO
/*
	private var translatorController:TranslatorController;	
*/

	ConnectingView.prototype = ApplicationView.prototype;
    window.ConnectingView    = ConnectingView;

}(window));