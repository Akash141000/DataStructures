let head: NodeElement | null = null;

export class NodeElement {
  pointer: NodeElement | null = null;
  prevPointer: NodeElement | null = null;
  data: string | null = null;

  constructor(data: string) {
    this.data = data;
  }
}

function addElement(element: NodeElement, position?: number) {
  let headElement = head;
  if (!headElement) {
    head = element;
    return head;
  }
  if (!position) {
    while (headElement.pointer !== null) {
      headElement = headElement.pointer;
    }
  } else {
    let counter = 1;
    while (counter < position && headElement.pointer !== null) {
      headElement = headElement.pointer;
      element.pointer = headElement.pointer;
      counter += 1;
    }
  }
  element.prevPointer = headElement;
  headElement.pointer = element;
}

function deleteNode(position?: number) {
  let counter = 1;
  let prevNode: NodeElement | null = null;
  let headElement = head;
  if (position) {
    while (headElement != null && counter < position) {
      prevNode = headElement;
      headElement = headElement.pointer!;
      counter += 1;
    }
  }
  if (headElement && prevNode) {
    if (
      headElement &&
      headElement.pointer &&
      headElement?.pointer.prevPointer
    ) {
      headElement.pointer.prevPointer = prevNode;
    }
    prevNode.pointer = headElement.pointer;
  } else if (headElement && !prevNode) {
    headElement = headElement.pointer;
    head = headElement;
    if (head) {
      head.prevPointer = null;
    }
  }
}

function printLinkedList() {
  let headElement = head;
  while (headElement !== null) {
    console.log(headElement.data, "->");
    // console.log("prev pointer data", headElement.prevPointer?.data);
    headElement = headElement.pointer!;
  }
}

// starting point
function start() {
  addElement(new NodeElement("1"));
  addElement(new NodeElement("2"));
  addElement(new NodeElement("3"));
  addElement(new NodeElement("4"));
  addElement(new NodeElement("5"));

  printLinkedList(); // print linked list
  const deletionPosition = 3;
  deleteNode(deletionPosition);
  console.log(`Deleting position: ${deletionPosition} node`);
  printLinkedList(); // print linked list
}

start();
