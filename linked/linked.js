// var head = null;
// head = { data: 5, next: null };
// console.log(head);
// console.log(head.data);
// console.log(head.next);

function LLNode(data) {
  this.data = data;
  this.next = null;
}
var head = new LLNode(5);
// console.log(head);
// console.log(head.data);
// console.log(head.next);
head.next = new LLNode(10);
// console.log(head.next.data);
// console.log(head.next.next);

//Excercise 1
var head = new LLNode(4);
head.next = new LLNode(6);
head.next.next = new LLNode(8);
head.next.next.next = new LLNode(10);
head.next.next.next.next = new LLNode(10);

// console.log(head);

//Loop linked list
// var temp = head ;
// while ( temp !== null ) {
// temp = temp . next ;
// }

function searchLL(head, item) {
  var temp = head;
  while (temp !== null) {
    if (temp.data === item) {
      return true;
    }
    temp = temp.next;
  }
  return false;
}

// console.log(searchLL(head, 7))
// console.log(searchLL(head, 10))

function numberLL(head, item) {
  var temp = head;
  var seen = 0;
  while (temp !== null) {
    if (temp.data === item) {
      seen++;
    }
    temp = temp.next;
  }
  return seen;
}

// console.log(numberLL(head, 0))
// console.log(numberLL(head, 4))
// console.log(numberLL(head, 10))

function swapLL(point) {
  if (point.next !== null) {
    var store = point.data;
    point.data = point.next.data;
    point.next.data = store;
    return point;
  }
  return false;
}

function bubbleLL(head) {
  if (head === null) {
    return head;
  }
  while (true) {
    var count = 0;
    var store = head;
    while (store.next !== null) {
      if (store.data > store.next.data) {
        swapLL(store);
        count++;
      }
      store = store.next;
    }
    if (count === 0) {
      return head;
    }
  }
}
