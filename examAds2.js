// function F1(A,N,x)

//            if(N == 0):

//                 return -1

//            for (0 <= i < N)

//                 if(A[i] < x):

//                      return i

//           return -1

// end function


function F1(A, N, x) {
  if (N == 0) {
    return -1;
  }
  for (let i = 0; i < N; i++) {
    if (A[i] < x) {
      return i;
    }
  }
  return -1;
}

console.log(F1([4,5,7,1,3], 5, 4));


// F2, below, inserts a node n in a BST with root x. What is condition C?
// function F2(Node x, Node n) 
// y = null
// while (x != null) 
// y = x
// if (n→key < x→key)
// x = x→left
// else
// x = x→right
// if (C)
// y→left = n
// else
// y→right = n
// end function

// C is the condition that if n.key < x.key, then y.left = n, else y.right = n