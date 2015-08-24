(function(window){


	function ConnectingView(){

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