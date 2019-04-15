// The main initialization function. Responds to the choice of the select form.

function start() {

// Evaluates the start screen choice and begins the game.

    let selected = (<HTMLInputElement>getElement("teamN")).value;
    let n = parseInt(selected, 10);
    let ts = new Teams(n);
    let board = getElement("gameArea");
    board.appendChild(ts.chooseTeams.html);
    getElement("startScreen").remove();
    ts.selectAvatar();
}

getElement("teamNSubmit").addEventListener("click", start);
