webpackJsonp([0],{

/***/ 1066:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"taBar.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1072:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__taBar_taBar__ = __webpack_require__(1198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__taBar_taBar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__taBar_taBar__);
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    components: { taBar: __WEBPACK_IMPORTED_MODULE_0__taBar_taBar___default.a },
    name: 'instructionManage',
    data: function data() {
        return {
            brand_id: null,
            shop_id: null
        };
    },
    created: function created() {
        this.brand_id = this.$route.params && this.$route.params.brand_id;
        this.shop_id = this.$route.params && this.$route.params.shop_id;
    }
});

/***/ }),

/***/ 1116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['title', 'type'],
  name: 'TaBar',
  methods: {
    handleClick: function handleClick() {
      alert('button click');
    }
  }
});

/***/ }),

/***/ 1154:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1066);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("527ba007", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1066, function() {
     var newContent = __webpack_require__(1066);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1072);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("2b936ab8", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1072, function() {
     var newContent = __webpack_require__(1072);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1198:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1154)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1116),
  /* template */
  __webpack_require__(1209),
  /* scopeId */
  "data-v-1db32cad",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/restoBrand/instruction/taBar/taBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] taBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1db32cad", Component.options)
  } else {
    hotAPI.reload("data-v-1db32cad", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 1209:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "border": "1px solid black",
      "width": "100%",
      "height": "600px"
    }
  }, [_c('h2', {
    staticStyle: {
      "background-color": "#290543",
      "color": "white",
      "height": "30px",
      "line-height": "30px",
      "text-align": "center",
      "margin-top": "0px"
    }
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "query-container"
  }, [_c('div', [_c('input', {
    attrs: {
      "type": "text",
      "placeholder": "流水号"
    }
  }), _vm._v(" "), _c('el-dropdown', {
    on: {
      "click": _vm.handleClick
    }
  }, [_c('span', {
    staticClass: "el-dropdown-link"
  }, [_vm._v("\n                    查询类型"), _c('i', {
    staticClass: "el-icon-arrow-down el-icon--right"
  })]), _vm._v(" "), _c('el-dropdown-menu', {
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, [_c('el-dropdown-item', [_vm._v("订单详情")]), _vm._v(" "), _c('el-dropdown-item', [_vm._v("菜品详情")]), _vm._v(" "), _c('el-dropdown-item', [_vm._v("支付详情")])], 1)], 1), _vm._v(" "), _c('button', [_vm._v(_vm._s(_vm.type))])], 1), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "query-content"
  }, [_c('h2', [_vm._v("查询结果: ")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "border-bottom": "1px solid black"
    }
  })])
}]}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-1db32cad", module.exports)
  }
}

/***/ }),

/***/ 1216:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container"
  }, [_c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('taBar', {
    attrs: {
      "title": '服务器操作',
      "type": '查询'
    }
  })], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('taBar', {
    attrs: {
      "title": 'newpos操作',
      "type": '查询'
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-43a56f82", module.exports)
  }
}

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1160)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1115),
  /* template */
  __webpack_require__(1216),
  /* scopeId */
  "data-v-43a56f82",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/restoBrand/instruction/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43a56f82", Component.options)
  } else {
    hotAPI.reload("data-v-43a56f82", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});