'use strict'

const EMPTY = ' '
const MINE = '💣'
const FLAG = '🚩'

var gBoard
var gLevel = { SIZE: 4, MINES: 2 }
var gGame
var gStartTime
var gTimerInterval


function initGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: 3,
        safeClicks: 3,
        isFirstClick: true
    }
    gBoard = buildBoard()
    setRandomMinesOnBoard(gBoard)
    renderBoard(gBoard)
    gGame.markedCount = gLevel.MINES
    clearInterval(gTimerInterval)
    decreseLives()
    //  increseBySec()
    const elRestart = document.querySelector(`.restart`)
    elRestart.innerHTML = '😃'
}
function generateLvl(number, mines) {
    gLevel.SIZE = number
    gLevel.MINES = mines
    initGame()
}
function cellClicked(elCell, cellI, cellJ) {
    var currCell = gBoard[cellI][cellJ]
    if (gGame.isFirstClick){
        gTimerInterval=setInterval(increseBySec,1000)
        gGame.isFirstClick = false
        if (currCell.isMine){
            // console.log('here');
            gBoard[getRandomInt(0,gLevel.SIZE)][getRandomInt(0,gLevel.SIZE)].isMine=true 
            currCell.isMine= false
        }
    }
    if (currCell.isShown || currCell.isMarked || !gGame.isOn) {
        return
    }
    currCell.isShown = true
    gGame.shownCount++
    if (!currCell.isMine) {
        currCell.minesAroundCount = setMinesNegsCount(cellI, cellJ)
        if (!currCell.minesAroundCount) {
            expandShown(gBoard, cellI, cellJ) 
        }
        else{
            elCell.innerText = currCell.minesAroundCount
        }
    elCell.style.backgroundColor = 'aqua'
    }
    else {
        gGame.lives--
        gGame.markedCount--
        gGame.shownCount--
        decreseLives()
        elCell.innerText = MINE
        elCell.style.backgroundColor = 'red'
        checkGameOver('mine')
    }
    // console.log(gGame.shownCount);
    checkGameOver()
}
function expandShown(board, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board.length - 1) continue
            if (i === cellI && j === cellJ) continue

            
            var currCell = board[i][j]
            if(currCell.isShown){
                continue
            }
            if(currCell.isMarked) {
                currCell.isMarked = false
                gGame.markedCount++
            }
            currCell.isShown = true
            gGame.shownCount++
            currCell.minesAroundCount = setMinesNegsCount(i, j)
            const elExpanded = document.querySelector(`#cell-${i}-${j}`)
            if(currCell.minesAroundCount!==0){
                elExpanded.innerText = currCell.minesAroundCount
                elExpanded.style.backgroundColor = 'aqua'
            }
            else {
                elExpanded.style.backgroundColor = 'aqua'
                elExpanded.innerText = ''
            }
            // expandShown(board,i,j)
        }
    }
}
function cellMarked(elCell, cellI, cellJ) {
    if (!gGame.isOn) return
    var currCell = gBoard[cellI][cellJ]
    if (!currCell.isMarked&& !currCell.isShown) {
        if (gGame.markedCount===0){
            return
        }
        gGame.markedCount--
        currCell.isMarked = true
        elCell.innerText = FLAG
    }
    else if (currCell.isMarked) {
        currCell.isMarked = false
        elCell.innerText = EMPTY
        gGame.markedCount++
    }
    // console.log(gGame.markedCount);
    checkGameOver()
}
function setMinesNegsCount(cellI, cellJ) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isMine) negsCount++
        }
    }
    return negsCount
}
function increseBySec(){
    const elTimer = document.querySelector(`.time-counter span`)
    elTimer.innerHTML = gGame.secsPassed
    gGame.secsPassed++
}
function decreseLives(){
    const elLives = document.querySelector(`.lives span`)
    elLives.innerHTML = gGame.lives
}
function checkGameOver(check = '') {
    if (check === 'mine'&&gGame.lives===0) {
        showMines(gBoard)
        gGame.isOn = false
        //console.log('lost');
        const elRestart = document.querySelector(`.restart`)
        elRestart.innerHTML = '😡'
        clearInterval(gTimerInterval)
        return
    }
    var isWin = (gGame.markedCount === 0 &&
        gGame.shownCount === ((gLevel.SIZE ** 2) - gLevel.MINES))
    if (isWin) {
        clearInterval(gTimerInterval)
        gGame.isOn = false
        const elRestart = document.querySelector(`.restart`)
        elRestart.innerHTML = '😎'
        //console.log('win');
    }
}
function safeClick(){
    if (gGame.safeClicks===0) return
    var safePicks = findRandomNotMine(gBoard)
    var currCell = gBoard[safePicks[0].i][safePicks[0].j]
    currCell.isShown = true
    renderCell(safePicks[0],currCell.minesAroundCount)
    setTimeout(function() {
        hideCell(currCell,safePicks[0]);
    }, 2000)
    gGame.safeClicks--
    var clicksLeft = document.querySelector(`.feature span`)
    clicksLeft.innerText = gGame.safeClicks
    
    
}
function undo(){

}
function sevenBoom(){

}
function darkMode(){

}
function megaHint(){

}
function mineExt(){

}