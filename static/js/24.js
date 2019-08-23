webpackJsonp([24],{

/***/ 1090:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".role-checkbox[data-v-d4e3e33c]{margin-left:0;margin-right:15px}.show-pwd[data-v-d4e3e33c]{position:absolute;right:10px;top:0}.avatar-uploader .el-upload[data-v-d4e3e33c]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload[data-v-d4e3e33c]:hover{border-color:#409eff}.avatar-uploader-icon[data-v-d4e3e33c]{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;border:1px solid #ccc}.avatar[data-v-d4e3e33c]{width:178px;height:178px;display:block}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/server/colony.vue"],"names":[],"mappings":"AACA,gCACE,cAAiB,AACjB,iBAAmB,CACpB,AACD,2BACE,kBAAmB,AACnB,WAAY,AACZ,KAAO,CACR,AACD,6CACE,0BAA2B,AAC3B,kBAAmB,AACnB,eAAgB,AAChB,kBAAmB,AACnB,eAAiB,CAClB,AACD,mDACE,oBAAsB,CACvB,AACD,uCACE,eAAgB,AAChB,cAAe,AACf,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,kBAAmB,AACnB,qBAAuB,CACxB,AACD,yBACE,YAAa,AACb,aAAc,AACd,aAAe,CAChB","file":"colony.vue","sourcesContent":["\n.role-checkbox[data-v-d4e3e33c] {\n  margin-left: 0px;\n  margin-right: 15px;\n}\n.show-pwd[data-v-d4e3e33c] {\n  position: absolute;\n  right: 10px;\n  top: 0;\n}\n.avatar-uploader .el-upload[data-v-d4e3e33c] {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader .el-upload[data-v-d4e3e33c]:hover {\n  border-color: #409EFF;\n}\n.avatar-uploader-icon[data-v-d4e3e33c] {\n  font-size: 28px;\n  color: #8c939d;\n  width: 178px;\n  height: 178px;\n  line-height: 178px;\n  text-align: center;\n  border: 1px solid #ccc;\n}\n.avatar[data-v-d4e3e33c] {\n  width: 178px;\n  height: 178px;\n  display: block;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_serverConfig__ = __webpack_require__(1142);
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
    name: 'ServerManage',
    data: function data() {
        return {
            listLoading: true,
            list: null,
            listQuery: {
                page_index: 1,
                page_size: 10,
                total: 0,
                content: null
            },
            textMap: {
                create: '新增配置'
            }
        };
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_serverConfig__["a" /* getAliyColonyServerConfig */])(this.listQuery).then(function (response) {
                _this.list = response.data.rows.map(function (v) {
                    _this.$set(v, 'edit', false);
                    v.receive_platform = v.receive_platform.join(',');
                    v.originalIp = v.ip;
                    v.originalName = v.name;
                    v.originalPosHttpUrl = v.pos_http_url;
                    v.originalHttpPath = v.http_path;
                    v.originalPosMqttUrl = v.pos_mqtt_url;
                    v.posWebUrl = v.pos_web_url;
                    v.receivePlatform = v.receive_platform;
                    v.publishThemePosAdmin = v.publish_theme_pos_admin;
                    v.publishThemeResto = v.publish_theme_resto;
                    return v;
                });
                _this.listQuery.total = response.data.count;
                _this.listLoading = false;
            });
        },
        confirmEdit: function confirmEdit(row) {
            var _this2 = this;

            row.edit = false;
            row.originalIp = row.ip;
            row.originalName = row.name;
            row.originalPosHttpUrl = row.pos_http_url;
            row.originalHttpPath = row.http_path;
            row.originalPosMqttUrl = row.pos_mqtt_url;
            row.posWebUrl = row.pos_web_url;
            row.receivePlatform = row.receive_platform;
            row.publishThemePosAdmin = row.publish_theme_pos_admin;
            row.publishThemeResto = row.publish_theme_resto;

            var param = {
                ip: row.originalIp,
                name: row.originalName,
                pos_http_url: row.originalPosHttpUrl,
                http_path: row.originalHttpPath,
                pos_mqtt_url: row.originalPosMqttUrl,
                pos_web_url: row.posWebUrl,
                receive_platform: row.receivePlatform,
                publish_theme_pos_admin: row.publishThemePosAdmin,
                publish_theme_resto: row.publishThemeResto
            };

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_serverConfig__["b" /* updateAliyColonyServerConfig */])(param).then(function (response) {
                if (response && response.ok) {
                    _this2.$message.success("修改成功");
                } else {
                    if (response) {
                        _this2.$message.error(response.message);
                    }
                    _this2.fetchData();
                }
            });
        },
        cancelEdit: function cancelEdit(row) {
            row.edit = false;
            row.ip = row.originalIp;
            row.name = row.originalName;
            row.pos_http_url = row.originalPosHttpUrl;
            row.http_path = row.originalHttpPath;
            row.pos_mqtt_url = row.originalPosMqttUrl;
            row.pos_web_url = row.posWebUrl;
            row.receive_platform = row.receivePlatform;
            row.publish_theme_pos_admin = row.publishThemePosAdmin;
            row.publish_theme_resto = row.publishThemeResto;
            this.$message.warning('The content has been restored to the original value');
        },

        //添加数据
        addData: function addData() {
            var j = {
                edit: false,
                ip: '',
                name: '',
                pos_http_url: '',
                http_path: '/v1',
                pos_mqtt_url: ''
            };
            this.list.push(j);
            j.edit = true;
        },

        //删除数据
        deleteAliyColonyServerConfigById: function deleteAliyColonyServerConfigById(index, row) {
            var _this3 = this;

            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                var param = {
                    id: row._id
                };
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__api_serverConfig__["c" /* deleteAliyColonyServerConfigById */])(param).then(function (response) {
                    _this3.fetchData();
                    _this3.$message.success("删除成功");
                });
            }).catch(function () {
                _this3.$message.info('\u5DF2\u53D6\u6D88\u5220\u9664!');
            });
        }
    }
});

/***/ }),

/***/ 1142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAliyColonyServerConfig;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateAliyColonyServerConfig;
/* harmony export (immutable) */ __webpack_exports__["c"] = deleteAliyColonyServerConfigById;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_request__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_index__ = __webpack_require__(81);
/**
 * @author wxh on 2019/3/27
 * @copyright
 * @desc
 */




//阿里云集群服务器信息获取
function getAliyColonyServerConfig(params) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_request__["a" /* default */])({ url: __WEBPACK_IMPORTED_MODULE_1__config_index__["a" /* URL */] + '/aliy/colony/server/config', method: 'get', params: params });
}

//阿里云集群服务器信息创建
function updateAliyColonyServerConfig(data) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_request__["a" /* default */])({ url: __WEBPACK_IMPORTED_MODULE_1__config_index__["a" /* URL */] + '/aliy/colony/server/config', method: 'post', data: data });
}

//阿里云集群服务器信息删除
function deleteAliyColonyServerConfigById(data) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_request__["a" /* default */])({ url: __WEBPACK_IMPORTED_MODULE_1__config_index__["a" /* URL */] + '/aliy/colony/server/config', method: 'delete', data: data });
}

/***/ }),

/***/ 1178:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1090);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("e255a27e", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1090, function() {
     var newContent = __webpack_require__(1090);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1238:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container"
  }, [_c('el-row', [_c('el-button', {
    directives: [{
      name: "perm",
      rawName: "v-perm",
      value: ('b:server:add'),
      expression: "'b:server:add'"
    }],
    attrs: {
      "type": "primary",
      "icon": "el-icon-plus",
      "size": "mini"
    },
    on: {
      "click": _vm.addData
    }
  }, [_vm._v("\n            " + _vm._s(_vm.textMap.create) + "\n        ")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "15px"
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
      "label": "服务器ip",
      "width": "120rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.ip),
            callback: function($$v) {
              _vm.$set(scope.row, "ip", $$v)
            },
            expression: "scope.row.ip"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.ip))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "服务器名称",
      "width": "110rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.name),
            callback: function($$v) {
              _vm.$set(scope.row, "name", $$v)
            },
            expression: "scope.row.name"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.name))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "服务器http",
      "width": "200rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.pos_http_url),
            callback: function($$v) {
              _vm.$set(scope.row, "pos_http_url", $$v)
            },
            expression: "scope.row.pos_http_url"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.pos_http_url))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "http_path",
      "width": "90rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.http_path),
            callback: function($$v) {
              _vm.$set(scope.row, "http_path", $$v)
            },
            expression: "scope.row.http_path"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.http_path))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "服务器mqtt",
      "width": "260rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.pos_mqtt_url),
            callback: function($$v) {
              _vm.$set(scope.row, "pos_mqtt_url", $$v)
            },
            expression: "scope.row.pos_mqtt_url"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.pos_mqtt_url))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "pos_web_url",
      "width": "300rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.pos_web_url),
            callback: function($$v) {
              _vm.$set(scope.row, "pos_web_url", $$v)
            },
            expression: "scope.row.pos_web_url"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.pos_web_url))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "winpos_receive_platform",
      "width": "200rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.receive_platform),
            callback: function($$v) {
              _vm.$set(scope.row, "receive_platform", $$v)
            },
            expression: "scope.row.receive_platform"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.receive_platform))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "publish_theme_pos_admin",
      "width": "200rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.publish_theme_pos_admin),
            callback: function($$v) {
              _vm.$set(scope.row, "publish_theme_pos_admin", $$v)
            },
            expression: "scope.row.publish_theme_pos_admin"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.publish_theme_pos_admin))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "publish_theme_resto",
      "width": "200rem"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "mini"
          },
          model: {
            value: (scope.row.publish_theme_resto),
            callback: function($$v) {
              _vm.$set(scope.row, "publish_theme_resto", $$v)
            },
            expression: "scope.row.publish_theme_resto"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.publish_theme_resto))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "fixed": "right",
      "width": "220"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? _c('el-button', {
          attrs: {
            "type": "success",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.confirmEdit(scope.row, 'tb_order_payment_item')
            }
          }
        }, [_vm._v("✔")]) : _vm._e(), _vm._v(" "), (scope.row.edit) ? _c('el-button', {
          attrs: {
            "size": "mini",
            "type": "warning"
          },
          on: {
            "click": function($event) {
              _vm.cancelEdit(scope.row, 'tb_order_payment_item')
            }
          }
        }, [_vm._v("✘")]) : _c('el-button', {
          attrs: {
            "type": "primary",
            "size": "mini",
            "icon": "el-icon-edit"
          },
          on: {
            "click": function($event) {
              scope.row.edit = !scope.row.edit
            }
          }
        }, [_vm._v("编辑")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "size": "medium",
            "type": 'danger',
            "icon": "el-icon-delete",
            "circle": "",
            "plain": ""
          },
          on: {
            "click": function($event) {
              _vm.deleteAliyColonyServerConfigById(scope.$index, scope.row)
            }
          }
        })]
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
     __webpack_require__(2).rerender("data-v-d4e3e33c", module.exports)
  }
}

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1178)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1126),
  /* template */
  __webpack_require__(1238),
  /* scopeId */
  "data-v-d4e3e33c",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/server/colony.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] colony.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d4e3e33c", Component.options)
  } else {
    hotAPI.reload("data-v-d4e3e33c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});