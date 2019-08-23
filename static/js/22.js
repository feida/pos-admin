webpackJsonp([22],{

/***/ 1080:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".role-checkbox[data-v-72c9c6ec]{margin-left:0;margin-right:15px}.show-pwd[data-v-72c9c6ec]{position:absolute;right:10px;top:0}.avatar-uploader .el-upload[data-v-72c9c6ec]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload[data-v-72c9c6ec]:hover{border-color:#409eff}.avatar-uploader-icon[data-v-72c9c6ec]{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;border:1px solid #ccc}.avatar[data-v-72c9c6ec]{width:178px;height:178px;display:block}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/system/user/index.vue"],"names":[],"mappings":"AACA,gCACE,cAAiB,AACjB,iBAAmB,CACpB,AACD,2BACE,kBAAmB,AACnB,WAAY,AACZ,KAAO,CACR,AACD,6CACE,0BAA2B,AAC3B,kBAAmB,AACnB,eAAgB,AAChB,kBAAmB,AACnB,eAAiB,CAClB,AACD,mDACE,oBAAsB,CACvB,AACD,uCACE,eAAgB,AAChB,cAAe,AACf,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,kBAAmB,AACnB,qBAAuB,CACxB,AACD,yBACE,YAAa,AACb,aAAc,AACd,aAAe,CAChB","file":"index.vue","sourcesContent":["\n.role-checkbox[data-v-72c9c6ec] {\n  margin-left: 0px;\n  margin-right: 15px;\n}\n.show-pwd[data-v-72c9c6ec] {\n  position: absolute;\n  right: 10px;\n  top: 0;\n}\n.avatar-uploader .el-upload[data-v-72c9c6ec] {\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.avatar-uploader .el-upload[data-v-72c9c6ec]:hover {\n  border-color: #409EFF;\n}\n.avatar-uploader-icon[data-v-72c9c6ec] {\n  font-size: 28px;\n  color: #8c939d;\n  width: 178px;\n  height: 178px;\n  line-height: 178px;\n  text-align: center;\n  border: 1px solid #ccc;\n}\n.avatar[data-v-72c9c6ec] {\n  width: 178px;\n  height: 178px;\n  display: block;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_system__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_qiniu__ = __webpack_require__(1141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_constants__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router__ = __webpack_require__(45);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'UserManage',
    data: function data() {
        return {
            uploading: false,
            loaded: 0,
            fileSize: 0,
            percent: 0,
            imgUrl: '',
            form: {
                token: '',
                //                  token: 'mvjj9lnueTe85lpJhSKqLosI0nUUWNIrBF38-XLj:UDAxkNtjGJZZ_8-KR6JahKSA1Zs=:eyJzY29wZSI6ImNqLW5ld3BvcyIsImRlYWRsaW5lIjoxNTM3NDMwNjUxfQ==',
                key: null
            },
            listLoading: true,
            list: null,
            listQuery: {
                page_index: 1,
                page_size: 10,
                total: 0,
                content: null
            },

            dialogFormVisible: false,
            dialogStatus: '',
            temp: {
                idx: null,
                uid: null,
                admin_name: null,
                full_name: null,
                admin_gender: true, //1.男 0.女
                web_sso: false, //1.单点登录 0.多人登录
                admin_avatar: null, //头像url
                admin_mobile: null,
                created: null,
                updated: null
            },

            textMap: {
                update: '编辑用户',
                create: '新增用户'
            },
            passwordType: 'password',
            rules: {
                admin_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { pattern: /^(\w){4,20}$/, message: '只能输入4-20个字母、数字、下划线', trigger: 'blur' }],
                full_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
                admin_mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
                admin_password: [{ required: true, message: '请输入登陆密码', trigger: 'blur' }, { pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线', trigger: 'blur' }]
            },

            checkAll: false,
            editRolesDialogVisible: false,
            isIndeterminate: true,
            //所有角色(管理员除外)
            roleOptions: [],
            roleMap: new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_map___default.a(),
            // 更新用户的角色的数据
            updateUserRolesData: {
                idx: null,
                uid: null,
                rids: []
            }
        };
    },

    filters: {
        statusFilter: function statusFilter(status) {
            var statusMap = {
                1: 'success',
                0: 'danger',
                true: 'success',
                false: 'danger'
            };
            return statusMap[status];
        }
    },

    created: function created() {
        this.initData();
        this.fetchData();
    },


    watch: {
        //延时查询
        'listQuery.content': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* debounce */])(function () {
            this.fetchData(1);
        }, 500)
    },

    methods: {
        showPwd: function showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
        },
        initData: function initData() {
            var _this = this;

            //所有角色选项
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_system__["q" /* getSystemRole */])({ page_index: 1, page_size: 10000 }).then(function (res) {

                res.data.list.forEach(function (obj) {
                    if (obj.rval != __WEBPACK_IMPORTED_MODULE_5__utils_constants__["c" /* root */].rval) {
                        //排除管理员
                        _this.roleOptions.push(obj);
                        _this.roleMap.set(obj._id, obj.rname);
                    }
                });
            });
        },
        hasAdminRole: function hasAdminRole(row) {
            //过滤超级管理员
            if (row && row.role_list) {
                return row.role_list.some(function (role) {
                    return role.rval == __WEBPACK_IMPORTED_MODULE_5__utils_constants__["c" /* root */].rval;
                });
            }
            return false;
        },


        //全选
        handleCheckAllChange: function handleCheckAllChange(val) {
            var allRids = this.roleOptions.map(function (role) {
                return role._id;
            });
            this.updateUserRolesData.rids = val ? allRids : [];
            this.isIndeterminate = false;
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
            var _this2 = this;

            if (current) {
                this.listQuery.page_index = current;
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_system__["r" /* getSystemList */])(this.listQuery).then(function (response) {
                console.log('response', response);
                _this2.list = response.data.list;
                _this2.listQuery.total = response.data.count;
                _this2.listLoading = false;
            });
        },


        //更新
        handleUpdate: function handleUpdate(idx, row) {
            var _this3 = this;

            this.temp = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, row);
            this.temp.idx = idx;
            console.log('this.temp111', this.temp);
            this.getToken();
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.$nextTick(function () {
                return _this3.$refs['dataForm'].clearValidate();
            });
        },
        updateData: function updateData() {
            var _this4 = this;

            this.$refs['dataForm'].validate(function (valid) {
                if (!valid) return;
                var administrator = {
                    id: _this4.temp._id,
                    admin_name: _this4.temp.admin_name,
                    admin_password: _this4.temp.admin_password,
                    full_name: _this4.temp.full_name,
                    admin_gender: _this4.temp.admin_gender,
                    web_sso: _this4.temp.web_sso, //1.单点登录 0.多人登录
                    admin_avatar: _this4.temp.admin_avatar, //头像url
                    admin_mobile: _this4.temp.admin_mobile //用户手机号码
                };
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_system__["s" /* updateAdministrator */])(administrator).then(function (res) {
                    if (res) {
                        _this4.$message.success("编辑成功");
                        _this4.dialogFormVisible = false;
                        _this4.fetchData();
                    }
                });
            });
        },


        //更新用户的角色
        handleUpdateUserRoles: function handleUpdateUserRoles(idx, row) {
            // 显示用户的角色
            this.updateUserRolesData = {
                idx: idx,
                uid: row._id,
                rids: row.role_list.map(function (role) {
                    return role._id;
                })
            };
            // 显示弹窗
            this.editRolesDialogVisible = true;
        },
        checkUpdateUserRolesData: function checkUpdateUserRolesData() {
            var _this5 = this;

            var noRolesSelected = this.updateUserRolesData && this.updateUserRolesData.rids && this.updateUserRolesData.rids.length == 0;
            if (noRolesSelected) {
                this.$confirm('当前没有选中任何角色，会清除该用户已有的角色, 是否继续?', '提示', __WEBPACK_IMPORTED_MODULE_5__utils_constants__["b" /* confirm */]).then(function () {
                    _this5.invokeUpdateUserRolesApi();
                }).catch(function () {
                    _this5.$message("已取消编辑用户角色");
                });
            } else {
                this.invokeUpdateUserRolesApi();
            }
        },
        invokeUpdateUserRolesApi: function invokeUpdateUserRolesApi() {
            var _this6 = this;

            //更新角色的函数
            //修改用户角色
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_system__["t" /* updateSystemRole */])({ id: this.updateUserRolesData.uid, admin_roles: this.updateUserRolesData.rids }).then(function (res) {
                var newRoles = _this6.updateUserRolesData.rids.map(function (rid) {
                    var rname = _this6.roleMap.get(rid);
                    if (rname) return { _id: rid, rname: rname };
                });
                _this6.list[_this6.updateUserRolesData.idx].role_list = newRoles;
                _this6.editRolesDialogVisible = false;
                _this6.$message.success("更新成功");
            });
        },


        //修改用户状态    //status  1(恢复) 0 (锁定)
        updateSystemStatus: function updateSystemStatus(idx, row, status) {
            var _this7 = this;

            this.$confirm('您确定要永久删除该用户？', '提示', __WEBPACK_IMPORTED_MODULE_5__utils_constants__["b" /* confirm */]).then(function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_system__["u" /* updateSystemStatus */])({ id: row._id, status: status }).then(function (res) {
                    _this7.fetchData();
                    _this7.$message.success("删除成功");
                });
            }).catch(function () {
                _this7.$message.info("已取消删除");
            });
        },


        //新增
        handleCreate: function handleCreate() {
            var _this8 = this;

            this.temp = {
                idx: null,
                uid: null,
                admin_name: null,
                full_name: null,
                admin_gender: true, //1.男 0.女
                web_sso: false, //1.单点登录 0.多人登录
                admin_avatar: null, //头像url
                admin_mobile: null,
                created: null,
                updated: null
            };
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
            this.$nextTick(function () {
                _this8.$refs['dataForm'].clearValidate();
            });
            this.getToken();
        },

        //获取七牛token
        getToken: function getToken() {
            var _this9 = this;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_qiniu__["a" /* getToken */])().then(function (res) {
                console.log('res', res);
                _this9.form.token = res.token;
                _this9.imgUrl = res.host;
            });
        },
        createData: function createData() {
            var _this10 = this;

            this.$refs['dataForm'].validate(function (valid) {
                if (!valid) return;
                var administrator = {
                    admin_name: _this10.temp.admin_name,
                    admin_password: _this10.temp.admin_password,
                    full_name: _this10.temp.full_name,
                    admin_gender: _this10.temp.admin_gender,
                    web_sso: _this10.temp.web_sso, //1.单点登录 0.多人登录
                    admin_avatar: _this10.temp.admin_avatar, //头像url
                    admin_mobile: _this10.temp.admin_mobile //用户手机号码
                };
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__api_system__["v" /* createNewAdministrator */])(administrator).then(function (res) {
                    if (res) {
                        _this10.$message.success("添加成功");
                        _this10.dialogFormVisible = false;
                        _this10.fetchData();
                    }
                });
            });
        },
        beforeUpload: function beforeUpload(file) {
            this.form.key = new Date().getTime();
            var isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            var isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('只能上传图片!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleProgress: function handleProgress(event, file, fileList) {
            this.uploading = true;

            this.loaded = (event.loaded / 1000000).toFixed(2);
            this.fileSize = (event.total / 1000000).toFixed(2);
            this.percent = Number((event.loaded / event.total * 100).toFixed(2));
        },
        handleSuccess: function handleSuccess(response, file, fileList) {
            console.log('上传成功', response, file, fileList);
            this.temp.admin_avatar = this.imgUrl + '/' + this.form.key;
            this.result = '上传成功';
            this.percent = 0;
            this.uploading = false;
            this.$message.success('上传成功');
        },
        handleError: function handleError(error, response, file) {
            console.log('上传失败', error, response, file);
            this.result = error.toString();
            this.uploading = false;
            this.$message.error('上传失败');
        }
    }
});

/***/ }),

/***/ 1141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getToken;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_request__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_index__ = __webpack_require__(81);



function getToken() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_request__["a" /* default */])({ url: __WEBPACK_IMPORTED_MODULE_1__config_index__["a" /* URL */] + '/upload/qiniu/token', method: 'get' });
}

/***/ }),

/***/ 1168:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1080);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("1c78213d", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1080, function() {
     var newContent = __webpack_require__(1080);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1227:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container"
  }, [_c('el-row', [_c('el-input', {
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "placeholder": "手机号码\\用户名",
      "size": "mini"
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
      "circle": "",
      "size": "mini"
    },
    on: {
      "click": function($event) {
        _vm.fetchData(1)
      }
    }
  })], 1), _vm._v(" "), _c('el-button', {
    directives: [{
      name: "perm",
      rawName: "v-perm",
      value: ('b:user:add'),
      expression: "'b:user:add'"
    }],
    attrs: {
      "type": "primary",
      "icon": "el-icon-plus",
      "size": "mini"
    },
    on: {
      "click": _vm.handleCreate
    }
  }, [_vm._v(_vm._s(_vm.textMap.create))])], 1), _vm._v(" "), _c('div', {
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
      "label": "用户名",
      "width": "150"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_name))])]
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
        return [_c('span', [_vm._v(_vm._s(scope.row.full_name))])]
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
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_mobile))])]
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
        return [_c('span', [_vm._v(_vm._s(scope.row.admin_gender ? "男" : "女"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "label": "角色"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((scope.row.role_list), function(role) {
          return _c('el-tag', {
            key: role.rid,
            staticStyle: {
              "margin": "2px"
            },
            attrs: {
              "type": "success"
            }
          }, [_vm._v(_vm._s(role.rname))])
        })
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
            "type": _vm._f("statusFilter")(scope.row.web_sso)
          }
        }, [_vm._v(_vm._s(scope.row.web_sso == true ? "是" : "否"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "class-name": "status-col",
      "label": "在线状态",
      "width": "100"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-tag', {
          attrs: {
            "type": _vm._f("statusFilter")(scope.row.online_state)
          }
        }, [_vm._v(_vm._s(scope.row.online_state ? "在线" : "离线"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "class-name": "status-col",
      "label": "状态",
      "width": "100"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-tag', {
          attrs: {
            "type": _vm._f("statusFilter")(scope.row.status)
          }
        }, [_vm._v(_vm._s(scope.row.status == 1 ? "正常" : "锁定"))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "width": "180px",
      "align": "center",
      "label": "更新时间"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(_vm._f("parseTime")(scope.row.update_time, '{y}-{m}-{d} {h}:{i}')))])]
      }
    }])
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
            "content": "修改角色",
            "placement": "top"
          }
        }, [_c('el-button', {
          attrs: {
            "size": "medium",
            "type": "warning",
            "icon": "el-icon-star-off",
            "circle": "",
            "plain": ""
          },
          on: {
            "click": function($event) {
              _vm.handleUpdateUserRoles(scope.$index, scope.row)
            }
          }
        })], 1) : _vm._e(), _vm._v(" "), (!_vm.hasAdminRole(scope.row)) ? _c('el-tooltip', {
          directives: [{
            name: "perm",
            rawName: "v-perm",
            value: ('b:user:delete'),
            expression: "'b:user:delete'"
          }],
          attrs: {
            "content": scope.row.status == 1 ? '删除' : '恢复',
            "placement": "top"
          }
        }, [_c('el-button', {
          attrs: {
            "size": "medium",
            "type": scope.row.status == 1 ? 'danger' : 'success',
            "icon": "el-icon-delete",
            "circle": "",
            "plain": ""
          },
          on: {
            "click": function($event) {
              _vm.updateSystemStatus(scope.$index, scope.row, scope.row.status == 1 ? 0 : 1)
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
        }, [_c('div', [_vm._v("为保证管理员在系统中的最高权限")]), _vm._v(" "), _c('div', [_vm._v("不允许编辑管理员自身的角色")]), _vm._v(" "), _c('div', [_vm._v("不允许删除管理员账号")])]), _vm._v(" "), _c('div', {
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
      "width": "40%"
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
      "label-width": "120px"
    }
  }, [(_vm.dialogStatus == 'create') ? _c('el-form-item', {
    attrs: {
      "label": "登录名",
      "prop": "admin_name"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.temp.admin_name),
      callback: function($$v) {
        _vm.$set(_vm.temp, "admin_name", $$v)
      },
      expression: "temp.admin_name"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "昵称",
      "prop": "full_name"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.temp.full_name),
      callback: function($$v) {
        _vm.$set(_vm.temp, "full_name", $$v)
      },
      expression: "temp.full_name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "手机号码",
      "prop": "admin_mobile"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.temp.admin_mobile),
      callback: function($$v) {
        _vm.$set(_vm.temp, "admin_mobile", _vm._n($$v))
      },
      expression: "temp.admin_mobile"
    }
  })], 1), _vm._v(" "), (_vm.dialogStatus == 'create') ? _c('el-form-item', {
    attrs: {
      "label": "登陆密码",
      "prop": "admin_password"
    }
  }, [_c('el-input', {
    attrs: {
      "name": "password",
      "type": _vm.passwordType
    },
    model: {
      value: (_vm.temp.admin_password),
      callback: function($$v) {
        _vm.$set(_vm.temp, "admin_password", $$v)
      },
      expression: "temp.admin_password"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "show-pwd",
    on: {
      "click": _vm.showPwd
    }
  }, [_c('svg-icon', {
    attrs: {
      "icon-class": "eye"
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "性别"
    }
  }, [_c('el-radio-group', {
    model: {
      value: (_vm.temp.admin_gender),
      callback: function($$v) {
        _vm.$set(_vm.temp, "admin_gender", $$v)
      },
      expression: "temp.admin_gender"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": true
    }
  }, [_vm._v("男")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": false
    }
  }, [_vm._v("女")])], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "是否单点登陆",
      "prop": "web_sso"
    }
  }, [_c('el-radio-group', {
    model: {
      value: (_vm.temp.web_sso),
      callback: function($$v) {
        _vm.$set(_vm.temp, "web_sso", $$v)
      },
      expression: "temp.web_sso"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": true
    }
  }, [_vm._v("是")]), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": false
    }
  }, [_vm._v("否")])], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "上传头像",
      "prop": "admin_avatar"
    }
  }, [(!_vm.uploading) ? _c('el-upload', {
    ref: "upload",
    staticClass: "avatar-uploader",
    attrs: {
      "action": "http://upload.qiniu.com",
      "data": _vm.form,
      "multiple": false,
      "show-file-list": false,
      "before-upload": _vm.beforeUpload,
      "on-progress": _vm.handleProgress,
      "on-success": _vm.handleSuccess,
      "on-error": _vm.handleError
    }
  }, [(_vm.temp.admin_avatar) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.temp.admin_avatar
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })]) : _c('el-progress', {
    attrs: {
      "percentage": _vm.percent
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
  }, [_vm._v("确定")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "修改用户的角色",
      "visible": _vm.editRolesDialogVisible,
      "width": "30%"
    },
    on: {
      "update:visible": function($event) {
        _vm.editRolesDialogVisible = $event
      }
    }
  }, [_c('div', [_c('el-checkbox', {
    attrs: {
      "indeterminate": _vm.isIndeterminate
    },
    on: {
      "change": _vm.handleCheckAllChange
    },
    model: {
      value: (_vm.checkAll),
      callback: function($$v) {
        _vm.checkAll = $$v
      },
      expression: "checkAll"
    }
  }, [_vm._v("全选")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "15px 0"
    }
  }), _vm._v(" "), _c('el-checkbox-group', {
    model: {
      value: (_vm.updateUserRolesData.rids),
      callback: function($$v) {
        _vm.$set(_vm.updateUserRolesData, "rids", $$v)
      },
      expression: "updateUserRolesData.rids"
    }
  }, _vm._l((_vm.roleOptions), function(role) {
    return _c('el-checkbox', {
      key: role._id,
      staticClass: "role-checkbox",
      attrs: {
        "label": role._id
      }
    }, [_vm._v("\n                    " + _vm._s(role.rname) + "\n                ")])
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.editRolesDialogVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.checkUpdateUserRolesData
    }
  }, [_vm._v("确定")])], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-72c9c6ec", module.exports)
  }
}

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1168)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1139),
  /* template */
  __webpack_require__(1227),
  /* scopeId */
  "data-v-72c9c6ec",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/system/user/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72c9c6ec", Component.options)
  } else {
    hotAPI.reload("data-v-72c9c6ec", Component.options)
  }
})()}

module.exports = Component.exports


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