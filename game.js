const board = document.getElementById("game-board");
let pocetZdi = 0;
const maxZdi = 30;
let hracNaTahu = 1
let zivotyTank1 = 3;
let zivotyTank2 = 3;

let vybranaAkce = "pohyb";
const hrac = document.getElementById("aktualni-hrac");
document.getElementById("radio-pohyb").addEventListener("change", function() {
    vybranaAkce = "pohyb";
});
document.getElementById("radio-strelba").addEventListener("change", function() {
    vybranaAkce = "strelba";
});


for (let i = 1; i <= 10; i++){
    for(let j = 1; j <= 10; j++){
        const field = document.createElement("div");
        //tento radek s CSS je AI used pomoci Gemini 3.1 pro
        field.classList.add("cell");
        field.dataset.y = i;
        field.dataset.x = j;

        field.addEventListener("click", function() {

            if (vybranaAkce === "pohyb") {

                let tridaTanku = "";
                if (hracNaTahu === 1) {
                    tridaTanku = "tank-1";
                } else {
                    tridaTanku = "tank-2";
                }

                const aktualniPolicko = document.querySelector("." + tridaTanku);

                const startX = Number(aktualniPolicko.dataset.x);
                const startY = Number(aktualniPolicko.dataset.y);

                const cilX = Number(field.dataset.x);
                const cilY = Number(field.dataset.y);

                let vzdalenostX = startX - cilX;
                let vzdalenostY = startY - cilY;

                if (vzdalenostX < 0) {
                    vzdalenostX = vzdalenostX * -1;
                }
                if (vzdalenostY < 0) {
                    vzdalenostY = vzdalenostY * -1;
                }

                if (vzdalenostX <= 3 && vzdalenostY <= 3) {

                    if (field.classList.contains("wall") === false &&
                        field.classList.contains("tank-1") === false &&
                        field.classList.contains("tank-2") === false) {

                        aktualniPolicko.classList.remove(tridaTanku);
                        field.classList.add(tridaTanku);

                        if (hracNaTahu === 1) {
                            hracNaTahu = 2;
                            hrac.innerText = "Hráč 2 (Modrý)";
                        } else {
                            hracNaTahu = 1;
                            hrac.innerText = "Hráč 1 (Červený)";
                        }

                    } else {
                        console.log("zde to nejde, je tam prekazka.");
                    }
                } else {
                    console.log("max. 3 policka !!!.");
                }


            } else if (vybranaAkce === "strelba") {

            let tridaTanku = "";
            let tridaNepritele = "";
            if (hracNaTahu === 1) {
                tridaTanku = "tank-1";
                tridaNepritele = "tank-2";
            } else {
                tridaTanku = "tank-2";
                tridaNepritele = "tank-1";
            }

            const aktualniPolicko = document.querySelector("." + tridaTanku);

            const startX = Number(aktualniPolicko.dataset.x);
            const startY = Number(aktualniPolicko.dataset.y);
            const cilX = Number(field.dataset.x);
            const cilY = Number(field.dataset.y);

            let vzdalenostX = startX - cilX;
            let vzdalenostY = startY - cilY;

            if (vzdalenostX < 0) { vzdalenostX = vzdalenostX * -1; }
            if (vzdalenostY < 0) { vzdalenostY = vzdalenostY * -1; }

            if (startX === cilX || startY === cilY) {

                let celkovaVzdalenost = vzdalenostX + vzdalenostY;

                if (celkovaVzdalenost <= 5) {

                    let silaStrely = 1;

                    let smerX = 0;
                    let smerY = 0;
                    if (cilX > startX) { smerX = 1; }
                    if (cilX < startX) { smerX = -1; }
                    if (cilY > startY) { smerY = 1; }
                    if (cilY < startY) { smerY = -1; }

                    let leticiX = startX;
                    let leticiY = startY;

                    for (let krok = 1; krok <= celkovaVzdalenost; krok = krok + 1) {


                        leticiX = leticiX + smerX;
                        leticiY = leticiY + smerY;

                        let polickoNaCeste = document.querySelector('[data-x="' + leticiX + '"][data-y="' + leticiY + '"]');

                        // AI used, gemini pro 3.1
                        setTimeout(function() {
                            polickoNaCeste.classList.add("strela");

                            setTimeout(function() {
                                polickoNaCeste.classList.remove("strela");
                            }, 100);

                        }, krok * 100);


                        if (polickoNaCeste.classList.contains("wall") === true) {
                            polickoNaCeste.classList.remove("wall");
                            silaStrely = silaStrely - 0.5;

                            console.log("strela ma silu" + silaStrely);
                        }

                        if (polickoNaCeste.classList.contains(tridaNepritele) === true) {
                            if (silaStrely > 0) {
                                if (hracNaTahu === 1) {
                                    zivotyTank2 = zivotyTank2 - silaStrely;
                                    console.log("´hrac 2 zasazen, zbyva  " + zivotyTank2);
                                } else {
                                    zivotyTank1 = zivotyTank1 - silaStrely;
                                    console.log("hrac 1 zasazen, zbyva " + zivotyTank1);
                                }
                            }
                        }
                    }

                    if (zivotyTank1 <= 0) {
                        alert("Konec hry! Vyhrál Modrý tank (Hráč 2)");
                    }
                    if (zivotyTank2 <= 0) {
                        alert("Konec hry! Vyhrál Červený tank (Hráč 1)");
                    }

                    if (hracNaTahu === 1) {
                        hracNaTahu = 2;
                        hrac.innerText = "Hráč 2 (Modrý)";
                    } else {
                        hracNaTahu = 1;
                        hrac.innerText = "Hráč 1 (Červený)";
                    }

                } else {
                    console.log("dostrel max5 policek!");
                }
            } else {
                console.log("strilet muzes pouze na V,Z,S,J.");
            }
        }
        });

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