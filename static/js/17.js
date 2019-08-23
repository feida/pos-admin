webpackJsonp([17],{

/***/ 1056:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_constants__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(45);


 //路由表，定义了菜单和按钮的元数据，可以用来生成权限控制的菜单按钮树

/* harmony default export */ __webpack_exports__["a"] = ({
    /**
     * 根据前端定义的路由表，生成菜单权限列表
     */
    generateMenuPermissionTree: function generateMenuPermissionTree() {
        //预处理
        var routeArr = __WEBPACK_IMPORTED_MODULE_2__router__["b" /* asyncRouterMap */].map(function (route) {
            var temp = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, route); // copy obj
            if (!temp.alwaysShow && temp.children && temp.children.length == 1) {
                //如果是只有一个子菜单的顶级菜单，把子级的菜单meta复制到父级用于生成菜单树时显示菜单名称
                temp.meta = temp.children[0].meta;
                temp.children = [];
            }
            return temp;
        });

        //过滤路由表，得到需要进行权限控制的菜单树
        var permissionControlRoutes = this.filterPermControlRouter(routeArr);

        //递归形成菜单树
        return this.mapToMenuPermissionTree(permissionControlRoutes, null);
    },


    /**
     * 根据输入的路由表过滤出一个需要进行权限控制的路由表
     * @param routeArr
     */
    filterPermControlRouter: function filterPermControlRouter(routeArr) {
        var _this = this;

        var routes = routeArr.filter(function (route) {
            if (route.meta && route.meta.perm) {
                if (route.children && route.children.length) {
                    route.children = _this.filterPermControlRouter(route.children);
                }
                return true;
            }
            return false;
        });
        return routes;
    },


    /**
     * 根据输入的路由表，生成菜单权限树
     * @param routeArr 路由表
     * @param parentPermVal 初始的父级权限值
     */
    mapToMenuPermissionTree: function mapToMenuPermissionTree(routeArr, parentPermVal) {
        var _this2 = this;

        return routeArr.map(function (route) {
            var obj = {};
            if (route.meta && route.meta.perm) {
                obj.pval = route.meta.perm;
                obj.pname = route.meta.title;
                obj.ptype = __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* permType */].MENU;
                obj.parent = parentPermVal;
            }
            if (route.children) {
                obj.children = _this2.mapToMenuPermissionTree(route.children, obj.pval);
            }
            return obj;
        });
    },


    /**
     * 根据菜单树，生成按钮权限树
     * @param btnPermMap 按钮权限，按parent分组
     * @param menuPermissionTree 菜单树
     */
    mapToButtonPermissionTree: function mapToButtonPermissionTree(btnPermMap, menuPermissionTree) {
        var _this3 = this;

        return menuPermissionTree.map(function (perm) {

            if (perm) {
                if (!perm.children) {
                    perm.children = [];
                }
                if (perm.ptype == __WEBPACK_IMPORTED_MODULE_1__utils_constants__["a" /* permType */].MENU) {
                    var btnPerms = btnPermMap[perm.pval];
                    if (btnPerms) {
                        btnPerms.forEach(function (p) {
                            perm.children.push(p);
                        });
                    }
                }
                if (perm.children && perm.children.length > 0) {
                    _this3.mapToButtonPermissionTree(btnPermMap, perm.children);
                }
            }
            return perm;
        });
    }
});

/***/ }),

/***/ 1093:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".text[data-v-f82588ba]{font-size:14px}.item[data-v-f82588ba]{margin-bottom:18px}.clearfix[data-v-f82588ba]:after,.clearfix[data-v-f82588ba]:before{display:table;content:\"\"}.clearfix[data-v-f82588ba]:after{clear:both}.box-card[data-v-f82588ba]{width:100%}.custom-tree-node[data-v-f82588ba]{flex:1;display:flex;align-items:center;justify-content:space-between;font-size:14px;padding-right:8px}.card-title[data-v-f82588ba]{line-height:50px;height:50px}.tips-text[data-v-f82588ba]{font-size:14px;color:#909399}.title-box[data-v-f82588ba]{display:flex;justify-content:space-between;align-items:center}.title-box span[data-v-f82588ba]{font-size:22px}.update-btn[data-v-f82588ba]{margin-left:20px}.delete-btn[data-v-f82588ba]{margin-left:20px;color:#f56c6c}.mgl-10[data-v-f82588ba]{margin-left:10px}.mgb-15[data-v-f82588ba]{margin-bottom:15px}.page-title[data-v-f82588ba]{font-size:22px;font-weight:700;color:#303133}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/system/role/assign_perm.vue"],"names":[],"mappings":"AACA,uBACE,cAAgB,CACjB,AACD,uBACE,kBAAoB,CACrB,AACD,mEAEE,cAAe,AACf,UAAY,CACb,AACD,iCACE,UAAY,CACb,AACD,2BACE,UAAY,CACb,AACD,mCACE,OAAQ,AACR,aAAc,AACd,mBAAoB,AACpB,8BAA+B,AAC/B,eAAgB,AAChB,iBAAmB,CACpB,AACD,6BACE,iBAAkB,AAClB,WAAa,CACd,AACD,4BACE,eAAgB,AAChB,aAAe,CAChB,AACD,4BACE,aAAc,AACd,8BAA+B,AAC/B,kBAAoB,CACrB,AACD,iCACI,cAAgB,CACnB,AACD,6BACE,gBAAkB,CACnB,AACD,6BACE,iBAAkB,AAClB,aAAe,CAChB,AACD,yBACE,gBAAkB,CACnB,AACD,yBACE,kBAAoB,CACrB,AACD,6BACE,eAAgB,AAChB,gBAAkB,AAClB,aAAe,CAChB","file":"assign_perm.vue","sourcesContent":["\n.text[data-v-f82588ba] {\n  font-size: 14px;\n}\n.item[data-v-f82588ba] {\n  margin-bottom: 18px;\n}\n.clearfix[data-v-f82588ba]:before,\n.clearfix[data-v-f82588ba]:after {\n  display: table;\n  content: \"\";\n}\n.clearfix[data-v-f82588ba]:after {\n  clear: both;\n}\n.box-card[data-v-f82588ba] {\n  width: 100%;\n}\n.custom-tree-node[data-v-f82588ba] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 14px;\n  padding-right: 8px;\n}\n.card-title[data-v-f82588ba] {\n  line-height: 50px;\n  height: 50px;\n}\n.tips-text[data-v-f82588ba] {\n  font-size: 14px;\n  color: #909399;\n}\n.title-box[data-v-f82588ba] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.title-box span[data-v-f82588ba] {\n    font-size: 22px;\n}\n.update-btn[data-v-f82588ba] {\n  margin-left: 20px;\n}\n.delete-btn[data-v-f82588ba] {\n  margin-left: 20px;\n  color: #F56C6C;\n}\n.mgl-10[data-v-f82588ba] {\n  margin-left: 10px;\n}\n.mgb-15[data-v-f82588ba] {\n  margin-bottom: 15px;\n}\n.page-title[data-v-f82588ba] {\n  font-size: 22px;\n  font-weight: bold;\n  color: #303133;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree__ = __webpack_require__(1056);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_system__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_constants__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_debounce__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash_debounce__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






 //路由表，定义了菜单和按钮的元数据，可以用来生成权限控制的菜单按钮树


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'AssignPerm',
    data: function data() {
        return {
            permType: __WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* permType */],

            //当前授权的角色
            roleId: null,
            role: {},

            //节点过滤
            filterPlaceholderText: '输入权限名称、权限值过滤',
            filterMenuPermText: '',
            filterButtonPermText: '',
            filterApiPermText: '',

            roleMenuPermUpdateSum: 0,
            roleApiPermUpdateSum: 0,

            //角色的权限值
            roleMenuPvals: [],
            roleApiPvals: [],
            roleBtnPvals: [],

            menuPermissionTree: [], //菜单权限树
            buttonPermissionTree: [], //按钮权限树
            apiPermissionTree: [], //接口权限树
            //挂载到按钮权限树的按钮权限数据。由于按钮权限在菜单权限下，key是菜单权限值，value是按钮权限
            btnPermMap: {},

            treeProps: {
                label: 'pname',
                children: 'children'
            }
        };
    },


    computed: {
        btnCheckboxMap: function btnCheckboxMap() {
            var map = {};
            this.roleBtnPvals.forEach(function (pval) {
                map[pval] = true;
            });
            return map;
        }
    },

    watch: {
        'filterMenuPermText': __WEBPACK_IMPORTED_MODULE_6_lodash_debounce___default()(function (val) {
            this.$refs.menuPermTreeRef.filter(val);
        }, 600),
        'filterButtonPermText': __WEBPACK_IMPORTED_MODULE_6_lodash_debounce___default()(function (val) {
            this.$refs.buttonPermTreeRef.filter(val);
        }, 600),
        'filterApiPermText': __WEBPACK_IMPORTED_MODULE_6_lodash_debounce___default()(function (val) {
            this.$refs.apiPermTreeRef.filter(val);
        }, 600)
    },

    created: function created() {
        this.initData();
    },


    methods: {

        //获取后台权限数据
        initData: function initData() {
            //获取路由中的角色id
            this.roleId = this.$route.params.roleId;
            //显示菜单权限树
            this.menuPermissionTree = __WEBPACK_IMPORTED_MODULE_1__tree__["a" /* default */].generateMenuPermissionTree();
            //显示按钮权限树
            var menuPermissionTreeCopy = __WEBPACK_IMPORTED_MODULE_1__tree__["a" /* default */].generateMenuPermissionTree();
            this.generateButtonPermissionTree(menuPermissionTreeCopy);
            //显示接口权限树
            this.loadApiButtonPermissionTree();
            //加载角色的权限
            this.loadRolePerms();
        },


        /**
         * 加载角色的权限并回显
         */
        loadRolePerms: function loadRolePerms() {
            var _this = this;

            if (!this.roleId) {
                this.$message.error('无法显示角色的权限信息：找不到角色id');
                return;
            }

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_system__["g" /* getPermsListByRoleId */])({ role_id: this.roleId }).then(function (res) {
                console.log('res-----', res);

                if (res.data.menuPvals.length > 0) {
                    _this.roleMenuPvals = res.data.menuPvals;
                    var arr = res.data.newMenu;
                    var temp = [];
                    arr.map(function (v, i) {
                        if (v.leaf) {
                            temp.push(v.pval);
                        }
                    });
                    _this.$refs.menuPermTreeRef.setCheckedKeys(temp);
                }
                if (res.data.apiPvals.length > 0) {
                    _this.roleApiPvals = res.data.apiPvals;

                    _this.$refs.apiPermTreeRef.setCheckedKeys(res.data.apiPvals);
                }
                //用于回显角色的按钮权限
                _this.roleBtnPvals = res.data.btnPvals;
                // 显示当前编辑的角色
                _this.role = res.data.role;
            });
        },


        /**
         * 过滤节点
         */
        filterNode: function filterNode(value, data) {
            if (!value) return true;
            return data.pname.indexOf(value) !== -1 || data.pval.indexOf(value) !== -1;
        },


        /////////////////////////// 接口权限树

        /**
         * 从服务器端加载接口权限树
         */
        loadApiButtonPermissionTree: function loadApiButtonPermissionTree() {
            var _this2 = this;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_system__["h" /* getPermList */])().then(function (res) {
                _this2.apiPermissionTree = res.data.apiPermissionTree;
            });
        },


        /////////////////////////// 按钮权限树

        /**
         * 递归生成按钮权限树
         */
        generateButtonPermissionTree: function generateButtonPermissionTree(menuPermissionTreeCopy) {
            var _this3 = this;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_system__["i" /* listBtnPermGroupByParent */])().then(function (res) {
                _this3.btnPermMap = res.data.btnPermMap || {};
                _this3.buttonPermissionTree = __WEBPACK_IMPORTED_MODULE_1__tree__["a" /* default */].mapToButtonPermissionTree(_this3.btnPermMap, menuPermissionTreeCopy);
            });
        },


        /**
         * 更新角色的按钮权限
         * @param checked
         */
        handleUpdateBtnPermForRole: function handleUpdateBtnPermForRole(checked, pval) {
            var _this4 = this;

            var data = {
                role_id: this.roleId,
                pval: pval,
                ptype: __WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* permType */].BUTTON
            };

            if (checked) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_system__["j" /* addRolePerm */])(data).then(function () {
                    _this4.roleBtnPvals.unshift(pval);
                    _this4.$message.success('添加按钮权限成功');
                });
            } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_system__["k" /* deleteRolePerm */])(data).then(function () {
                    var index = _this4.roleBtnPvals.findIndex(function (btnPval) {
                        return btnPval == pval;
                    });
                    _this4.roleBtnPvals.splice(index, 1);
                    _this4.$message.success('删除按钮权限成功');
                });
            }
        },


        /**
         * 更新角色的菜单权限
         */
        handleUpdateMenuPermForRole: __WEBPACK_IMPORTED_MODULE_6_lodash_debounce___default()(function () {
            var _this5 = this;

            this.roleMenuPermUpdateSum++;
            //因为初始化勾选角色的权限会触发一次，但这次的权限数据跟后台是一样的，所以不需要触发更新角色的权限
            if (this.roleMenuPvals.length > 0 && this.roleMenuPermUpdateSum == 1) return;
            var checkedNodes = this.$refs.menuPermTreeRef.getCheckedNodes();
            var halfCheckedNodes = this.$refs.menuPermTreeRef.getHalfCheckedNodes();
            var pvals = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(checkedNodes), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(halfCheckedNodes)).map(function (perm) {
                return perm.pval;
            });
            //发送请求更新角色的权限
            var data = {
                role_id: this.roleId,
                ptype: __WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* permType */].MENU,
                pvals: pvals
            };
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_system__["l" /* updateRolePermsByRoleId */])(data).then(function (res) {
                if (res) {
                    _this5.$message.success('更新菜单权限成功');
                }
            });
        }, 500),

        /**
         * 更新角色的接口权限
         */
        handleUpdateApiPermForRole: __WEBPACK_IMPORTED_MODULE_6_lodash_debounce___default()(function () {
            this.roleApiPermUpdateSum++;
            //因为初始化勾选角色的权限会触发一次，但这次的权限数据跟后台是一样的，所以不需要触发更新角色的权限
            if (this.roleApiPvals.length > 0 && this.roleApiPermUpdateSum == 1) return;
            var checkedNodes = this.$refs.apiPermTreeRef.getCheckedNodes();
            var halfCheckedNodes = this.$refs.apiPermTreeRef.getHalfCheckedNodes();
            var pvals = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(checkedNodes), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(halfCheckedNodes)).map(function (perm) {
                return perm.pval;
            });
            //发送请求更新角色的权限
            var data = {
                rid: this.roleId,
                ptype: __WEBPACK_IMPORTED_MODULE_4__utils_constants__["a" /* permType */].API,
                pvals: pvals
            };
            console.log(data);

            // roleApi.updateRolePerms(data).then(res => {
            //     this.$message.success('更新接口权限成功')
            // })
        }, 500)

    }
});

/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1093);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("07497bfe", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1093, function() {
     var newContent = __webpack_require__(1093);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1242:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container"
  }, [_c('el-row', [_c('span', {
    staticClass: "page-title"
  }, [_vm._v("编辑角色的权限："), _c('el-tag', {
    attrs: {
      "type": "info"
    }
  }, [_vm._v(_vm._s(_vm.role.rname))])], 1), _vm._v(" "), _c('router-link', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "to": "/system/role_manage"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "text",
      "icon": "el-icon-back"
    }
  }, [_vm._v("返回角色管理页面")])], 1)], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "30px"
    }
  }), _vm._v(" "), _c('el-row', {
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "title-box",
    staticStyle: {
      "padding-top": "10px",
      "padding-bottom": "13px"
    }
  }, [_c('span', [_c('el-tag', {
    attrs: {
      "type": "success"
    }
  }, [_vm._v("菜单")]), _vm._v(" 权限元数据")], 1)]), _vm._v(" "), _c('span', {
    staticClass: "tips-text"
  }, [_vm._v("提示：勾选权限即可为角色授权")])]), _vm._v(" "), _c('el-input', {
    staticClass: "mgb-15",
    attrs: {
      "placeholder": _vm.filterPlaceholderText
    },
    model: {
      value: (_vm.filterMenuPermText),
      callback: function($$v) {
        _vm.filterMenuPermText = $$v
      },
      expression: "filterMenuPermText"
    }
  }), _vm._v(" "), _c('el-tree', {
    ref: "menuPermTreeRef",
    attrs: {
      "show-checkbox": "",
      "filter-node-method": _vm.filterNode,
      "data": _vm.menuPermissionTree,
      "props": _vm.treeProps,
      "node-key": "pval",
      "default-expand-all": "",
      "expand-on-click-node": false
    },
    on: {
      "check-change": _vm.handleUpdateMenuPermForRole
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(ref) {
        var node = ref.node;
        var data = ref.data;

        return _c('span', {
          staticClass: "custom-tree-node"
        }, [_c('span', [_c('span', {
          staticClass: "mgl-10"
        }, [_vm._v(_vm._s(data.pname))]), _vm._v(" "), _c('span', {
          staticClass: "mgl-10 tips-text"
        }, [_vm._v(_vm._s(data.pval))]), _vm._v(" "), _c('el-tag', {
          staticClass: "mgl-10",
          attrs: {
            "type": "success",
            "size": "mini"
          }
        }, [_vm._v("菜单")])], 1)])
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "title-box",
    staticStyle: {
      "padding-top": "10px",
      "padding-bottom": "13px"
    }
  }, [_c('span', [_c('el-tag', {
    attrs: {
      "type": "warning"
    }
  }, [_vm._v("按钮")]), _vm._v(" 权限元数据")], 1)]), _vm._v(" "), _c('span', {
    staticClass: "tips-text"
  }, [_vm._v("提示：勾选权限即可为角色授权")])]), _vm._v(" "), _c('el-input', {
    staticClass: "mgb-15",
    attrs: {
      "placeholder": _vm.filterPlaceholderText
    },
    model: {
      value: (_vm.filterButtonPermText),
      callback: function($$v) {
        _vm.filterButtonPermText = $$v
      },
      expression: "filterButtonPermText"
    }
  }), _vm._v(" "), _c('el-tree', {
    ref: "buttonPermTreeRef",
    attrs: {
      "filter-node-method": _vm.filterNode,
      "data": _vm.buttonPermissionTree,
      "props": _vm.treeProps,
      "node-key": "pid",
      "default-expand-all": "",
      "expand-on-click-node": false
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(ref) {
        var node = ref.node;
        var data = ref.data;

        return _c('span', {
          staticClass: "custom-tree-node"
        }, [_c('span', [(data.ptype == _vm.permType.BUTTON) ? _c('el-checkbox', {
          on: {
            "change": function (checked) {
              _vm.handleUpdateBtnPermForRole(checked, data.pval)
            }
          },
          model: {
            value: (_vm.btnCheckboxMap[data.pval]),
            callback: function($$v) {
              _vm.$set(_vm.btnCheckboxMap, data.pval, $$v)
            },
            expression: "btnCheckboxMap[data.pval]"
          }
        }) : _vm._e(), _vm._v(" "), _c('span', {
          staticClass: "mgl-10"
        }, [_vm._v(_vm._s(data.pname))]), _vm._v(" "), _c('span', {
          staticClass: "mgl-10 tips-text"
        }, [_vm._v(_vm._s(data.pval))]), _vm._v(" "), (data.ptype == _vm.permType.MENU) ? _c('el-tag', {
          staticClass: "mgl-10",
          attrs: {
            "type": "success",
            "size": "mini"
          }
        }, [_vm._v("菜单")]) : (data.ptype == _vm.permType.BUTTON) ? _c('el-tag', {
          staticClass: "mgl-10",
          attrs: {
            "type": "warning",
            "size": "mini"
          }
        }, [_vm._v("按钮")]) : _vm._e()], 1)])
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 8
    }
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', {
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('div', {
    staticClass: "title-box",
    staticStyle: {
      "padding-top": "10px",
      "padding-bottom": "13px"
    }
  }, [_c('span', [_c('el-tag', [_vm._v("品牌")]), _vm._v(" 品牌数据")], 1)]), _vm._v(" "), _c('span', {
    staticClass: "tips-text"
  }, [_vm._v("提示：勾选权限即可为角色授权")])]), _vm._v(" "), _c('el-input', {
    staticClass: "mgb-15",
    attrs: {
      "placeholder": _vm.filterPlaceholderText
    },
    model: {
      value: (_vm.filterApiPermText),
      callback: function($$v) {
        _vm.filterApiPermText = $$v
      },
      expression: "filterApiPermText"
    }
  }), _vm._v(" "), _c('el-tree', {
    ref: "apiPermTreeRef",
    attrs: {
      "show-checkbox": "",
      "filter-node-method": _vm.filterNode,
      "data": _vm.apiPermissionTree,
      "props": _vm.treeProps,
      "node-key": "pval",
      "default-expand-all": "",
      "expand-on-click-node": false
    },
    on: {
      "check-change": _vm.handleUpdateApiPermForRole
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(ref) {
        var node = ref.node;
        var data = ref.data;

        return _c('span', {
          staticClass: "custom-tree-node"
        }, [_c('span', [_c('span', {
          staticClass: "mgl-10"
        }, [_vm._v(_vm._s(data.pname))]), _vm._v(" "), _c('span', {
          staticClass: "mgl-10 tips-text"
        }, [_vm._v(_vm._s(data.pval))]), _vm._v(" "), _c('el-tag', {
          staticClass: "mgl-10",
          attrs: {
            "size": "mini"
          }
        }, [_vm._v("接口")])], 1)])
      }
    }])
  })], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-f82588ba", module.exports)
  }
}

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1181)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1135),
  /* template */
  __webpack_require__(1242),
  /* scopeId */
  "data-v-f82588ba",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/system/role/assign_perm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] assign_perm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f82588ba", Component.options)
  } else {
    hotAPI.reload("data-v-f82588ba", Component.options)
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