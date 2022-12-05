'use strict'

function renderCell(location, value) {
    console.log(value);
    // Select the elCell and set the value
    const elCell = document.querySelector(`#cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
function getRandomInt(min, max, isInclusive = false) {
    const inclusive = isInclusive ? 1 : 0
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + inclusive) + min)
}
function getEmptyCells(board) {
    const cells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                cells.push({ i, j })
            }
        }
    }
    return cells[0] ? cells : null
}
function drawCell(cells) {
    var randIdx = getRandomInt(0, cells.length)
    return cells.splice(randIdx, 1)[0]
}
function getCellLocation(elCell) {
    var i = +elCell.id.split('-')[1]
    var j = +elCell.id.split('-')[2]
    return { i, j }

}
function shuffle(array) {
    let currentIndex = array.length, randomIndex
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
}
function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    return board
}
function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (!currCell.isMine) {
                currCell.minesAroundCount = setMinesNegsCount(i, j)
            }
            const className = `cell`
            const id = `cell-${i}-${j}`
            strHTML += `<td class="${className}" id="${id}" onclick="cellClicked(this,${i}, ${j})" oncontextmenu="cellMarked(this,${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML

    console.log(board);
}
function findEmptyCells(board) {
    var emptyIdxs = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (!currCell.isShown) {
                emptyIdxs.push({ i, j })
            }
        }
    }
    return emptyIdxs

}
function hideCell(cell,location){
    cell.isShown = false
    renderCell(location,' ')
}