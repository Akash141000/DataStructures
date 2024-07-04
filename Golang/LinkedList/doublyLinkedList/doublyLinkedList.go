package main

import (
	"LinkedList/utils"
	"fmt"
)

var HeadNode *utils.ListNode

func AddNewNode(data string) *utils.ListNode {
	listNode := &utils.ListNode{
		Data: data,
	}

	if HeadNode == nil {
		HeadNode = listNode
		return listNode
	}

	lastNode := GetLastNode()
	lastNode.Next = listNode
	listNode.Prev = lastNode
	return listNode
}

func GetLastNode() *utils.ListNode {
	LastNode := &HeadNode
	for (*LastNode).Next != nil {
		LastNode = &(*LastNode).Next
	}
	return *LastNode
}

func PrintLinkedList() {
	for listNode := HeadNode; listNode != nil; {
		fmt.Println("Prev", listNode.Prev, "<-----", listNode.Data, "----->", "Next", listNode.Next)
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
