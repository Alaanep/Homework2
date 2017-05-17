var result;
var computerSelected;
var user, computer;


//player object constructor
function Player(move, name, moves, score, round, result){
	this.move=move;	//players move rock, paper, scissors
	this.playerName=name; //player name
	this.moves=moves; // array to hold players moves history
	this.score=score; //player overall score
	this.round=round; //game round
	this.totalSeconds=0;
	this.result=result;

	//add rounds
	Player.prototype.addRound=function(){
		this.round+=1;
	};

	//add score
	Player.prototype.addScore=function(){
		this.score+=1;
	};

	//add currend move, round, result, roundtime and totaltime to moves list
	Player.prototype.updatePlayer = function(result, roundtime=0){
		this.moves.push({round: this.round,  move: this.move, result: result, roundtime: roundtime, totaltime:0,});
	};

	//get score
	Player.prototype.getScore=function(){
		return this.score;
	};

	//get rounds
	Player.prototype.getRounds=function(){
		return this.round;
	};

	//get player Name
	Player.prototype.getUserName=function(){
		return this.playerName;
	};
};


var totalSeconds=0;
var roundSeconds=0;
var timerTotal, timerRound; 
//total game timer
function totalCountTimer() {
	var hours = Math.floor(totalSeconds /3600);
	var minutes = Math.floor((totalSeconds - hours*3600)/60);
	var seconds = totalSeconds - (hours*3600 + minutes*60);
	document.getElementById("totaltime").innerHTML = ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
	++totalSeconds;
	document.getElementById("totaltime").innerHTML = ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
}
//game round timer
function roundCountTimer() {	
	var hours = Math.floor(roundSeconds /3600);
	var minutes = Math.floor((roundSeconds - hours*3600)/60);
	var seconds = roundSeconds - (hours*3600 + minutes*60);
	document.getElementById("roundtime").innerHTML = ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
	++roundSeconds;
	document.getElementById("roundtime").innerHTML = ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
}

//initialize user and computer objects
function init(){
	totalSeconds=0;
	roundSeconds=0;
	timerTotal = setInterval(totalCountTimer, 1000);
	timerRound=setInterval(roundCountTimer, 1000);
	user=new Player("", 'Player', [],0, 0);
	computer=new Player("", 'Computer', [], 0, 0);
	document.getElementById('userImage').src='img/chooseyourweapon.png'
	document.getElementById('computerImage').src='img/chooseyourweapon.png'
	document.getElementById('result').innerHTML='0';
	document.getElementById('rounds').innerHTML=user.getRounds();
    document.getElementById('playerScore').innerHTML=user.getScore();
    document.getElementById('computerScore').innerHTML=computer.getScore(); 
}


$(document).ready(function(){
    $(".userChoice").click(function(){
    	//start and clear the timer
    	clearInterval(timerRound)
    	roundSeconds=0;
    	timerRound=setInterval(roundCountTimer, 1000);
    	//update round count
    	user.addRound();
    	//get user choice from button clicked
        user.move=$(this).val();
        computer.move=computerChoice();
        //change user img accordingly to user choice
        document.getElementById('userImage').src='img/'+user.move+'.png'
        //change computer img accordingly to computer choice
		document.getElementById('computerImage').src='img/'+computer.move+'.png'
        //calculate winner
        result=compare(user.move, computer.move);
        //$("<span>"+result+"</span><br>").insertAfter('#result');        
        //update user and computer moves array
        user.updatePlayer(result);
        computer.updatePlayer(result);
        //update HTML
        document.getElementById('rounds').innerHTML=user.getRounds();
        document.getElementById('playerScore').innerHTML=user.getScore();
        document.getElementById('computerScore').innerHTML=computer.getScore();
        document.getElementById('result').innerHTML=result;
        console.log(user.move)
        console.log(user.moves[(user.moves.length)-1].move)
    });
});


//computer makes a choice
function computerChoice(){
	//random choice
	var computerMove=Math.floor(Math.random() * 3) + 1 
	if (computerMove==1){
		computerMove='rock';
	} else if (computerMove==2){
		computerMove='scissors';
	} else {
		computerMove='paper';
	}
	//computer strategy
	if(user.moves.length>=4){
		if(user.moves[(user.moves.length)-1].move == user.moves[(user.moves.length)-2].move && user.moves[(user.moves.length)-2].move == user.moves[(user.moves.length)-3].move && user.moves[(user.moves.length)-3].move==user.moves[(user.moves.length)-4].move)
			if (user.move=='rock'){
				computerMove='paper';
			}else if (user.move=='paper'){
				computerMove='scissors';
			}else if (user.move=='scissors'){
				computerMove='rock';
			}
	}
	return computerMove;
	
}

//compare function will determine who win
function compare(choice1, choice2){
	if (choice1==choice2){
		return 'TIE';
	} else if (choice1=='rock'){
		if(choice2=='scissors'){
			user.addScore();
			return user.getUserName() +' wins with Rock!';
		} else {
			computer.addScore();
			return computer.getUserName() +' wins with paper!';
		}
	} else if(choice1=='paper'){
		if (choice2=='rock'){
			user.addScore();
			return user.getUserName() + ' wins with paper!';
		}else{
			computer.addScore();
			return computer.getUserName() + ' wins with scissors!';
		}
	} else if(choice1 == "scissors"){
		if(choice2 =="rock"){
			computer.addScore();
			return computer.getUserName() + " wins with rock!";
		} else {
			user.addScore();
			return user.getUserName() + " wins with scissors!";
		}
	}
}