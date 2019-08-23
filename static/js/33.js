webpackJsonp([33],{

/***/ 1111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'authredirect',
  created: function created() {
    var hash = window.location.search.slice(1);
    window.opener.location.href = window.location.origin + '/login#' + hash;
    window.close();
  }
});

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1111),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/authredirect.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d266be04", Component.options)
  } else {
    hotAPI.reload("data-v-d266be04", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});