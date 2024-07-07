package main

import (
	"fmt"
	"sync"
)

func MinHeapify(elements *[]int, index int) {
	parentIndex := index / 2

	var swap int
	for (*elements)[parentIndex] > (*elements)[index] {
		swap = (*elements)[parentIndex]
		(*elements)[parentIndex] = (*elements)[index]
		(*elements)[index] = swap
		index = parentIndex
		parentIndex = index / 2
	}

}

func MaxHeapify(elements *[]int, index int) {
	parentIndex := index / 2

	var swap int
	for (*elements)[parentIndex] < (*elements)[index] {
		swap = (*elements)[parentIndex]
		(*elements)[parentIndex] = (*elements)[index]
		(*elements)[index] = swap
		index = parentIndex
		parentIndex = index / 2
	}

}

func getChildIndex(parentIndex int) (*int, *int) {
	leftChildIndex := (parentIndex * 2) + 1
	rightChildIndex := (parentIndex * 2) + 2

	return &leftChildIndex, &rightChildIndex
}

func getChildElements(parentIndex int, heap *[]int) (*int, *int) {
	leftChildIndex := (parentIndex * 2) + 1
	rightChildIndex := (parentIndex * 2) + 2

	var leftChildElement *int
	var rightChildElement *int
	heapLen := len(*heap)

	if heapLen > leftChildIndex {
		leftChildElement = &(*heap)[leftChildIndex]
	}
	if heapLen > rightChildIndex {
		rightChildElement = &(*heap)[rightChildIndex]
	}

	return leftChildElement, rightChildElement
}

func removeElementMinHeap(heap *[]int) *int {
	if len(*heap) == 0 {
		return nil
	}
	parentIndex := 0
	removeElement := (*heap)[parentIndex]
	parentElement := (*heap)[len(*heap)-1]
	(*heap)[parentIndex] = parentElement
	*heap = append([]int{}, (*heap)[:len(*heap)-1]...)
	leftChildIndex, rightChildIndex := getChildIndex(parentIndex)
	leftChild, rightChild := getChildElements(parentIndex, heap)

	for leftChild != nil && *leftChild < parentElement || rightChild != nil && *rightChild < parentElement {
		if leftChild != nil && *leftChild < parentElement && rightChild == nil || *leftChild < *rightChild {
			swap := (*heap)[*leftChildIndex]
			(*heap)[*leftChildIndex] = parentElement
			(*heap)[parentIndex] = swap
			parentIndex = *leftChildIndex
			parentElement = (*heap)[parentIndex]
			leftChildIndex, rightChildIndex = getChildIndex(parentIndex)
			leftChild, rightChild = getChildElements(parentIndex, heap)
			continue
		} else if rightChild != nil {
			swap := (*heap)[*rightChildIndex]
			(*heap)[*rightChildIndex] = parentElement
			(*heap)[parentIndex] = swap
			parentIndex = *rightChildIndex
			parentElement = (*heap)[parentIndex]
			leftChildIndex, rightChildIndex = getChildIndex(parentIndex)
			leftChild, rightChild = getChildElements(parentIndex, heap)
			continue
		}
	}
	return &removeElement
}

func removeElementMaxHeap(heap *[]int) *int {
	if len(*heap) == 0 {
		return nil
	}
	parentIndex := 0
	removeElement := (*heap)[parentIndex]
	parentElement := (*heap)[len(*heap)-1]
	(*heap)[parentIndex] = parentElement
	*heap = append([]int{}, (*heap)[:len(*heap)-1]...)
	leftChildIndex, rightChildIndex := getChildIndex(parentIndex)
	leftChild, rightChild := getChildElements(parentIndex, heap)

	for leftChild != nil && *leftChild > parentElement || rightChild != nil && *rightChild > parentElement {
		if leftChild != nil && *leftChild > parentElement && rightChild == nil || *leftChild > *rightChild {
			swap := (*heap)[*leftChildIndex]
			(*heap)[*leftChildIndex] = parentElement
			(*heap)[parentIndex] = swap
			parentIndex = *leftChildIndex
			parentElement = (*heap)[parentIndex]
			leftChildIndex, rightChildIndex = getChildIndex(parentIndex)
			leftChild, rightChild = getChildElements(parentIndex, heap)
			continue
		} else if rightChild != nil {
			swap := (*heap)[*rightChildIndex]
			(*heap)[*rightChildIndex] = parentElement
			(*heap)[parentIndex] = swap
			parentIndex = *rightChildIndex
			parentElement = (*heap)[parentIndex]
			leftChildIndex, rightChildIndex = getChildIndex(parentIndex)
			leftChild, rightChild = getChildElements(parentIndex, heap)
			continue
		}
	}
	return &removeElement
}

func getMinSortedArray(elements *[]int, wg *sync.WaitGroup) *[]int {
	heap := make([]int, 0)
	sortedArray := make([]int, 0)

	for i, v := range *elements {
		heap = append(heap, v)
		MinHeapify(&heap, i)
	}

	fmt.Println("Min heap --->", heap)

	for range *elements {
		removedElement := removeElementMinHeap(&heap)
		sortedArray = append(sortedArray, (*removedElement))
	}

	fmt.Println("Sorted Element --->", sortedArray)
	defer wg.Done()
	return &sortedArray

}

func getMaxSortedArray(elements *[]int, wg *sync.WaitGroup) *[]int {
	heap := make([]int, 0)
	sortedArray := make([]int, 0)

	for i, v := range *elements {
		heap = append(heap, v)
		MaxHeapify(&heap, i)
	}

	fmt.Println("Max heap --->", heap)

	for range *elements {
		removedElement := removeElementMaxHeap(&heap)
		sortedArray = append(sortedArray, (*removedElement))
	}

	fmt.Println("Sorted Element --->", sortedArray)
	defer wg.Done()
	return &sortedArray
}

func Sort(elements *[]int) {
	wg := &sync.WaitGroup{}

	wg.Add(2)

	go getMinSortedArray(elements, wg)
	go getMaxSortedArray(elements, wg)
	wg.Wait()
}

func main() {
	unsortedElements := []int{3, 2, 1, 6, 8, 4, 5, 2, 1, 6}
	Sort(&unsortedElements)
}
