let players = [];

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
    }
    h2.innerHTML = tmpNames;
}

var clearPage = (ev) => {
    ev.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click',addPlayer);
    document.getElementById('start').addEventListener('click',clearPage);
});