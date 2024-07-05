package main

import (
	"fmt"
	"log"
)

type ListNode struct {
	Next *ListNode
	Data any
}

var HeadNode *ListNode
var LastNode *ListNode

func Enqueue(data string) *ListNode {
	newNode := &ListNode{
		Data: data,
	}

	if HeadNode == nil && LastNode == nil {
		HeadNode = newNode
		LastNode = newNode
		return newNode
	}

	(*LastNode).Next = newNode
	LastNode = newNode
	return newNode
}

func Dequeue() *ListNode {
	deleteNode := HeadNode

	if HeadNode == nil {
		log.Fatal("queue undeflow...")
	}

	HeadNode = HeadNode.Next
	return deleteNode
}

func PrintQueue() {
	fmt.Println("Printing Queue....")
	for listNode := HeadNode; listNode != nil; {
		fmt.Println(listNode.Data, "-->")
		listNode = listNode.Next
	}
}

func main() {
	Enqueue("1")
	Enqueue("2")
	Enqueue("3")
	Enqueue("4")

	PrintQueue()

	Dequeue()
	Dequeue()
	Dequeue()
	Dequeue()

	PrintQueue()

	Dequeue()
}
