// node -> object that represents the intersection of edges
// edge -> unidirectional path from one node to another
//         _nodes only know about adjacent _nodes and don't know who their adjacent
//         _nodes are then adjacent.
// edge dependencies -> criteria for being allowed to pass from one node to another
// events -> for all graph actions at node and graph level

// is function
const isf = f => f && {}.toString.call(f) === '[object Function]'
// is string
const iss = s => s && typeof s === 'string'
//uid index shared by all graphs
let _uids = 0

export default function graph(){
    // graph store
    // OBJECT
    let _n = () => ({})
    // get a unique id
    // STRING
    const uid = () => "n" + _uids++
    // get all node ids
    // ARRAY
    const ids = () => Object.keys( _n() )
    // get all nodes
    // OBJECT
    const nodes = () => {
        const c = {}
        ids().forEach( k => { c[ k ] = get( k ) })
        return c;
    }
    // is n1 -> n2? (doesn't check the other way i.e. n2 -> n1)
    // BOOLEAN
    const connected = (id1, id2) => has(id1) && has(id2) && get(id1).indexOf( id2 ) >= 0
    // does the node list contain this key?
    // BOOLEAN
    const has = id => iss( id ) ? ids().indexOf( id ) > -1 : false
    // get node by id
    // ARRAY
    const get = id => _n()[ id ]().slice()
    // how many connections for this node?
    // INTEGER
    const degree = id => node( id ).length
    // add a node
    // STRING
    const add = () => {
        const n = _n()
        const id = uid()
        n[id] = () => []
        _n = () => n
        return id
    }
    // remove a node
    // STRING
    const remove = id => {
        const n = _n()
        ids().forEach( idx => disconnect( idx, id ))
        delete n[ id ]
        _n = () => n
        return id
    }
    // connect two nodes
    // BOOLEAN
    const connect = (id1, id2) => {
        if( !connected(id1, id2) ){
            const n = _n()
            const c = get(id1)
            c.push(id2)
            n[ id1 ] = () => c
            _n = () => n
            return true;
        }
        return false;
    }
    // disconnect two nodes
    // BOOLEAN
    const sever = (id1, id2) => {
        if( connected(id1, id2) ){
            const n = _n()
            const c = get(id1)
            const idx = c.indexOf( id2 )
            c.splice( idx, 1 )
            n[ id1 ] = () => c
            _n = () => n
            return true
        }
        return false
    }
    // connect two nodes in both directions
    // ARRAY
    const connectFull = (id1, id2) => [connect(id1, id2), connect(id2, id1) ]
    return { nodes, ids, connected, has, get, degree, remove, add, connect, sever, connectFull };
}