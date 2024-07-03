package main

import "fmt"

var arrayOfNums = [5]int{1, 4, 6, 2, 7}

func main() {
	numToFind := 4

	for i, v := range arrayOfNums {
		if v == numToFind {
			fmt.Printf("Number %v found at index %v \n", numToFind, i)
		}
	}

}
