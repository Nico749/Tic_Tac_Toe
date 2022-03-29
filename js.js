const cellEl = document.querySelectorAll('[data-cell]')
const xClass = 'x'
const circleClass = 'circle'
let circleTurn

cellEl.forEach(cell=>{
    //once:true fires the event only once so if we click on a cell we already clicked on it doesn't fire anything
    cell.addEventListener('click',handleClick,{once:true})
})

function handleClick(e){
    const cell = e.target//retrieve every cell we click 
    const currenClass = circleTurn ? circleClass:xClass
    placeMark(cell,currenClass)

    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell,currenClass){
    cell.classList.add(currenClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    
}