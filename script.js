let plansza = [];
let wPole = null;

for (let w = 0; w < 9; w++) {
    plansza[w] = [];

    for (let k = 0; k < 9; k++) {
        plansza[w][k] = 0;
    }
}

function pokazPlansze() {
    let miejsce = document.getElementById("plansza");
    miejsce.innerHTML = "";

    for (let w = 0; w < 9; w++) {
        for (let k = 0; k < 9; k++) {
            let pole = document.createElement("button");
            pole.className = "pole";

            if (plansza[w][k] != 0) {
                pole.innerText = plansza[w][k];
            }

            if (wPole == w * 9 + k) {
                pole.classList.add("wybrane");
            }

            pole.onclick = function() {
                wPole = w * 9 + k;
                pokazPlansze();
            };

            miejsce.appendChild(pole);
        }
    }
}

function wpiszLiczbe(liczba) {
    if (wPole == null) {
        document.getElementById("komunikat").innerText = "Najpierw wybierz pole.";
        return;
    }

    let w = Math.floor(wPole / 9);
    let k = wPole % 9;

    plansza[w][k] = liczba;
    pokazPlansze();
}

function usunLiczbe() {
    if (wPole == null) {
        return;
    }
    let w = Math.floor(wPole / 9);
    let k = wPole % 9;

    plansza[w][k] = 0;
    pokazPlansze();
}

function czm(w, k, liczba) {
    for (let i = 0; i < 9; i++) {
        if (plansza[w][i] == liczba) return false;
        if (plansza[i][k] == liczba) return false;
    }
    let poczatekW = Math.floor(w / 3) * 3;
    let poczatekK = Math.floor(k / 3) * 3;

    for (let i = poczatekW; i < poczatekW + 3; i++) {
        for (let j = poczatekK; j < poczatekK + 3; j++) {
            if (plansza[i][j] == liczba) return false;
        }
    }

    return true;
}

function rozwiaz() {
    for (let w = 0; w < 9; w++) {
        for (let k = 0; k < 9; k++) {

            if (plansza[w][k] == 0) {
                for (let liczba = 1; liczba <= 9; liczba++) {

                    if (czm(w, k, liczba)) {
                        plansza[w][k] = liczba;

                        if (rozwiaz()) {
                            return true;
                        }

                        plansza[w][k] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function rozwiazSudoku() {
    if (rozwiaz()) {
        document.getElementById("komunikat").innerText = "Sudoku zostało rozwiązane!";
    } else {
        document.getElementById("komunikat").innerText = "Nie znaleziono rozwiązania.";
    }

    pokazPlansze();
}

function wyczyscPlansze() {
    for (let w = 0; w < 9; w++) {
        for (let k = 0; k < 9; k++) {
            plansza[w][k] = 0;
        }
    }

    wPole = null;
    document.getElementById("komunikat").innerText = "Plansza została wyczyszczona.";
    pokazPlansze();
}

pokazPlansze();
