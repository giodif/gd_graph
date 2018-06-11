# GD Graph

## Install
```
    npm install --save gd_graph
```

##  Use in a project
```
    import graph from "gd_graph"

    const g = graph()
    
    // add nodes to the graph
    // they start out disconnected
    // returns id's for the nodes
    const id1 = g.add()
    const id2 = g.add()
    const id3 = g.add()

    const id4 = "hhdhd9797" // junk

    // connect directional edge between nodes
    // returns true/false for connection success
    g.connect( id1, id2 ) //true
    g.connect( id1, id3 ) //true
    g.connect( id1, id4 ) //false

    // bidirectionally connect nodes
    g.connectFull(id2, id3) //[true, true]
    g.connectFull(id1, id2) //[false, true]
    g.connectFull(id1, id4) //[false, false]

    // get a list of all node ids
    // unique ids are generated by the graph
    g.ids()

    // get all the nodes and their edges
    g.nodes()
    
    // does a directional edge
    // connect the first node to the second
    g.connected( id1, id2 ) // true
    g.connected( id1, id3 ) // false
    g.connected( id3, id1 ) // false
    
    // does the graph contain a node with this id?
    g.has( id1 ) // true
    g.has( id4 ) // false

    // get the node's list of edges
    g.get( id1 ) // [ ids... ]
    g.get( id1 ) // [ ids... ]


```