var player = {};

class createPlayer {
    constructor(name) {
        this.name = name;       // player name
        this.score = 0;         // total score of player
        this.round = 0;         // round number
        this.turn = 0;          // 1st or 2nd throw of each round. Could be 3rd for final round
        this.queue = [];        // [player.round, player.turn, 1 for strike and 0 for the rest, next # rounds to count]
        this.stack = [];        // stores all the previous scores
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
    newRound(s) {
        console.log(`Round ${(this.round)+1} throw ${this.turn+1} score is ${s}`);
        if (this.turn === 0) {
            this.turn = 1;
        }
        else {
            this.turn = 0;
            this.round += 1;
            console.log(`Score after round ${this.round} is ${this.score}`);
        }
    }
}

class scoreBoard extends createPlayer {
    constructor(name) {
        super(name);
        this.score_board = new Array(10).fill(0).map(() => new Array(2).fill(0));
    } 
    set roundScore(s) {
        this.score_board[this.round][this.turn] = s;
        //this.score += s;
    }

    addThrowToScoreBoard(r,t,s) {
        // r = this.round, t = this.turn, s = s
        table.rows[1].cells[1+2*r+t].innerHTML = s;
        //table.rows[2].cells[r].innerHTML = this.score;
        //table.rows[1].cells[21].innerHTML = this.score;
    }

    addTotalToScoreBoard(r,t) {
        // r = this.round, t = this.turn, s = s
        table.rows[2].cells[r].innerHTML = this.score;
        table.rows[1].cells[21].innerHTML = this.score;
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
    let s = pointsFromThrow();

    if (player.round === 9) {

    }

    else {
        // turn 1
        if (player.turn === 0) {
            
            // for strike
            if (s === 10) {
                player.stack.push(1)
                player.queue.push([player.round, player.turn, 2, 2]);
            }
            else {
                player.stack.push(0);
                if (player.stack[player.stack.length-1] === "s")
                    player.queue.push([player.round, player.turn, 0, 1]);
                else 
                    player.queue.push([player.round, player.turn, 0, 0]);
            }   
        }

        // turn 2
        else {
            player.stack.push(0);
            // for spare
            if ((player.score_board[player.round][0]+s) > 10) {
                s = (10-player.score_board[player.round][0]);
                player.queue.push([player.round, player.turn, 1, 1]);
            }
            else
                player.queue.push([player.round, player.turn, 0, 0]);
        }
    }
        
    // add score to score board
    player.roundScore = s;
    player.addThrowToScoreBoard(player.round,player.turn,s);

    for (let i=0; i<player.queue.length; i++) {
        var [round,turn,type,c] = player.queue.shift();
        if (c > 0)
            player.queue.push([round,turn,type,c-1]);
        else {
            // editing table for strike
            if(type === 2) {
                let [firstRound,fistTurn] = [player.queue[0][0],player.queue[0][1]];
                let [secondRound,secondTurn] = [player.queue[1][0],player,queue[1][1]];
                player.newScore = player.score_board[firstRound][fistTurn];
                player.newScore = player.score_board[secondRound][secondTurn];
            }
            // editing table for spare
            else if(type === 1) {
                let [firstRound,fistTurn] = [player.queue[0][0],player.queue[0][1]];
                player.newScore = player.score_board[firstRound][fistTurn];
            }
            player.newScore = player.score_board[round][turn];
            player.addTotalToScoreBoard(round,turn);

        }
    }
    player.newRound(s);

    //player.roundScore = s;
    //player.addToScoreBoard(player.round,player.turn,s);
    //player.newRound();

    if (player.round === 10 && player.turn === 0) {
        document.getElementById('game').addEventListener('click', () => {
            document.getElementById("game").style.display = "none";
        });
    }
}