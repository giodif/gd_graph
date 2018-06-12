var assert = require('assert');
var graph = require("../gd_graph.es5").default;

describe('gd_graph behaviors', function() {

    describe( "graph introspection", function(){
        var g, a, b, c;
        describe( 'ids()', function(){
            beforeEach('zero out the graph', function() {
                g = graph();
                a = g.add();
                b = g.add();
                c = g.add();
            });
            after( 'zero out the graph', function() {
                g = a = b = c = undefined;
            });

            it( 'should provide acurate list of node ids', function(){
                assert.equal(g.ids().length, 3);
                assert.equal(g.ids()[0], a);
                assert.equal(g.ids()[1], b);
                assert.equal(g.ids()[2], c);
            });
        });

        describe( 'has()', function(){
            beforeEach('zero out the graph', function() {
                g = graph();
                a = g.add();
            });
            after( 'zero out the graph', function() {
                g = a = undefined;
            });

            it( 'should report true for an existing node', function(){
                assert.equal(g.has(a), true);
            });
            it( 'should report false for a missing node', function(){
                assert.equal(g.has(), false);
                assert.equal(g.has("ksdbksgd"), false);
            });
        });
    });


    describe('graph construction', function() {
        var g = graph();
        it('should start out with an empty graph', function() {
            assert.equal(g.ids().length, 0);
        });
    });

    describe('node management', function() {
        var g, a, b, c;
        describe( 'add()', function(){
            beforeEach('zero out the graph', function() {
                g = graph();
                a = g.add();
            });
            after('zero out the graph', function() {
                g = a = undefined;
            });
            it('should add a node to the graph', function() {
                assert.equal(g.ids().length, 1);
            });
            it( "should create a node with no connections", function(){
                assert.equal( g.get( a ).length, 0 )
            } );
            it( "should return an id that matches the node", function(){
                assert.equal( a, g.ids()[0] )
            } );
        } );
        describe( 'remove()', function(){
            beforeEach('zero out the graph', function() {
                g = graph();
                a = g.add();
                b = g.add();
                c = g.add();
                g.connect( b, a )
                g.connectFull( a, c )
                g.remove( c );
            });
            after('zero out the graph', function() {
                g = a = b = c = undefined;
            });

            it('should remove a node from the graph', function() {
                assert.equal(g.ids().length, 2);
            });
            it( "should disconnect nodes from the removed node", function(){
                assert.equal( g.get(a).length, 0 );
            } );
            it( "shouldn't disconnect nodes from other nodes", function(){
                assert.equal( g.get(b).length, 1 );
            } );
        } );
    });

    describe( "edge management", function(){
        var g, a, b, c;
        describe( 'connect() and connectFull()', function(){
            beforeEach('zero out the graph', function() {
                g = graph();
                a = g.add();
                b = g.add();
                c = g.add();

                g.connect( a, b );
                g.connectFull( a, c );
            });
            after('zero out the graph', function() {
                g = a = b = c = undefined;
            });

            it('degree() should reveal the number of ougoing connections in a node', function() {
                assert.equal(g.degree(a), 2);
            });

            it('connect() should add node to edge list', function() {
                assert.equal(g.get(a)[0], b);
            });
            it( "connect() should make only a unidirectional connection", function(){
                assert.equal( g.get(b)[0], undefined );
            } );
            it( "connect() should return false if already connected", function(){
                assert.equal( g.connect( a, b ), false );
            } );
            it( "connect() should return false if nodes are already connected", function(){
                assert.equal( g.connect( a, b ), false );
            } );
            it( "connectFull() should connect in both directions", function(){
                assert.equal(g.get(a)[1], c);
                assert.equal(g.get(c)[0], a);
            } );
            it( "connectFull() should return false if already connected", function(){
                assert.equal( g.connectFull( a, c )[0], false );
                assert.equal( g.connectFull( a, c )[1], false );
            } );
        } )

        describe( 'sever() and severFull()', function(){
            beforeEach('zero out the graph', function() {
                g = graph();
                a = g.add();
                b = g.add();
                c = g.add();

                g.connectFull( a, b );
                g.connectFull( a, c );
                g.connectFull( b, c );

                g.sever( a, c );
                g.severFull( b, c );
            });
            after('zero out the graph', function() {
                g = a = b = c = undefined;
            });
            it( "sever() should remove only a connection in one direction", function(){
                assert.equal( g.get( a ).length, 1 );
                assert.equal( g.get( a )[ 0 ], b );
            } );
            it( "severFull() should remove connections in both directions", function(){
                assert.equal( g.get( b ).length, 1 );
                assert.equal( g.get( b )[ 0 ], a );
            } );
        } );
    } );
});