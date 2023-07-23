const unsortedArray = [3, 2, 5, 6, 7, 4, 1, 9, 8];

const mergeProcedure = (left: number[], right: number[]) => {
  let leftPointer = 0;
  let rightPointer = 0;
  let sortedArray: number[] = [];
  while (leftPointer !== left.length || rightPointer !== right.length) {
    if (leftPointer === left.length && rightPointer !== right.length) {
      sortedArray.push(right[rightPointer]);
      rightPointer += 1;
      continue;
    } else if (rightPointer === right.length && leftPointer !== left.length) {
      sortedArray.push(left[leftPointer]);
      leftPointer += 1;
      continue;
    }

    if (left[leftPointer] < right[rightPointer]) {
      sortedArray.push(left[leftPointer]);
      leftPointer += 1;
    } else {
      sortedArray.push(right[rightPointer]);
      rightPointer += 1;
    }
  }
  return sortedArray;
};

const mergeSort = (array: number[]) => {
  if (array.length === 1) {
    return array;
  }

  let middle = Math.floor(
    array.length % 2 === 0 ? array.length / 2 : array.length / 2 + 1
  );
  let left = mergeSort(array.slice(0, middle));
  let right = mergeSort(array.slice(middle));

  if (left && right) {
    return mergeProcedure(left, right);
  }
};

const sortedArray = mergeSort(unsortedArray);
console.log("MERGE SORT", sortedArray);
