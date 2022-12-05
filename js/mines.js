'use strict'

function showMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) {
                currCell.isShown = true
                const elCurrCell = document.querySelector(`#cell-${i}-${j}`)
                elCurrCell.innerText = MINE
                elCurrCell.style.backgroundColor = 'red'
            }
        }
    }
}

function setRandomMinesOnBoard(board) {
    var Idxs = findEmptyCells(board)
    var randIdxs = shuffle(Idxs)
    for (var i = 0; i < gLevel.MINES; i++) {
        var currEmptyIdx = randIdxs[i]
        board[currEmptyIdx.i][currEmptyIdx.j].isMine = true
    }
}

function findRandomNotMine(board){

    var notMineArr = []
    for (var i = 0;i<board.length;i++){
        for (var j = 0 ; j<board.length;j++){
            if (!board[i][j].isMine) {
                notMineArr.push({i,j})

            }
        }
    }
    console.log(notMineArr);
    return shuffle(notMineArr)
}
