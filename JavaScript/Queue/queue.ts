let head: NodeElement | null = null;

export class NodeElement {
  pointer: NodeElement | null = null;
  data: any | null = null;

  constructor(data: any) {
    this.data = data;
  }
}

export function enQueue(element: NodeElement) {
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

export function deQueue() {
  if (head) {
    const oldElement = head;
    head = head.pointer;
    return oldElement;
  }
  return null;
}

export function QHasElement() {
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
  enQueue(new NodeElement("1"));
  enQueue(new NodeElement("2"));
  enQueue(new NodeElement("3"));
  printQueue(); // print linked list
  deQueue();
  printQueue(); // print linked list
}

// start();
