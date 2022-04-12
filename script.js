let fields = [];//Array to load with the symbols
let gameOver = false;//The game is not over this is why the variable is false
let currentShape = 'circle';//The value ist cicrle
let plays = 0;// The plays are 0
let winner;//The winner is

/** This is a description of the fillShape function
 * Fill the fields with Symbols
 * @param{int} id - The number of the field
 * 
 */
function fillShape(id) {// Fills the field
    if (!fields[id] && !gameOver) {//If no value is in Array and gameOver is false this query are start
        if (currentShape == 'circle') {//If the value is circle this query will start
            showPlayer1();//Show Player 1
        } else {//The value is cross this query starts
            showPlayer2();//Show Player 2
        }
        fields[id] = currentShape;//The value pushs in Array
        plays++;//plays adds 1

        draw();//draw the playbook
        checkForWin();//check if is a winner
    }
}

/**
 * This function draw the playfield 
 * @description
 * iterate the array fields and show circle or cross 
 * depending on which value is aktivate
 */
function draw() {//draw the playfield
    for (let i = 0; i < fields.length; i++) {//iterate array
        if (fields[i] == 'cross') {//start query if the value is cross
            document.getElementById('cross-' + i).classList.remove('d-none'); // X on a certain point show
        }
        if (fields[i] == 'circle') {//start query if the value is circle
            document.getElementById('circle-' + i).classList.remove('d-none');// O on a certain point show
        }
    }
}

/**
 * This function restart the game
 * @description
 * change the value of gameOver
 * clean the array and hide symbols
 */
function restartGame() {// The game restart     
    gameOver = false; //the value is false
    fields = [];//clean array
    plays = 0;
    winner = '';
    document.getElementById('gameOver').classList.add('d-none');//show endscreen
    document.getElementById('restart-btn').classList.add('d-none');//show button to restart game
    hideSymbols();//hide symbols
}

/**
 * This function hide all symbols
 * @description
 * @class change classes 
 * iterate lines and symbols
 */
function hideSymbols() {
    for (let n = 1; n < 7; n++) {//iterate code if value is 6
        document.getElementById('line-' + n).style.transform = 'scaleX(0.0)';//the line at certain point is smaler and hide
    }
    document.getElementById('line-7').classList.add('d-none');//the diagonal lines hide
    document.getElementById('line-8').classList.add('d-none');
    for (let j = 0; j < 9; j++) {// check all circles and cross till value is 8
        document.getElementById('circle-' + j).classList.add('d-none');//hide all circle at certain point
        document.getElementById('cross-' + j).classList.add('d-none');//hide all cross at certain point
    }
}

/**
 * This function checks for a winner
 * @description
 * check the follow functions if 3 symbols the same
 * @function checkFields()
 * start function 
 * @function showEndscreen()
 * start function
 * @function winnerLine()
 * 
 */
function checkForWin() { // check if exists a winner
    checkFields(0, 1, 2, 'line-1', 'scaleX(1)');
    checkFields(3, 4, 5, 'line-2', 'scaleX(1)');
    checkFields(6, 7, 8, 'line-3', 'scaleX(1)');
    checkFields(0, 3, 6, 'line-4', 'rotate(90deg) scaleX(1)');
    checkFields(1, 4, 7, 'line-5', 'rotate(90deg) scaleX(1)');
    checkFields(2, 5, 8, 'line-6', 'rotate(90deg) scaleX(1)');
    checkFields(0, 4, 8, 'line-7', 'rotate(45deg) scaleX(1.2)', 'd-none');
    checkFields(2, 4, 6, 'line-8', 'rotate(-45deg) scaleX(1.2)', 'd-none');
    showEndscreen();
    winnerLine();
}

/**
 * This function change class from lines and check if 3 symbols in a row
 * @param {integer} f1 - fill the array fields with symbol whitch parameter write in field 1
 * @param {integer} f2 - fill the array fields with symbol whitch parameter write in field 2
 * @param {integer} f3 - fill the array fields with symbol whitch parameter write in field 3
 * @param {string} id - fill the parameter with line+number in this field
 * @param {string} style - fill the parameter style with class charakteristic
 * @param {string} hide - fill the parameter hide with class charateristic
 */
function checkFields(f1, f2, f3, id, style, hide) {//Check fields 
    if (fields[f1] == fields[f2] && fields[f2] == fields[f3] && fields[f1]) {//checks if rows are full and which symbol
        winner = fields[f1];//the value winner is fill with parameter f1
        console.log(winner);
        document.getElementById(id).style.transform = style;//show the line with parameter id
        document.getElementById(id).classList.remove(hide);//the parameter hide become the parameter from the function
    }
}


/**
 * This function change the color of the winner Line
 * iterate the lines 
 */
function winnerLine() {//change color of lines
    for (let n = 1; n < 9; n++) {//iterate lines
        if (currentShape == 'cross') {//if the value is cross 
            document.getElementById('line-' + n).style.backgroundColor = '#FD5B78';//change color of line
            document.getElementById('line-' + n).style.boxShadow = '0px 0px 26px 14px #FD5B78';//change shadow of line
        } else {//if the value is circle
            document.getElementById('line-' + n).style.backgroundColor = '#66FF66';//change color
            document.getElementById('line-' + n).style.boxShadow = '0px 0px 26px 14px #66FF66';//change shadow
        }
    }
}

/**
 * This function change player one to active
 * 
 */
function showPlayer1() {
    currentShape = 'cross';// change value into cross
    document.getElementById('player-1').classList.add('inactive-player');// player 1 inactiv
    document.getElementById('player-2').classList.remove('inactive-player');//Player 2 activatet
}

/**
 * This function change player two to active
 */
function showPlayer2() {
    currentShape = 'circle';//change value into circle
    document.getElementById('player-2').classList.add('inactive-player');//player two inactiv
    document.getElementById('player-1').classList.remove('inactive-player');//player 1 actviatet
}

/**
 * This function show the endscreen
 */
function showEndscreen() {
    if (winner || plays == 9) {//checks if takes a winner or the plays are 9
        gameOver = true;//value is true
        setTimeout(function () {//show endscreen after a certain time
            document.getElementById('gameOver').classList.remove('d-none');//show endscreen
            document.getElementById('restart-btn').classList.remove('d-none');//show restart button
        }, 1000);//after 1 second show endsreen
    }
}