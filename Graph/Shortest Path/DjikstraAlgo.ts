import {
  NodeTreeElement,
  buildTreeHeap,
  removeElementMinHeap,
  decreaseKey,
  minHeap,
} from "../../Heap/heapWithDecreaseKey";

// Solution
//
// B  --- A -> B -> 2
// D  --- A -> D -> 2
// E  --- A -> D -> E -> 2 + 1 -> 3
// C  --- A -> B -> C -> 2 + 2 -> 4
// F  --- A -> D -> F -> 2 + 3 -> 5
//

const graph: { [key: string]: [string, number][] } = {
  A: [
    ["B", 2],
    ["C", 5],
    ["D", 2],
    ["E", 7],
    ["F", 50],
  ],
  B: [
    ["C", 2],
    ["D", 1],
    ["E", 2],
    ["F", 60],
  ],
  C: [
    ["B", 3],
    ["E", 2],
    ["F", 90],
  ],
  D: [
    ["E", 1],
    ["F", 3],
  ],
  E: [
    ["D", 4],
    ["F", 4],
  ],
  F: [],
};

const decreaseKeyValue = (
  decreaseKeyName: string,
  value: number,
  currentNode: string
) => {
  let startToCurrentNode = 0;
  // 'A' is considered as the start node
  // For currentNode 'A' there is no link from A to A
  graph["A"].forEach((node) => {
    if (node[0] === currentNode) {
      startToCurrentNode = node[1];
    }
  });
  // console.log(
  //   "DK",
  //   decreaseKeyName,
  //   "Val",
  //   value,
  //   "Current",
  //   currentNode,
  //   "StartToCurr",
  //   startToCurrentNode
  // );
  minHeap.forEach((node) => {
    if (node.data === decreaseKeyName) {
      value = value + startToCurrentNode;
      if (node.value > value) {
        decreaseKey(decreaseKeyName, value, currentNode);
      }
    }
  });
};

function start() {
  console.log("Starting...");

  //tracking the nodes
  const nodePath = [];

  const visitedNodes: { [key: string]: string } = {};
  const startNode = "A";
  let currentNode = startNode;

  const heapNodeElements: NodeTreeElement[] = [];

  //loop through adjacant nodes and build minheap
  Object.keys(graph).forEach((adjNode) => {
    heapNodeElements.push(new NodeTreeElement(adjNode[0], 1000, currentNode));
  });

  //build min heap
  buildTreeHeap(heapNodeElements);
  console.log("Min Heap --->", minHeap);

  //remove node A
  removeElementMinHeap();

  while (Object.keys(graph).length !== Object.keys(visitedNodes).length) {
    console.log("Current Node --->", currentNode);

    visitedNodes[currentNode] = currentNode;

    if (minHeap.length === 0) {
      continue;
    }

    //loop through adjacant nodes and decrease key
    graph[currentNode].forEach((adjNode) => {
      console.log("adj", adjNode);

      //if the adjacent node is visited just skip the decrease key operation
      if (visitedNodes[adjNode[0]]) {
        return;
      }

      //decreaseKey(adjNode[0], adjNode[1], currentNode);
      decreaseKeyValue(adjNode[0], adjNode[1], currentNode);
    });

    //heap after decrease key
    console.log("Heap --->", minHeap);

    //
    const minPathElement = removeElementMinHeap();
    console.log("Min element --->", minPathElement);

    //push to node tracker
    nodePath.push(minPathElement);

    //loop through adj element

    //set min element as current element
    currentNode = minPathElement.data!;
  }
  console.log("Node path --->", nodePath);
}

start();
