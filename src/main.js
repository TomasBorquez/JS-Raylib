import r from "raylib";
import {
  screenHeight,
  screenWidth,
  selectedSquare,
  squareSize,
  startingHeight,
  startingWidth,
} from "./static.js";

let squarePositions = [[], [], [], [], [], [], [], [], [], []];
let gameGrid = [[], [], [], [], [], [], [], [], [], []];
let startup = true;
let gameState = "Started";

r.InitWindow(screenWidth, screenHeight, "");
r.SetTargetFPS(244);
generateGameGrid();

let count = 0;
while (!r.WindowShouldClose()) {
  if (count) startup = false;
  else count = 1;
  r.BeginDrawing();
  if (gameState === "Lost") {
    r.DrawText("You lost baby bro", (screenWidth - 360) / 2 , screenHeight / 3, 45, r.BLACK);
  } else {
    r.ClearBackground(r.LIGHTGRAY);
    showGrid(10);
    detectSquare();
    detectClick();
  }
  r.EndDrawing();
  count++;
}

function showGrid(gridSize) {
  let position = {
    x: startingWidth,
    y: startingHeight,
  };
  for (let i = 0; i < gridSize; i++) {
    position.x = startingWidth;
    for (let j = 0; j < gridSize; j++) {
      const currentValue = gameGrid[i][j];
      const squarePosition = {
        x: position.x + j * (squareSize + 5),
        y: position.y + i * (squareSize + 5),
      };

      if (currentValue.clicked) {
        if (currentValue.type === "Number") {
          r.DrawRectangle(
            squarePosition.x,
            squarePosition.y,
            squareSize,
            squareSize,
            isCurrent(i, j) ? r.ORANGE : r.GREEN,
          );
          if (currentValue.value) {
            r.DrawText(currentValue.value.toString(), squarePosition.x + 19, squarePosition.y + 17, 12, r.BLACK);
          }
        } else {
          r.DrawRectangle(
            squarePosition.x,
            squarePosition.y,
            squareSize,
            squareSize,
            isCurrent(i, j) ? r.ORANGE : r.RED,
          );
        }
      } else {
        r.DrawRectangle(
          squarePosition.x,
          squarePosition.y,
          squareSize,
          squareSize,
          isCurrent(i, j) ? r.ORANGE : r.GRAY,
        );
      }

      if (startup) {
        squarePositions[i].push(squarePosition);
      }
    }
  }
}

function detectSquare() {
  const mouseX = r.GetMouseX();
  const mouseY = r.GetMouseY();
  for (let i = 0; i < squarePositions.length; i++) {
    for (let j = 0; j < squarePositions.length; j++) {
      const { x, y } = squarePositions[i][j];
      if (
        mouseX >= x &&
        mouseX <= x + squareSize &&
        mouseY >= y &&
        mouseY <= y + squareSize
      ) {
        selectedSquare.x = j;
        selectedSquare.y = i;
        return;
      }
    }
  }
  selectedSquare.x = null;
  selectedSquare.y = null;
}

function generateGameGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid.length; j++) {
      const randomNumber = Math.round(Math.random() / 1.5);
      if (randomNumber) gameGrid[i][j] = { type: "Mine", clicked: false };
      else gameGrid[i][j] = { type: "Number", value: 0, clicked: false }
    }
  }
  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid.length; j++) {
      const currentValue = gameGrid[i][j];
      if (currentValue.type !== "Mine") {
        const neighbors = {
          top: gameGrid[i - 1]?.[j],
          bottom: gameGrid[i + 1]?.[j],

          right: gameGrid[i]?.[j + 1],
          left: gameGrid[i]?.[j - 1],

          leftTop: gameGrid[i - 1]?.[j - 1],
          rightTop: gameGrid[i - 1]?.[j + 1],

          leftBottom: gameGrid[i + 1]?.[j - 1],
          rightBottom: gameGrid[i + 1]?.[j + 1],
        }
        let count = 0;

        Object.values(neighbors).forEach((neighbor) => {
          return neighbor?.type === "Mine" && count++
        })

        gameGrid[i][j] = { type: "Number", value: count, clicked: false };
      }
    }
  }
}

function detectClick() {
  const { x, y} = selectedSquare;
  if (r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT) && x !== null && y !== null) {
    const currentValue = gameGrid[y][x];
    currentValue.clicked = true

    if (currentValue.type === "Mine") {
      gameState = "Lost";
    }
  }
}

function isCurrent(i, j) {
  return i === selectedSquare.y && j === selectedSquare.x;
}

r.CloseWindow();
