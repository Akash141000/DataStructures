import {
  NodeTreeElement,
  buildTreeHeap,
  decreaseKey,
  removeElementMinHeap,
} from "../../Heap/heapWithDecreaseKey";

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

function start() {
  //keep track of visited nodes
  const visitedNodes: { [key: string]: string } = {};

  //first initialize all node to infinity in minHeap
  const valueAsInfinity = 100000;
  const graphNodes: NodeTreeElement[] = [];
  const nodeSequence: string[] = [];
  Object.keys(graph).forEach((node) => {
    const treeNode = new NodeTreeElement(node, valueAsInfinity, "");
    graphNodes.push(treeNode);
  });

  //build Heap for  the infinity Nodes
  const minHeap = buildTreeHeap(graphNodes);
  console.log("MinHeap Infinity --->", minHeap);

  //remove one element to start
  let minValueNode = new NodeTreeElement("", 0, "");

  //do while all graph nodes are visited
  while (Object.keys(visitedNodes).length !== Object.keys(graph).length) {
    minValueNode = removeElementMinHeap();

    //register node as visited
    if (minValueNode.data) {
      visitedNodes[minValueNode.data!] = minValueNode.data;
    }

    // add node to node traverse sequence
    if (minValueNode.link) {
      nodeSequence.push(`${minValueNode.link}${minValueNode.data!}`);
    }
    console.log("Min Value Node --->", minValueNode);

    //find the adjacent nodes
    const adjacentNodes = graph[minValueNode.data!];
    console.log("Adjacent Node --->", adjacentNodes);

    //looping through Adjacent Nodes
    adjacentNodes.forEach((adjacentNode) => {
      //find the edge value
      let edgeValue =
        edgeWeights[`${minValueNode.data!}${adjacentNode}`] ||
        edgeWeights[`${adjacentNode}${minValueNode.data!}`];
      console.log("Edge Value", edgeValue);

      //if the node is not visited yet then decrease key value
      if (!visitedNodes[adjacentNode]) {
        decreaseKey(adjacentNode, edgeValue, minValueNode.data!);
      }
    });
  }

  console.log("Node traversal sequence --->", nodeSequence);
}

start();
