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
	return listNode
}

func DeleteNode(position int) *utils.ListNode {
	var nodeToDel **utils.ListNode = &HeadNode
	var prevNode *utils.ListNode
	var deletedNode utils.ListNode

	if position == 1 {
		deletedNode = *HeadNode
		HeadNode = (*nodeToDel).Next
		return &deletedNode
	}

	for i := 1; i < position && (*nodeToDel).Next != nil; i++ {
		prevNode = *nodeToDel
		nodeToDel = &(*nodeToDel).Next
	}

	deletedNode = *prevNode.Next
	prevNode.Next = (*nodeToDel).Next

	return &deletedNode
}

func GetLastNode() *utils.ListNode {
	LastNode := &HeadNode
	for (*LastNode).Next != nil {
		LastNode = &(*LastNode).Next
	}
	return *LastNode
}

func PrintLinkedList() {
	fmt.Println("Printing linked list....")
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

	deletedNode := DeleteNode(2)
	fmt.Println("Deleted Node", deletedNode)

	nextDeletedNode := DeleteNode(1)
	fmt.Println("Deleted Node", nextDeletedNode)

	PrintLinkedList()
}
