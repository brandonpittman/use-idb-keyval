"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.get = exports.call = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dbp = new Promise((resolve, reject) => {
  if (typeof window !== "undefined") {
    var openreq = window.indexedDB.open("use-idb-keyval", 1);

    openreq.onerror = () => reject(openreq.error);

    openreq.onsuccess = () => resolve(openreq.result);

    openreq.onupgradeneeded = () => openreq.result.createObjectStore("idb");
  }
});

var call = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (type, method) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var db = yield dbp;
    var transaction = db.transaction("idb", type);
    var store = transaction.objectStore("idb");
    return new Promise((resolve, reject) => {
      var req = store[method](...args);

      transaction.oncomplete = () => resolve(req);

      transaction.onabort = transaction.onerror = () => reject(transaction.error);
    });
  });

  return function call(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.call = call;

var get = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (key) {
    return (yield call("readonly", "get", key)).result;
  });

  return function get(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;

var set = (key, value) => value === undefined ? call("readwrite", "delete", key) : call("readwrite", "put", value, key);

exports.set = set;