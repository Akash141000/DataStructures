import { NodeElement, enQueue, QHasElement, deQueue } from "../Queue/queue";

//                         |
//               |---------5---------|
//               |                   |
//          |----3----|              7-----|
//          |         |                    |
//          2         4--------------------8

//  //  5, 3, 7, 2, 4, 8
//  5 | 0, 1, 1, 0, 0, 0
//  3 | 0, 0, 0, 1, 1, 0
//  7 | 0, 0, 0, 0, 0, 1
//  2 | 0, 0, 0, 0, 0, 0
//  4 | 0, 0, 0, 0, 0, 1
//  8 | 0, 0, 0, 0, 0, 0
const graph = [
  [0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0],
];

const nodes = [5, 3, 7, 2, 4, 8];

const visitedNodesDFT: { [key: string]: boolean } = {};
const visitedNodesBFT: { [key: string]: boolean } = {};

function dft(node: number) {
  console.log("Node -->", nodes[node], ", Index", node);
  visitedNodesDFT[nodes[node]] = true; //mark node as visited
  let i = node; // lets say i is the node and the node-index in nodes

  for (let j = 0; j < graph.length; j++) {
    const adjacentNode = graph[i][j];
    if (adjacentNode && !visitedNodesDFT[nodes[j]]) {
      dft(j);
    }
  }
}

function bft(node: number) {
  console.log("Node -->", nodes[node], ", Index", node);

  visitedNodesBFT[nodes[node]] = true; //mark node as visited

  let i = node; // lets say i is the node and the node-index in nodes

  // console.log("Visited", visitedNodesBFT);
  for (let j = 0; j < graph.length; j++) {
    const adjacentNode = graph[i][j];
    // console.log("ADJ", adjacentNode);
    if (adjacentNode && !visitedNodesBFT[nodes[j]]) {
      // console.log("enqueue", nodes[j]);
      enQueue(new NodeElement(j));
    }
  }

  while (QHasElement()) {
    const newNode = deQueue();
    if (newNode?.data && !visitedNodesBFT[nodes[newNode?.data]]) {
      bft(newNode?.data);
    }
  }
}

// function traversingMatrix() {
//   for (let i = 0; i < graph.length; i++) {
//     console.log("\n");
//     for (let j = 0; j < graph.length; j++) {
//       console.log(`${nodes[i] + "to" + nodes[j]}`, graph[i][j]);
//     }
//   }
// }

function start() {
  //DFT
  console.log("Traversing... Depth first search");
  dft(0);
  //BFT
  console.log("Traversing... Breadth first search");
  bft(0);
  ////
  // //traversing through matrix
  // //   traversingMatrix();
}

start();
