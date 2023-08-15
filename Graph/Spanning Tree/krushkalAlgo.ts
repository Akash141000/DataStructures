import { NodeElement, QHasElement, deQueue, enQueue } from "../../Queue/queue";
import {
  NodeTreeElement,
  buildTreeHeap,
  removeElementMinHeap,
} from "../../Heap/heapTree";

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

const graph: { [key: string]: string[] } = {
  A: ["B"],
  B: ["C", "D", "E"],
  C: ["B", "E", "D"],
  D: ["B", "E", "C"],
  E: ["C", "D", "B"],
};

const edgeWeights: { [key: string]: number } = {
  AB: 70,
  BD: 60,
  BC: 20,
  BE: 40,
  DC: 50,
  CE: 30,
  DE: 10,
};

const graphAfter: { [key: string]: string[] } = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
};

let visitedNodesDFT: { [key: string]: boolean } = {}; // let is used since dft used for cycle detection
const visitedNodesBFT: { [key: string]: boolean } = {};

function dft(
  node: string,
  graph: { [key: string]: string[] },
  cyclePresent?: boolean[]
) {
  console.log("Node -->", node);
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

function bft(node: string, graph: { [key: string]: string[] }) {
  console.log("Node -->", node);

  visitedNodesBFT[node] = true; //mark node as visited

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
      return bft(newNode?.data, graph);
    }
  }
  return false;
}

function start() {
  //DFT
  //   console.log("Traversing... Depth first search");
  //   dft("A");

  //BFT
  //   console.log("Traversing... Breadth first search");
  //   bft("A", graph);

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
    graphAfter[nodes[1]].push(nodes[0]);
  });
  console.log("Acyclic graph -->", graphAfter);
  visitedNodesDFT = {};
  dft("A", graphAfter);
}

start();
