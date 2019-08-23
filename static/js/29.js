webpackJsonp([29],{

/***/ 1057:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".iframe{width:100%;height:100%;border:0;overflow:hidden;box-sizing:border-box}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/charts/index.vue"],"names":[],"mappings":"AACA,QACI,WAAY,AACZ,YAAa,AACb,SAAU,AACV,gBAAiB,AACjB,qBAAuB,CAC1B","file":"index.vue","sourcesContent":["\n.iframe {\n    width: 100%;\n    height: 100%;\n    border: 0;\n    overflow: hidden;\n    box-sizing: border-box;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'myiframe',
    data: function data() {
        return {
            fullscreenLoading: false
            //urlPath: this.getUrlPath()
            //urlPath: 'http://127.0.0.1:8081/pages/charts/index.html'
        };
    },
    created: function created() {
        this.getUrlPath();
        console.log('this.$route', this.$route);
    },
    mounted: function mounted() {
        var _this = this;

        this.iframeInit();
        window.onresize = function () {
            _this.iframeInit();
        };
    },

    props: ['routerPath'],
    watch: {
        routerPath: function routerPath(val) {
            this.urlPath = this.getUrlPath();
        }
    },
    components: {},
    methods: {
        iframeInit: function iframeInit() {
            var _this2 = this;

            var iframe = this.$refs.iframe;
            var clientHeight = document.documentElement.clientHeight - 90;
            iframe.style.height = clientHeight + 'px';
            if (iframe.attachEvent) {
                iframe.attachEvent('onload', function () {
                    _this2.fullscreenLoading = false;
                });
            } else {
                iframe.onload = function () {
                    _this2.fullscreenLoading = false;
                };
            }
        },

        getUrlPath: function getUrlPath() {
            var path = this.$route && this.$route.path.substring(7);
            var url = window.location.origin;
            this.urlPath = url + path + '/index.html';
            console.log('this.urlPath', this.urlPath);
        }
    }
});

/***/ }),

/***/ 1145:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1057);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("40aa7fad", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1057, function() {
     var newContent = __webpack_require__(1057);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1199:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.$route.query.src) ? _c('iframe', {
    directives: [{
      name: "loading",
      rawName: "v-loading.fullscreen.lock",
      value: (_vm.fullscreenLoading),
      expression: "fullscreenLoading",
      modifiers: {
        "fullscreen": true,
        "lock": true
      }
    }],
    ref: "iframe",
    staticClass: "iframe",
    attrs: {
      "src": _vm.$route.query.src
    }
  }) : _c('iframe', {
    directives: [{
      name: "loading",
      rawName: "v-loading.fullscreen.lock",
      value: (_vm.fullscreenLoading),
      expression: "fullscreenLoading",
      modifiers: {
        "fullscreen": true,
        "lock": true
      }
    }],
    ref: "iframe",
    staticClass: "iframe",
    attrs: {
      "src": _vm.urlPath
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-06eff9a8", module.exports)
  }
}

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1145)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1101),
  /* template */
  __webpack_require__(1199),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/charts/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06eff9a8", Component.options)
  } else {
    hotAPI.reload("data-v-06eff9a8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});