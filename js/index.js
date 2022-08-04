'use strict';
(() => {
    const bt_play = document.querySelector('.play');
    const res = document.querySelector('.result');
    const gameList = document.querySelector('.game-list');
    res.textContent = "tic-tac-toe";
    let user;
    let computer;
    let win;
    let userDate = [];
    let computerDate = [];
    let maxSteps = 10;
    let haveWinner = false;
    let arrayWin = [];
    let play = false;
    let music = document.querySelector(".music");
    let fx = document.querySelector(".fx");
    let resultFx = document.querySelector(".resultFx");
    let stepFx = document.querySelector(".stepFx");
    let winCombinations = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [4, 5, 6],
        [7, 8, 9]
    ];

    let arraySoundsFx = [
        "../sounds/FX/win.mp3",
        "../sounds/FX/loose.mp3",
        "../sounds/FX/draw.mp3"
    ];
    // Play button
    bt_play.addEventListener('click', function() {
        stepFx.play();
        if (!play) startMusic();
        play = true;
        const selectCharacter = Math.floor(Math.random() * 2);
        if (res.classList.contains('result-show')) {
            res.classList.remove('result-show');
            res.classList.toggle('result-hidden');
        }
        bt_play.classList.toggle("result-hidden");
        res.textContent = 'Fight!';
        maxSteps = 9;
        userDate = [];
        computerDate = [];
        win = '';
        haveWinner = false;
        const list = Array.from(document.querySelector('.game-list').children);
        list.forEach(item => {
            item.textContent = '';
            item.classList.remove("win");
            item.classList.remove("loose");
            item.classList.remove("userStep");
            item.classList.remove("computerStep");
            item.classList.remove("draw");
        });
        const modal = document.querySelector('.modal-wrapp');
        modal.classList.toggle('show');
        if (selectCharacter === 0) {
            user = 'X';
            computer = 'O';
        } else {
            user = 'O';
            computer = 'X';
        }
    });

    gameList.addEventListener('click', eventFunction);
    // User step
    function eventFunction(event) {
        const target = event.target;
        if (event.target.nodeName !== 'LI') return;
        if (!target.innerText) {
            stepFx.play();
            maxSteps -= 1;
            target.innerText = user;
            const number = Number(target.getAttribute('data-ceil'));
            userDate.push(number);
            target.className += " userStep";
            if (maxSteps > 0) {
                checkWinner();
                if (!haveWinner) computerStep();
            } else {
                checkWinner();
            }
        }
    }
    // Computer step
    function computerStep() {
        setTimeout(function() {
            if (maxSteps > 0) {
                maxSteps -= 1;
                const list = Array.from(document.querySelector('.game-list').children);
                let emptyStep = [];
                list.forEach(element => {
                    if (!element.innerText) {
                        emptyStep.push(element);
                    }
                });
                const empty = Math.floor(Math.random() * emptyStep.length);
                const emptyShoos = emptyStep[empty];
                const number = Number(emptyShoos.getAttribute('data-ceil'));
                computerDate.push(number);
                emptyShoos.className += " computerStep";
                if (emptyShoos) {
                    emptyShoos.innerText = computer;
                }
                checkWinner();
            } else {
                checkWinner();
            }
        }, 100);
    }
    // Check winner
    function checkWinner() {
        let countX = 0;
        let countO = 0;
        if (userDate.length > 2 || computerDate.length > 2) {
            for (let index = 0; index < winCombinations.length; index++) {
                arrayWin = winCombinations[index];
                countX = 0;
                countO = 0;
                for (const iterator of arrayWin) {
                    if (userDate.includes(iterator)) {
                        countX += 1;
                        if (countX >= 3) {
                            haveWinner = true;
                            computerDate = [];
                            win = 'You Win!';
                            showModalWindow();
                            showResult();
                            resultColor();
                            resultFx.src = arraySoundsFx[0];
                            resultFx.play();
                        }
                    }
                    if (computerDate.includes(iterator)) {
                        countO += 1;
                        if (countO >= 3) {
                            haveWinner = true;
                            userDate = [];
                            resultFx.src = arraySoundsFx[1];
                            resultFx.play();
                            win = 'Computer Win!';
                            showModalWindow();
                            showResult();
                            resultColor();
                        }
                    }
                }
            }
        }

        // Check draw
        if (!haveWinner) {
            let empty = 0;
            const allCells = Array.from(document.querySelector('.game-list').children);
            allCells.forEach(element => {
                if (element.innerText) {
                    empty += 1;
                }
            });
            if (empty === 9) {
                if (countO < 3 && countX < 3) {
                    resultFx.src = arraySoundsFx[2];
                    resultFx.play();
                    win = 'Draw!';
                    showModalWindow();
                    showResult();
                    drawColor();
                }
            }
        }
    }
    // Protection
    function showModalWindow() {
        const modal = document.querySelector('.modal-wrapp');
        res.textContent = win;
        modal.classList.toggle('show');
        //Addition check
        if (haveWinner && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    }
    // Result title and button
    function showResult() {
        if (res.classList.contains('result-hidden')) {
            res.classList.remove('result-hidden');
        }
        if (bt_play.classList.contains('result-hidden')) {
            bt_play.classList.remove('result-hidden');
        }
    };
    // Win and loose color cells
    function resultColor() {
        const list2 = Array.from(document.querySelector('.game-list').children);
        for (let index = 0; index < arrayWin.length; index++) {
            let element = arrayWin[index];
            list2.forEach(item => {
                if (item.getAttribute("data-ceil") == element) {
                    if (win == 'Computer Win!') {
                        item.className += " loose";
                    } else if (win == 'You Win!') {
                        item.className += " win";
                    }
                }
            });
        }
    }
    // Draw color cells
    function drawColor() {
        const list2 = Array.from(document.querySelector('.game-list').children);
        list2.forEach(item => {
            item.className += ' draw';
        });
    }
    // Music track
    function startMusic() {
        music.loop = true;
        music.play();
    }
})();