(function(window){

	var _connectingViewContainer;
	
	GameView.prototype.type = "ConnectingView";
	
	function ConnectingView(){
		createConnectingView();
	}


	function createConnectingView(){

		_connectingViewContainer  = game.add.group();

		var bg;
		Game.gameConfig.gameName == "Show Ball 3"? bg = game.add.sprite(-151, 0, 'conn_SB3') : bg = game.add.sprite(-151, 0, 'conn_SBL');
		_connectingViewContainer.add(bg);
	}

	ConnectingView.prototype.getView = function(){
		return _connectingViewContainer;
	}






	// se va este evento no?
	// hay que agregar un alert de control en el ApplicationController, cuando se registra una ApplicationView, debe tener
	// onShow y onHide
	function onShow(event){
		
		/*
		super.onShow(e);
		
		asset   = new mc_connecting();
		asset.x = ShowBall3.STAGE_WIDTH/2;
		asset.y = ShowBall3.STAGE_HEIGHT/2;
		asset.gotoAndStop(ShowBall3._gameConfig.gameName);
		getDisplayObject().addChild(asset);
		*/
		

		

		//translatorController = ApplicationController.getApplicationController().getController(TranslatorController) as TranslatorController;
		//translatorController.addTranslatable((asset as Object).con_text, "CONNECTING", "CONNECTING", false, false);
		


		//Esto no puede ir aca, tiene que mandar una notificacion de que la vista esta lista.
		//(_controller as ConnectionController).initConnection();

	}





// TODO
/*
		private var asset:MovieClip;
		private var translatorController:TranslatorController;
		
		public function ConnectingView(){ super(false); }
		

		override protected function onShow(e:Event):void{
			
			super.onShow(e);
			
			asset   = new mc_connecting();
			asset.x = ShowBall3.STAGE_WIDTH/2;
			asset.y = ShowBall3.STAGE_HEIGHT/2;
			
			asset.gotoAndStop(ShowBall3._gameConfig.gameName);
			getDisplayObject().addChild(asset);
			
			translatorController = ApplicationController.getApplicationController().getController(TranslatorController) as TranslatorController;
			translatorController.addTranslatable((asset as Object).con_text, "CONNECTING", "CONNECTING", false, false);
			
			(_controller as ConnectionController).initConnection();
			
		}
		

		override protected function onHide(e:Event):void{
			
			super.onHide(e);
			translatorController.removeTranslatable("CONNECTING");
			if(asset && asset.parent){
				asset.parent.removeChild(asset);
				asset = null;
			}
		}

*/


    window.ConnectingView = ConnectingView;

}(window));