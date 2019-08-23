webpackJsonp([25],{

/***/ 1074:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".errPage-container[data-v-4654f579]{width:800px;margin:100px auto}.errPage-container .pan-back-btn[data-v-4654f579]{background:#008489;color:#fff;border:none!important}.errPage-container .pan-gif[data-v-4654f579]{margin:0 auto;display:block}.errPage-container .pan-img[data-v-4654f579]{display:block;margin:0 auto;width:100%}.errPage-container .text-jumbo[data-v-4654f579]{font-size:60px;font-weight:700;color:#484848}.errPage-container .list-unstyled[data-v-4654f579]{font-size:14px}.errPage-container .list-unstyled li[data-v-4654f579]{padding-bottom:5px}.errPage-container .list-unstyled a[data-v-4654f579]{color:#008489;text-decoration:none}.errPage-container .list-unstyled a[data-v-4654f579]:hover{text-decoration:underline}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/errorPage/401.vue"],"names":[],"mappings":"AACA,oCACE,YAAa,AACb,iBAAmB,CACpB,AACD,kDACI,mBAAoB,AACpB,WAAY,AACZ,qBAAwB,CAC3B,AACD,6CACI,cAAe,AACf,aAAe,CAClB,AACD,6CACI,cAAe,AACf,cAAe,AACf,UAAY,CACf,AACD,gDACI,eAAgB,AAChB,gBAAiB,AACjB,aAAe,CAClB,AACD,mDACI,cAAgB,CACnB,AACD,sDACM,kBAAoB,CACzB,AACD,qDACM,cAAe,AACf,oBAAsB,CAC3B,AACD,2DACQ,yBAA2B,CAClC","file":"401.vue","sourcesContent":["\n.errPage-container[data-v-4654f579] {\n  width: 800px;\n  margin: 100px auto;\n}\n.errPage-container .pan-back-btn[data-v-4654f579] {\n    background: #008489;\n    color: #fff;\n    border: none !important;\n}\n.errPage-container .pan-gif[data-v-4654f579] {\n    margin: 0 auto;\n    display: block;\n}\n.errPage-container .pan-img[data-v-4654f579] {\n    display: block;\n    margin: 0 auto;\n    width: 100%;\n}\n.errPage-container .text-jumbo[data-v-4654f579] {\n    font-size: 60px;\n    font-weight: 700;\n    color: #484848;\n}\n.errPage-container .list-unstyled[data-v-4654f579] {\n    font-size: 14px;\n}\n.errPage-container .list-unstyled li[data-v-4654f579] {\n      padding-bottom: 5px;\n}\n.errPage-container .list-unstyled a[data-v-4654f579] {\n      color: #008489;\n      text-decoration: none;\n}\n.errPage-container .list-unstyled a[data-v-4654f579]:hover {\n        text-decoration: underline;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_401_images_401_gif__ = __webpack_require__(1183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_401_images_401_gif___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_401_images_401_gif__);
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
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'page401',
  data: function data() {
    return {
      errGif: __WEBPACK_IMPORTED_MODULE_0__assets_401_images_401_gif___default.a + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    };
  },

  methods: {
    back: function back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' });
      } else {
        this.$router.go(-1);
      }
    }
  }
});

/***/ }),

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1074);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("2147843a", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1074, function() {
     var newContent = __webpack_require__(1074);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1183:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/401.gif";

/***/ }),

/***/ 1218:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "errPage-container"
  }, [_c('el-button', {
    staticClass: "pan-back-btn",
    attrs: {
      "icon": "arrow-left"
    },
    on: {
      "click": _vm.back
    }
  }, [_vm._v("返回")]), _vm._v(" "), _c('el-row', [_c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('h1', {
    staticClass: "text-jumbo text-ginormous"
  }, [_vm._v("Oops!")]), _vm._v(" "), _c('h2', [_vm._v("你没有权限去该页面")]), _vm._v(" "), _c('h6', [_vm._v("如有不满请联系你领导")]), _vm._v(" "), _c('ul', {
    staticClass: "list-unstyled"
  }, [_c('li', [_vm._v("或者你可以去:")]), _vm._v(" "), _c('li', {
    staticClass: "link-type"
  }, [_c('router-link', {
    attrs: {
      "to": "/dashboard"
    }
  }, [_vm._v("回首页")])], 1), _vm._v(" "), _c('li', {
    staticClass: "link-type"
  }, [_c('a', {
    attrs: {
      "href": "#"
    }
  }, [_vm._v("餐加")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.dialogVisible = true
      }
    }
  }, [_vm._v("点我看图")])])])]), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 12
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.errGif,
      "width": "313",
      "height": "428",
      "alt": "Girl has dropped her ice cream."
    }
  })])], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "随便看",
      "visible": _vm.dialogVisible
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogVisible = $event
      }
    }
  }, [_c('img', {
    staticClass: "pan-img",
    attrs: {
      "src": _vm.ewizardClap
    }
  })])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-4654f579", module.exports)
  }
}

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1162)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1109),
  /* template */
  __webpack_require__(1218),
  /* scopeId */
  "data-v-4654f579",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/errorPage/401.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] 401.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4654f579", Component.options)
  } else {
    hotAPI.reload("data-v-4654f579", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});