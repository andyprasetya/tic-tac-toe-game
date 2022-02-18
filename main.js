import './src/stylesheet/main.css';

document.addEventListener('DOMContentLoaded', () => {
  if (window.Worker && window.indexedDB) {
    window.document.title = "Tic Tac Toe Game";
    var gameCtrlBtn = document.getElementById("restartgame");
    gameCtrlBtn.addEventListener("click", function(){
      var xplayerscore = parseInt(document.getElementById("xscore").value);
      var oplayerscore = parseInt(document.getElementById("oscore").value);
      var scoreWinsAll = document.getElementById("winning_score");
      var ctIndicator = document.getElementById("currentturn");
      scoreWinsAll.value = ""+xplayerscore+" - "+oplayerscore+"";
      var sqPaneSize = parseInt(document.getElementById("boardsquaresize").value);
      document.getElementById("boardgamepad").innerHTML = '<div id="board"></div>';
      var gameNotice = document.getElementById("gamenotice");
      var rectsWrapper = document.getElementById("board");
      var cScoreArray = [], 
        xoroAction = 0, 
        xoroChoice = [], 
        gameScorer, 
        rectinspect = [];
      var nRect = (sqPaneSize * sqPaneSize);
      gameCtrlBtn.innerHTML = "RESTART GAME";
      for (var i = 0; i < nRect; i++) {
        cScoreArray.push(i);
      };
      rectsWrapper.classList.add('grid');
      rectsWrapper.classList.add('justify-items-center');
      if(sqPaneSize == 3){
        rectsWrapper.classList.add('grid-cols-3');
      } else if(sqPaneSize == 6){
        rectsWrapper.classList.add('grid-cols-6');
      } else {
        rectsWrapper.classList.add('grid-cols-9');
      }
      rectsWrapper.classList.add('gap-x-0');
      rectsWrapper.classList.add('gap-y-0');
      rectsWrapper.classList.add('border-1');
      rectsWrapper.classList.add('border-gray-300');
      rectsWrapper.classList.add('w-fit');
      rectsWrapper.classList.add('mx-auto');
      rectsWrapper.style.border = 'solid 1px #d1d5db';
      for (var i = 0; i < nRect; i++) {
        rectsWrapper.innerHTML += '<div class="srecttngl"></div>';
      };
      function isFlagEven(value){
        if (value % 2 == 0) {
           return true;
        } else {
          return false;
        };
      };
      function isFlagOdd(value){
        if (value % 1 == 0) {
          return true;
        } else {
          return false;
        };
      };
      function flaggedSame(array) {
        var first = array[0];
        if (array[0] == "") {
          return false;
        } else {
          return array.every(function(element) {
            return element == first;
          });
        };
      };
      var rectglsq = document.getElementsByClassName("srecttngl");
      for (var i = 0; i < nRect; i++) {
        rectglsq[i].style.height = 360 / sqPaneSize +'px';
        rectglsq[i].style.width = 360 / sqPaneSize +'px';
        rectglsq[i].style.lineHeight = 360 / sqPaneSize +'px';
        rectglsq[i].setAttribute("id", i.toString());
        rectglsq[i].classList.add('text-center');
        if(sqPaneSize == 3){
          rectglsq[i].style.fontSize = 'xx-large';
        } else if(sqPaneSize == 6){
          rectglsq[i].style.fontSize = 'large';
        } else {
          rectglsq[i].style.fontSize = 'medium';
        }
        rectglsq[i].style.fontWeight = 'bolder';
      };
      if (nRect % 2 !== 0) {
        for (var i = 0; i < nRect; i += 2) {
          rectglsq[i].classList.add('bg-gray-300');
        };
      } else {
        for (i = 0; i < nRect; i += 1) {
          if (isFlagEven(i/sqPaneSize)) {
            for (var squareNum = i; squareNum < (i + sqPaneSize); squareNum += 2) {
              rectglsq[squareNum].classList.add('bg-gray-300');
            };
          } else if (isFlagOdd(i/sqPaneSize)) {
            for (var squareNum = i+1; squareNum < (i + sqPaneSize); squareNum += 2) {
              rectglsq[squareNum].classList.add('bg-gray-300');
            };
          } else {
          };
        };
      };
      gameNotice.style.color = "red";
      gameNotice.innerHTML = "Current Turn: X";
      ctIndicator.value = 'X';
      rectsWrapper.addEventListener("click", function() {
        var xpscore = parseInt(document.getElementById("xscore").value);
        var opscore = parseInt(document.getElementById("oscore").value);
        if(ctIndicator.value == '-'){
          alert('The game is over.');
          gameCtrlBtn.click();
        } else {
          if (findScorer()) {
            if(gameScorer[0] == 'X'){
              document.getElementById("xscore").value = xpscore + 1;
              gameNotice.style.color = "red";
            } else {
              document.getElementById("oscore").value = opscore + 1;
              gameNotice.style.color = "blue";
            }
            gameNotice.innerHTML = gameScorer[0] + ' wins!';
            setTimeout(function(){
              let xLtscore = parseInt(document.getElementById("xscore").value);
              let oLtscore = parseInt(document.getElementById("oscore").value);
              scoreWinsAll.value = ""+xLtscore+" - "+oLtscore+"";
              ctIndicator.value = '-';
            }, 100);
          } else if (isFlagEven(xoroAction)) {
            gameNotice.style.color = "blue";
            gameNotice.innerHTML = "Current Turn: O";
            ctIndicator.value = 'O';
          } else {
            gameNotice.style.color = "red";
            gameNotice.innerHTML = "Current Turn: X";
            ctIndicator.value = 'X';
          };
          xoroAction++;
        }
      });
      for (var i = 0; i < nRect; i++) {
        xoroChoice[i] = 0;
      };
      var findScorer = function() {
        for (i = 0; i < nRect; i += 1) {
          if ((i % sqPaneSize) == 0) {
            var vertInspect = [];
            for (var squareNum = i; squareNum < (i + sqPaneSize); squareNum += 1) {
              vertInspect.push(rectglsq[squareNum].innerHTML);
            };
            if (flaggedSame(vertInspect)) {
              gameScorer = vertInspect;
              return true;
            };
          };
        };
        for (i = 0; i < nRect; i += 1) {
          if (i < sqPaneSize) {
            var horzInspect = [];
            for (var squareNum = i; squareNum < nRect; squareNum += sqPaneSize) {
              horzInspect.push(rectglsq[squareNum].innerHTML);
            };
            if (flaggedSame(horzInspect)) {
              gameScorer = horzInspect;
              return true;
            };	
          };
        };
        var roundTrip = [];
        for (i = 0; i < nRect; i += 1) {
          if ((i % (sqPaneSize + 1)) == 0) {
            roundTrip.push(rectglsq[i].innerHTML);
          };
        };
        if (flaggedSame(roundTrip)) {
          gameScorer = roundTrip;
          return true;
        };
        for (i = (sqPaneSize - 1); i < (nRect - 1); i += 1) {
          if ((i % (sqPaneSize - 1)) == 0) {
            rectinspect.push(rectglsq[i].innerHTML);
          };
        };
        if (flaggedSame(rectinspect)) {
          gameScorer = rectinspect;
          return true;
        };
      };
      var flagActions = function() {
        var rectIndex = this.getAttribute("id");
        xoroChoice[rectIndex] += 1;
        if (isFlagEven(xoroAction) && xoroChoice[rectIndex] == 1) {
          this.innerHTML = 'X';
          this.style.color = "red";
        } else if (isFlagOdd(xoroAction) && xoroChoice[rectIndex] == 1) {
          this.innerHTML = 'O';
          this.style.color = "blue";
        } else if (!findScorer()){
          alert('No way. This place is already occupied.');
          xoroAction -= 1;
        } else {};
        if (findScorer()) {
          for (var i = 0; i < nRect; i++) {
            xoroChoice[i] = 2;
          };
          document.getElementById("restartgame").innerHTML = "CLICK TO REPLAY";
        };
      };
      for (var i = 0; i < nRect; i++) {
        rectglsq[i].addEventListener("click", flagActions);
      };
    });
    gameCtrlBtn.click();
  } else {
    console.log('Your browser doesn\'t support web workers.');
  }
});