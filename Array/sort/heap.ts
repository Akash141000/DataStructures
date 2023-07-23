const unsortedArray = [3, 2, 5, 6, 7, 4, 1, 9, 8];
// const unsortedArray = [8, 2, 4, 6, 5, 9, 10, 13];

const deleteElement = (heap: any[]) => {
  let currentIndex = 0;
  let minElement = heap[currentIndex]; //root removed
  let root = heap[heap.length - 1];
  heap.splice(heap.length - 1, 1);
  let swap;
  heap[0] = root; // set root as new child element
  let leftChild = 0 * 2 + 1; //root left child
  let rightChild = 0 * 2 + 2; // root right child
  // console.log("ELEMENT REMOVED", minElement, "ROOT", root, heap);
  while (root > heap[leftChild] || root > heap[rightChild]) {
    let swapWithIndex =
      !heap[leftChild] || !heap[rightChild]
        ? heap[leftChild]
          ? leftChild
          : rightChild
        : heap[leftChild] < heap[rightChild]
        ? leftChild
        : rightChild;

    swap = heap[currentIndex];
    heap[currentIndex] = heap[swapWithIndex];
    // console.log(
    //   "SWAP>>",
    //   swap,
    //   heap[swapWithIndex],
    //   "SWAP INDEX>>",
    //   swapWithIndex
    // );

    heap[swapWithIndex] = swap;
    currentIndex = swapWithIndex;
    leftChild = currentIndex * 2 + 1;
    rightChild = currentIndex * 2 + 2;
    // console.log("SWAPPED>>", heap);
  }
  return minElement;
};

const minHeapify = (heap: number[], elementIndex: number) => {
  let parentIndex = Math.ceil(elementIndex / 2 - 1);
  let swap;
  while (heap[parentIndex] > heap[elementIndex]) {
    swap = heap[parentIndex];
    heap[parentIndex] = heap[elementIndex];
    heap[elementIndex] = swap;
    elementIndex = parentIndex;
    parentIndex = Math.ceil(elementIndex / 2 - 1);
  }
};

const heapSort = (array: number[]) => {
  const sortedArray: number[] = [];
  const minHeap: number[] = [];
  for (let i = 0; i < array.length; i++) {
    minHeap.push(array[i]);
    minHeapify(minHeap, minHeap.length - 1);
  }
  console.log("MIN HEAP", minHeap);

  for (let i = 0; i < array.length; i++) {
    let minElement = deleteElement(minHeap);
    sortedArray.push(minElement);
  }
  return sortedArray;
};

const sortedArray = heapSort(unsortedArray);
console.log("HEAP SORT", sortedArray);
