import graph from "./graph"

const _g = graph()

// create a bunch of nodes
const a = _g.add()
const b = _g.add()
const c = _g.add()
const d = _g.add()
const e = _g.add()
const f = _g.add()

// create a bunch of connections
_g.connect( a, c )
_g.connect( a, d )
_g.connect( b, a )
_g.connect( b, d )
_g.connect( b, e )
_g.connect( c, a )
_g.connect( c, e )
_g.connect( d, e )
_g.connect( d, f )
_g.connect( e, b )
_g.connect( e, c )
_g.connect( e, d )

export { _g };