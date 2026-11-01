const board = document.getElementById("game-board");
let pocetZdi = 0;
const maxZdi = 30;


for (let i = 1; i <= 10; i++){
    for(let j = 1; j <= 10; j++){
        const field = document.createElement("div");
        //tento radek s CSS je AI used pomoci Gemini 3.1 pro
        field.classList.add("cell");
        field.dataset.y = i;
        field.dataset.x = j;

        board.appendChild(field);
    }
}

const fieldTank1 = document.querySelector('[data-x="1"][data-y="1"]');
fieldTank1.classList.add("tank-1");

const fieldTank2 = document.querySelector('[data-x="10"][data-y="10"]');
fieldTank2.classList.add("tank-2");


//AI generated, Gemini 3.1 Pro
while (pocetZdi < maxZdi) { //

    const randomX = Math.floor(Math.random() * 10) + 1;
    const randomY = Math.floor(Math.random() * 10) + 1;

    const cell = document.querySelector(`[data-x="${randomX}"][data-y="${randomY}"]`);

    if (!cell.classList.contains("wall") &&
        !cell.classList.contains("tank-1") &&
        !cell.classList.contains("tank-2")) {


        cell.classList.add("wall");
        pocetZdi++;
    }
}
//Konec AI generated, Gemini 3.1 Pro