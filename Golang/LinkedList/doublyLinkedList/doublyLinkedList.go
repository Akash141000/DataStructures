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

func DeleteNode(position int) *utils.ListNode {
	var nodeToDel **utils.ListNode = &HeadNode
	var deletedNode utils.ListNode

	if position == 1 {
		deletedNode = *HeadNode
		HeadNode = (*nodeToDel).Next
		(*nodeToDel).Prev = nil
		return &deletedNode
	}

	for i := 1; i < position && (*nodeToDel).Next != nil; i++ {
		nodeToDel = &(*nodeToDel).Next
	}

	deletedNode = **nodeToDel

	if (*nodeToDel).Next != nil {
		(*nodeToDel).Next.Prev = (*nodeToDel).Prev
	} else {
		(*nodeToDel).Prev.Next = nil
		return &deletedNode
	}

	if (*nodeToDel).Prev != nil {
		(*nodeToDel).Prev.Next = (*nodeToDel).Next
	}

	deletedNode = **nodeToDel

	return &deletedNode
}

func PrintLinkedList() {
	fmt.Println("Printing linked list....")
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
	AddNewNode("5")

	PrintLinkedList()

	deletedNode := DeleteNode(1)
	fmt.Println("Deleted Node", deletedNode)

	PrintLinkedList()

	nextDeletedNode := DeleteNode(5)
	fmt.Println("Deleted Node", nextDeletedNode)

	PrintLinkedList()
}
