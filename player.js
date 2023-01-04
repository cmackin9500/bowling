const readline = require("readline");

class createPlayer {
    constructor(name) {
        this.name = name;
        this.score = 0;
        console.log("Welcome to the game, " + name);
    }
    get getScore() {
        return this.score;
    }
    get getName() {
        return this.name;
    }
    set newScore(pointsToAdd) {
        this.score += pointsToAdd;
    }
}

class scoreBoard extends createPlayer {
    constructor(name) {
        super(name);
        this.score_board = Array(10).fill([0,0]);
    }
    set roundScore(roundInfo) {
        this.score_board[roundInfo[0]][0] = roundInfo[1];
        this.score_board[roundInfo[0]][1] = roundInfo[2];
        console.log(this.score_board[roundInfo[0]])
    }   
}

function pointsFromThrow() {
    return Math.floor(Math.random() * 11);
}

let player = new scoreBoard('Peter');

for(let i=0; i < 10; i++) {
    fT = pointsFromThrow();
    sT = pointsFromThrow();
    player.roundScore = [i,fT,sT];
    player.newScore = fT
    player.newScore = sT;
    console.log(`Score after round ${i+1} is ${player.score}`);
}

console.log(`Final score for ${player.name} is ${player.score}.`)
console.log(player.score_board);
