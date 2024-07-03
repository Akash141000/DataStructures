package main

import "fmt"

var arrayToSort = []int{9, 4, 6, 8, 2, 3, 1, 1, 2}

func main() {
	fmt.Println("Merge Sort", arrayToSort)
	sortedArr := mergeSort(&arrayToSort)
	fmt.Println("Sorted array ", sortedArr)
}

func mergeSort(unsortedArr *[]int) *[]int {

	//stopping criteria
	if len(*unsortedArr) == 1 {
		return unsortedArr
	}

	leftArr, rightArr := PartitionAlgo(unsortedArr)

	left := mergeSort(leftArr)
	right := mergeSort(rightArr)

	sorted := MergeProcedure(left, right)

	return sorted
}

func PartitionAlgo(unsortedArr *[]int) (*[]int, *[]int) {
	arrLen := len(*unsortedArr)

	if arrLen == 1 {
		return unsortedArr, nil
	}

	mid := arrLen / 2

	leftArr := (*unsortedArr)[:mid]
	rightArr := (*unsortedArr)[mid:]

	return &leftArr, &rightArr
}

func MergeProcedure(leftArr *[]int, rightArr *[]int) *[]int {
	sortedArr := []int{}

	for leftPtr, rightPtr := 0, 0; leftPtr < len(*leftArr) || rightPtr < len(*rightArr); {

		//check if any array reaches the end
		if leftPtr > (len(*leftArr) - 1) {
			//spread right array
			sortedArr = append(sortedArr, (*rightArr)[rightPtr:]...)
			return &sortedArr
		} else if rightPtr > (len(*rightArr) - 1) {
			//spread left array
			sortedArr = append(sortedArr, (*leftArr)[leftPtr:]...)
			return &sortedArr
		}

		if ((*leftArr)[leftPtr]) <= ((*rightArr)[rightPtr]) {
			sortedArr = append(sortedArr, (*leftArr)[leftPtr])
			leftPtr++
			continue
		} else if ((*leftArr)[leftPtr]) >= ((*rightArr)[rightPtr]) {
			sortedArr = append(sortedArr, (*rightArr)[rightPtr])
			rightPtr++
			continue
		}

	}
	return &sortedArr
}
