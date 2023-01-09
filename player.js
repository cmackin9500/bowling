let player = {};

class createPlayer {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.i = 0;
        this.turn = 0;
        console.log("Welcome to the game, " + name + '!');
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
    newRound() {
        if (this.turn === 0) {
            this.turn = 1;
        }
        else {
            this.turn = 1;
            this.i += 1;
        }
        console.log(`Score after round ${(this.i)+1} is ${this.score}`);
    }
}

class scoreBoard extends createPlayer {
    constructor(name) {
        super(name);
        this.score_board = new Array(10).fill(0).map(() => new Array(2).fill(0));
    }
    //set roundScore(roundInfo) {
    //    this.score_board[roundInfo.i][0] = roundInfo.fT;
    //    this.score_board[roundInfo.i][1] = roundInfo.sT;
    //}   
    set roundScore(s) {
        this.score_board[this.i][this.turn] = s;
        this.score += s;
    }
}

function pointsFromThrow() {
    return Math.floor(Math.random() * 11);
}

function logPlayer(playerName) {
    player = new scoreBoard(playerName);
    console.log(player);
}

function throwBall(player) {
    s = pointsFromThrow();

    // for throw #1
    if (player.turn === 0) {
        
        // if previous round was a spare or strike, we add first throw score
        if (player.i !== 0 && ((player.score_board[(player.i)-1][0]+player.score_board[(this.i)-1][1]) === 10)) {
            player.score_board[(player.i)-1][0] += s;
        }
        // if strike
        if (s === 10) {
            console.log("Strike!!!");
        }
    }
    
    // for throw #2
    else {
        // if total is over 10, we adjust the second throw score
        if ((player.score_board[player.i][0]+s) > 10) {
            s = (10-player.score_board[player.i][0]);
        }

        // if previous round was a strike, we also add second throw score
        if (player.i !== 0 && player.score_board[(player.i)-1][0] === 10) {
            player.score_board[(player.i)-1][0] += s;
        }
    }
    player.roundScore = s;
    player.newRound();

    console.log(`Round ${(player.i)+1} throw ${player.turn} score is ${s}`);
    if (player.i === 9 && player.turn === 1) {
        document.getElementById('game').addEventListener('click', () => {
            document.getElementById("game").style.display = "none";
        });
    }
}