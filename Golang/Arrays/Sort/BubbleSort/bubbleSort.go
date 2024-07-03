package main

import "fmt"

var arrayToSort = []int{1, 4, 6, 8, 2, 3, 6}

func main() {
	fmt.Println("Bubble Sort")
	for i := range arrayToSort {
		for j := range arrayToSort[i:] {
			if j < len(arrayToSort)-1 && arrayToSort[j] > arrayToSort[j+1] {
				arrayToSort[j], arrayToSort[j+1] = arrayToSort[j+1], arrayToSort[j]
			}
		}
	}
	fmt.Println("Sorted array is", arrayToSort)
}
