const unsortedArray = [3, 2, 5, 6, 7, 4, 1, 9, 8];

const selectionSort = (array: number[]) => {
  for (let i = 0; i < array.length; i++) {
    let smallest = array[i];
    let indexOfSmallest = i;
    let swap = 0;
    for (let j = i + 1; j < array.length; j++) {
      if (smallest > array[j]) {
        smallest = array[j];
        indexOfSmallest = j;
      }
    }
    array[indexOfSmallest] = array[i];
    array[i] = smallest;
  }
  return unsortedArray;
};

const sortedArray = selectionSort(unsortedArray);
console.log("SELECTION SORT", sortedArray);
