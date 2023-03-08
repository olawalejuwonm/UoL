// HEAP

// parent(index):	This	method	returns	the	index	of	the	parent	of	the	element stored in
// index

function parent(index) {
  return Math.floor((index - 1) / 2);
}

function left(index) {
  return index * 2 + 1;
}

function right(index) {
  return index * 2 + 2;
}

// Heap(n):	 This	 is	 a	 simple	 constructor	 with	 a	 single	 integer	 input argument.	 The
// constructor	creates	the	storage	area	for	a	heap	of	size	n and	initialises	the	heap	size.

class Heap {
  // write docstring
  constructor(n, bool) {
    if (!Array.isArray(n)) {
      this.heap = new Array(n);
      this.heapSize = 0;
    } else {
      //             Heap(list,	bool):	This	constructor	received	two	input	arguments:	a	list	and	a	Boolean
      // value.	 If	 the	 Boolean	 argument	 is	 TRUE,	 the	 constructor	 must	 build	 the	 heap
      // incrementally	from the list	(using	the	method	insert,	described	below). Otherwise,	it
      // must	build	the	heap	in place	(using	the	method	buildMaxHeap,	described below). In
      // both	 cases,	 make	 sure	 the	 constructor	 creates	 the	 storage	 area	 for	 the	 heap	 	 and
      // initialises	the	heap	size correctly
      if (bool) {
        // build using insert (bool = true)
        this.heap = new Array(n.length);
        this.heapSize = 0;
        for (let i = 0; i < n.length; i++) {
          this.insert(n[i]);
        }
      } else {
        // build in place (bool = false)
        this.heap = n;
        this.heapSize = n.length;
        this.buildMaxHeap();
      }
    }
  }

  leftChild(index) {
    console.log("finding left child of " + this.heap[index]);
    return this.heap[index * 2 + 1];
  }

  rightChild(index) {
    console.log("finding right child of " + this.heap[index]);
    return this.heap[index * 2 + 2];
  }

  theParent(index) {
    console.log("finding parent of " + this.heap[index]);
    return this.heap[Math.floor((index - 1) / 2)];
  }

  //   insert(k):	 This	 method	 inserts	 element	 k	 in	 the	 heap	 (maintaining	 the	 heap
  //     properties).
  swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  insert(k) {
    let pos = this.heapSize;
    this.heap[pos] = k;
    this.heapSize += 1;
    while (pos > 0 && this.heap[parent(pos)] < this.heap[pos]) {
      this.swap(pos, parent(pos));
      pos = parent(pos);
    }
  }
  //   maximum(): This	method	returns	the	element	with	the	maximum	value	in	the	heap
  // (it	does	not	extract	it).
  maximum() {
    return this.heap[0];
  }

  index_largest_node(root) {
    // returns the index of the largest among the root and its children, if
    //it has no children, it returns the root
    let left = 2 * root + 1;
    let right = 2 * root + 2;
    let largest = root;
    if (left < this.heapSize && this.heap[left] > this.heap[largest]) {
      largest = left;
    }
    if (right < this.heapSize && this.heap[right] > this.heap[largest]) {
      largest = right;
    }
    return largest;
  }

  // maxHeapify(index):	This	method	applies	max-heapify	 from	the	element	in	position
  // index	‘downwards’ (in	the	tree	visualisation).

  maxHeapify(index) {
    let largest = this.index_largest_node(index);
    if (largest != index) {
      this.swap(largest, index);
      this.maxHeapify(largest);
    }
  }

  //  buildMaxHeap(): This	method	builds	the	heap	in	place.
  buildMaxHeap() {
    this.heapSize = this.heap.length;
    console.log("heap size is " + this.heapSize);
    for (let j = Math.floor(this.heapSize / 2); j >= 0; j--) {
      console.log("j is " + j);
      this.maxHeapify(j);
    }
  }

  //extractMax(): This	 method	 extracts	 the	 maximum	 element	 from	 the	 heap
  // (maintaining	the	heap	properties)	and	returns	its	value.
  extractMax() {
    if (this.heapSize < 1) {
      return null;
    }
    let max = this.heap[0];
    this.heap[0] = this.heap[this.heapSize - 1];
    this.heapSize -= 1;
    this.maxHeapify(0);
    return max;
  }

  //   sort(): This	method	uses	Heapsort	to	sort	the	content	of	‘array’.	It	returns	the	sorted
  //   array.
  sort() {
    let sorted = [];
    let heap = new Heap(this.heap, false); // build in place
    while (heap.heapSize > 0) {
      //   sorted.push(heap.extractMax());
      let i = heap.heapSize - 1;
      this.heap[i] = heap.extractMax();
    }
    return sorted;
  }
  display() {
    // display from 0 to heapSize
    let result = [];
    for (let i = 0; i < this.heapSize; i++) {
      result.push(this.heap[i]);
    }
    console.log(result);
    return result;
  }
}

const myHeap = new Heap([14, 21, 48, 36, 30, 71, 52, 15], true);
// console.log(myHeap.theParent(myHeap.heap.indexOf(16)));
myHeap.display();
myHeap.sort();
myHeap.display();

// var HeapF = function (source, incremental) {
//   var array = source;
//   var heapSize = source.length;

//   var parent = function (i) {
//     return Math.floor(i / 2);
//   };

//   var left = function (i) {
//     return 2 * i;
//   };

//   var right = function (i) {
//     return 2 * i + 1;
//   };

//   var maxHeapify = function (i) {
//     var l = left(i);
//     var r = right(i);
//     var largest = i;
//     if (l < heapSize && array[l] > array[i]) {
//       largest = l;
//     }
//     if (r < heapSize && array[r] > array[largest]) {
//       largest = r;
//     }
//     if (largest != i) {
//       var tmp = array[i];
//       array[i] = array[largest];
//       array[largest] = tmp;
//       maxHeapify(largest);
//     }
//   };

//   var buildMaxHeap = function () {
//     heapSize = array.length;
//     for (var i = Math.floor(array.length / 2); i >= 0; i--) {
//       maxHeapify(i);
//     }
//   };

//   var insert = function (k) {
//     array.push(k);
//     var i = array.length - 1;
//     while (i > 0 && array[parent(i)] < array[i]) {
//       var tmp = array[i];
//       array[i] = array[parent(i)];
//       array[parent(i)] = tmp;
//       i = parent(i);
//     }
//   };

//   var extractMax = function () {
//     if (heapSize < 1) {
//       return null;
//     }
//     var max = array[0];
//     array[0] = array[array.length - 1];
//     array.pop();
//     heapSize--;
//     maxHeapify(0);
//     return max;
//   };

//   var maximum = function () {
//     return array[0];
//   };

//   var sort = function () {
//     buildMaxHeap();
//     for (var i = array.length - 1; i >= 1; i--) {
//       var tmp = array[0];
//       array[0] = array[i];
//       array[i] = tmp;
//       heapSize--;
//       maxHeapify(0);
//     }
//     return array;
//   };

//   if (!incremental) {
//     buildMaxHeap();
//   }

//   return {
//     insert: insert,
//     maximum: maximum,
//     extractMax: extractMax,
//     sort: sort,
//   };
// };
