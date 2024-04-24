import { screenWidth } from "./static.js";

export class Text {
  static calculatePixels(text) {
    return screenWidth / 2 - text.length * 5;
  }
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}
