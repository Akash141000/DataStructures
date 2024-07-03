const array = [3, 4, 5, 6, 7, 8, 9];
const target = 15;
const pair: { [key: string]: number }[] = [];

//Greedy approach
const findSum = () => {
  let i = 0;
  let j = array.length - 1;
  while (i != j) {
    let sum = array[i] + array[j];
    console.log("SUM>>", sum, "i>>", i, "j>>", j);
    if (sum === target) {
      pair.push({ [`${array[i]}`]: array[j] });
      i = i + 1;
      continue;
    } else if (sum > target) {
      j = j - 1;
      continue;
    } else if (sum < target) {
      i = i + 1;
      continue;
    }
  }
};

findSum();
console.log("Pairs", pair);
