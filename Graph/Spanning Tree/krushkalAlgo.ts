import { NodeElement, QHasElement, deQueue, enQueue } from "../../Queue/queue";
import {
  NodeTreeElement,
  buildTreeHeap,
  removeElementMinHeap,
} from "../../Heap/heapTree";

//// Graph 1
//
//         A
//     70 /                     // AB - 70
//       /      20              // BD - 60
//      B---------------C       // BC - 20
//      | 40\        /  |       // BE - 40
//      |       |       | 30    // DC - 50
//   60 | 50/        \  |       // CE - 30
//      D---------------E       // DE - 10
//              10
//

// const graph: { [key: string]: string[] } = {
//   A: ["B"],
//   B: ["C", "D", "E", "A"],
//   C: ["B", "E", "D"],
//   D: ["B", "E", "C"],
//   E: ["C", "D", "B"],
// };

// const edgeWeights: { [key: string]: number } = {
//   AB: 70,
//   BD: 60,
//   BC: 20,
//   BE: 40,
//   DC: 50,
//   CE: 30,
//   DE: 10,
// };

//// Graph 2
//                A
//             /  |  \
//          7/    |2   \6
//         /   6  |   6  \
//      B ------- C ------- D
//        \     /   \     /
//        4\  8/    5\   /3
//          \ /       \ /
//           E  -----  F
//                7

const graph: { [key: string]: string[] } = {
  A: ["B", "C", "D"],
  B: ["A", "C", "E"],
  C: ["A", "B", "D", "F", "E"],
  D: ["A", "C", "F"],
  E: ["B", "C", "F"],
  F: ["C", "D", "E"],
};

const edgeWeights: { [key: string]: number } = {
  AB: 7,
  AC: 2,
  AD: 6,
  CB: 6,
  CD: 6,
  BE: 4,
  CE: 8,
  CF: 5,
  DF: 3,
  EF: 7,
};

const graphAfter: { [key: string]: string[] } = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
  F: [],
};

const edgeTraversalPath: string[] = [];

let visitedNodesDFT: { [key: string]: boolean } = {}; // let is used since dft used for cycle detection
const visitedNodesBFT: { [key: string]: boolean } = {};

function dft(
  node: string,
  graph: { [key: string]: string[] },
  cyclePresent?: boolean[]
) {
  // console.log("Node -->", node, graphAfter);
  visitedNodesDFT[node] = true; //mark node as visited

  const adjacentNodes = graph[node];
  if (adjacentNodes.length > 0) {
    adjacentNodes.forEach((adjacentNode) => {
      if (visitedNodesDFT[adjacentNode] && cyclePresent) {
        cyclePresent.push(true);
      } else if (!visitedNodesDFT[adjacentNode]) {
        dft(adjacentNode, graph, cyclePresent);
      }
    });
  }
}

function start() {
  const nodeEdges: any[] = [];
  Object.keys(edgeWeights).forEach((edge) => {
    nodeEdges.push(new NodeTreeElement(edge, edgeWeights[edge]));
  });
  const minHeap = buildTreeHeap(nodeEdges);
  let validEdges: any[] = [];
  minHeap.forEach((node) => {
    const minNode = removeElementMinHeap();
    console.log("Edge ----------->", minNode.data);
    const nodes = minNode.data!.split("");
    if (nodes?.length >= 2) {
      graphAfter[nodes[0]].push(nodes[1]);
    }
    visitedNodesDFT = {}; //visited nodes reset
    let cyclePresent: boolean[] = [];
    dft(nodes[0], graphAfter, cyclePresent);
    // console.log("NODES", nodes, cyclePresent);

    if (cyclePresent.some((val) => val === true)) {
      const indexToRemove = graphAfter[nodes[0]].findIndex(
        (element) => element === nodes[1]
      );
      graphAfter[nodes[0]].splice(indexToRemove);
    } else {
      validEdges.push(minNode.data);
    }
  });
  validEdges.forEach((edge) => {
    const nodes = edge.split("");
    edgeTraversalPath.push(`${nodes[0]}${nodes[1]}`);
    graphAfter[nodes[1]].push(nodes[0]);
  });
  console.log("Acyclic graph -->", graphAfter);
  visitedNodesDFT = {};
  dft("A", graphAfter);
  console.log("Edge Traversal", edgeTraversalPath);
}

start();
