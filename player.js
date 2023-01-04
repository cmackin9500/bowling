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

function firstThrow() {
    return Math.floor(Math.random() * 11);
}

function secondThrow() {
    return Math.floor(Math.random() * 11);
}

let player = new createPlayer('Peter');

for(let i=0; i < 10; i++) {
    player.newScore = firstThrow();
    player.newScore = secondThrow();
    console.log(`Score after round ${i+1} is ${player.score}`);
}

console.log(`Final score for ${player.name} is ${player.score}.`)
