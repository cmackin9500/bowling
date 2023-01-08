class createPlayer {
    constructor(name) {
        this.name = name;
        this.score = 0;
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
}

class scoreBoard extends createPlayer {
    constructor(name) {
        super(name);
        this.score_board = new Array(10).fill(0).map(() => new Array(2).fill(0));
    }
    set roundScore(roundInfo) {
        this.score_board[roundInfo.i][0] = roundInfo.fT;
        this.score_board[roundInfo.i][1] = roundInfo.sT;
    }   
}

function pointsFromThrow() {
    return Math.floor(Math.random() * 11);
}

function main() {
    let player = new scoreBoard('Peter');

    for(let i=0; i < 10; i++) {

        fT = pointsFromThrow();
        sT = pointsFromThrow();
        if ((fT+sT) > 10) {
            sT = (10-fT);
        }

        if (i > 0) {
            if (player.score_board[i-1][0] === 10) {
                player.score_board[i-1][0] += (fT+sT);
                player.newScore = (fT+sT);
            }
            else if ((player.score_board[i-1][0]+player.score_board[i-1][1]) === 10) {
                player.score_board[i-1][0] += fT;
                player.newScore = fT;
            }
        }
        let roundInfo = {
            i: i,
            fT: fT,
            sT: sT
        };

        player.roundScore = roundInfo;
        player.newScore = fT;
        player.newScore = sT;
        console.log(`Score after round ${i+1} is ${player.score}`);
    }

    console.log(`Final score for ${player.name} is ${player.score}.`)
}