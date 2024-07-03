package main

import "fmt"

type ListNode struct {
	Prev *ListNode
	Next *ListNode
	Data any
}

var HeadNode *ListNode

func AddNewNode(data string) *ListNode {
	listNode := &ListNode{
		Data: data,
	}

	if HeadNode == nil {
		HeadNode = listNode
		return listNode
	}

	lastNode := GetLastNode()
	lastNode.Next = listNode
	return listNode
}

func GetLastNode() *ListNode {
	LastNode := &HeadNode
	for (*LastNode).Next != nil {
		LastNode = &(*LastNode).Next
	}
	return *LastNode
}

func PrintLinkedList() {
	for listNode := HeadNode; listNode != nil; {
		fmt.Println(listNode.Data, "-->")
		listNode = listNode.Next
	}
}

func main() {
	fmt.Println("Singly Linked List")
	AddNewNode("1")
	AddNewNode("2")
	AddNewNode("3")
	AddNewNode("4")

	PrintLinkedList()
}
