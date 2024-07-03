import { NodeElement, QHasElement, deQueue, enQueue } from "../../Queue/queue";
import { buildHeap } from "../heap";

const dfs = (tree: any[]) => {
  let position = 0;
  const dfsTraverse = (position: number) => {
    let leftChild = position * 2 + 1;
    let rightChild = position * 2 + 2;

    if (typeof tree[position] !== "number") {
      return;
    }

    //Pre-Order Traversal
    // if (typeof tree[position] === "number") {
    //   console.log("Visited -->", tree[position]);
    // }
    // if (leftChild && tree[leftChild]) {
    //   dfsTraverse(leftChild);
    // }
    // if (rightChild && tree[rightChild]) {
    //   dfsTraverse(rightChild);
    // }

    //  In-Order Traversal
    // if (leftChild && tree[leftChild]) {
    //   dfsTraverse(leftChild);
    // }
    // if (typeof tree[position] === "number") {
    //   console.log("Visited -->", tree[position]);
    // }
    // if (rightChild && tree[rightChild]) {
    //   dfsTraverse(rightChild);
    // }

    //  Post-Order Traversal
    // if (leftChild && tree[leftChild]) {
    //   dfsTraverse(leftChild);
    // }
    // if (rightChild && tree[rightChild]) {
    //   dfsTraverse(rightChild);
    // }
    // if (typeof tree[position] === "number") {
    //   console.log("Visited -->", tree[position]);
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
  // const tree = [0, 1, 2, 3, 4, 5, 6, 7];
  // const tree = [5, 12, 7, 18, , 69, , 4, 13];
  // console.log("Tree--->", tree);
  //                   0
  //            1             2
  //        3       4     5        6
  //    7
  // dfs(tree);
  //bfs(tree);
};

start();
