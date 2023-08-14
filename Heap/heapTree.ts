let minHeap: NodeTreeElement[] = [];
let maxHeap: NodeTreeElement[] = [];

export class NodeTreeElement {
  data: string | null = null;
  value: number = 0;

  constructor(data: string, value: number) {
    this.data = data;
    this.value = value;
  }
}
// 1 -> 2,3
// 2 -> 4,5
// 3 -> 6,7
// 4 -> 8,9
// 5 -> 10,11

export const minHeapify = (insertPosition: number) => {
  let parentIndex = Math.ceil(insertPosition / 2 - 1);
  let swap = minHeap[parentIndex];
  while (minHeap[parentIndex]?.value > minHeap[insertPosition]?.value) {
    swap = minHeap[parentIndex];
    minHeap[parentIndex] = minHeap[insertPosition];
    minHeap[insertPosition] = swap;
    insertPosition = parentIndex;
    parentIndex = Math.ceil(insertPosition / 2 - 1);
  }
};

export const maxHeapify = (insertPosition: number) => {
  let parentIndex = Math.ceil(insertPosition / 2 - 1);
  let swap = maxHeap[parentIndex];
  while (maxHeap[parentIndex]?.value < maxHeap[insertPosition]?.value) {
    swap = maxHeap[parentIndex];
    maxHeap[parentIndex] = maxHeap[insertPosition];
    maxHeap[insertPosition] = swap;
    insertPosition = parentIndex;
    parentIndex = Math.ceil(insertPosition / 2 - 1);
  }
};

const addElementMinHeap = (unsortedArray: NodeTreeElement[]) => {
  unsortedArray.forEach((ele) => {
    const elementIndex = minHeap.length;
    minHeap.push(ele);
    minHeapify(elementIndex);
  });
};

const addElementMaxHeap = (unsortedArray: NodeTreeElement[]) => {
  unsortedArray.forEach((ele) => {
    const elementIndex = maxHeap.length;
    maxHeap.push(ele);
    maxHeapify(elementIndex);
  });
};

export const removeElementMinHeap = () => {
  const removeElement = minHeap[0];
  const leafIndex = minHeap.length - 1;
  const leafElement = minHeap[leafIndex];
  minHeap[0] = leafElement;
  minHeap = minHeap.slice(0, leafIndex);
  let parentIndex = 0;
  let leftChildIndex = parentIndex * 2 + 1;
  let rightChildIndex = parentIndex * 2 + 2;
  let swapChildIndex = 0;
  let swap = new NodeTreeElement("Null", 0);
  while (
    leafElement.value > minHeap[leftChildIndex]?.value ||
    leafElement.value > minHeap[rightChildIndex]?.value
  ) {
    if (
      minHeap[leftChildIndex]?.value < minHeap[rightChildIndex]?.value ||
      !minHeap[rightChildIndex]?.value
    ) {
      swapChildIndex = leftChildIndex;
    } else if (
      minHeap[rightChildIndex]?.value < minHeap[leftChildIndex]?.value ||
      !minHeap[leftChildIndex]?.value
    ) {
      swapChildIndex = rightChildIndex;
    }
    swap = minHeap[swapChildIndex];
    minHeap[swapChildIndex] = leafElement;
    minHeap[parentIndex] = swap;
    parentIndex = swapChildIndex;
    leftChildIndex = parentIndex * 2 + 1;
    rightChildIndex = parentIndex * 2 + 2;
  }

  return removeElement;
};

export const removeElementMaxHeap = () => {
  const removeElement = maxHeap[0];
  const leafIndex = maxHeap.length - 1;
  const leafElement = maxHeap[leafIndex];
  maxHeap[0] = leafElement;
  maxHeap = maxHeap.slice(0, leafIndex);
  let parentIndex = 0;
  let leftChildIndex = parentIndex * 2 + 1;
  let rightChildIndex = parentIndex * 2 + 2;
  let swapChildIndex = 0;
  let swap = new NodeTreeElement("NULL", 0);

  while (
    leafElement.value < maxHeap[leftChildIndex]?.value ||
    leafElement.value < maxHeap[rightChildIndex]?.value
  ) {
    if (
      maxHeap[leftChildIndex]?.value > maxHeap[rightChildIndex]?.value ||
      !maxHeap[rightChildIndex]?.value
    ) {
      swapChildIndex = leftChildIndex;
    } else if (
      maxHeap[rightChildIndex]?.value > maxHeap[leftChildIndex]?.value ||
      !maxHeap[leftChildIndex]?.value
    ) {
      swapChildIndex = rightChildIndex;
    }
    swap = maxHeap[swapChildIndex];
    maxHeap[swapChildIndex] = leafElement;
    maxHeap[parentIndex] = swap;
    parentIndex = swapChildIndex;
    leftChildIndex = parentIndex * 2 + 1;
    rightChildIndex = parentIndex * 2 + 2;
  }

  return removeElement;
};

const getMinSortedArray = () => {
  const sortedArray: NodeTreeElement[] = [];
  minHeap.forEach((ele) => {
    const minElement = removeElementMinHeap();
    sortedArray.push(minElement);
  });
  // console.log("Min Sorted Array", sortedArray);
};

const getMaxSortedArray = () => {
  const sortedArray: NodeTreeElement[] = [];
  maxHeap.forEach((ele) => {
    const maxElement = removeElementMaxHeap();
    sortedArray.push(maxElement);
  });
  // console.log("Max Sorted Array", sortedArray);
};

const start = () => {
  // const unsortedArray = [20, 10, 5, 32, 7, 2, 1, 27, 22];
  const unsortedArray = [
    new NodeTreeElement("AB", 70),
    new NodeTreeElement("BD", 60),
    new NodeTreeElement("BC", 20),
    new NodeTreeElement("BE", 40),
    new NodeTreeElement("DC", 50),
    new NodeTreeElement("CE", 30),
    new NodeTreeElement("DE", 10),
  ];
  addElementMinHeap([...unsortedArray]);
  // console.log("MIN HEAP", minHeap);
  getMinSortedArray();

  addElementMaxHeap([...unsortedArray]);
  // console.log("MAX HEAP", maxHeap);
  getMaxSortedArray();
};

start();

export const buildTreeHeap = (unsortedArray: NodeTreeElement[]) => {
  addElementMinHeap([...unsortedArray]);
  return minHeap;
};

// 1 -> 2,3
// 2 -> 4,5
// 3 -> 6,7
// 4 -> 8,9
// 5 -> 10,11

//expected Min Heap [ 1, 7,  2, 22, 20, 10, 5, 32, 27 ]
