let minHeap: number[] = [];
let maxHeap: number[] = [];

// 1 -> 2,3
// 2 -> 4,5
// 3 -> 6,7
// 4 -> 8,9
// 5 -> 10,11

const minHeapify = (insertPosition: number) => {
  let parentIndex = Math.ceil(insertPosition / 2 - 1);
  let swap = minHeap[parentIndex];
  while (minHeap[parentIndex] > minHeap[insertPosition]) {
    swap = minHeap[parentIndex];
    minHeap[parentIndex] = minHeap[insertPosition];
    minHeap[insertPosition] = swap;
    insertPosition = parentIndex;
    parentIndex = Math.ceil(insertPosition / 2 - 1);
  }
};

const maxHeapify = (insertPosition: number) => {
  let parentIndex = Math.ceil(insertPosition / 2 - 1);
  let swap = maxHeap[parentIndex];
  while (maxHeap[parentIndex] < maxHeap[insertPosition]) {
    swap = maxHeap[parentIndex];
    maxHeap[parentIndex] = maxHeap[insertPosition];
    maxHeap[insertPosition] = swap;
    insertPosition = parentIndex;
    parentIndex = Math.ceil(insertPosition / 2 - 1);
  }
};

const addElementMinHeap = (unsortedArray: number[]) => {
  unsortedArray.forEach((ele) => {
    const elementIndex = minHeap.length;
    minHeap.push(ele);
    minHeapify(elementIndex);
  });
};

const addElementMaxHeap = (unsortedArray: number[]) => {
  unsortedArray.forEach((ele) => {
    const elementIndex = maxHeap.length;
    maxHeap.push(ele);
    maxHeapify(elementIndex);
  });
};

const removeElementMinHeap = () => {
  const removeElement = minHeap[0];
  const leafIndex = minHeap.length - 1;
  const leafElement = minHeap[leafIndex];
  minHeap[0] = leafElement;
  minHeap = minHeap.slice(0, leafIndex);
  let parentIndex = 0;
  let leftChildIndex = parentIndex * 2 + 1;
  let rightChildIndex = parentIndex * 2 + 2;
  let swapChildIndex = 0;
  let swap = 0;

  while (
    leafElement > minHeap[leftChildIndex] ||
    leafElement > minHeap[rightChildIndex]
  ) {
    if (
      minHeap[leftChildIndex] < minHeap[rightChildIndex] ||
      !minHeap[rightChildIndex]
    ) {
      swapChildIndex = leftChildIndex;
    } else if (
      minHeap[rightChildIndex] < minHeap[leftChildIndex] ||
      !minHeap[leftChildIndex]
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

const removeElementMaxHeap = () => {
  const removeElement = maxHeap[0];
  const leafIndex = maxHeap.length - 1;
  const leafElement = maxHeap[leafIndex];
  maxHeap[0] = leafElement;
  maxHeap = maxHeap.slice(0, leafIndex);
  let parentIndex = 0;
  let leftChildIndex = parentIndex * 2 + 1;
  let rightChildIndex = parentIndex * 2 + 2;
  let swapChildIndex = 0;
  let swap = 0;

  while (
    leafElement < maxHeap[leftChildIndex] ||
    leafElement < maxHeap[rightChildIndex]
  ) {
    if (
      maxHeap[leftChildIndex] > maxHeap[rightChildIndex] ||
      !maxHeap[rightChildIndex]
    ) {
      swapChildIndex = leftChildIndex;
    } else if (
      maxHeap[rightChildIndex] > maxHeap[leftChildIndex] ||
      !maxHeap[leftChildIndex]
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
  const sortedArray: number[] = [];
  minHeap.forEach((ele) => {
    const minElement = removeElementMinHeap();
    sortedArray.push(minElement);
  });
  console.log("Min Sorted Array", sortedArray);
};

const getMaxSortedArray = () => {
  const sortedArray: number[] = [];
  maxHeap.forEach((ele) => {
    const maxElement = removeElementMaxHeap();
    sortedArray.push(maxElement);
  });
  console.log("Max Sorted Array", sortedArray);
};

const start = () => {
  const unsortedArray = [20, 10, 5, 32, 7, 2, 1, 27, 22];

  addElementMinHeap([...unsortedArray]);
  console.log("MIN HEAP", minHeap);
  getMinSortedArray();

  addElementMaxHeap([...unsortedArray]);
  console.log("MAX HEAP", maxHeap);
  getMaxSortedArray();
};

start();

// 1 -> 2,3
// 2 -> 4,5
// 3 -> 6,7
// 4 -> 8,9
// 5 -> 10,11

//expected Min Heap [ 1, 7,  2, 22, 20, 10, 5, 32, 27 ]
