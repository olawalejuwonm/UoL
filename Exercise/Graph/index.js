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

// This constructor create dijkstra's algorithm routing table
class RoutingTable {
  constructor(vertex, distance, previous) {
    this.vertex = vertex;
    this.distance = distance;
    this.previous = previous;
  }
}

class Graph {
  // Note: G is for undirected graphs
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
      if (!visited.includes(edge.to)) {
        mst.addVertex(edge.to);
        mst.addEdge(edge.from, edge.to, edge.weight);
        visited.push(edge.to);
        v = this.getVertex(edge.to);
      }
    }
    // console.log(mst.vlist);
    //print all vertices of mst
    console.log("MST:");
    for (let i = 0; i < mst.vlist.length; i++) {
      console.log(mst.vlist[i]);
    }
    console.log("MST End");

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
      if (!visited.includes(edge.to)) {
        sp.addVertex(edge.to);
        sp.addEdge(edge.from, edge.to, edge.weight);
        visited.push(edge.to);
        v = this.getVertex(edge.to);
      }
      if (edges.length == 0) {
        return sp;
      }
    }
    return sp;
  }

  // This create dijkstra's algorithm routing table for shortest path of the graph
  dijkstra(A) {
    let table = new Array();
    let visited = new Array();
    let v = this.getVertex(A);
    table.push({
        vertex: v.name,
        distance: 0,
        previous: null
    })
    visited.push(v.name);
    while (visited.length < this.vlist.length) {
        for (let i = 0; i < v.adj.length; i++) {
            if (!visited.includes(v.adj[i].to)) {
                table.push({
                    vertex: v.adj[i].to,
                    distance: v.adj[i].weight + edge.distance,
                    previous: v.name
                })
            }
        }
        table.sort((a, b) => {
            return a.distance - b.distance;
        })
        let edge = table.shift();
        if (!visited.includes(edge.vertex)) {
            visited.push(edge.vertex);
            v = this.getVertex(edge.vertex);
        }
    }
    return table;
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

  display() {
    for (let i = 0; i < this.vlist.length; i++) {
      console.log(this.vlist[i]);
    }
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

const g3 = new Graph();
g3.addVertex("J");
g3.addVertex("K");
g3.addVertex("L");
g3.addVertex("M");
g3.addVertex("N");

g3.addEdge("J", "K", 7);
g3.addEdge("J", "L", 4);
g3.addEdge("J", "M", 3);

g3.addEdge("K", "N", 1);
g3.addEdge("K", "J", 7);
g3.addEdge("K", "M", 2);

g3.addEdge("L", "J", 4);
g3.addEdge("L", "M", 5);

g3.addEdge("M", "J", 3);
g3.addEdge("M", "K", 2);
g3.addEdge("M", "N", 6);

g3.addEdge("N", "K", 1);
g3.addEdge("N", "M", 6);

// g3.SP("J", "N").display()
console.log(g3.dijkstra("J"));
// console.log(g3.SPCost("J", "L"));
// console.log(g.getVertex("A"));

// console.log(g.getVertex("B"));
// console.log(g.getVertex("C"));
// console.log(g.getVertex("D"));
// console.log(g.getVertex("E"));
// console.log(g.MST());
// console.log(g.MSTCost());

// const g2 = new Graph();
// g2.addVertex("H");
// g2.addVertex("I");
// g2.addVertex("J");
// g2.addVertex("K");

// g2.addEdge("H", "I", 8);
// g2.addEdge("I", "K", 2);
// g2.addEdge("J", "H", 1);
// g2.addEdge("J", "I", 4);
// g2.addEdge("J", "J", 3);
// g2.addEdge("J", "K", 5);
// g2.addEdge("K", "I", 6);
// g2.addEdge("K", "K", 1);

// console.log(g2.vlist);
// console.log(g2.getVertex("H"));
