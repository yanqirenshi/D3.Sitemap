"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Edge = /*#__PURE__*/function () {
  function Edge() {
    _classCallCheck(this, Edge);
  }

  _createClass(Edge, [{
    key: "dataTemplate",
    value: function dataTemplate() {
      return {
        from: {
          id: null,
          port: null,
          node: null,
          position: {
            x: 0,
            y: 0
          }
        },
        to: {
          id: null,
          port: null,
          node: null,
          position: {
            x: 0,
            y: 0
          }
        },
        stroke: {
          color: '#333',
          width: 1.5
        },
        _id: null,
        _core: null,
        _class: 'EDGE'
      };
    }
  }, {
    key: "normalize",
    value: function normalize(data) {
      var new_data = this.dataTemplate();
      new_data._core = data;
      if (data.id) new_data._id = data.id;
      if (data.from.id) new_data.from.id = data.from.id;
      if (data.to.id) new_data.to.id = data.to.id;
      if (data.stroke) new_data.stroke = data.stroke;
      data._edge = new_data;
      return new_data;
    } ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "draw",
    value: function draw(place, data) {
      var lineData = [{
        "x": data.from.position.x,
        "y": data.from.position.y,
        stroke: data._core.stroke
      }, {
        "x": data.to.position.x,
        "y": data.to.position.y
      }];
      var lineFunction = d3.line().x(function (d) {
        return d.x;
      }).y(function (d) {
        return d.y;
      });
      var path = place.append("path").datum(lineData).attr("fill", "none").attr("d", lineFunction).attr('marker-end', "url(#edge-arrow)").style('fill', function (d) {
        return d[0].stroke.color;
      }).style("stroke", function (d) {
        return d[0].stroke.color;
      }).style("stroke-width", function (d) {
        return d[0].stroke.width;
      });
      var len = path.node().getTotalLength();
      var t = len - (6 + 6 + 10);
      path.attr('stroke-dasharray', "0 " + 6 + " " + t + " " + 6).attr('stroke-dashoffset', 0);
    }
  }]);

  return Edge;
}();

exports["default"] = Edge;