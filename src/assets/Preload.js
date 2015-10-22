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

   // game.load.image('bg',          '../assets/img/cards/cartela3.png');
    game.load.atlasXML('card', '../assets/img/cards/card.png','../assets/img/cards/card.xml');
    game.load.atlasXML('box',  '../assets/img/cards/box.png', '../assets/img/cards/box.xml');

    //BOTONERA

    /*game.load.spritesheet('turboBtn',  '../assets/img/buttons/turbo.png', 110.7, 30.1);
    game.load.spritesheet('numbersBtn','../assets/img/buttons/numbers.png',  82, 29);
    game.load.spritesheet('autoBtn',   '../assets/img/buttons/auto.png',     82, 29);
    game.load.spritesheet('betBtn',    '../assets/img/buttons/bet.png',      82, 29);
    game.load.spritesheet('playBtn',   '../assets/img/buttons/jugar.png',    82, 29);
    game.load.spritesheet('cardsBtn',  '../assets/img/buttons/cards.png', 110.7, 28.7);*/

    
    game.load.image(  'turboBtn', '../assets/img/buttons/turboBtn.png');
    game.load.atlasXML('playBtn', '../assets/img/buttons/playBtn.png', '../assets/img/buttons/playBtn.xml');

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