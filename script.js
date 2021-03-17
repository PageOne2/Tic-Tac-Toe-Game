// Get the board of the game
let board = document.getElementById('board')
// Get all squares of the board
let sqrArray = [...document.getElementsByClassName('sqr')]
// parent DIV of restart button
let res = document.getElementById('restart')
// Message displayed after win or draw
let message = document.getElementById('message')
// X or O to be added to clicked square
let txtContent = 'X'
// Count times played
let count = 0
// All possible lines of win
let lines = [
    [sqrArray[0],sqrArray[1],sqrArray[2]],
    [sqrArray[0],sqrArray[3],sqrArray[6]],
    [sqrArray[0],sqrArray[4],sqrArray[8]],
    [sqrArray[1],sqrArray[4],sqrArray[7]],
    [sqrArray[2],sqrArray[5],sqrArray[8]],
    [sqrArray[2],sqrArray[4],sqrArray[6]],
    [sqrArray[6],sqrArray[7],sqrArray[8]],
    [sqrArray[3],sqrArray[4],sqrArray[5]]
];
// Squares of win
let winSquares;

// Add click event for each square of the board
for(const element of sqrArray){
    element.addEventListener('click', e => {
        // Avoid game to continue after the game is over
        if(res.style.display == 'block'){
            return
        }        
        // Add X or O only to empty squares 
        if(e.target.textContent == ''){
            count++
            //Add X or O to square clicked
            e.target.textContent = txtContent
            // Check if there is a winner
            if(win()){
                // Display restart button
                res.style.display = 'block'
                message.innerText = txtContent + ' winner!'
                board.style.opacity = '0.3'
                return  
            }
            // Check if the game is over
            if(draw()) return
            // Change between X and O according to previous one added
            return txtContent == 'X' ? txtContent = 'O' : txtContent = 'X'
        }
        return 
    })
}

function win(){
    // Win only possible after 5 times played
    if(count >= 5){
        // Check for all possible lines of win
        for(let i = 0; i < lines.length; i++){
            if(lines[i][0].innerText == 'X' && lines[i][1].innerText == 'X' && lines[i][2].innerText == 'X'){
                // Change background color of the win line
                winSquares = [...lines[i]]
                winSquares.forEach(i => i.style.backgroundColor = 'red')
                return true
            } else if(lines[i][0].innerText == 'O' && lines[i][1].innerText == 'O' && lines[i][2].innerText == 'O'){
                winSquares = [...lines[i]]
                winSquares.forEach(i => i.style.backgroundColor = 'red')
                return true
            }
        }
    }
    return false
}

function draw(){
    // Check for max number of possible times played
    if(count == 9){
        // Display restart button
        res.style.display = 'block'
        message.innerText = 'Draw!'
        txtContent = 'X'
        board.style.opacity = '0.3'
        return true
    } else {
        return false
    }
}

function restart(){
    // Reset board to the original state
    sqrArray.forEach(i => i.innerText = '')
    //Restart count
    count = 0
    // Change square back to its original color
    if(winSquares !== undefined){
        winSquares.forEach(i => i.style.backgroundColor = 'rgb(4, 231, 231)')
    }
    //Hide restart button
    res.style.display = 'none'
    board.style.opacity = '1'
}




