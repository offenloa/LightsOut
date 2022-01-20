class Board {
    constructor(opts = {}) {
        Object.assign(
            this,
            {
              grid: [], //will hold an array of Cell objects
              clicksMade: 0, //keep track of the number of moves
              status: -1,
              options: {
                rows: 5, //number of rows in the grid
                cols: 5, //number of columns in the grid
              }
            },
            { options: opts }
        );

        //validate options
        let rows = this.options["rows"];

        if (isNaN(rows)) {
          this.options["rows"] = 5;
        } else if (rows < 3) {
          this.options["rows"] = 3;
        } else if (rows > 19) {
          this.options["rows"] = 19;
        }

        let cols = this.options["cols"];

        if (isNaN(cols)) {
          this.options["cols"] = 5;
        } else if (cols < 3) {
          this.options["cols"] = 3;
        } else if (cols > 19) {
          this.options["cols"] = 19;
        }

        this.init();

    }
    init() {
        //populate the grid with cells
        for (let r = 0; r < this.options["rows"]; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.options["cols"]; c++) {
                this.grid[r].push(new Cell({ xpos: c, ypos: r }));
            }
        }
        this.render();
    }
    render() {
        const gameContainer = document.getElementById("game_container");

        gameContainer.innerHTML = "";
        let content = "";
        for (let r = 0; r < this.options.rows; r++) {
          content += '<div class="row">';
          for (let c = 0; c < this.options.cols; c++) {
            let cellObj = this.grid[r][c];

            //assign proper text and class to cells (needed when loading a game)
            let add_class = "";
            //if (cellObj.toggle == 1) {
            //  add_class = "toggled";
            //} 

            content += `<div class="cell ${add_class}" data-xpos="${c}" data-ypos="${r}">0</div>`;
          }
          content += "</div>";
        }

        gameContainer.innerHTML = content;

        //update input fields
        document.getElementById("new_rows").value = this.options["rows"];
        document.getElementById("new_cols").value = this.options["cols"];
        document.getElementById("clicks_made").textContent = this.clicksMade;

        if (this.status == -1) {
          document.getElementById('status').textContent = "Game Not Started";
        }
        else {
          if (this.is_solved()) {
            document.getElementById('status').textContent = "Game Completed";
            this.status = 1;
            clearInterval(myTimer);
          }
          else {
            document.getElementById('status').textContent = "Game In Progress";
          }
        }
    }
    is_solved() {
      return false
    }
}

class Cell {
    constructor({
        xpos,
        ypos
    }) {
        Object.assign(this, {
            xpos,
            ypos
        })
    }

    getElement() {
        return document.querySelector(
          `.cell[data-xpos="${this.xpos}"][data-ypos="${this.ypos}"]`
        );
    }

}



var game;
var myTimer;
var counter = 0;

window.onload = function() {
    document.getElementById('game_container').addEventListener("click",function(e) {
        const target = e.target
        if (target.classList.contains("cell")) {
            const cell =
              game.grid[target.getAttribute("data-ypos")][
                target.getAttribute("data-xpos")
              ];
            console.log(cell.ypos, cell.xpos);
            if (game.status == 0) {
              game.clicksMade++;
            }
            document.getElementById('clicks_made').textContent = game.clicksMade;
            //call to cell click here
          }
    });

    document.getElementById('resize').addEventListener("click", function() {
        const opts = {
            rows: parseInt(document.getElementById("new_rows").value, 10),
            cols: parseInt(document.getElementById("new_cols").value, 10),
          };
        clearInterval(myTimer);
        resetCounter();
        game = new Board(opts);
    });

    document.getElementById('randomize_button').addEventListener("click", function() {
      game.clicksMade = 0;
      game.status=0;
      counter = 0;
      resetCounter();
      clearInterval(myTimer);
      myTimer = setInterval(myCounter, 1000);
      game.render();
    });

    game = new Board()
}

function myCounter() {
  counter++;
  document.getElementById('timer').textContent = (Math.floor(counter/60)).toString().padStart(2,'0') + ':' + (counter%60).toString().padStart(2,'0');
}

function resetCounter() {
  counter = 0;
  document.getElementById('timer').textContent = (Math.floor(counter/60)).toString().padStart(2,'0') + ':' + (counter%60).toString().padStart(2,'0');
}

function getTime() {
  return ((Math.floor(counter/60)).toString().padStart(2,'0') + ':' + (counter%60).toString().padStart(2,'0')).toString();
}


