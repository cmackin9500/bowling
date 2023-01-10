function createTable() {
    
    let table = document.getElementById('table');
    let headerRow = document.createElement('tr');
    
    headerRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Round"));
    for (let i=1; i<=10; i++) {
        let header = document.createElement("th");
        let textNode = document.createTextNode(i);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    }
    table.appendChild(headerRow);
    
    let row = document.createElement('tr');
    
    for (let i=0; i<=10; i++) {
        let cell = document.createElement('td');
        let textNode = document.createTextNode(0);

        if (i === 0) {
            textNode = document.createTextNode("Score");
        }

        cell.appendChild(textNode);
        row.appendChild(cell);
    }
    table.appendChild(row);

    document.body.appendChild(table);
    //columns = document.getElementById("th").setAttribute("rowspan",2);
}

function updateValue(player) {
    if (player.turn === 1) {
        var table = document.getElementById('table');
        table.rows[1].cells[(player.i)+1].innerHTML = player.score_board[player.i][0]+player.score_board[player.i][1];
    }
}