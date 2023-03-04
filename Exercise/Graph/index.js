// Vertex(v):	This	constructor	creates	a	new	vertex	by	just	assigning	it	the name	v	and
// creating	a	new	instance	of	the	adjacency	list

class Vertex {
  constructor(v) {
    this.name = v;
    this.adj = new Array();
  }
}

// Edge(from,	to,	weight):	This	constructor	creates	a	new	edge by	assigning	it	an	origin
// vertex	(from),	a	destination	vertex	(to)	and	a	weight.

class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class Graph {
  // addVertex(v):	This	method	creates	a	new	vertex	(using	the	constructor	Vertex)	and
  // appends	it	to	the	list	of	vertices	(vlist
  constructor() {
    this.vlist = new Array();
  }
  addVertex(v) {
    this.vlist.push(new Vertex(v));
  }

  //   getVertex(v):	 This	methods	 performs	 a	linear	 search	 on	 vlist.	 If	 an	 element	with	 a
  //   name	equal	to	v	is	found,	the	element	(a	vertex)	is	returned.	If	no	vertex	with	a	name
  //   equal	to	v	is	found	in	the	list,	NULL	is	returned.
  getVertex(v) {
    for (let i = 0; i < this.vlist.length; i++) {
      if (this.vlist[i].name === v) {
        return this.vlist[i];
      }
    }
    return null;
  }

  //   addEdge(v1,	 v2,	 weight):	 This	 method	 uses	 the	 method	 getVertex()	 to	 obtain	 the
  //   vertices	 identified	 by	 the	 names	 v1	 and	 v2.	 Next,	 it	 uses	 the	 constructor	 Edge	 to
  //   create	 the	 new	edge	and	adds	it	 to	 the	 corresponding	adjacency	list.	 If	 vertices	 v1
  //   and	v2	are	different,	a	second	edge	originating	at	v2	and	ending	at	v1	must	be	added
  //   as	well
  addEdge(v1, v2, weight) {
    let vertex1 = this.getVertex(v1);
    let vertex2 = this.getVertex(v2);
    if (vertex1 != null && vertex2 != null) {
      vertex1.adj.push(new Edge(v1, v2, weight));
      if (v1 != v2) {
        vertex2.adj.push(new Edge(v2, v1, weight));
      }
    }
  }

  //   getEdge(v1, v2):	 This	 method	 uses	 the	 method	 getVertex()	 to	 obtain	 the	 vertices
  //   identified	 by	 the	 names	 v1	 and	 v2.	 Next,	 it	 performs	 a	 linear	 search	 on	 the
  //   corresponding	 adjacency	 list	 to	 check	 whether	 the	 edge	 exists.	 If	 so,	 it	 returns	 it.
  //   Otherwise,	it	returns	NULL
  getEdge(v1, v2) {
    let vertex1 = this.getVertex(v1);
    let vertex2 = this.getVertex(v2);
    if (vertex1 != null && vertex2 != null) {
      for (let i = 0; i < vertex1.adj.length; i++) {
        if (vertex1.adj[i].to === v2) {
          return vertex1.adj[i];
        }
      }
    }
    return null;
  }

  //   MST():	 This	method returns	the	minimum	spanning	tree	of	the	original	graph.
  MST() {
    let mst = new Graph();
    let edges = new Array();
    let visited = new Array();
    let v = this.vlist[0]; // start with first vertex using algorithm of Kruskal
    mst.addVertex(v.name);
    visited.push(v.name);
    while (visited.length < this.vlist.length) {
      for (let i = 0; i < v.adj.length; i++) {
        if (!visited.includes(v.adj[i].to)) {
          edges.push(v.adj[i]);
        }
      }
      edges.sort((a, b) => {
        return a.weight - b.weight;
      });
      let edge = edges.shift();
      mst.addVertex(edge.to);
      mst.addEdge(edge.from, edge.to, edge.weight);
      visited.push(edge.to);
      v = this.getVertex(edge.to);
    }
    return mst;
  }

  // MSTCost():	 This	method	returns	the	cost	of	the	minimum	spanning	tree.
  MSTCost() {
    let mst = this.MST();
    let cost = 0;
    for (let i = 0; i < mst.vlist.length; i++) {
      for (let j = 0; j < mst.vlist[i].adj.length; j++) {
        cost += mst.vlist[i].adj[j].weight;
      }
    }
    return cost / 2;
    }

  // SP(v1, v2): This	method returns	a	graph containing	 the	sequence	of	vertices	of	 the
  // shortest	path	from	v1	to	v2.
  SP(v1, v2) {
    let sp = new Graph();
    let edges = new Array();
    let visited = new Array();
    let v = this.getVertex(v1);
    sp.addVertex(v.name);
    visited.push(v.name);
    while (!visited.includes(v2)) {
      for (let i = 0; i < v.adj.length; i++) {
        if (!visited.includes(v.adj[i].to)) {
          edges.push(v.adj[i]);
        }
      }
      edges.sort((a, b) => {
        return a.weight - b.weight;
      });
      let edge = edges.shift();
      sp.addVertex(edge.to);
      sp.addEdge(edge.from, edge.to, edge.weight);
      visited.push(edge.to);
      v = this.getVertex(edge.to);
    }
    return sp;
  }

  // SPCost(v1, v2): This	method	returns	the	cost	of	the	shortest	path	between	v1	and	v2
  SPCost(v1, v2) {
    let sp = this.SP(v1, v2);
    let cost = 0;
    for (let i = 0; i < sp.vlist.length; i++) {
      for (let j = 0; j < sp.vlist[i].adj.length; j++) {
        cost += sp.vlist[i].adj[j].weight;
      }
    }
    return cost;
  }
}

const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");

g.addEdge("A", "B", 2);
g.addEdge("A", "C", 7);
g.addEdge("A", "D", 4);
g.addEdge("A", "E", 1);
g.addEdge("B", "C", 13);
g.addEdge("B", "D", 6);
g.addEdge("B", "E", 8);
g.addEdge("C", "D", 5);
g.addEdge("C", "E", 12);
g.addEdge("D", "E", 3);

g.addEdge("A", "A", 15);
g.addEdge("B", "B", 14);
g.addEdge("C", "C", 11);
g.addEdge("D", "D", 9);
g.addEdge("E", "E", 10);

console.log(g.getVertex("A"));
console.log(g.getVertex("B"));
console.log(g.getVertex("C"));
console.log(g.getVertex("D"));
console.log(g.getVertex("E"));
console.log(g.MST());
console.log(g.MSTCost());