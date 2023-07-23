const elements = [5, 2, 6, 1, 8, 9, 0];

const elementToFind = 1;

const findElement = (findElement: number) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === elementToFind) {
      console.log("ELEMENT>>", elements[i], "Index>>", i);
      break;
    }
  }
};

findElement(elementToFind);
