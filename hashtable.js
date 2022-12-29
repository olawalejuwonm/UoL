// your	task	is	to	implement	a	hash	table	with	linear	probing.	The
// hash	function	to	implement	is	as	follows:
// h(k)=(a*k+c) mod m
// where	coefficients a,	c	and	m	are	positive	integer	numbers	and	m	is	the	number	of	buckets
// of	the	hash	table.	 The	client	of	the	hash	table	will	specify	these	parameters

// HashTable:	This	is	a	constructor	that	initialises	the	values	of	a,	c and	m (a takes	the
//     value	of	_a,	c the	value	of	_c and	m the	value	of	_m)	and	allocates	memory	space	(to
//     store	m integer	values)	to	the	hash	table	buckets.

class HashTable {
  constructor(_a, _c, _m) {
    this.a = _a;
    this.c = _c;
    this.m = _m;
    this.buckets = new Array(_m);
    this.buckets.fill(-1);
  }
  // ~HashTable:	This	method	deletes	the	hash	table.
  destructor() {
    this.buckets = [];
  }
  //   insert:	This	function	is	in	charge	of	inserting	strictly	positive	numbers	into	the	hash
  //   table,	using	linear	probing	for	collision	resolution.	The	number	to	insert	is	stored
  //   in	the	variable	key (the	input	argument	of	the	function). If	the	load	factor	of	the	hash
  //   table	 is	 already	 1	 when	 a	 new	 number	 is	 going	 to	 be	 inserted,	 you	 have	 to	 apply
  //   extend	and	rehash.	You	choose	the	value	of	the	extension	factor of	the	hash	table.

  insert(key) {
    // Consider the following algorithm A, where the function hash(k) returns the hash value of number k.
    // H: hash table (empty buckets store number -1)
    // N: number of buckets of the hash table
    // k: an integer number
    // function A(H,N,k)
    //     i=hash(k)
    //     for 0 <= j < N
    //         if(H[(i+j)%N]==-1)
    //             H[(i+j)%N]=k
    //             break
    // end function
    // What task does the algorithm A perform?
    // The answer is to insert a number k in the hash table H using linear probing as collision resolution method.
    if (this.loadFactor() >= 1) {
      // My addition
      // collision resolution
      console.warn(
        "should not run extend when load factor is 1 for key: " + key
      );
      this.extend();
      // this.rehash();
    }
    let h = (this.a * key + this.c) % this.m; //h(k)=(a*k+c) mod m
    let i = 0;
    while (this.buckets[h] !== -1) {
      console.log(
        "collision at h(hash function): " + h,
        "with value of h - bucket[h]: " + this.buckets[h],
        "and key to be inserted :" + key,
        "i is: " + i
      );
      h = (h + 1) % this.m;
      i++;
    }

    this.buckets[h] = key;
    return i;
  }

  //   extend:	This	method	increases	the	size	of	the	hash	table.	To	do	so,	you	must	create	a
  // new	 (bigger)	 array	 temporarily	 storing	 the	 content	 of	 the	 hash	 table.	 Then,	 you
  // increase	 the	 size	 of	buckets	(using	 new) and	 rehash	 the	 contents	 of	 the	 temporary
  // array	into	buckets.

  extend() {
    //This extends the size of the buckets array and rehashes the contents of the temporary array into buckets.
    let temp = this.buckets;
    this.buckets = new Array(this.m * 2);
    this.buckets.fill(-1);
    this.m = this.m * 2;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] !== -1) {
        this.insert(temp[i]);
      }
    }
  }

  //   find:	This	function	searches	for	the	number	key (the	input	argument	of	the	function)
  //   in	 the	hash	 table.	 If	 the	number	is	 found,	it	returns true.	Otherwise,	it	must	return
  //   false.
  find(key) {
    let h = (this.a * key + this.c) % this.m;
    let i = 0;
    while (this.buckets[h] !== key) {
      h = (h + 1) % this.m;
      i++;
    }
    console.log("found key: " + key + " at h: " + h, "i is: " + i);
    return i ? true : false;
  }

  //   remove:	This	function	removes	the	number	key (the	input	argument	of	the	function)
  //   from	the	hash	table.	Remember	that,	because	of	linear	probing,	a	number	present	in
  //   the	hash	table	might	not	be	in	its	natural	position.

  //It'll do nothing if the key is not found

  remove(key) {
    let h = (this.a * key + this.c) % this.m;
    let i = 0;
    while (this.buckets[h] !== key) {
      h = (h + 1) % this.m;
      i++;
    }
    this.buckets[h] = -1;
    console.log("removed key: " + key + " at h: " + h, "i is: " + i);
    return i;
  }

  //   loadFactor:	This	function	returns,	as	a	double,	the fraction	of	total	hash	buckets	that
  //   are	occupied
  loadFactor() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== -1) {
        count++;
      }
    }
    // console.log("load factor is: " + count / this.m);
    return count / this.buckets.length;
  }
}

//For a=31, c=37 and m=50, what is the load factor of the hash table after calling the function insert 20 times? In the i-th call, the value to insert is given by 2*i*i+3*i-5. That is, the first value to insert is 0, the second value is 9 and so on.
// The answer is 0.4

// let hashTable = new HashTable(31, 37, 50);
// for (let i = 1 ; i <= 20; i++) {
//   hashTable.insert(2 * i * i + 3 * i - 5);
// }
// console.log(hashTable.loadFactor(), "line 127", hashTable.buckets);  // Correct answer is 0.4

//For a=21, c=7 and m=30, numbers are inserted in the hash table in the following way: In the i-th insertion, the value to insert is given by 2*i*i+5*i-5. That is, the first value to insert is 2, the second value is 13 and so on. What is the content of index position 13 in the hash table after inserting 20 numbers?
// The answer is 2

let hashTable2 = new HashTable(21, 7, 30);
for (let i = 1; i <= 20; i++) {
  hashTable2.insert(2 * i * i + 5 * i - 5);
}
// console.log(hashTable2.buckets[13], "line 135"); // Correct answer is 733

//For a=31, c=37 and m=50, numbers are inserted in the hash table in the following way: In the i-th insertion, the value to insert is given by 2*i*i+5*i-5. That is, the first value to insert is 2, the second value is 13 and so on. What is the index position where the first collision occurs?
// The answer is 0
// let hashTable3 = new HashTable(31, 37, 50);
// for (let i = 1 ; i <= 20; i++) {
//   hashTable3.insert(2 * i * i + 5 * i - 5);
// }
// console.log(hashTable3.buckets[0], "line 143");
// console.log(hashTable3.find(97), "line 143"); // Correct answer should be 44

// With some modifications, the following algorithm might be used to find an available position in the hash table when linear probing is applied as a collision resolution method.
function TraverseArray(A, N, i) {
  // The algorithm implements a circular traversal of the array A, starting at position i. The function returns the index of the first available position in the array A, or -1 if no such position exists.
  for (let j = 0; j < N; j++) {
    console.log(A[(i + j) % N]);
  }
}

// TraverseArray([34, 4, 21, 7, 12], 5, 4);

function A(H, N, k) {
  let i = (2 * k + 1) % N;
  for (let j = 0; j < N; j++) {
    if (H[(i + j) % N] === -1) {
      H[(i + j) % N] = k;
      break;
    }
  }
}

// What is the content of the 5-bucket hash table H – originally empty – after executing the following instructions?
let H = [-1, -1, -1, -1, -1];
A(H, 5, 4);
A(H, 5, 9);
A(H, 5, 14);
A(H, 5, 2);

console.log(H);

// Consider the following algorithm A, where the function hash(k) returns the hash value of number k.

// H: hash table (empty buckets store number -1)

// N: number of buckets of the hash table

// k: an integer number

// function A(H,N,k)
//     i=hash(k)
//     for 0 <= j < N
//         if(H[(i+j)%N]==-1)
//             H[(i+j)%N]=k
//             break
// end function

// What task does the algorithm A perform?
// The answer is to insert a number k in the hash table H using linear probing as collision resolution method.

//To use the hash table above with normal hash function. let a = 1, c = 0, m = no of buckets
// let hashTable4 = new HashTable(1, 0, 10);
// const toInsert = [232,227,11,106,107];
// // const toInsert = [238, 40, 128, 59, 212, 185, 215];
// for (let i = 0; i < toInsert.length; i++) {
//   hashTable4.insert(toInsert[i]);
// }
// console.log(hashTable4.buckets, "line 186");
// console.log(hashTable4.find(107), "line 187");

//Hash table with separate chaining
class HashTableWithSeparateChaining {
  constructor(_a, _c, _m) {
    this.a = _a;
    this.c = _c;
    this.m = _m;
    this.buckets = new Array(_m);
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }
  }

  insert(key) {
    let h = (this.a * key + this.c) % this.m;
    this.buckets[h].push(key);
    console.log("inserted key: " + key + " at h: " + h);
  }

  find(key) {
    let h = (this.a * key + this.c) % this.m;
    let i = 0;
    while (this.buckets[h][i] !== key) {
      i++;
    }
    return i;
  }

  remove(key) {
    let h = (this.a * key + this.c) % this.m;
    let i = 0;
    while (this.buckets[h][i] !== key) {
      i++;
    }
    this.buckets[h].splice(i, 1);
  }

  loadFactor() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].length !== 0) {
        count++;
      }
    }
    return count / this.buckets.length;
  }
}

// let hashTable5 = new HashTableWithSeparateChaining(1, 0, 11);
// const toInsert2 = [219, 129, 244, 112, 236, 233, 125];
// for (let i = 0; i < toInsert2.length; i++) {
//   hashTable5.insert(toInsert2[i]);
// }
// console.log(hashTable5.buckets, "line 229");

// for (let i = 0; i < hashTable5.buckets.length; i++) {
//   console.log(hashTable5.buckets[i]);
// }

// let hashTable6 = new HashTableWithSeparateChaining(1, 0, 9);
// const toInsert3 = [76, 253, 5, 142];
// for (let i = 0; i < toInsert3.length; i++) {
//   hashTable6.insert(toInsert3[i]);
// }
// console.log(hashTable6.buckets, "line 229");
