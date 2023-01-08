let players = [];
let playerName = "John"

const addPlayer = (ev) => {
    ev.preventDefault();    // prevents the form to be submitted everytime there is a click
    
    // variable that will store the player information
    let playerInfo = {
        id: Date.now(),
        name: document.getElementById('name').value
    }
    players.push(playerInfo);
    document.querySelector('form').reset();  // to clear the form for the next entry

    // display the player information that was added to the console
    console.warn("added", {players});

    // save to local storage
    localStorage.setItem('playerList', JSON.stringify(players));

    // prints the entries to the html
    h2 = document.querySelector('h2');
    playerInformation = JSON.parse(localStorage.getItem('playerList'));
    let tmpNames = ""
    for (const [index, info] of playerInformation.entries()) {
        tmpNames += (`Player ${index+1} joined the game: ` + info.name + "<br />");
        playerName = info.name;
    }
    h2.innerHTML = tmpNames;
}

// removes the initial layout after "Start game" button is pressed
var clearPage = (ev) => {
    ev.preventDefault();
    // sets the display to none for the elements with the specified ID
    document.getElementById("initial").style.display = "none";
    document.getElementById("game").style.display = "block";
    
    playerInformation = JSON.parse(localStorage.getItem('playerList'));
    let tmpNames = ""
    for (const [index, info] of playerInformation.entries()) {
        tmpNames += ("Welcome to the game, " + info.name + "!<br />");
    }

    h1 = document.querySelector('h1');
    h1.innerHTML = tmpNames;
    h2 = document.querySelector('h2');
    h2.remove();

    const buttons = document.querySelectorAll('startbtn');
    for (const button of buttons) {
        button.addEventListener('click',function() {
            // Remove the button from the DOM
            button.parentNode.removeChild(button);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click',addPlayer);
    document.getElementById('startbtn').addEventListener('click',clearPage);
});