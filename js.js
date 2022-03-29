const cellEl = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
//combinations that gives victory 
const winningCombination =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const xClass = 'x'
const circleClass = 'circle'
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()
restartButton.addEventListener('click',startGame())

function startGame(){
    circleTurn=false
    cellEl.forEach(cell=>{
    //cleaning after restarting the game
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.removeEventListener('click',handleClick)
    //once:true fires the event only once so if we click on a cell we already clicked on it doesn't fire anything
    cell.addEventListener('click',handleClick,{once:true})
})
setBoardHoverClass()
winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target//retrieve every cell we click 
    const currenClass = circleTurn ? circleClass:xClass
    placeMark(cell,currenClass)
    if(checkWin(currenClass)){
      endGame(false)
    } else if(isDraw()){
      endGame(true)
    }
    else{
    swapTurns()
    setBoardHoverClass()
    }
}

function placeMark(cell,currenClass){
    cell.classList.add(currenClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    //remove any class
  board.classList.remove(xClass)
  board.classList.remove(circleClass)
  if (circleTurn){
      board.classList.add(circleClass)
  }
  board.classList.add(xClass)
}

function checkWin(currenClass){
    //check if the current class is in every element of the combination
    return winningCombination.some(combination =>{
        combination.every(index =>{
            return cellEl[index].classList.contains(currenClass)
        })
    })
}

function endGame(draw){
    if(draw){
      winningMessageTextElement.innerText = 'Draw'
    }
    else {
        winningMessageTextElement.innerHTML = `${circleTurn? "O's":"X's"} Wins! `
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    //cellEl is not an array so it does not have every but we can destructure it into an array 
  return [...cellEl].every(cell =>{
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}