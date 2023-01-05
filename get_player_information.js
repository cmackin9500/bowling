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
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click',addPlayer);
});