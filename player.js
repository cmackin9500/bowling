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
    }

    addTotalToScoreBoard(r,t) {
        // r = this.round, t = this.turn, s = s
        table.rows[2].cells[r].innerHTML = this.score;
        table.rows[1].cells[22].innerHTML = this.score;
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
    //let s = pointsFromThrow();
    let s = 10;

    if (player.round === 10) {
        let [lf,ls] = player.score_board[player.score_board.length-1];
        if((lf+ls) >= 10) {
            player.queue.push([player.round, 1, 0, 0]);
            player.score_board.push([[s]]);
        }
    }

    else {
        // turn 1
        if (player.turn === 0) {
            
            // for strike
            if (s === 10) {
                player.stack.push(1);
                if(player.round < 9)
                    player.turn += 1;
                player.queue.push([player.round, player.turn, 2, 2]);
            }
            else {
                player.queue.push([player.round, player.turn, 0, 1]);
                player.stack.push(0);
            }   
        }

        // turn 2
        else {
            player.stack.push(0);
            // for spare
            if (player.round === 9 && player.score_board[player.round][0] === 10)
                player.queue.push([player.round, player.turn, 1, 1]);

            else if ((player.score_board[player.round][0]+s) > 10) {
                s = (10-player.score_board[player.round][0]);
                player.queue.push([player.round, player.turn, 1, 1]);
            }
            else
                player.queue.push([player.round, player.turn, 0, 0]);
        }
    }
        
    // add score to score board
    if(player.round !== 10)
        player.roundScore = s;
    player.addThrowToScoreBoard(player.round,player.turn,s);

    console.log(`round ${player.round+1} throw ${player.turn}`);
    let display = false;
    if(player.queue[0][3] === 0 && !(player.round === 0 && player.turn === 0)) 
        display = true;

    console.log(`queue lenght is ${player.queue.length}`)
    for (let i=0,len=player.queue.length; i<len; i++) {
        console.log(player.queue[i])
        let [round,turn,type,c] = player.queue.shift();
        if (c !== 0) {
            var newC = c-1;
            player.queue.push([round,turn,type,newC]);
        }
        else {
            // editing table for strike
            console.log(type)
            if(type === 2) {
                let [firstRound,fistTurn] = [player.queue[0][0],player.queue[0][1]];
                let [secondRound,secondTurn] = [player.queue[1][0],player.queue[1][1]];
                player.newScore = player.score_board[firstRound][fistTurn];
                player.newScore = player.score_board[secondRound][secondTurn];
            }
            // editing table for spare
            else if(type === 1) {
                let [firstRound,fistTurn] = [player.queue[0][0],player.queue[0][1]];
                player.newScore = player.score_board[firstRound][fistTurn];
            }
            player.newScore = player.score_board[round][turn];
            if (turn === 1)
                player.addTotalToScoreBoard(round,turn);
        }
    }
    console.log(player.score)
    player.newRound(s);

    /*
    if (player.round === 10 && player.turn === 0) {
        document.getElementById('game').addEventListener('click', () => {
            document.getElementById("game").style.display = "none";
        });
    }
    */
}