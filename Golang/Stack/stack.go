package main

import (
	"fmt"
	"log"
)

type ListNode struct {
	Prev *ListNode
	Data any
}

var LastNode *ListNode

func Push(data string) *ListNode {
	newNode := &ListNode{
		Data: data,
	}

	if LastNode == nil {
		LastNode = newNode
		return newNode
	}

	newNode.Prev = LastNode
	LastNode = newNode

	return newNode
}

func Pop() *ListNode {
	var deleteNode *ListNode

	if LastNode == nil {
		log.Panic("stack underflow")
	}

	deleteNode = LastNode

	LastNode = LastNode.Prev

	return deleteNode

}

func PrintStack() {
	fmt.Println("Printing stack...")
	for currentNode := &LastNode; *currentNode != nil; {
		fmt.Println((*currentNode).Data, "--->")
		currentNode = &(*currentNode).Prev
	}
}

func main() {
	fmt.Println("Stack...")

	Push("1")
	Push("2")
	Push("3")
	Push("4")

	PrintStack()

	Pop()
	Pop()
	Pop()

	PrintStack()

	Pop()

	PrintStack()
}
