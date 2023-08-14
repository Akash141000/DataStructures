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

const edgeWeights: { [key: string]: number } = {
  AB: 70,
  BD: 60,
  BC: 20,
  BE: 40,
  DC: 50,
  CE: 30,
  DE: 10,
};

const graphNodes = { A: 1, B: 2, C: 3, D: 4, E: 5 };
const graphMatrix = [];

const graph: { [key: string]: string[] } = {
  A: ["B"],
  B: ["C", "D", "E"],
  C: ["B", "E", "D"],
  D: ["B", "E", "C"],
  E: ["C", "D", "B"],
};

const graphAfter: { [key: string]: string[] } = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
};

let visitedNodesDFT: { [key: string]: boolean } = {};
const visitedNodesBFT: { [key: string]: boolean } = {};

function dft(node: string, graph: { [key: string]: string[] }) {
  let cyclePresent = false;
  console.log("Node -->", node);
  //   console.log("VISITED NODES", visitedNodesDFT);

  visitedNodesDFT[node] = true; //mark node as visited

  const adjacentNodes = graph[node];
  if (adjacentNodes.length > 0) {
    adjacentNodes.forEach((adjacentNode) => {
      console.log("Is present", adjacentNode, "NODE");
      if (visitedNodesDFT[adjacentNode]) {
        cyclePresent = true;
      }
      if (!visitedNodesDFT[adjacentNode]) {
        return dft(adjacentNode, graph);
      }
    });
  }
  return cyclePresent;
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
    // if (visitedNodesBFT[newNode?.data]) {
    //   console.log("Cycle Present", newNode?.data);
    //   return true;
    // }
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
  const minSortedNodes: NodeTreeElement[] = [];
  minHeap.forEach((node) => {
    const minNode = removeElementMinHeap();
    console.log("MIN NODE>>>>>>>>>>>>>>>>>>>>>>>>>", minNode.data);
    const nodes = minNode.data!.split("");
    if (nodes?.length >= 2) {
      graphAfter[nodes[0]].push(nodes[1]);
    }
    console.log("GRAPH AFTER>>>", graphAfter);
    visitedNodesDFT = {};
    const cyclePresent = dft(nodes[0], graphAfter);
    if (cyclePresent) {
      const indexToRemove = graphAfter[nodes[0]].findIndex(
        (element) => element === nodes[1]
      );
      graphAfter[nodes[0]].splice(indexToRemove);
    }
    console.log("CYCLE", cyclePresent);
  });
  console.log("Graph after", graphAfter);
  dft("A", graphAfter);
  //   console.log("MIN SORTED", minSortedNodes);
}

start();
