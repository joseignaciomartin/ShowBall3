function BingoGameConfig(){
	this.gameType   = "BINGO";
	this.gameName   = "Show Ball 3";
	this._gameName  = "Show Ball Light";
	this.forceDummy = 0;
	this.isTesting  = 1; 
	this.parametersIfTesting =
	 {
	  language:"es",
	  session:"FEDE_SHOWBALL3",
	  _session:"LOG|p123pic123|6|149169|2015-05-15 16:02:22|2015-05-15 16:04:10|11964|1111|10|25|64250|49500|25000|22214|[3;50;53;90;198;198;198;198;366;366;369;376]|[26;52;55;62;58;60;63;66;66;69;72]|5|2071.66250000001||[2;23;39;56;74;5;25;47;60;87;15;26;50;66;88;4;20;41;57;79;6;30;46;65;83;14;34;48;68;86;3;19;38;63;77;8;22;45;67;81;13;31;51;69;89;16;21;40;58;75;17;29;43;59;82;18;35;52;64;84]|[26;2;38;87;56;39;29;8;86;52;68;66;84;25;5;88;50;67;15;23;4;43;51;14;77;64;40;82;59;16;60;18;75;47;79;69;19;17;22;3;63]|LinInf|Quadrado,TriangCima|Quadrado,TriangCima,PremioA|Quadrado,TriangCima,DuploX|LinDuplaInf,Quadrado,TriangCima,Cruz,DuploX|LinDuplaInf,Quadrado,TriangCima,Cruz,DuploX|LinDuplaInf,Quadrado,TriangCima,Cruz,DuploX|LinDuplaInf,Quadrado,TriangCima,Cruz,DuploX|LinDuplaInf,Quadrado,TriangCima,Cruz,PremioMeW,Cruz|LinDuplaInf,Quadrado,TriangCima,Cruz,PremioMeW,Cruz|LinDuplaInf,Quadrado,TriangCima,Cruz,PremioV,PremioMeW,Cruz|LinDuplaInf,Quadrado,TriangCima,Cruz,TriangBaixo,PremioMeW,Cruz|1ODYX5FMG4NH20150515155951|_HIT_",
	  _session:"LOG|aladdin|37|19039462|2015-04-16 22:05:56|2015-04-16 22:06:34|4822|1111|1|25|6575|3825|0|2072|[3;100;103;103;106;113;153;153;153;153;153;153]|[5;14;14;14;15;19;42;43;45;48;83]|11|47859.4273043246||[2;20;38;59;80;10;27;48;69;85;11;35;52;70;88;6;19;41;62;75;14;22;49;66;83;17;26;50;68;89;1;21;37;56;81;9;23;43;61;82;12;29;45;64;87;4;24;40;65;77;5;30;46;67;78;8;34;47;72;79]|[40;17;77;21;80;5;50;22;4;61;34;72;1;87;83;27;2;62;45;68;56;12;29;37;66;70;19;64;75;52;81;69;8;6;41;89;59;35;67;82;43]|LinInf|LinDuplaCen|PremioV,LinDuplaCen|PremioV,LinDuplaCen|PremioV,PremioV,LinDuplaCen|PremioV,TriangBaixo,LinDuplaCen|PremioV,DuploX,TriangBaixo,LinDuplaCen|PremioV,DuploX,TriangBaixo,LinDuplaCen|PremioV,DuploX,TriangBaixo,LinDuplaCen|PremioV,DuploX,TriangBaixo,LinDuplaCen|PremioV,DuploX,TriangBaixo,LinDuplaCen|PremioV,DuploX,TriangBaixo,LinDuplaCen|8ID1J5T7NMBR20150416094718|_HIT_",
	  routes:"",
	  //hostName:"173.192.149.236",//
	  hostName:"ws://localhost:2012/",
	  //hostName:"ws://10.0.0.32:2012/", //maquina pablo
	  swfUrl:"http://test.webstarsaffiliate.com/games/ShowBall3/",
	  is_log:0,
	  is_free:0,
	  version:"_001"
 	};
 	this.loadCardsStateDuringPlay = 0;
 	this.printDuringPlayData = 0;
	this.numberOfBalls = 30;
	this.numberOfExtraBalls = 11;
	this.maxBallNumber = 90;
	this.maxBet = 20;
	this.coinValues = [5,10,25];
	this.cardsSize =  {x:5, y:3};
	this.useWonCreditsToPlay = 1;
    this.prizes = [                                                                                                       
		{index:0,  name:"Bingo",       pay:1500, definition:[1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  1, 1, 1, 1, 1], overriddenIndexes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]},
        {index:1,  name:"Perimetro",   pay:750,  definition:[1, 1, 1, 1, 1,  1, 0, 0, 0, 1,  1, 1, 1, 1, 1], overriddenIndexes: [5, 16, 18]},                        
        {index:2,  name:"DuploTriang", pay:500,  definition:[1, 1, 1, 1, 1,  0, 1, 0, 1, 0,  1, 1, 1, 1, 1], overriddenIndexes: [5, 9, 10, 11, 12, 14, 15, 16, 18]},                      
        {index:3,  name:"PremioMeW",   pay:200,  definition:[1, 0, 1, 0, 1,  1, 1, 0, 1, 1,  1, 0, 1, 0, 1], overriddenIndexes: [7, 8, 10, 14, 15]},                          
        {index:4,  name:"LinDuplaSup", pay:100,  definition:[1, 1, 1, 1, 1,  1, 1, 1, 1, 1,  0, 0, 0, 0, 0], overriddenIndexes: [16, 17]},                      
        {index:5,  name:"LinDuplaCen", pay:100,  definition:[1, 1, 1, 1, 1,  0, 0, 0, 0, 0,  1, 1, 1, 1, 1], overriddenIndexes: [16, 18]},                        
        {index:6,  name:"LinDuplaInf", pay:100,  definition:[0, 0, 0, 0, 0,  1, 1, 1, 1, 1,  1, 1, 1, 1, 1], overriddenIndexes: [17, 18]},                      
        {index:7,  name:"PremioW",     pay:100,  definition:[1, 0, 1, 0, 1,  1, 1, 0, 1, 1,  1, 0, 0, 0, 1], overriddenIndexes: [14]},                        
        {index:8,  name:"PremioM",     pay:100,  definition:[1, 0, 0, 0, 1,  1, 1, 0, 1, 1,  1, 0, 1, 0, 1], overriddenIndexes: [15]},                      
        {index:9,  name:"Quadrado",    pay:40,   definition:[0, 1, 1, 1, 0,  0, 1, 0, 1, 0,  0, 1, 1, 1, 0], overriddenIndexes: []},
        {index:10, name:"DuploX",      pay:40,   definition:[1, 0, 1, 0, 1,  0, 1, 0, 1, 0,  1, 0, 1, 0, 1], overriddenIndexes: [14, 15]},                         
        {index:11, name:"TriangCima",  pay:10,   definition:[0, 0, 1, 0, 0,  0, 1, 0, 1, 0,  1, 1, 1, 1, 1], overriddenIndexes: [14, 18]},                    
        {index:12, name:"TriangBaixo", pay:10,   definition:[1, 1, 1, 1, 1,  0, 1, 0, 1, 0,  0, 0, 1, 0, 0], overriddenIndexes: [15, 16]},                       
        {index:13, name:"Cruz",        pay:8,    definition:[0, 0, 1, 0, 0,  1, 1, 1, 1, 1,  0, 0, 1, 0, 0], overriddenIndexes: [17]},                      
        {index:14, name:"PremioA",     pay:3,    definition:[0, 0, 1, 0, 0,  0, 1, 0, 1, 0,  1, 0, 0, 0, 1], overriddenIndexes: []},                       
        {index:15, name:"PremioV",     pay:3,    definition:[1, 0, 0, 0, 1,  0, 1, 0, 1, 0,  0, 0, 1, 0, 0], overriddenIndexes: []},                       
        {index:16, name:"LinSup",      pay:3,    definition:[1, 1, 1, 1, 1,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0], overriddenIndexes: []},                    
        {index:17, name:"LinCen",      pay:3,    definition:[0, 0, 0, 0, 0,  1, 1, 1, 1, 1,  0, 0, 0, 0, 0], overriddenIndexes: []},                
        {index:18, name:"LinInf",      pay:3,    definition:[0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  1, 1, 1, 1, 1], overriddenIndexes: []}
	];                                                                                                               
	this.mapping_prizes_payCards = [
		{indexPrize:0,  indexPayCards:"0"},
		{indexPrize:1,  indexPayCards:"1"},
		{indexPrize:2,  indexPayCards:"2"},
		{indexPrize:3,  indexPayCards:"3"},
		{indexPrize:4,  indexPayCards:"4"},
		{indexPrize:5,  indexPayCards:"4"},
		{indexPrize:6,  indexPayCards:"4"},
		{indexPrize:7,  indexPayCards:"5"},
		{indexPrize:8,  indexPayCards:"5"},
		{indexPrize:9,  indexPayCards:"6"},
		{indexPrize:10, indexPayCards:"7"},
		{indexPrize:11, indexPayCards:"8"},
		{indexPrize:12, indexPayCards:"8"},
		{indexPrize:13, indexPayCards:"9"},
		{indexPrize:14, indexPayCards:"10"},
		{indexPrize:15, indexPayCards:"10"},
		{indexPrize:16, indexPayCards:"11"},
		{indexPrize:17, indexPayCards:"11"},
		{indexPrize:18, indexPayCards:"11"}
	];
	this.maxPayCards           = 12;
	this.amountOfPayCardsLines = 2;
	this.stopOnPrizes          = [0,1,2,3,4,5,6,7,8,9];
	this.normalVelocities      = [0.34, 0.067, 0.03];
	this.turboVelocity         = 0.001;
	this.initialSpeedIndex     = 1;
	this.help = 
	{
		PageCount:3,
		textPerPage:[1,1,6,1,2]
	};
	this.jackpotRules = 
	{
		lastBallToWinJackpot:30,
		minimumBetToWinJackpot:3,
		minimumCardsOpenToWinJackpot:4
	};
}




/*
{

	this.gameType   = "BINGO";
	this.gameName   = "Show Ball 3";
	this._gameName  = "Show Ball Light",
	this.forceDummy = false;
	this.isTesting  = true; 
	this.toWeb      = false; 
	this.parametersIfTesting =
	 {
	  language:"pt",
	  session:"88888",
	  routes:"",
	  //hostName:"173.192.149.236",//
	  hostName:"ws://localhost:2012/",
	  //hostName:"ws://192.168.1.12:2012/", //maquina pablo
	  swfUrl:"",
	  is_log:0,
	  is_free:0,
	  version:"_001"
 	};
 	this.supportedLanguages       = ["EN", "ES", "PT"];
 	this.loadCardsStateDuringPlay = 0;
	this.essentialSoundIndex      = 1;
	this.numberOfBalls            = 33;
	this.numberOfExtraBalls       = 10;
	this.maxBallNumber            = 90;
	this.maxBet                   = 10;
	this.coinValues               = [5,10,25];
	this.cardsSize                = {x:5, y:3};
	this.useWonCreditsToPlay = 1;
	this.prizes = [
		{index:0,  name:"Bingo",        pay:1500,  definition:[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  	overriddenIndexes:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
		{index:1,  name:"Perimeter",    pay:600,   definition:[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],  	overriddenIndexes:[6,11,12,14]},
		{index:2,  name:"DoubleH",      pay:300,   definition:[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],  	overriddenIndexes:[8,9,11,13,15,16]},
		{index:3,  name:"Tower",        pay:200,   definition:[1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],  	overriddenIndexes:[4,12,16]},
		{index:4,  name:"DoubleT",  	pay:100,   definition:[1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],  	overriddenIndexes:[12]},
		{index:5,  name:"DoubLinSup",   pay:100,   definition:[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],  	overriddenIndexes:[12,13]},
		{index:6,  name:"DoubLinCen",   pay:100,   definition:[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],  	overriddenIndexes:[12,14]},
		{index:7,  name:"DoubLinInf",   pay:100,   definition:[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  	overriddenIndexes:[13,14]},
		{index:8,  name:"DoubleX",		pay:40,    definition:[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],  	overriddenIndexes:[15,16]},
		{index:9,  name:"ArrowDown",    pay:40,    definition:[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],  	overriddenIndexes:[13,16]},
		{index:10, name:"TriangUp",  	pay:10,    definition:[0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],  	overriddenIndexes:[14,15]},
		{index:11, name:"Sides",        pay:8,     definition:[1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],  	overriddenIndexes:[]},
		{index:12, name:"LinSup",       pay:3,     definition:[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  	overriddenIndexes:[]},
		{index:13, name:"LinCen", 		pay:3,     definition:[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],  	overriddenIndexes:[]},
		{index:14, name:"LinInf",       pay:3,     definition:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],  	overriddenIndexes:[]},
		{index:15, name:"PrizeA", 	    pay:3,     definition:[0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],  	overriddenIndexes:[]},
		{index:16, name:"PrizeV",       pay:3,     definition:[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],  	overriddenIndexes:[]}
	];
	this.mapping_prizes_payCards = [
		{indexPrize:0,  indexPayCards:"0"},
		{indexPrize:1,  indexPayCards:"1"},
		{indexPrize:2,  indexPayCards:"2"},
		{indexPrize:3,  indexPayCards:"3"},
		{indexPrize:4,  indexPayCards:"4"},
		{indexPrize:5,  indexPayCards:"5"},
		{indexPrize:6,  indexPayCards:"5"},
		{indexPrize:7,  indexPayCards:"5"},
		{indexPrize:8,  indexPayCards:"6"},
		{indexPrize:9,  indexPayCards:"7"},
		{indexPrize:10, indexPayCards:"8"},
		{indexPrize:11, indexPayCards:"9"},
		{indexPrize:12, indexPayCards:"10"},
		{indexPrize:13, indexPayCards:"10"},
		{indexPrize:14, indexPayCards:"10"},
		{indexPrize:15, indexPayCards:"11"},
		{indexPrize:16, indexPayCards:"11"}
	];
	this.maxPayCards           = 12;
	this.amountOfPayCardsLines = 2;
	this.stopOnPrizes          = [0, 1, 2];
	this.normalVelocities      = [0.9, 0.4, 0.09];
	this.turboVelocity         = 0.80;
	this.initialSpeedIndex     = 2;
	this.help = 
	{
		PageCount:6,
		textPerPage:[4,1,1,1,1,1]
	};	
	this.jackpotRules =
	{
		lastBallToWinJackpot:30,
		minimumBetToWinJackpot:1,
		minimumCardsOpenToWinJackpot:4
	}
}
*/