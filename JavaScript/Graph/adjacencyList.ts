import { NodeElement, enQueue, QHasElement, deQueue } from "../Queue/queue";

//                         |
//               |---------5---------|
//               |                   |
//          |----3----|              7-----|
//          |         |                    |
//          2         4--------------------8
const graph: { [key: string]: string[] } = {
  "5": ["3", "7"],
  "3": ["2", "4"],
  "7": ["8"],
  "2": [],
  "4": ["8"],
  "8": [],
};

const visitedNodesDFT: { [key: string]: boolean } = {};
const visitedNodesBFT: { [key: string]: boolean } = {};

function dft(node: string) {
  console.log("Node -->", node);
  visitedNodesDFT[node] = true; //mark node as visited

  const adjacentNodes = graph[node];
  if (adjacentNodes.length > 0) {
    adjacentNodes.forEach((adjacentNode) => {
      //   console.log("Visited>>", adjacentNode);
      if (!visitedNodesDFT[adjacentNode]) {
        dft(adjacentNode);
      }
    });
  }
}

function bft(node: string) {
  console.log("Node -->", node);

  visitedNodesBFT[node] = true; //mark node as visited
  //   console.log("Visited list", visitedNodes);

  const adjacentNodes = graph[node];
  if (adjacentNodes.length > 0) {
    adjacentNodes.forEach((adjacentNode) => {
      if (!visitedNodesBFT[adjacentNode]) {
        enQueue(new NodeElement(adjacentNode));
      }
    });
  }
  while (QHasElement()) {
    const newNode = deQueue();
    if (newNode?.data && !visitedNodesBFT[newNode?.data]) {
      bft(newNode?.data);
    }
  }
}

function start() {
  //DFT
  console.log("Traversing... Depth first search");
  dft("5");

  //BFT
  console.log("Traversing... Breadth first search");
  bft("5");
}

start();
