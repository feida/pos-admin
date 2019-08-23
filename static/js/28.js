webpackJsonp([28],{

/***/ 1084:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_system__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(125);
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
    name: 'administrator_record',
    data: function data() {
        return {
            x: {
                a: "foo"
            },
            listLoading: true,
            list: null,
            listQuery: {
                page_index: 1,
                page_size: 10,
                total: 0,
                content: null
            }
        };
    },

    filters: {
        statusFilter: function statusFilter(status) {
            var statusMap = {
                true: 'success',
                false: 'danger'
            };
            return statusMap[status];
        }
    },
    created: function created() {
        this.fetchData();
    },


    watch: {
        //延时查询
        'listQuery.content': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* debounce */])(function () {
            this.fetchData(1);
        }, 500)
    },
    methods: {
        //分页
        handleSizeChange: function handleSizeChange(val) {
            this.listQuery.page_size = val;
            this.fetchData();
        },
        handleCurrentChange: function handleCurrentChange(val) {
            this.listQuery.page_index = val;
            this.fetchData();
        },

        //查询
        fetchData: function fetchData(current) {
            var _this = this;

            if (current) {
                this.listQuery.page_index = current;
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_system__["a" /* getAdministratorRecordList */])(this.listQuery).then(function (response) {
                _this.list = response.data.list;
                _this.listQuery.total = response.data.count;
                _this.listLoading = false;
            });
        }
    }
});

/***/ }),

/***/ 1172:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1084);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("653cf8ca", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1084, function() {
     var newContent = __webpack_require__(1084);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1232:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container"
  }, [_c('el-row', [_c('el-input', {
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "placeholder": "用户名"
    },
    model: {
      value: (_vm.listQuery.content),
      callback: function($$v) {
        _vm.$set(_vm.listQuery, "content", $$v)
      },
      expression: "listQuery.content"
    }
  }), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "content": "搜索",
      "placement": "top"
    }
  }, [_c('el-button', {
    attrs: {
      "icon": "el-icon-search",
      "circle": ""
    },
    on: {
      "click": function($event) {
        _vm.fetchData(1)
      }
    }
  })], 1)], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "30px"
    }
  }), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading.body",
      value: (_vm.listLoading),
      expression: "listLoading",
      modifiers: {
        "body": true
      }
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.list,
      "border": "",
      "fit": "",
      "highlight-current-row": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "操作描述"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_action))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "用户ID"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_id ? scope.row.admin_id._id : "-"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "用户名",
      "width": "150"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_id ? scope.row.admin_id.admin_name : "-"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "真实姓名",
      "width": "100"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_id ? scope.row.admin_id.full_name : "-"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "150px",
      "align": "center",
      "label": "手机号码"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_id ? scope.row.admin_id.admin_mobile : "-"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "70px",
      "align": "center",
      "label": "性别"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_id ? scope.row.admin_id.admin_gender ? "男" : "女" : "-"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "100px",
      "align": "center",
      "label": "单点登陆"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-tag', {
          attrs: {
            "type": _vm._f("statusFilter")((scope.row.admin_id ? scope.row.admin_id.web_sso : '-'))
          }
        }, [_vm._v(_vm._s(scope.row.admin_id ? scope.row.admin_id.web_sso == true ? "是" : "否" : '-'))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "更新时间"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(_vm._f("parseTime")(scope.row.create_time, '{y}-{m}-{d} {h}:{i}')))])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "pagination-container"
  }, [_c('el-pagination', {
    attrs: {
      "background": "",
      "current-page": _vm.listQuery.page_index,
      "page-sizes": [10, 20, 30, 50],
      "page-size": _vm.listQuery.page_size,
      "layout": "total, sizes, prev, pager, next, jumper",
      "total": _vm.listQuery.total
    },
    on: {
      "size-change": _vm.handleSizeChange,
      "current-change": _vm.handleCurrentChange
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-8fb55564", module.exports)
  }
}

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1172)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1131),
  /* template */
  __webpack_require__(1232),
  /* scopeId */
  "data-v-8fb55564",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/system/record/administrator/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8fb55564", Component.options)
  } else {
    hotAPI.reload("data-v-8fb55564", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});