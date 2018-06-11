// node -> object that represents the intersection of edges
// edge -> unidirectional path from one node to another
//         _nodes only know about adjacent _nodes and don't know who their adjacent
//         _nodes are then adjacent.
// edge dependencies -> criteria for being allowed to pass from one node to another
// events -> for all graph actions at node and graph level

const isf = func => func && {}.toString.call(func) === '[object Function]'
const e = ()=>()=>({})
const t = ()=>()=>true
const a = Object.assign

export default function graph(){
    let _uids = 0
    let _dependencies = e()
    let _nodes = e()

    const uid = marker => marker + _uids++
    const node = n_id =>{
        const fn = _nodes()[ n_id ];
        fn.edges = () => fn()
        fn.edge = n_id => fn.edges()[ n_id ]
        fn.edges.add = (e_id, dep) => {
            const N = _nodes()
            const x = {}
            if(isf( dep )){
                const dep_id = _dependencies.add( dep )
                x[e_id] = () => _dependencies()[dep_id]
            }
            else{
                x[e_id] = true
            }
            const n = a({}, fn.edges(), x )

            N[ n_id ] = () => n
            _nodes = () => N
        }
        fn.edges.remove = e_id => {
            const edg = fn.edges()
            delete edg[ e_id ]
            _nodes[ n_id ] = () => edg
        }
        return fn;
    }
    node.add = () => {
        const id = uid( "n" )
        const n = a({}, _nodes(), {[id] : e()})
        _nodes = () => n
        return id
    }
    node.remove = id => {
        const n = _nodes()
        delete n( id )
        _nodes = () => n
    }
    _dependencies.add = func => {
        const id = uid( "d" )
        const d = a({}, _dependencies(), {[id] : func})
        _dependencies = () => d
        return id
    }
    _dependencies.remove = id => {
        const d = _dependencies()
        delete d( id )
        _dependencies = () => d
    }

    return { node, _dependencies }
}