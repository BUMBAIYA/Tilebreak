export function getRandomColor(clrArr: string[]) {
  if (clrArr.length === 0) {
    throw new Error("Random color cannot be generated from an empty array");
  }
  const colors = [...clrArr];

  const getColor = () => {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return getColor;
}
