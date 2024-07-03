package main

import "fmt"

var arrayToSort = []int{9, 4, 6, 8, 2, 3}

func main() {
	fmt.Println("Selection Sort")
	for i := range arrayToSort {
		smallestElement, smallestElementIndex := arrayToSort[i], i
		for j, v := range arrayToSort[i:] {
			if smallestElement > v {
				smallestElement = v
				smallestElementIndex = j + i
			}
		}
		arrayToSort[i], arrayToSort[smallestElementIndex] = smallestElement, arrayToSort[i]
	}
	fmt.Println("Sorted array is", arrayToSort)
}
