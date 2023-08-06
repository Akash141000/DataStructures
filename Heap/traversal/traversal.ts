import { NodeElement, QHasElement, deQueue, enQueue } from "../../Queue/queue";
import { buildHeap } from "../heap";

const dfs = (tree: any[]) => {
  let position = 0;
  const dfsTraverse = (position: number) => {
    let leftChild = position * 2 + 1;
    let rightChild = position * 2 + 2;
    // if (typeof tree[position] === "number") {
    //   console.log(
    //     "Element-->",
    //     tree[position],
    //     "Position-->",
    //     position,
    //     "Left-->",
    //     leftChild,
    //     "Right-->",
    //     rightChild
    //   );
    // }

    //Pre-Order Traversal
    // if (typeof tree[position] === "number") {
    //   console.log("Visited -->", tree[position]);
    // }
    // if (!tree[leftChild] && !tree[rightChild]) {
    //   return;
    // }
    // if (leftChild) {
    //   dfsTraverse(leftChild);
    // }
    // if (rightChild) {
    //   dfsTraverse(rightChild);
    // }

    //  In-Order Traversal //need to organise code to work
    // if (typeof tree[position] === "number") {
    //   console.log("Visited -->", tree[position]);
    // }
    // if (!tree[leftChild] && !tree[rightChild]) {
    //   return;
    // }
    // if (leftChild) {
    //   dfsTraverse(leftChild);
    // }
    // if (rightChild) {
    //   dfsTraverse(rightChild);
    // }
  };
  dfsTraverse(position);
};

const bfs = (tree: any[]) => {
  const position = 0;
  const bfsTraverse = () => {
    while (QHasElement()) {
      const element = deQueue();
      console.log("Visited --> ", element?.data.element);
      let position = element?.data.position;
      let leftChild = position * 2 + 1;
      let rightChild = position * 2 + 2;
      if (!tree[leftChild] && !tree[rightChild]) {
        continue;
      }
      if (tree[leftChild]) {
        enQueue(
          new NodeElement({ element: tree[leftChild], position: leftChild })
        );
      }

      if (tree[rightChild]) {
        enQueue(
          new NodeElement({ element: tree[rightChild], position: rightChild })
        );
      }
    }
  };
  enQueue(new NodeElement({ element: tree[position], position: 0 }));
  bfsTraverse();
};

const start = () => {
  const tree = [0, 1, 2, 3, 4, 5, 6, 7];
  // console.log("Tree--->", tree);
  //                   0
  //            1             2
  //        3       4     5        6
  //    7
  // dfs(tree);
  bfs(tree);
};

start();
