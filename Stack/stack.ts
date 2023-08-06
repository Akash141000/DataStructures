let head: NodeElement | null = null;

export class NodeElement {
  pointer: NodeElement | null = null;
  data: any | null = null;

  constructor(data: any) {
    this.data = data;
  }
}

function push(element: NodeElement) {
  let headElement = head;
  if (!headElement) {
    head = element;
    return head;
  }
  while (headElement.pointer !== null) {
    headElement = headElement.pointer;
  }

  headElement.pointer = element;
}

function pop() {
  if (!head) {
    console.log("Stack underflow...");
    return null;
  }
  let headElement = head;
  let prevElement: NodeElement | null = null;
  if (headElement) {
    if (headElement.pointer === null) {
      head = null;
      return headElement;
    }
    while (headElement.pointer !== null) {
      prevElement = headElement;
      headElement = headElement?.pointer;
    }
    if (prevElement) {
      prevElement.pointer = null;
    }
    return headElement;
  }
}

export function stackHasElement() {
  if (!head) {
    return false;
  }
  return true;
}

function printQueue() {
  console.log("Printing queue...");
  let headElement = head;
  while (headElement !== null) {
    console.log(headElement.data, "->");
    headElement = headElement.pointer!;
  }
}

// starting point
function start() {
  //add elements to queue
  push(new NodeElement("1"));
  // push(new NodeElement("2"));
  // push(new NodeElement("3"));
  // push(new NodeElement("4"));
  printQueue(); // print linked list
  const poppedElement = pop();
  if (poppedElement) {
    console.log("Popped Element -->", poppedElement?.data);
    printQueue(); // print linked list
  }
  push(new NodeElement("2"));
  push(new NodeElement("3"));
  push(new NodeElement("4"));
  printQueue();
  const poppedElement2 = pop();
  if (poppedElement2) {
    console.log("Popped Element -->", poppedElement2?.data);
    printQueue(); // print linked list
  }
}

start();
