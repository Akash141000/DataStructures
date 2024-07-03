const elements = [1, 2, 3, 4, 5, 6, 7, 8, 11, 25, 34, 56]; ////element needs to sorted for binary search

const elementToFind = 2;

const findMid = (elements: number[]) => {
  let mid = 0;
  if (elements.length / 2 === 0) {
    mid = elements.length / 2;
  } else {
    mid = Math.floor(elements.length / 2);
  }
  console.log("MID>>", mid);
  console.log("MID ELEMENT >>", elements[mid]);
  if (elements[mid] === elementToFind) {
    console.log("ELEMENT FOUND", elements[mid]);
    return mid;
  } else {
    if (elements[mid] < elementToFind) {
      console.log("ELEMENTS", elements.slice(mid));
    } else {
      console.log("ELEMENTS", elements.slice(0, mid));
    }
    findMid(
      elements[mid] < elementToFind
        ? elements.slice(mid)
        : elements.slice(0, mid)
    );
  }
};

const findElement = (findElement: number) => {
  findMid(elements);
};

findElement(elementToFind);
