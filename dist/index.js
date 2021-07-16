"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function get() {
    return _idb.get;
  }
});
Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function get() {
    return _idb.set;
  }
});
exports.default = exports.useIdbKeyval = void 0;

var _react = require("react");

var _idb = require("./idb.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var useIdbKeyval = (key, initialState, initFn) => {
  var [item, setItem] = (0, _react.useState)(initialState);
  (0, _react.useEffect)( /*#__PURE__*/_asyncToGenerator(function* () {
    if (typeof window !== "undefined") {
      var value = yield (0, _idb.get)(key);

      if (value) {
        setItem(value);
      } else {
        var initFnResult = initFn ? initFn(initialState) : null;
        setItem(initFnResult ? initFnResult : initialState);
        (0, _idb.set)(key, initFnResult ? initFnResult : initialState);
      }
    }
  }), [key]);
  return [item, (0, _react.useCallback)(value => {
    if (typeof value === "function") {
      setItem(prev => {
        var prevValue = value(prev);
        (0, _idb.set)(key, prevValue);
        return prevValue;
      });
    } else {
      setItem(value);
      (0, _idb.set)(key, value);
    }
  }, [_idb.set, setItem]), (0, _react.useCallback)(() => {
    setItem(initialState);
    (0, _idb.set)(key, initialState);
  }, [_idb.set, setItem])];
};

exports.useIdbKeyval = useIdbKeyval;
var _default = useIdbKeyval;
exports.default = _default;