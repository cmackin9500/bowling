function createTable() {
    const table = document.getElementById("table");

    // Create the title/header row
    const titleRow = document.createElement("tr");

    // add table element for "PLAYER" header
    const BOWLERS = document.createElement("th");
    BOWLERS.colSpan = 5;
    BOWLERS.rowSpan = 1;

    let textNode = document.createTextNode("PLAYERS"); // add the text
    BOWLERS.appendChild(textNode);
    titleRow.appendChild(BOWLERS);

    // add the round number
    for(let i=0; i<9; i++) {
        const roundNumber = document.createElement("th");
        roundNumber.colSpan = 2;
        let textNode = document.createTextNode(i+1);
        roundNumber.appendChild(textNode);
        titleRow.appendChild(roundNumber);
    }
    const roundNumber = document.createElement("th");
    roundNumber.colSpan = 3;
    let textTen = document.createTextNode(10);
    roundNumber.appendChild(textTen);
    titleRow.appendChild(roundNumber);

    // add table header for "TOTAL"
    const scoreTitle = document.createElement("th");
    scoreTitle.colSpan = 5;
    scoreTitle.rowSpan = 1;
    textNode = document.createTextNode("TOTAL");
    scoreTitle.appendChild(textNode);
    titleRow.appendChild(scoreTitle);

    // Create the next two rows that will show the score insight
    const row1 = document.createElement("tr");
    const row2 = document.createElement("tr");

    // Create the cells and contents for row 1
    const bowlerName = document.createElement("td");
    bowlerName.colSpan = 5;
    bowlerName.rowSpan = 2;
    textNode = document.createTextNode(playerName);
    bowlerName.appendChild(textNode);

    // Append the cells to their respective rows
    row1.appendChild(bowlerName);
    for(let i=0; i<21; i++) {
        const turnThrow = document.createElement("td");
        turnThrow.colSpan = 1;
        row1.appendChild(turnThrow);
    }

    // Create the cells and contents for row 2
    const bowlerScore = document.createElement("td");
    bowlerScore.colSpan = 5;
    bowlerScore.rowSpan = 2;
    row1.appendChild(bowlerScore);

    // Append the cells to their respective rows
    for(let i=0; i<9; i++) {
        const roundThrow = document.createElement("td");
        roundThrow.colSpan = 2;
        row2.appendChild(roundThrow);
    }
    const roundThrow = document.createElement("td");
    roundThrow.colSpan = 3;
    row2.appendChild(roundThrow);

    // Append the rows to the table
    table.appendChild(titleRow);
    table.appendChild(row1);
    table.appendChild(row2);
    table.rows[1].cells[0].innerHTML = player.name;

    // Append the table to the document
    document.body.appendChild(table);
}