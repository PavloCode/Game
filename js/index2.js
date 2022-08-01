let user;
let computer;

const selectCharacter = Math.floor(Math.random() * 2);
console.log();
if (selectCharacter === 0) {
    user = 'X';
    computer = 'O';
} else {
    user = 'O';
    computer = 'X';
}
console.log('user', user);
console.log('computer', computer);
// const user;
// const computer;
let maxSteps = 10;
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
let dataX = [];
let dataO = [];

let userDate = [];
let counputerDate = [];

const gameList = document.querySelector('.game-list');
gameList.addEventListener('click', eventFunction);

function eventFunction(event) {
    const target = event.target;
    if (event.target.nodeName !== 'LI') return;

    if (!target.innerText && maxSteps > 0) {
        maxSteps -= 1;
        target.innerText = user;
        const number = Number(target.getAttribute('data-ceil'));
        dataX.push(number);

        computerStep();
    }
}

function computerStep() {
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
    dataO.push(number);

    if (emptyShoos) {
        emptyShoos.innerText = computer;
    }

    if (maxSteps <= 0) {
        console.log('game over');
    }
    checkWinner();
}

function checkWinner() {
    let countX = 0;
    let countO = 0;
    if (dataX.length > 2 || dataO.length > 2) {
        for (let index = 0; index < winCombinations.length; index++) {
            const arrayWin = winCombinations[index];
            countX = 0;
            countO = 0;
            for (const iterator of arrayWin) {
                if (dataX.includes(iterator)) {
                    countX += 1;
                    if (countX === 3) {
                        console.log('Win X');
                    }
                } else if (dataO.includes(iterator)) {
                    countO += 1;
                    if (countO === 3) {
                        console.log('Win X');
                    }
                }
            }
        }

    }
}