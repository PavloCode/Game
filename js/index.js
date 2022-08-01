'use strict';
(() => {
    const bt_play = document.querySelector('.play');
    const bt_exit = document.querySelector('.exit');

    let user;
    let computer;
    let win;
    let userDate = [];
    let computerDate = [];
    let maxSteps = 10;
    let haveWinner = false;
    // let start = false;
    bt_play.addEventListener('click', function() {
        const selectCharacter = Math.floor(Math.random() * 2);

        infoshow();
        maxSteps = 9;
        userDate = [];
        computerDate = [];
        win = '';
        haveWinner = false;
        const list = Array.from(document.querySelector('.game-list').children);
        list.forEach(item => {
            item.textContent = '';
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
        infoshow();

    });
    bt_exit.addEventListener('click', function() {
        console.log('exit');
        window.location = 'http://www.google.com';
    });

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

    const gameList = document.querySelector('.game-list');
    gameList.addEventListener('click', eventFunction);


    function eventFunction(event) {
        const target = event.target;
        if (event.target.nodeName !== 'LI') return;

        if (!target.innerText) {
            maxSteps -= 1;
            console.log('user spet', maxSteps);
            target.innerText = user;
            const number = Number(target.getAttribute('data-ceil'));
            userDate.push(number);

            if (maxSteps > 0) {

                computerStep();
            } else {
                console.log('шагов больше нет');
                checkWinner();

            }
        }
    }

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

                if (emptyShoos) {
                    emptyShoos.innerText = computer;
                }

                // if (maxSteps <= 0) {
                //     console.log('game over');
                // }
                checkWinner();
            } else {
                console.log('у компьютера больше нет шагов');
                checkWinner();

            }
        }, 100);
    }

    function checkWinner() {
        let countX = 0;
        let countO = 0;
        // let haveWinner = false;
        console.log('проверка победителя');
        if (userDate.length > 2 || computerDate.length > 2) {
            console.log('есть данные для проверки минимум 3');
            console.log(userDate, computerDate);
            for (let index = 0; index < winCombinations.length; index++) {

                const arrayWin = winCombinations[index];
                countX = 0;
                countO = 0;

                for (const iterator of arrayWin) {
                    console.log('мы в цикле проверки');
                    if (userDate.includes(iterator)) {
                        countX += 1;
                        if (countX >= 3) {

                            haveWinner = true;
                            computerDate = [];
                            console.log(`Win User ${user}`);
                            win = 'user win';
                            showModalWindow();

                        }
                    }
                    if (computerDate.includes(iterator)) {
                        countO += 1;
                        if (countO >= 3) {
                            haveWinner = true;
                            userDate = [];
                            console.log(`Win Computer ${computer}`);
                            win = 'computer win';
                            showModalWindow();


                        }
                    }
                }
            }

        } else {
            console.log('недостаточно данных для проверки');

        }
        // проверка на ничью
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
                    console.log('ничья');
                    win = 'ничья';
                    showModalWindow();

                }
            } else {
                console.log('есть свободные клетки');
                console.log(countO, countX);
            }
        } else {
            console.log('у нас есть победитель');
            // showModalWindow();
        }
    }

    function showModalWindow() {
        console.log('modal window');
        const modal = document.querySelector('.modal-wrapp');
        const res = document.querySelector('.result');
        res.textContent = win;
        console.log(res);
        modal.classList.toggle('show');
        //addition check
        if (haveWinner && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }


    }

    function infoshow() {
        const tr = '  ';
        let info = document.querySelector('.info');
        info.textContent = `user = ${user} computer = ${computer}`;
    }
    //перемещение по кнопкам
    addEventListener("keydown", function(event) {
        console.log(event.keyCode);
    });


})();