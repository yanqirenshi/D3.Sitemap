"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _NodeLink = _interopRequireDefault(require("./NodeLink.js"));

var _Drawer = require("./Drawer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node = /*#__PURE__*/function () {
  function Node() {
    _classCallCheck(this, Node);

    this.drawer = new _Drawer.DrawerHierarchy();
    this.node_link = new _NodeLink["default"]();
  } ///// ////////////////////////////////////////////////////////////////
  /////   Utility
  ///// ////////////////////////////////////////////////////////////////


  _createClass(Node, [{
    key: "getFourSides",
    value: function getFourSides(data) {
      var port_r = 4;
      var margin = 4 + port_r;
      var x = data.position.x;
      var y = data.position.y;
      var w = data.size.w;
      var h = data.size.h;
      var top_left = {
        x: x - margin,
        y: y - margin
      };
      var top_right = {
        x: x + w + margin,
        y: y - margin
      };
      var bottom_rigth = {
        x: x + w + margin,
        y: y + h + margin
      };
      var bottom_left = {
        x: x - margin,
        y: y + h + margin
      };
      return [{
        from: top_left,
        to: top_right
      }, {
        from: top_right,
        to: bottom_rigth
      }, {
        from: bottom_rigth,
        to: bottom_left
      }, {
        from: bottom_left,
        to: top_left
      }];
    } ///// ////////////////////////////////////////////////////////////////
    /////   Adjust
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "dataTemplate",
    value: function dataTemplate() {
      return {
        type: null,
        label: {
          contents: '',
          position: {
            x: 20,
            y: 20
          },
          font: {
            size: 16,
            color: '#333333'
          }
        },
        position: null,
        size: null,
        background: null,
        border: null,
        link: null,
        children: [],
        _id: null,
        _core: null,
        _class: 'NODE'
      };
    }
  }, {
    key: "normalizeBase",
    value: function normalizeBase(data) {
      var core = data._core;
      if (core.id || core.id === 0) data._id = core.id;
      data.type = core.type || 'NODE';
      data.link = this.node_link.normalize(core.link);
    }
  }, {
    key: "normalize",
    value: function normalize(data) {
      var _this = this;

      if (!data) return null;
      var new_data = this.dataTemplate();
      new_data._core = data;
      var children = data.children;
      if (children && children.length > 0) new_data.children = children.map(function (child) {
        return _this.normalize(child);
      });
      this.normalizeBase(new_data);
      var drawer = this.drawer;
      new_data.label = drawer.normalizeLabel(new_data._core.label);
      new_data.size = drawer.normalizeSize(new_data._core.size);
      new_data.position = drawer.normalizePosition(new_data._core.position);
      new_data.border = drawer.normalizeBorder(new_data._core.border);
      new_data.padding = drawer.normalizePadding(new_data._core.padding);
      new_data.background = drawer.normalizeBackground(new_data._core.background);
      data._node = new_data;
      return new_data;
    } ///// ////////////////////////////////////////////////////////////////
    /////   Filter
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "addFilterShadow",
    value: function addFilterShadow(svg) {
      var filter = svg.append("defs").append("filter").attr("id", "drop-shadow").attr("height", "130%");
      filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 5).attr("result", "blur");
      filter.append("feOffset").attr("in", "blur").attr("dx", 5).attr("dy", 5).attr("result", "offsetBlur");
      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    } ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "drawGroup",
    value: function drawGroup(place, data, type) {
      return place.selectAll('g.' + type).data([data], function (d) {
        return d._id;
      }).enter().append('g').attr('class', type).attr("transform", function (d) {
        return "translate(" + d.position.x + "," + d.position.y + ")";
      }).attr('level', function (d) {
        return d._level;
      });
    }
  }, {
    key: "drawBody",
    value: function drawBody(groups) {
      groups.append('rect').attr('class', 'node-body').attr('width', function (d) {
        return d.size.w;
      }).attr('height', function (d) {
        return d.size.h;
      }).attr('rx', function (d) {
        return d.border && d.border.r || 0;
      }).attr('ry', function (d) {
        return d.border && d.border.r || 0;
      }).attr('fill', function (d) {
        return d.background.color;
      }).attr('stroke', function (d) {
        return d.border.color;
      }).attr('stroke-width', function (d) {
        return d.border.width;
      });
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(groups) {
      groups.append('text').attr('class', 'node-label').attr('x', function (d) {
        return d.label.position.x;
      }).attr('y', function (d) {
        return d.label.position.y;
      }).style('fill', function (d) {
        return d.label.font.color;
      }).attr('stroke', function (d) {
        return 'none';
      }).style('font-size', function (d) {
        return d.label.font.size;
      }).text(function (d) {
        return d.label.contents;
      });
    }
  }, {
    key: "drawLink",
    value: function drawLink(groups) {
      var a_element = groups.filter(function (d) {
        return d.link;
      }).append('a').attr('class', 'link-alt').attr('href', function (d) {
        var url = d.link.url;
        if (!url) return null;
        if (typeof url === "function") return url(d);
        return url;
      }).attr('target', '_blank').attr('rel', 'noopener noreferrer').style('color', '#888888');
      a_element.filter(function (d) {
        return d.link.icon;
      }).append('image').attr('x', function (d) {
        return d.link.position.x;
      }).attr('y', function (d) {
        return d.link.position.y;
      }).attr('width', function (d) {
        return d.link.rectangle.w;
      }).attr('height', function (d) {
        return d.link.rectangle.h;
      }).attr('xlink:href', function (d) {
        return d.link.icon;
      });
      a_element.filter(function (d) {
        return !d.link.icon;
      }).append('text').attr('x', function (d) {
        return d.link.position.x;
      }).attr('y', function (d) {
        return d.link.position.y;
      }).style("font-size", function (d) {
        return '12px';
      }).style("display", function (d) {
        console.log(d.link);
        if (!d.link.url) return 'none';
        return 'block';
      }).text(function (d) {
        return 'link';
      });
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
      var groups = this.drawGroup(place, data, 'node');
      this.drawBody(groups, data);
      this.drawLabel(groups, data);
      this.drawLink(groups, data);
    }
  }]);

  return Node;
}();

exports["default"] = Node;