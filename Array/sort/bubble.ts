const unsortedArray = [3, 2, 5, 6, 7, 4, 1, 9, 8];

const bubbleSort = (array: number[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      let swap = 0;
      if (array[j] < array[i]) {
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
      }
    }
  }
  return unsortedArray;
};

const sortedArray = bubbleSort(unsortedArray);
console.log("BUBBLE SORT", sortedArray);
