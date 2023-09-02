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

// const graph: { [key: string]: string[] } = {
//   A: ["B", "C", "D"],
//   B: ["A", "C", "E"],
//   C: ["A", "B", "D", "F", "E"],
//   D: ["A", "C", "F"],
//   E: ["B", "C", "F"],
//   F: ["C", "D", "E"],
// };

// const edgeWeights: { [key: string]: number } = {
//   AB: 7,
//   AC: 2,
//   AD: 6,
//   CB: 6,
//   CD: 6,
//   BE: 4,
//   CE: 8,
//   CF: 5,
//   DF: 3,
//   EF: 7,
// };

// const graph: { [key: string]: string[] } = {
//   A: ["B", "C", "D"],
//   B: ["A"],
//   C: ["A", "D"],
//   D: ["A", "C", "E"],
//   E: ["D"],
// };

// const edgeWeights: { [key: string]: number } = {
//   AB: 1,
//   AC: 1,
//   CD: 1,
//   AD: 1,
//   DE: 1,
// };

const graph: { [key: string]: number[] } = {
  A: [2],
  B: [3, 1],
  C: [2, 7],
  D: [5],
  E: [5, 4],
  F: [7, 5],
  G: [3, 6],
};

const edgeWeights: { [key: string]: string } = {
  AB: "12",
  BC: "23",
  DE: "45",
  FG: "67",
  EF: "56",
  CG: "37",
};

//Algo to detect the cycle
function start() {
  const nodeRanks: { [key: string]: number } = {};
  const nodeParents: { [key: string]: string } = {};

  //initialize all the node rank to zero
  Object.keys(graph).forEach((key) => {
    nodeRanks[key] = 0;
    nodeParents[key] = key;
  });

  //log
  console.log("Node Ranks --->", nodeRanks);
  console.log("Node Parents --->", nodeParents);

  //log
  console.log("Start----------------------------------------");

  //Looping through edges
  // Object.keys(edgeWeights).forEach((edge) => {
  for (let key in edgeWeights) {
    let edge = key.toString();

    const nodes = edge.split("");
    const nodeOne = nodes[0];
    const nodeTwo = nodes[1];

    //log
    console.log("Edge --->", edge);

    //get the parents of nodeOne and nodeTwo
    const nodeOne_Parent = nodeParents[nodeOne];
    const nodeTwo_Parent = nodeParents[nodeTwo];

    //log
    console.log(
      "NodeOne Parent --->",
      nodeOne_Parent,
      "NodeTwo Parent --->",
      nodeTwo_Parent
    );

    if (nodeOne_Parent === nodeTwo_Parent) {
      console.log("Cycle Present...", nodes);
      return;
    }

    //get parentRanks of nodeOne and nodeTwo
    const nodeOne_Parent_Rank = nodeRanks[nodeOne_Parent];
    const nodeTwo_Parent_Rank = nodeRanks[nodeTwo_Parent];

    //log
    console.log(
      "NodeOne Parent Rank --->",
      nodeOne_Parent_Rank,
      "NodeTwo Parent Rank --->",
      nodeTwo_Parent_Rank
    );
    let ultimateParentNew = "";
    if (nodeOne_Parent_Rank === nodeTwo_Parent_Rank) {
      nodeParents[nodeTwo] = nodeParents[nodeOne];
      ultimateParentNew = nodeParents[nodeOne];

      if (
        nodeRanks[nodeOne_Parent] !== 0 &&
        nodeTwo_Parent_Rank <= nodeOne_Parent_Rank
      ) {
        nodeRanks[nodeOne_Parent] = nodeOne_Parent_Rank + nodeTwo_Parent_Rank;
      } else if (nodeRanks[nodeOne_Parent] === 0) {
        nodeRanks[nodeOne_Parent] = 1;
      }
    } else if (nodeOne_Parent_Rank < nodeTwo_Parent_Rank) {
      nodeParents[nodeOne] = nodeParents[nodeTwo];
      ultimateParentNew = nodeParents[nodeTwo];

      if (
        nodeRanks[nodeTwo_Parent] !== 0 &&
        nodeTwo_Parent_Rank <= nodeOne_Parent_Rank
      ) {
        nodeRanks[nodeTwo_Parent] = nodeOne_Parent_Rank + nodeTwo_Parent_Rank;
      } else if (nodeRanks[nodeTwo_Parent] === 0) {
        nodeRanks[nodeTwo_Parent] = 1;
      }
    } else if (nodeOne_Parent_Rank > nodeTwo_Parent_Rank) {
      nodeParents[nodeTwo] = nodeParents[nodeOne];
      ultimateParentNew = nodeParents[nodeOne];

      if (
        nodeRanks[nodeOne_Parent] !== 0 &&
        nodeOne_Parent_Rank <= nodeTwo_Parent_Rank
      ) {
        nodeRanks[nodeOne_Parent] = nodeOne_Parent_Rank + nodeTwo_Parent_Rank;
      } else if (nodeRanks[nodeOne_Parent] === 0) {
        nodeRanks[nodeOne_Parent] = 1;
      }
    }

    //check if rank is one for both then update the ultimate parents to new
    if (nodeOne_Parent_Rank > 0 && nodeTwo_Parent_Rank > 0) {
      let oldParent =
        nodeOne_Parent === ultimateParentNew ? nodeTwo_Parent : nodeOne_Parent;
      console.log(
        "Updaing old parents.....",
        "Old Parent --->",
        oldParent,
        "New Parent --->",
        ultimateParentNew
      );

      Object.keys(nodeParents).forEach((node) => {
        if (nodeParents[node] === oldParent) {
          nodeParents[node] = ultimateParentNew;
        }
      });
    }

    //log
    console.log("Node Ranks", nodeRanks);
    console.log("Node Parents", nodeParents);
  }
  console.log("Final-----------------------");

  console.log("Node Ranks", nodeRanks);
  console.log("Node Parents", nodeParents);
}

start();
