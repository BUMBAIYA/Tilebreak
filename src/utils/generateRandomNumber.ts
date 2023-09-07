export function generateRandomIntNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateRandomFloatNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
