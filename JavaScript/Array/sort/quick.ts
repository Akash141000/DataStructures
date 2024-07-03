const unsortedArray = [3, 2, 5, 6, 7, 4, 1, 9, 8];

const partition = (array: number[], start: number, end: number): number => {
  let low = start;
  let high = start + 1;
  let pivotElement = array[start];
  let swap;

  while (high <= end) {
    if (array[high] <= pivotElement) {
      // console.log("SWAP", array[low], array[high]);
      low += 1;
      swap = array[low];
      array[low] = array[high];
      array[high] = swap;
      // console.log("PARTITION", array.slice(start, end + 1));
    }
    high += 1;
  }
  // console.log("FINAL SWAP>>", swap, array[low], array[start]);
  swap = array[low];
  array[low] = pivotElement;
  array[start] = swap;
  // console.log("FINAL PARTITION", array.slice(start, end + 1));
  return low;
};

const quickSort = (array: number[], low: number, high: number) => {
  // console.log("QS", low, high);
  if (low < high) {
    const partitionIndex = partition(array, low, high);

    quickSort(array, low, partitionIndex - 1);
    quickSort(array, partitionIndex + 1, high);
  }
  return array;
};

const sortedArray = quickSort(unsortedArray, 0, unsortedArray.length - 1);
console.log("QUICK SORT", sortedArray);
