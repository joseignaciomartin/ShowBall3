function preload() {


    //XML LANGUAJE

    game.load.text('languageXml', 'lang.xml');

    //CONNECTING
    
    game.load.image('conn_SB3',    '../assets/img/connecting/connecting_SB3.jpg');
    game.load.image('conn_SBL',    '../assets/img/connecting/connecting_SBL.jpg');

	//BACKGROUND

    game.load.image('bg_SB3',    '../assets/img/backGround/bg_SB3.png');
    game.load.image('bg_SBL',    '../assets/img/backGround/bg_SBL.jpg');
    game.load.image('display',   '../assets/img/backGround/display.png');
    game.load.image('barra',     '../assets/img/backGround/barra.png');

    game.load.image('ref',       '../assets/img/backGround/ref.jpg'); //BORRARRRR

    //CARTONES

    game.load.spritesheet('box', '../assets/img/cards/box.png',   33 + 10,  36 + 10);
    game.load.spritesheet('card','../assets/img/cards/card.png', 175 + 10, 147 + 10);
    game.load.spritesheet('line','../assets/img/cards/line.png', 139 + 10,  97 + 10);

    //BOTONERA

    game.load.image(  'turboBtn', '../assets/img/buttons/turboBtn.png');
    //game.load.atlasXML('playBtn', '../assets/img/buttons/playBtn.png', '../assets/img/buttons/playBtn.xml');
    game.load.spritesheet('playBtn',  '../assets/img/buttons/playBtn.png', 96, 123);

   /* for(var i = 0; i<3; i++){
       game.load.image(  'playBtn_' + (i+1).toString(), '../assets/img/buttons/turboBtn.png'); 
    }*/
    

    //DATAPANEL
    //ES
    game.load.image('bola extra',       '../assets/img/dataPanel/ES img/bolaextra_creditos.png');
    game.load.image('bola gratis',      '../assets/img/dataPanel/ES img/fball.png');
    game.load.image('no creditos n',    '../assets/img/dataPanel/ES img/lowcredtxt1.png');
    game.load.image('no creditos r',    '../assets/img/dataPanel/ES img/lowcredtxt2.png');
    game.load.image('presione jugar a', '../assets/img/dataPanel/ES img/playtxt1.png');
    game.load.image('presione jugar b', '../assets/img/dataPanel/ES img/playtxt2.png');
    game.load.image('sorteando bolas',  '../assets/img/dataPanel/ES img/sorttxt.png');
}