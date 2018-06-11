'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = graph;
// node -> object that represents the intersection of edges
// edge -> unidirectional path from one node to another
//         _nodes only know about adjacent _nodes and don't know who their adjacent
//         _nodes are then adjacent.
// edge dependencies -> criteria for being allowed to pass from one node to another
// events -> for all graph actions at node and graph level

// is function
var isf = function isf(f) {
    return f && {}.toString.call(f) === '[object Function]';
};
// is string
var iss = function iss(s) {
    return s && typeof s === 'string';
};
//uid index shared by all graphs
var _uids = 0;

function graph() {
    // graph store
    // OBJECT
    var _n = function _n() {
        return {};
    };
    // get a unique id
    // STRING
    var uid = function uid() {
        return "n" + _uids++;
    };
    // get all node ids
    // ARRAY
    var ids = function ids() {
        return Object.keys(_n());
    };
    // get all nodes
    // OBJECT
    var nodes = function nodes() {
        var c = {};
        ids().forEach(function (k) {
            c[k] = get(k);
        });
        return c;
    };
    // is n1 -> n2? (doesn't check the other way i.e. n2 -> n1)
    // BOOLEAN
    var connected = function connected(id1, id2) {
        return has(id1) && has(id2) && get(id1).indexOf(id2) >= 0;
    };
    // does the node list contain this key?
    // BOOLEAN
    var has = function has(id) {
        return iss(id) ? ids().indexOf(id) > -1 : false;
    };
    // get node by id
    // ARRAY
    var get = function get(id) {
        return has(id) ? _n()[id]().slice() : null;
    };
    // how many connections for this node?
    // INTEGER
    var degree = function degree(id) {
        return get(id).length;
    };
    // add a node
    // STRING
    var add = function add() {
        var n = _n();
        var id = uid();
        n[id] = function () {
            return [];
        };
        _n = function _n() {
            return n;
        };
        return id;
    };
    // remove a node
    // STRING
    var remove = function remove(id) {
        var n = _n();
        ids().forEach(function (idx) {
            return disconnect(idx, id);
        });
        delete n[id];
        _n = function _n() {
            return n;
        };
        return id;
    };
    // connect two nodes
    // BOOLEAN
    var connect = function connect(id1, id2) {
        if (!connected(id1, id2)) {
            var n = _n();
            var c = get(id1);
            c.push(id2);
            n[id1] = function () {
                return c;
            };
            _n = function _n() {
                return n;
            };
            return true;
        }
        return false;
    };
    // disconnect two nodes
    // BOOLEAN
    var sever = function sever(id1, id2) {
        if (connected(id1, id2)) {
            var n = _n();
            var c = get(id1);
            var idx = c.indexOf(id2);
            c.splice(idx, 1);
            n[id1] = function () {
                return c;
            };
            _n = function _n() {
                return n;
            };
            return true;
        }
        return false;
    };
    // connect two nodes in both directions
    // ARRAY
    var connectFull = function connectFull(id1, id2) {
        return [connect(id1, id2), connect(id2, id1)];
    };
    var severFull = function severFull(id1, id2) {
        return [sever(id1, id2), sever(id2, id1)];
    };
    return { nodes: nodes, ids: ids, connected: connected, has: has, get: get, degree: degree, remove: remove, add: add, connect: connect, sever: sever, connectFull: connectFull };
}
