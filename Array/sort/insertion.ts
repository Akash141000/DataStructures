const unsortedArray = [3, 2, 5, 6, 7, 4, 1, 9, 8];

const insertionSort = (array: number[]) => {
  for (let i = 1; i <= array.length - 1; i++) {
    let j = i - 1;
    let key = array[i];

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j -= 1;
    }
    array[j + 1] = key;
  }
  return array;
};

const sortedArray = insertionSort(unsortedArray);
console.log("INSERTION SORT", sortedArray);
