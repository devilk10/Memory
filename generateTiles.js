const Game = function() {
  this.list = []
};

Game.prototype.setTable = function(limit) {
  let emptyList = new Array(limit).fill('*');
  let count = 0;
  this.list = emptyList.map(function(element) {
    element = ++count;
    if (count == limit / 2)
      count = 0;
    return element;
  });
  return this.shuffle(this.list);
};

Game.prototype.shuffle = function(list) {
  for (index = 0; index < list.length; index++) {
    let randomPos = Math.floor(Math.random() * list.length);
    temp = list[index];
    list[index] = list[randomPos];
    list[randomPos] = temp;
  };
  return list;
};




//*********************--------------------*******************/


let game = new Game();
let cellIdCounter = 1;
let turn = 0;
let prevClick='';
let size = 4;
let timeout = size*10*1000;
let moves = [];

const generateTable = function(size) {
  let table = document.getElementById('grid');
  for (let rowCounter = 0; rowCounter < size; rowCounter++) {
    let row = document.createElement('tr');
    for (let colCounter = 0; colCounter < size; colCounter++) {
      let cell = document.createElement('td');
      cell.id = cellIdCounter++;
      row.appendChild(cell);
    }
    table.appendChild(row);
  };
  return table;
};

let openCell = function() {
  showContent(game.list);
  var cells = document.getElementById("grid");
  cells.addEventListener('click', function() {
    let cellId = event.target.id;
    if (!isNaN(+cellId)) {
      isCorrect(cellId);
    }
  });
};

let isCorrect = function(cellId) {
  let number = game.list[+cellId - 1];
  if (prevClick=='') {
    prevClick = number;
    updateOnCell(cellId,number);
  } else if (number == prevClick) {
    prevClick='';
    updateOnCell(cellId,number);
  } else if(!moves.includes(cellId)&&prevClick!=''){
    document.getElementById(cellId).innerText = number;
    blink(cellId);
  }
};

let updateOnCell = function (cellId,number) {
  document.getElementById(cellId).innerText = number;
  turn++;
  moves.push(cellId);
}

let blink = function (cellId) {
  setTimeout(function() {
    document.getElementById(cellId).innerText = '';
  }, 100);
}

let showContent = function (list) {
  for (var i = 1; i < list.length+1; i++) {
    document.getElementById(i).innerText = list[i-1];
  }
  setTimeout(function () {
    resetTable(list);
  },size*1000*1.5);
};

let resetTable = function (list) {
  for (var i = 1; i < list.length+1; i++) {
    document.getElementById(i).innerText = '';
  }
};

const start = function() {
  game.setTable(size * size);
  generateTable(size);
  openCell();
};

window.onload = start;


// let start= new NumberFinder(5)
// console.log(start.generateTable());
