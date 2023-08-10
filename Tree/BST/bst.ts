const bst: number[] = [];

const unsortedElements = [5, 2, 3, 7, 8, 1, 6];

//          5
//    2           7
// 1     3     6     8

// 5 -> 2, 7
// 2 -> 1, 3
// 7 -> 6, 8

function buildBst(element: number) {
  let root = 0;
  if (bst.length === 0) {
    bst.push(element);
    return;
  }
  insertElement(element, root);
}

function insertElement(element: number, root: number) {
  if (element < bst[root]) {
    let leftChildNode = root * 2 + 1;
    if (!bst[leftChildNode]) {
      bst[leftChildNode] = element;
      return;
    }
    insertElement(element, leftChildNode);
  } else {
    let rightChildNode = root * 2 + 2;
    if (!bst[rightChildNode]) {
      bst[rightChildNode] = element;
      return;
    }
    insertElement(element, rightChildNode);
  }
}

function findElement(element: number, position: number) {
  if (bst[position] === element) {
    console.log("Element found at index", position);
    return position;
  }

  if (element < bst[position]) {
    let leftChildNode = position * 2 + 1;
    if (!bst[leftChildNode]) {
      console.log("Element not present!");
      return;
    }
    findElement(element, leftChildNode);
  } else {
    let rightChildNode = position * 2 + 2;
    if (!bst[rightChildNode]) {
      console.log("Element not present!");
      return;
    }
    findElement(element, rightChildNode);
  }
}

function start() {
  unsortedElements.forEach((element) => {
    buildBst(element);
  });
  console.log("Bst", bst);
  findElement(4, 0);
}

start();
