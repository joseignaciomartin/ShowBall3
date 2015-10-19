function preload() {


    //XML LANGUAJE

    game.load.text('languageXml', 'lang.xml');

    //CONNECTING
    
    game.load.image('conn_SB3',    '../assets/img/connecting/connecting_SB3.jpg');
    game.load.image('conn_SBL',    '../assets/img/connecting/connecting_SBL.jpg');

	//BACKGROUND

    game.load.image('bg_SB3',      '../assets/img/backGround/bg_SB3.jpg');
    game.load.image('bg_SBL',      '../assets/img/backGround/bg_SBL.jpg');
    game.load.image('ref',         '../assets/img/backGround/ref.jpg');
    game.load.image('phantonball', '../assets/img/backGround/phantonball.png');

    //CARTONES

    game.load.image('bg',          '../assets/img/cards/cartela3.png');
    game.load.image('shoot',       '../assets/img/cards/tiro_negro.png');

    game.load.atlasXML('box', '../assets/img/cards/box.png', '../assets/img/cards/box.xml');

    /*game.load.image('whiteBox',    '../assets/img/cards/whiteBox.png');
    game.load.image('redBox',      '../assets/img/cards/redBox.png');
    game.load.image('blackBox',    '../assets/img/cards/blackBox.png');
    game.load.image('alomostBox1', '../assets/img/cards/alomostBox1.png');
    game.load.image('alomostBox2', '../assets/img/cards/alomostBox2.png');*/

    //BOTONERA

    /*game.load.image('Button',    '../assets/img/buttons/Button.png');
    game.load.image('Cards',     '../assets/img/buttons/Cards.png');
    game.load.image('Cartelas',  '../assets/img/buttons/Cartelas.png');
    game.load.image('Tarjetas',  '../assets/img/buttons/Tarjetas.png');*/

    game.load.spritesheet('turboBtn',  '../assets/img/buttons/turbo.png', 110.7, 30.1);
    game.load.spritesheet('numbersBtn','../assets/img/buttons/numbers.png',  82, 29);
    game.load.spritesheet('autoBtn',   '../assets/img/buttons/auto.png',     82, 29);
    game.load.spritesheet('betBtn',    '../assets/img/buttons/bet.png',      82, 29);
    game.load.spritesheet('playBtn',   '../assets/img/buttons/jugar.png',    82, 29);
    game.load.spritesheet('cardsBtn',  '../assets/img/buttons/cards.png', 110.7, 28.7);


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