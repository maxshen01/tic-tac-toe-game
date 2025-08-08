const squares = document.querySelectorAll(".board div")
const newGameButton = document.querySelector("#newGame")
const textBox = document.querySelector('#textBox')

squares.forEach(square => {square.addEventListener('click', addShape)})
newGameButton.addEventListener('click', restartGame)

let noOfClicks = 0
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let boardState = [0,0,0,0,0,0,0,0,0]

function addShape(e) {

    if (e.target.textContent === "") {
        noOfClicks++
        let squareNumber = Number(e.target.id)

        if (noOfClicks % 2 === 0) {
            e.target.textContent = 'o'
            boardState[squareNumber] = 'o'
            checkWin('o')
        } else {
            e.target.textContent = 'x'
            boardState[squareNumber] = 'x'
            checkWin('x')
        }

    } else {
        textBox.textContent = 'Select an Empty Square'
    }

}

function checkWin(player) {

    for (let i=0; i < winningCombinations.length; i++) {
        
        let square1 = boardState[winningCombinations[i][0]]
        let square2 = boardState[winningCombinations[i][1]]
        let square3 = boardState[winningCombinations[i][2]]
        
        if (square1 === player && square2 === player && square3 == player) {
            
            if (noOfClicks % 2 === 0) {
                textBox.textContent = 'Player 2 wins!'
            } else {
                textBox.textContent = 'Player 1 wins!'
            }
            freezeGame(winningCombinations[i])

            return 
        } 
    }
}

function freezeGame(winningArr) {
    squares[winningArr[0]].classList.add('highlight')
    squares[winningArr[1]].classList.add('highlight')
    squares[winningArr[2]].classList.add('highlight')

    squares.forEach(square => {square.removeEventListener('click', addShape)})
}

function restartGame() {
    noOfClicks = 0
    boardState =  [0,0,0,0,0,0,0,0,0]

    for (let i = 0; i < 9; i++) {
        squares[i].textContent = ""
    }

    squares.forEach(square => {square.classList.remove('highlight')})
    squares.forEach(square => {square.addEventListener('click', addShape)})
    textBox.textContent = 'Lets play a game'
}

