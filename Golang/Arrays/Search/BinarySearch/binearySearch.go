package main

import "fmt"

var arrayOfNums = []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

func main() {
	numToFind := 10
	numFound := partition(&numToFind, &arrayOfNums)
	if numFound == nil {
		fmt.Println("Number not found!")
		return
	}
	fmt.Println("Number exists in array", *numFound)
}

func partition(find *int, numArray *[]int) *int {

	// stopping criteria
	if arrLen := len(*numArray); arrLen == 1 && (*numArray)[0] != *find {
		return nil
	} else if arrLen == 1 && (*numArray)[0] == *find {
		return &(*numArray)[0]
	}

	mid := len(*numArray) / 2
	midVal := (*numArray)[mid]

	if nums := append([]int{}, *numArray...); *find >= midVal {
		nums = nums[mid:]
		return partition(find, &nums)
	} else {
		nums = nums[:mid]
		return partition(find, &nums)
	}
}
