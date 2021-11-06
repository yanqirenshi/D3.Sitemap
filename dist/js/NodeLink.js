"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NodeLink = /*#__PURE__*/function () {
  function NodeLink() {
    _classCallCheck(this, NodeLink);
  }

  _createClass(NodeLink, [{
    key: "dataTemplate",
    value: function dataTemplate() {
      return {
        url: null,
        position: {
          x: 0,
          y: 100
        },
        rectangle: {
          w: 33,
          h: 33
        },
        icon: null // string url

      };
    }
  }, {
    key: "normalize",
    value: function normalize(data) {
      var new_data = this.dataTemplate();
      if (!data || !data.url) return null;
      return (0, _deepmerge["default"])(new_data, data);
    }
  }]);

  return NodeLink;
}();

exports["default"] = NodeLink;