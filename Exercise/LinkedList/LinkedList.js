// o	implement	a	sorted	single	linked	list. The	elements
// stored	in	the	list	are	integers	and	they	must	be	sorted	from	smallest	to	largest	(the	smallest
// element	is	in	the	head	of	the	list)

// six	methods	to implement:
// 1.	 LinkedList:	This	constructor	initialises	the	head	of	the	list	to	NULL
// 2. ~LinkedList:	This	destructor	deletes	the	list.
// 3. insertSorted(ptr	head,	x):	This	method	inserts	the	element	x	in	its	correct	position	in
// the	list	pointed	by	head.	Given	that	the	list	must	be	sorted	(from	smallest	to	largest
//     value)	 at	 all	 times,	 every	 time	 a	 new	 element	 is	 inserted	 into	 the	 list,	 it	 must	 be
//     located	in	its	correct	position	so	the	list	remains	sorted.
// 4. length(head):	 This	 method	 returns	 the	 number	 of	 elements	 of	the	 list	 pointed	 by
// head
// 5. search(head,x):	 This	 method	 returns	 the	 position	 where	 element	 x is	 in	 the	 list
// pointed	by	head.	If	there	is	more	than	one	element	equal	to	x,	it	returns	the	position
// of	the	first	element.	If	the	element	is	not	in	the	list,	it	returns	-1.
// 6. remove(head,x):	This	 method	 removes element	 x from	 the	 list pointed	 by	 head.	 If
// there	is	more	than	one	element	equal	to	x,	only	the	first	element	is	removed.

// Additionally you must implement the following methods:
//  display(head):	This	method	prints	on	screen	the	content	of	the	list	pointed	by	head.
//  getHead():	 This	 method	 returns	 the	 pointer	 to	 the	 list.	 This	 is	 necessary	 because,
// unlike	 the	 Hash	 Table	 submission	 (where	 buckets was	 public),	 head has	 been
// declared	private	in	this	implementation.

// The	implementation	of	the	LinkedList	class	is	provided	below.

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  deleteList() {
    this.head = null;
  }

  insertSorted(ptrhead, x) {
    let current = ptrhead;
    let previous = null;
    let newNode = new Node(x);
    while (current != null && current.data < x) {
      previous = current;
      current = current.next;
    }
    if (previous == null) {
      newNode.next = ptrhead;
      ptrhead = newNode;
    } else {
      newNode.next = current;
      previous.next = newNode;
    }
    // Add to class
    this.head = ptrhead;
    console.log("Inserted " + x, ptrhead);
  }

  length(head) {
    let count = 0;
    let current = head;
    while (current != null) {
      count++;
      current = current.next;
    }
    return count;
  }

  search(head, x) {
    let current = head;
    let count = 0;
    while (current != null) {
      if (current.data == x) {
        return count;
      }
      count++;
      current = current.next;
    }
    return -1;
  }

  remove(head, x) {
    let current = head;
    let previous = null;
    while (current != null) {
      if (current.data == x) {
        if (previous == null) {
          head = current.next;
        } else {
          previous.next = current.next;
        }
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  display(head) {
    let current = head;
    while (current != null) {
      console.log(current.data);
      current = current.next;
    }
    console.log("null");
  }

  getHead() {
    return this.head;
  }
}

//Testing
// let list = new LinkedList();
// list.insertSorted(list.getHead(), 3);
// list.insertSorted(list.getHead(), 2);
// list.display(list.getHead());

function searchList(L, k) {
  let x = L.head;
  while (x != null && x.key != k) {
    x = x.next;
  }
  return x;
}

function listInsert(L, x) {
  x.next = L.head;
  if (L.head != null) {
    L.head.prev = x;
  }
  L.head = x;
  x.prev = null;
}

// Bucket sort using linked list
// A: array to be sorted
// N: size of array A
// max: maximum value in A
// function Bucketsort(A,N,max)
//    B ←  new array(N)
//    for 0 ≤ i < N
//       B[i] ← empty linked list
//    for 0 ≤ i < N
//       B[floor(A[i]*N/(max+1))] ← A[i]
//    for 0 ≤ i < N
//       sort(B[i])
//    for 0 ≤ i < N
//       copy list B[i] back to A
// end function

//please check the file bucket sort itself for array version
function bucketSort(A, N, max) {
  let B = [];
  for (let i = 0; i < N; i++) {
    B[i] = new LinkedList();
    console.log(`First loop ${i} ${B[i]}`);
  }
  for (let i = 0; i < N; i++) {
    let index = Math.floor((A[i] * N) / (max + 1));
    B[index].insertSorted(B[index].getHead(), A[i]);
    console.log(`Second loop ${i} ${B[index]}`);
  }
  for (let i = 0; i < N; i++) {
    B[i].display(B[i].getHead());
    console.log(`Third loop ${i} ${B[i]}`);
  }
  let k = 0;
  for (let i = 0; i < N; i++) {
    let current = B[i].getHead();
    while (current != null) {
      A[k] = current.data;
      k++;
      current = current.next;
    }
  }
  return A;
}

console.log(
  "Bucket sort using linked list",
  bucketSort([17, 1, 5, 250, 45, 78], 6, 250)
);
