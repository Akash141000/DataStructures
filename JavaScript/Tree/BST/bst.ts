const bst: number[] | any[] = [];

// Arrays is not the optimal way to represent binary search tree
// Hence, some errors are there when deletion operation occures since the children are not respresented properly
const unsortedElements = [5, 2, 3, 7, 8, 1, 6, 12, 15];
// const unsortedElements = [5, 2, 3, 7, 8, 1, 6];

//          5
//    2           7
// 1     3     6     8
//                      12
//                          15

// 5  -> 2, 7
// 2  -> 1, 3
// 7  -> 6, 8
// 8  -> null, 12
// 12 -> null, 15

//indexes

// 0 -> 1,2
// 1 -> 3,4
// 2 -> 5,6
// 3 -> 7,8
// 4 -> 9,10
// 5 -> 11,12
// 6 -> 13,14

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
      return null;
    }
    return findElement(element, leftChildNode);
  } else {
    let rightChildNode = position * 2 + 2;
    if (!bst[rightChildNode]) {
      console.log("Element not present!");
      return null;
    }
    return findElement(element, rightChildNode);
  }
}

function deleteElement(element: number, position: number) {
  console.log("Deleting element >>>", element, "At position >>>", position);
  //child of root node found to delete
  const leftChildNode = position * 2 + 1;
  const rightChildNode = position * 2 + 2;

  //traversing logic
  //get the element with lowest value from right sub tree by traversing to left side
  const getInOrderSuccessor = (position: number): any => {
    // console.log("InOrder Position >>>", position, "Element >>>", bst[position]);
    let rightChild = position * 2 + 2;
    let leftChild = position * 2 + 1;

    //if the node is leaf node then delete the position without swap
    if (!bst[rightChild] && !bst[leftChild]) {
      // console.log("Returning since lef node...");
      return position;
    }

    //if there is only single child then directly swap
    if (!bst[rightChild] || !bst[leftChild]) {
      // console.log(
      //   "Returning since single child...",
      //   bst[rightChild],
      //   bst[leftChild]
      // );
      if (bst[rightChild]) {
        return rightChild;
      } else {
        return leftChild;
      }
    }

    if (rightChildNode === rightChild) {
      // console.log("Right child traverse...");
      //first traverse right node and then keep left
      return getInOrderSuccessor(rightChild);
    } else {
      // console.log("Left child traverse...");
      if (bst[leftChild]) {
        return getInOrderSuccessor(leftChild);
      } else {
        // console.log("Returning position", position);
        return position;
      }
    }
  };

  //execution
  const swapPosition = getInOrderSuccessor(position);
  // console.log("Swap position", swapPosition);
  if (swapPosition && bst[swapPosition]) {
    // console.log("Swap element", bst[swapPosition]);
    if (swapPosition === position) {
      bst.splice(swapPosition, 1);
    } else {
      let swap = bst[swapPosition];
      bst.splice(swapPosition, 1); // bst[swapPosition] = null;
      bst[position] = swap;
    }
  }
}

function removeElement(element: number, position: number) {
  // console.log("Removing element >>>", element);
  //finding the element and getting the position if present
  const elementPosition = findElement(element, position);
  // console.log("Element position >>>", elementPosition);
  if (typeof elementPosition === "number") {
    deleteElement(element, elementPosition);
  }
}

function start() {
  unsortedElements.forEach((element) => {
    buildBst(element);
  });
  console.log("Bst", bst);
  // findElement(4, 0);
  removeElement(8, 0);
  console.log("Bst after deletion", bst);
}

start();
