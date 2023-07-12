var round = true; //true = X - false = O
var playedRounds = 0;
var player = 'X';
var roundOwner = document.getElementById('playerTime');
var boardElement = document.getElementsByTagName("input");
var cordinate = [];
var table  = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

function start() {

    var table  = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    playedRounds = 0;
    round = true;
    cleanBoard();
    enableAllButtons();
}

function setTablePlay(roundPlayer, cordinate)
{
    table[cordinate[0]][cordinate[1]] = roundPlayer;
}

function viewTable(){

    for (var line = 0; line < table.length; line++) {
        for (var column = 0; column < table[line].length; column++) {
        console.log("Line:",line," Column:",column, " =>",table[line][column]);
        }
      }

      for (let i = 0; i < table.length; i++) {
        console.log(table[i].join(" "));
      }

}

function setPlay(element)
{
    if(round){
        player = 'X';
    }else{
        player = 'O';
    }

    changeIcon(element);
    disableButton(element);
    setTablePlay(player, toCordinate(element.id));
    playedRounds++;
    roundOwner.textContent = `${player} -> Player Round`;
    
    if(winCheck()){
        roundOwner.textContent = `${player} Won`;
        insertFirework()
    }else if(playedRounds === 9){
        roundOwner.textContent = "No one won";
    }
    
    round = !round;
    console.log(playedRounds, " Moves were played")
    console.log("'X' scored in position: ", element.id)

}

function toCordinate(idText)
{
    
    const cordinate = [];

    cordinate[0] = idText.slice(0,1);
    cordinate[1] = idText.slice(1,2);

    return cordinate;
}

function winCheck(){
    const lines = table.length;
    const colums = table[0].length;

    for (let i = 0; i < lines; i++) {
        if (table[i][0] !== "" && table[i][0] === table[i][1] && table[i][1] === table[i][2]) {
        return true;
        }
    }

    for (let j = 0; j < colums; j++) {
        if (table[0][j] !== "" && table[0][j] === table[1][j] && table[1][j] === table[2][j]) {
        return true;
        }
    }

    if (
        table[0][0] !== "" &&
        table[0][0] === table[1][1] &&
        table[1][1] === table[2][2]
    ) {
        return true;
    }

    if (
        table[0][2] !== "" &&
        table[0][2] === table[1][1] &&
        table[1][1] === table[2][0]
    ) {
        return true;
    }

    return false; 
}

function changeIcon(element)
{
    svg = document.getElementById("svg-"+element.id)
    
    if(round){
        svg.innerHTML='<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
    }else{
        svg.innerHTML='<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>'
    }
}

function cleanBoard(){
    for (var line = 0; line < table.length; line++) {
        for (var column = 0; column < table[line].length; column++) {
            id = '' + line + column;
            svg = document.getElementById("svg-"+id)
            svg.innerHTML='<path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>'
            console.log('svg:'+id+" cleaned")
        }
      }
}

function disableButton(element){
    console.log(element)
    element.disabled=true;
}

function enableAllButtons(){
    for (var line = 0; line < table.length; line++) {
        for (var column = 0; column < table[line].length; column++) {
            id = '' + line + column;
            button = document.getElementById(id);
            button.disabled=false;
        }
      }
}

function insertFirework(){
    const firework = document.getElementById('firework');

    if (firework) {
        firework.style.display = 'block';
        sleep(2500).then(() => {
            firework.style.display = 'none';
          });
        
    } else {
    console.error('SVG ELEMENT NOT FOUND');
    }

}

function scoreIncrease(){
    //implement scoredboard system
}

function scoreboardClean(){
    //implement scoredboard system
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  