"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawerHierarchy = exports.DrawerGeometry = exports.Drawer = void 0;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://yanqirenshi.github.io/D3.Sketch/dist/edge/Drawer.js

/**
 * 幾何学計算するための Drawer です。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
var DrawerGeometry = /*#__PURE__*/function () {
  function DrawerGeometry() {
    _classCallCheck(this, DrawerGeometry);
  }

  _createClass(DrawerGeometry, [{
    key: "deg2rad",
    value: ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    function deg2rad(degree) {
      return degree * (Math.PI / 180);
    } ///// ////////////////////////////////////////////////////////////////
    /////   Cross Point of two lines
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "isCorss",
    value: function isCorss(A, B, C, D) {
      // 二つの線分の交差チェック
      // https://www.hiramine.com/programming/graphics/2d_segmentintersection.html
      var ACx = C.x - A.x;
      var ACy = C.y - A.y;
      var BUNBO = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
      if (BUNBO === 0) return false;
      var r = ((D.y - C.y) * ACx - (D.x - C.x) * ACy) / BUNBO;
      var s = ((B.y - A.y) * ACx - (B.x - A.x) * ACy) / BUNBO;
      return 0 <= r && r <= 1 && 0 <= s && s <= 1;
    } // 2直線の交点を求める。(具)

  }, {
    key: "getCrossPointCore",
    value: function getCrossPointCore(line, line_port) {
      var out = {
        x: 0,
        y: 0
      };
      var A = line.from;
      var B = line.to;
      var C = line_port.from;
      var D = line_port.to;
      var bunbo = (B.y - A.y) * (D.x - C.x) - (B.x - A.x) * (D.y - C.y);
      if (!this.isCorss(A, B, C, D)) return null; // 二つの線分の交点を算出する。
      // http://mf-atelier.sakura.ne.jp/mf-atelier/modules/tips/program/algorithm/a1.html

      var d1, d2;
      d1 = C.y * D.x - C.x * D.y;
      d2 = A.y * B.x - A.x * B.y;
      out.x = (d1 * (B.x - A.x) - d2 * (D.x - C.x)) / bunbo;
      out.y = (d1 * (B.y - A.y) - d2 * (D.y - C.y)) / bunbo;
      return out;
    } // 2直線の交点を求める。

  }, {
    key: "getCrossPoint",
    value: function getCrossPoint(lines, line_port) {
      var _iterator = _createForOfIteratorHelper(lines),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var point = this.getCrossPointCore(line, line_port);
          if (point) return point;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
  }]);

  return DrawerGeometry;
}();
/**
 * Drawer の共通要素とての Core です。
 * 各 Drawer の要素を整えるメッソッドをまとめているクラスです。
 * いろいろと共通なものがあると思うので。
 * また見通しも良くなるかと。
 * 作る必要があるのかはアレですが。。。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */


exports.DrawerGeometry = DrawerGeometry;

var Drawer = /*#__PURE__*/function () {
  function Drawer() {
    _classCallCheck(this, Drawer);
  }

  _createClass(Drawer, [{
    key: "normalizeFont",
    value: ///// ////////////////////////////////////////////////////////////////
    /////   normalize
    ///// ////////////////////////////////////////////////////////////////
    function normalizeFont(font_core) {
      var template = {
        size: 16,
        color: '#333333'
      };
      if (!font_core) return template;
      return font_core;
    }
  }, {
    key: "normalizeLabel",
    value: function normalizeLabel(label_core) {
      var label = {
        contents: '',
        position: {
          x: 20,
          y: 20
        },
        font: {
          size: 16,
          color: '#333333'
        }
      };
      if (!label_core) return label;
      if (label_core.contents) label.contents = label_core.contents;
      var label_tmp = label_core.position ? label_core.position : label.position;
      label.position = this.normalizePosition(label_tmp);
      label.font = this.normalizeFont(label_core.font);
      return label;
    }
  }, {
    key: "normalizeSize",
    value: function normalizeSize(size_core) {
      var size = {
        w: 0,
        h: 0
      };
      if (!size_core) return size;
      if (size_core.w || size_core.w === 0) size.w = size_core.w;
      if (size_core.h || size_core.h === 0) size.h = size_core.h;
      return size;
    }
  }, {
    key: "normalizePosition",
    value: function normalizePosition(position_core) {
      var position = {
        x: 0,
        y: 0
      };
      if (!position_core) return position;
      if (position_core.x || position_core.x === 0) position.x = position_core.x;
      if (position_core.y || position_core.y === 0) position.y = position_core.y;
      return position;
    }
  }, {
    key: "normalizeBackground",
    value: function normalizeBackground(background_core) {
      var background = {
        color: '#ffffff'
      };
      if (!background_core) return background;
      if (background_core.color) background.color = background_core.color;
      return background;
    }
  }, {
    key: "normalizeBorder",
    value: function normalizeBorder(border_core) {
      var border = {
        width: 1,
        type: 'solid',
        color: '#666666'
      };
      if (!border_core) return border;
      if (border_core.width || border_core.width === 0) border.width = border_core.width;
      if (border_core.color) border.color = border_core.color;
      if (border_core.type) border.type = border_core.type;
      return border;
    }
  }, {
    key: "normalizePadding",
    value: function normalizePadding(padding_core) {
      var template = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      };
      if (!padding_core) return template;
      return padding_core;
    }
  }]);

  return Drawer;
}();
/**
 * 階層構造のデータの Drawer です。
 * Data の 位置、サイズ を整えます。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */


exports.Drawer = Drawer;

var DrawerHierarchy = /*#__PURE__*/function (_Drawer) {
  _inherits(DrawerHierarchy, _Drawer);

  var _super = _createSuper(DrawerHierarchy);

  function DrawerHierarchy() {
    _classCallCheck(this, DrawerHierarchy);

    return _super.apply(this, arguments);
  }

  _createClass(DrawerHierarchy, [{
    key: "data2rect",
    value: ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    function data2rect(data) {
      return {
        from: {
          x: data.position.x,
          y: data.position.y
        },
        to: {
          x: data.position.x + data.size.w,
          y: data.position.y + data.size.h
        }
      };
    } ///// ////////////////////////////////////////////////////////////////
    /////   Fitting
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "fittingCalSizeCore",
    value: function fittingCalSizeCore(rect_a, rect_b) {
      if (!rect_a.from) {
        rect_a.from = {
          x: rect_b.from.x,
          y: rect_b.from.y
        };
      } else {
        if (rect_a.from.x > rect_b.from.x) rect_a.from.x = rect_b.from.x;
        if (rect_a.from.y > rect_b.from.y) rect_a.from.y = rect_b.from.y;
      }

      if (!rect_a.to) {
        rect_a.to = {
          x: rect_b.to.x,
          y: rect_b.to.y
        };
      } else {
        if (rect_a.to.x < rect_b.to.x) rect_a.to.x = rect_b.to.x;
        if (rect_a.to.y < rect_b.to.y) rect_a.to.y = rect_b.to.y;
      }
    }
  }, {
    key: "fittingCalSize",
    value: function fittingCalSize(rect, child) {
      var rect_a = rect;
      var rect_b = this.data2rect(child);
      this.fittingCalSizeCore(rect_a, rect_b);
    }
  }, {
    key: "fitting",
    value: function fitting(data, parent) {
      // parent からの相対位置で補正
      if (parent) {
        data.position.x = parent.position.x + data.position.x;
        data.position.y = parent.position.y + data.position.y;
      } // children も同様に。


      var rect = {
        from: null,
        to: null
      }; // children の fitting 合せて data のサイズも計測。

      var children = data.children;

      if (children && children.length > 0) {
        var _iterator2 = _createForOfIteratorHelper(data.children),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var child = _step2.value;
            this.fitting(child, data);
            this.fittingCalSize(rect, child); // rect は破壊的
          } // children 内容で data のサイズを補正

        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.fittingCalSizeCore(rect, this.data2rect(data));
        data.size.w = rect.to.x - rect.from.x;
        data.size.h = rect.to.y - rect.from.y;
      }
    }
  }]);

  return DrawerHierarchy;
}(Drawer);

exports.DrawerHierarchy = DrawerHierarchy;