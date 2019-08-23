webpackJsonp([19],{

/***/ 1060:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_system__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_constants__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_debounce__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_debounce__);

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
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'RoleManage',
    data: function data() {
        return {
            listLoading: true,
            list: [],
            listQuery: {
                page_index: 1,
                page_size: 10,
                total: 0,
                content: null
            },

            dialogFormVisible: false,
            dialogStatus: '',
            temp: {
                idx: null, //表格的下标
                _id: null,
                rname: null,
                rdesc: null,
                rval: null
            },
            textMap: {
                update: '编辑角色',
                create: '新增角色'
            },
            rules: {
                rname: [{ required: true, message: '必填', trigger: 'blur' }],
                rval: [{ required: true, message: '必填', trigger: 'blur' }, { pattern: /^[a-z]{3,20}$/, message: '只能输入3-20个小写字母', trigger: 'blur' }]
            }
        };
    },
    created: function created() {
        this.fetchData();
    },


    watch: {
        //延时查询
        'listQuery.content': __WEBPACK_IMPORTED_MODULE_4_lodash_debounce___default()(function () {
            this.fetchData(1);
        }, 500)
    }, //watch

    methods: {
        parseTime: __WEBPACK_IMPORTED_MODULE_2__utils__["c" /* parseTime */],
        hasAdminRole: function hasAdminRole(row) {
            return row && row.rval == __WEBPACK_IMPORTED_MODULE_3__utils_constants__["c" /* root */].rval;
        },

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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_system__["m" /* getRoleList */])(this.listQuery).then(function (response) {
                _this.list = response.data.list;
                _this.listQuery.total = response.data.count;
                _this.listLoading = false;
            });
        },


        //更新
        handleUpdate: function handleUpdate(idx, row) {
            var _this2 = this;

            this.temp = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, row);
            this.temp.idx = idx;
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.$nextTick(function () {
                return _this2.$refs['dataForm'].clearValidate();
            });
        },
        updateData: function updateData() {
            var _this3 = this;

            this.$refs['dataForm'].validate(function (valid) {
                if (!valid) return;
                var tempData = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, _this3.temp);
                tempData.rid = tempData._id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_system__["n" /* updateRole */])(tempData).then(function (res) {
                    if (res) {
                        if (!res.ok) return _this3.$message.error(res.message);
                        _this3.list.splice(tempData.idx, 1, tempData);
                        _this3.dialogFormVisible = false;
                        _this3.$message.success('更新角色信息成功');
                    }
                });
            });
        },


        //更新用户的角色
        handleUpdateRolePerms: function handleUpdateRolePerms(idx, row) {
            this.$router.push({ path: '/system/role_manage/' + row._id + '/assign_perm' });
        },


        //删除
        handleDelete: function handleDelete(idx, row) {
            var _this4 = this;

            this.$confirm('您确定要永久删除该用户？', '提示', __WEBPACK_IMPORTED_MODULE_3__utils_constants__["b" /* confirm */]).then(function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_system__["o" /* deleteRole */])({ rid: row._id }).then(function (res) {
                    if (res) {
                        if (!res.ok) return _this4.$message.error(res.message);
                        _this4.list.splice(idx, 1);
                        --_this4.list.total;
                        _this4.dialogFormVisible = false;
                        _this4.$message.success('删除角色成功');
                    }
                });
            }).catch(function () {
                _this4.$message.info('已取消删除');
            });
        },


        //新增
        handleCreate: function handleCreate() {
            var _this5 = this;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* resetTemp */])(this.temp);
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
            this.$nextTick(function () {
                return _this5.$refs['dataForm'].clearValidate();
            });
        },
        createData: function createData() {
            var _this6 = this;

            this.$refs['dataForm'].validate(function (valid) {
                if (!valid) return;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_system__["p" /* addRole */])(_this6.temp).then(function (res) {
                    if (res) {
                        if (!res.ok) return _this6.$message.error(res.message);
                        _this6.temp._id = res.role_id;
                        _this6.list.unshift(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, _this6.temp));
                        ++_this6.list.total;
                        _this6.dialogFormVisible = false;
                        _this6.$message.success('添加角色成功');
                    }
                });
            });
        }
    }
});

/***/ }),

/***/ 1148:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1060);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("747c6d98", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1060, function() {
     var newContent = __webpack_require__(1060);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1203:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container"
  }, [_c('el-row', [_c('el-input', {
    staticStyle: {
      "width": "230px"
    },
    attrs: {
      "placeholder": "角色名\\角色值"
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
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "30px"
    }
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "el-icon-plus",
      "size": "mini"
    },
    on: {
      "click": _vm.handleCreate
    }
  }, [_vm._v(_vm._s(_vm.textMap.create))]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "30px"
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
      "element-loading-text": "Loading",
      "border": "",
      "fit": "",
      "highlight-current-row": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "_id",
      "label": "角色id"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "rname",
      "label": "角色名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "rdesc",
      "label": "角色描述"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "rval",
      "label": "角色值"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "fixed": "right",
      "width": "160px"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-tooltip', {
          attrs: {
            "content": "编辑",
            "placement": "top"
          }
        }, [_c('el-button', {
          attrs: {
            "size": "medium",
            "type": "info",
            "icon": "el-icon-edit",
            "circle": "",
            "plain": ""
          },
          on: {
            "click": function($event) {
              _vm.handleUpdate(scope.$index, scope.row)
            }
          }
        })], 1), _vm._v(" "), (!_vm.hasAdminRole(scope.row)) ? _c('el-tooltip', {
          attrs: {
            "content": "修改权限",
            "placement": "top"
          }
        }, [_c('el-button', {
          attrs: {
            "size": "medium",
            "type": "warning",
            "icon": "el-icon-view",
            "circle": "",
            "plain": ""
          },
          on: {
            "click": function($event) {
              _vm.handleUpdateRolePerms(scope.$index, scope.row)
            }
          }
        })], 1) : _vm._e(), _vm._v(" "), (!_vm.hasAdminRole(scope.row)) ? _c('el-tooltip', {
          attrs: {
            "content": "删除",
            "placement": "top"
          }
        }, [_c('el-button', {
          attrs: {
            "size": "medium",
            "type": "danger",
            "icon": "el-icon-delete",
            "circle": "",
            "plain": ""
          },
          on: {
            "click": function($event) {
              _vm.handleDelete(scope.$index, scope.row)
            }
          }
        })], 1) : _c('el-popover', {
          staticStyle: {
            "display": "inline-block"
          },
          attrs: {
            "trigger": "hover",
            "placement": "top"
          }
        }, [_c('el-alert', {
          attrs: {
            "type": "warning",
            "closable": false,
            "title": "权限说明"
          }
        }, [_c('div', [_vm._v("为保证管理员在系统中的最高权限")]), _vm._v(" "), _c('div', [_vm._v("不允许编辑管理员自身的权限")]), _vm._v(" "), _c('div', [_vm._v("不允许删除管理员角色")])]), _vm._v(" "), _c('div', {
          attrs: {
            "slot": "reference"
          },
          slot: "reference"
        }, [_c('el-tag', {
          staticStyle: {
            "margin-left": "10px"
          },
          attrs: {
            "type": "info"
          }
        }, [_vm._v("权限说明")])], 1)], 1)]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "30px"
    }
  }), _vm._v(" "), _c('div', {
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
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": _vm.textMap[_vm.dialogStatus],
      "visible": _vm.dialogFormVisible,
      "width": "30%"
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogFormVisible = $event
      }
    }
  }, [_c('el-form', {
    ref: "dataForm",
    attrs: {
      "rules": _vm.rules,
      "model": _vm.temp,
      "label-position": "left",
      "label-width": "150px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "角色名",
      "prop": "rname"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.temp.rname),
      callback: function($$v) {
        _vm.$set(_vm.temp, "rname", $$v)
      },
      expression: "temp.rname"
    }
  })], 1), _vm._v(" "), (_vm.dialogStatus == 'create') ? _c('el-form-item', {
    attrs: {
      "label": "角色值",
      "prop": "rval"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.temp.rval),
      callback: function($$v) {
        _vm.$set(_vm.temp, "rval", $$v)
      },
      expression: "temp.rval"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "角色描述",
      "prop": "rdesc"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea",
      "autosize": {
        minRows: 2,
        maxRows: 4
      },
      "placeholder": "请输入"
    },
    model: {
      value: (_vm.temp.rdesc),
      callback: function($$v) {
        _vm.$set(_vm.temp, "rdesc", $$v)
      },
      expression: "temp.rdesc"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialogFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.dialogStatus == 'create') ? _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.createData
    }
  }, [_vm._v("创建")]) : _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.updateData
    }
  }, [_vm._v("确定")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-0d341775", module.exports)
  }
}

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1148)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1136),
  /* template */
  __webpack_require__(1203),
  /* scopeId */
  "data-v-0d341775",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/system/role/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d341775", Component.options)
  } else {
    hotAPI.reload("data-v-0d341775", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(453);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(464);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 454:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(454),
    now = __webpack_require__(469),
    toNumber = __webpack_require__(470);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(452),
    getRawTag = __webpack_require__(465),
    objectToString = __webpack_require__(466);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(452);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 466:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 467:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(463),
    isObjectLike = __webpack_require__(467);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(453);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(454),
    isSymbol = __webpack_require__(468);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pageParamNames */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return permType; });
/* unused harmony export permTypeOptions */
/* unused harmony export permTypeMap */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return confirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return root; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);

/** 分页查询时，后台返回的数据中分页参数的命名，返回示例：
 *
 * {
 *
 * "msg":"ok",
 * "code":1,
 * "succ":true,
 * "oper":"default",
 * "page":{
 *          "current":1,
 *          "pages":2,
 *          "records":[],
 *          "size":3,
 *          "total":5
 *        }
 * }
 * */
var pageParamNames = ["current", "pages", "size", "total"];

var permType = {
  MENU: 1,
  BUTTON: 2,
  API: 3

  /**
   * 下拉选择框数据：权限类型
   *
   */
};var permTypeOptions = [{ value: permType.MENU, label: '菜单' }, { value: permType.BUTTON, label: '按钮' }, { value: permType.API, label: '接口' }];

/**
 * 权限类型
 * @type {Map<any, any>}
 */
var permTypeMap = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a([[permType.MENU, '菜单'], [permType.BUTTON, '按钮'], [permType.API, '测试']]);

var confirm = { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' };

var root = {
  rval: 'root',
  pval: '*'
};

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(752), __esModule: true };

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(23);
__webpack_require__(29);
__webpack_require__(753);
__webpack_require__(756);
__webpack_require__(755);
__webpack_require__(754);
module.exports = __webpack_require__(6).Map;


/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(127);
var validate = __webpack_require__(83);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(129)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(130)('Map');


/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(131)('Map');


/***/ }),

/***/ 756:
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(10);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(128)('Map') });


/***/ })

});