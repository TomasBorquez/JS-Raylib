import r from "raylib";
import {
	screenHeight,
	screenWidth, selectedSquare,
	squareSize,
	startingHeight,
	startingWidth,
} from "./static.js";

let squarePositions = [[], [], [], [], [], [], [], [], [], []];
let startup = true;

r.InitWindow(screenWidth, screenHeight, "");
r.SetTargetFPS(244);

let count = 0;
while (!r.WindowShouldClose()) {
  if (count) startup = false;
  r.BeginDrawing();
  r.ClearBackground(r.LIGHTGRAY);
  showGrid(10);
  detectSquare();
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
      r.DrawRectangle(
        position.x + j * (squareSize + 5),
        position.y + i * (squareSize + 5),
        squareSize,
        squareSize,
				isCurrent(i, j) ? r.ORANGE : r.YELLOW,
      );
      if (startup) {
        squarePositions[i].push({
          x: position.x + j * (squareSize + 5),
          y: position.y + i * (squareSize + 5),
        });
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
				(mouseX >= x && mouseX <= x + squareSize)
				&&
				(mouseY >= y && mouseY <= y + squareSize)
      ) {
				selectedSquare.x = j;
				selectedSquare.y = i;
      }
    }
  }
  return { x: 0, y: 0 };
}

function isCurrent(i, j) {
	return i === selectedSquare.y && j === selectedSquare.x ;
}

r.CloseWindow();
