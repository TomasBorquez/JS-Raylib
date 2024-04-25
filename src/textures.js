import { URL } from 'node:url'; 

const test = new URL('./morganaChest.png', import.meta.url).pathname


export function loadTextures(r) {
    console.log(test.slice(3));
  const loadSquare = r.LoadImage(new URL('./textures/morganaChest.png', import.meta.url).pathname.slice(3));
  const loadClicked = r.LoadImage(new URL('./textures/clickedMorganaChest.png', import.meta.url).pathname.slice(3));
  const loadOnMouse = r.LoadImage(new URL('./textures/onMouseMorganaChest.png', import.meta.url).pathname.slice(3));

  const squareTexture = r.LoadTextureFromImage(loadSquare);
  const clickedTexture = r.LoadTextureFromImage(loadClicked);
  const onMouseTexture = r.LoadTextureFromImage(loadOnMouse);

  return { squareTexture,clickedTexture,onMouseTexture };
}
