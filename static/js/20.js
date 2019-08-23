webpackJsonp([20],{

/***/ 1061:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".sendSmsBtn{position:absolute;right:10px;height:34px;line-height:34px;border-radius:3px;border:none;padding:0 6px;color:#fff;display:inline-block;width:110px;top:8px}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/countdown.vue"],"names":[],"mappings":"AACA,YACI,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AAEnB,YAAa,AACb,cAAe,AACf,WAAY,AACZ,qBAAsB,AACtB,YAAa,AACb,OAAS,CACZ","file":"countdown.vue","sourcesContent":["\n.sendSmsBtn{\n    position: absolute;\n    right: 10px;\n    height: 34px;\n    line-height: 34px;\n    border-radius: 3px;\n    /*background: #0094ff;*/\n    border: none;\n    padding: 0 6px;\n    color: #fff;\n    display: inline-block;\n    width: 110px;\n    top: 8px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1086:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, "@supports (-webkit-mask:none) and (not (cater-color:#fff)){.login-container .el-input input{color:#fff}.login-container .el-input input:first-line{color:#eee}}.login-container .el-input{display:inline-block;height:47px;width:85%}.login-container .el-input input{background:transparent;border:0;-webkit-appearance:none;border-radius:0;padding:12px 5px 12px 15px;color:#eee;height:47px;caret-color:#fff}.login-container .el-input input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #283443 inset!important;-webkit-text-fill-color:#fff!important}.login-container .el-form-item{border:1px solid hsla(0,0%,100%,.1);background:rgba(0,0,0,.1);border-radius:5px;color:#454545}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/index.vue"],"names":[],"mappings":"AAIA,2DACA,iCACI,UAAY,CACf,AACD,4CACM,UAAY,CACjB,CACA,AAGD,2BACE,qBAAsB,AACtB,YAAa,AACb,SAAW,CACZ,AACD,iCACI,uBAAwB,AACxB,SAAY,AACZ,wBAAyB,AACzB,gBAAmB,AACnB,2BAA4B,AAC5B,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,kDACM,wDAA4D,AAC5D,sCAAyC,CAC9C,AACD,+BACE,oCAA2C,AAC3C,0BAA+B,AAC/B,kBAAmB,AACnB,aAAe,CAChB","file":"index.vue","sourcesContent":["\n@charset \"UTF-8\";\n/* 修复input 背景不协调 和光标变色 */\n/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */\n@supports (-webkit-mask: none) and (not (cater-color: #fff)) {\n.login-container .el-input input {\n    color: #fff;\n}\n.login-container .el-input input::first-line {\n      color: #eee;\n}\n}\n\n/* reset element-ui css */\n.login-container .el-input {\n  display: inline-block;\n  height: 47px;\n  width: 85%;\n}\n.login-container .el-input input {\n    background: transparent;\n    border: 0px;\n    -webkit-appearance: none;\n    border-radius: 0px;\n    padding: 12px 5px 12px 15px;\n    color: #eee;\n    height: 47px;\n    caret-color: #fff;\n}\n.login-container .el-input input:-webkit-autofill {\n      -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;\n      -webkit-text-fill-color: #fff !important;\n}\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  color: #454545;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1087:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".login-container[data-v-a443cc70]{position:fixed;height:100%;width:100%;background-color:#2d3a4b}.login-container .login-form[data-v-a443cc70]{position:absolute;left:0;right:0;width:25rem;padding:35px 35px 15px;margin:120px auto}.login-container .tips[data-v-a443cc70]{font-size:14px;color:#fff;margin-bottom:10px}.login-container .tips span[data-v-a443cc70]:first-of-type{margin-right:16px}.login-container .svg-container[data-v-a443cc70]{padding:6px 5px 6px 15px;color:#889aa4;vertical-align:middle;width:30px;display:inline-block}.login-container .svg-container_login[data-v-a443cc70]{font-size:20px}.login-container .title-container[data-v-a443cc70]{position:relative}.login-container .title-container .title[data-v-a443cc70]{font-size:26px;color:#eee;margin:0 auto 40px;text-align:center;font-weight:700}.login-container .title-container .set-language[data-v-a443cc70]{color:#fff;position:absolute;top:5px;right:0}.login-container .show-pwd[data-v-a443cc70]{position:absolute;right:10px;top:7px;font-size:16px;color:#889aa4;cursor:pointer;user-select:none}.login-container .thirdparty-button[data-v-a443cc70]{max-width:150px;position:absolute;right:35px;bottom:-15px}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/index.vue"],"names":[],"mappings":"AACA,kCACE,eAAgB,AAChB,YAAa,AACb,WAAY,AACZ,wBAA0B,CAC3B,AACD,8CACI,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,YAAa,AACb,uBAA6B,AAC7B,iBAAmB,CACtB,AACD,wCACI,eAAgB,AAChB,WAAY,AACZ,kBAAoB,CACvB,AACD,2DACM,iBAAmB,CACxB,AACD,iDACI,yBAA0B,AAC1B,cAAe,AACf,sBAAuB,AACvB,WAAY,AACZ,oBAAsB,CACzB,AACD,uDACM,cAAgB,CACrB,AACD,mDACI,iBAAmB,CACtB,AACD,0DACM,eAAgB,AAChB,WAAY,AACZ,mBAA2B,AAC3B,kBAAmB,AACnB,eAAkB,CACvB,AACD,iEACM,WAAY,AACZ,kBAAmB,AACnB,QAAS,AACT,OAAW,CAChB,AACD,4CACI,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,eAAgB,AAChB,cAAe,AACf,eAAgB,AAChB,gBAAkB,CACrB,AACD,qDACI,gBAAiB,AACjB,kBAAmB,AACnB,WAAY,AAEZ,YAAc,CACjB","file":"index.vue","sourcesContent":["\n.login-container[data-v-a443cc70] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  background-color: #2d3a4b;\n}\n.login-container .login-form[data-v-a443cc70] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 25rem;\n    padding: 35px 35px 15px 35px;\n    margin: 120px auto;\n}\n.login-container .tips[data-v-a443cc70] {\n    font-size: 14px;\n    color: #fff;\n    margin-bottom: 10px;\n}\n.login-container .tips span[data-v-a443cc70]:first-of-type {\n      margin-right: 16px;\n}\n.login-container .svg-container[data-v-a443cc70] {\n    padding: 6px 5px 6px 15px;\n    color: #889aa4;\n    vertical-align: middle;\n    width: 30px;\n    display: inline-block;\n}\n.login-container .svg-container_login[data-v-a443cc70] {\n      font-size: 20px;\n}\n.login-container .title-container[data-v-a443cc70] {\n    position: relative;\n}\n.login-container .title-container .title[data-v-a443cc70] {\n      font-size: 26px;\n      color: #eee;\n      margin: 0px auto 40px auto;\n      text-align: center;\n      font-weight: bold;\n}\n.login-container .title-container .set-language[data-v-a443cc70] {\n      color: #fff;\n      position: absolute;\n      top: 5px;\n      right: 0px;\n}\n.login-container .show-pwd[data-v-a443cc70] {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #889aa4;\n    cursor: pointer;\n    user-select: none;\n}\n.login-container .thirdparty-button[data-v-a443cc70] {\n    max-width: 150px;\n    position: absolute;\n    right: 35px;\n    /*bottom: 28px;*/\n    bottom: -15px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1089:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(400)(true);
// imports


// module
exports.push([module.i, ".social-signup-container[data-v-d46ed16e]{margin:20px 0}.social-signup-container .sign-btn[data-v-d46ed16e]{display:inline-block;cursor:pointer}.social-signup-container .icon[data-v-d46ed16e]{color:#fff;font-size:30px;margin-top:6px}.social-signup-container .qq-svg-container[data-v-d46ed16e],.social-signup-container .wx-svg-container[data-v-d46ed16e]{display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;padding-top:1px;border-radius:4px;margin-bottom:20px;margin-right:5px}.social-signup-container .wx-svg-container[data-v-d46ed16e]{background-color:#8dc349}.social-signup-container .qq-svg-container[data-v-d46ed16e]{background-color:#6ba2d6;margin-left:50px}", "", {"version":3,"sources":["/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/socialsignin.vue"],"names":[],"mappings":"AACA,0CACE,aAAe,CAChB,AACD,oDACI,qBAAsB,AACtB,cAAgB,CACnB,AACD,gDACI,WAAY,AACZ,eAAgB,AAChB,cAAgB,CACnB,AACD,wHAEI,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,gBAAiB,AACjB,kBAAmB,AACnB,mBAAoB,AACpB,gBAAkB,CACrB,AACD,4DACI,wBAA0B,CAC7B,AACD,4DACI,yBAA0B,AAC1B,gBAAkB,CACrB","file":"socialsignin.vue","sourcesContent":["\n.social-signup-container[data-v-d46ed16e] {\n  margin: 20px 0;\n}\n.social-signup-container .sign-btn[data-v-d46ed16e] {\n    display: inline-block;\n    cursor: pointer;\n}\n.social-signup-container .icon[data-v-d46ed16e] {\n    color: #fff;\n    font-size: 30px;\n    margin-top: 6px;\n}\n.social-signup-container .wx-svg-container[data-v-d46ed16e],\n  .social-signup-container .qq-svg-container[data-v-d46ed16e] {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    padding-top: 1px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n    margin-right: 5px;\n}\n.social-signup-container .wx-svg-container[data-v-d46ed16e] {\n    background-color: #8dc349;\n}\n.social-signup-container .qq-svg-container[data-v-d46ed16e] {\n    background-color: #6BA2D6;\n    margin-left: 50px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

var flag = false;
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      time: '获取验证码'
    };
  },

  props: {
    start: {
      type: Boolean
    }
  },
  watch: {
    start: function start(value, oldvalue) {
      if (value == true) {
        this.countDown();
      }
    }
  },
  methods: {
    countDown: function countDown() {
      var _this = this;

      this.time = 60;
      var time = setInterval(function () {
        _this.time--;
        flag = true;
        if (_this.time == 0) {
          _this.$emit('countDown');
          _this.time = '获取验证码';

          clearInterval(time);
        }
      }, 1000);
    }
  },
  filters: {
    change: function change(value) {
      if (!value) return "";
      if (!isNaN(value)) {
        if (flag == true) {
          return '\u91CD\u65B0\u53D1\u9001' + value + 'S';
        }
        return value + 'S';
      } else {
        return value;
      }
    }
  }

});

/***/ }),

/***/ 1113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_validate__ = __webpack_require__(1144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_login__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LangSelect__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_LangSelect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_LangSelect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__socialsignin__ = __webpack_require__(1197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__socialsignin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__socialsignin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__countdown__ = __webpack_require__(1196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__countdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__countdown__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: { LangSelect: __WEBPACK_IMPORTED_MODULE_2__components_LangSelect___default.a, SocialSign: __WEBPACK_IMPORTED_MODULE_3__socialsignin___default.a, CountDown: __WEBPACK_IMPORTED_MODULE_4__countdown___default.a },
    name: 'login',
    data: function data() {
        var validatePassword = function validatePassword(rule, value, callback) {
            value.length < 6 ? callback(new Error('密码不能少于6位数!')) : callback();
        };
        return {
            loginForm: { //默认用户名密码
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, pattern: /^(\w){6,20}$/, message: '密码不能少于6位数!', trigger: 'blur' }]

                // password: [{required: true, trigger: 'blur', validator: validatePassword}]
            },
            passwordType: 'password',
            loading: false,
            showDialog: false,
            start: false,
            codeLogin: false

        };
    },

    methods: {
        showPwd: function showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
        },
        handleLogin: function handleLogin() {
            var _this = this;

            this.$refs.loginForm.validate(function (valid) {
                if (valid) {
                    _this.loading = true;
                    _this.$store.dispatch('LoginByUsername', _this.loginForm).then(function (response) {
                        _this.loading = false;
                        if (response.ok) {
                            return _this.$router.push({ path: '/' });
                        }
                        _this.$message({
                            type: 'error',
                            message: response.message
                        });
                    }).catch(function () {
                        _this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sendCode: function sendCode(value) {
            var _this2 = this;

            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_validate__["a" /* validateTelphone */])(this.loginForm.username)) {
                return this.$message.error('请输入正确的手机号码！');
            }
            if (!this.start) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__api_login__["a" /* sendCode */])({ username: this.loginForm.username }).then(function (response) {
                    if (response.ok) {
                        _this2.$message({
                            message: response.message,
                            type: 'success'
                        });
                    } else {
                        _this2.$message.error(response.message);
                    }
                    _this2.start = true;
                });
            }
        },
        afterQRScan: function afterQRScan() {
            // const hash = window.location.hash.slice(1)
            // const hashObj = getQueryObject(hash)
            // const originUrl = window.location.origin
            // history.replaceState({}, '', originUrl)
            // const codeMap = {
            //   wechat: 'code',
            //   tencent: 'code'
            // }
            // const codeName = hashObj[codeMap[this.auth_type]]
            // if (!codeName) {
            //   alert('第三方登录失败')
            // } else {
            //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
            //     this.$router.push({ path: '/' })
            //   })
            // }
        }
    },
    created: function created() {
        // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed: function destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
    }
});

/***/ }),

/***/ 1114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_openWindow__ = __webpack_require__(1143);
//
//
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
  name: 'social-signin',
  methods: {
    wechatHandleClick: function wechatHandleClick(thirdpart) {
      this.$store.commit('SET_AUTH_TYPE', thirdpart);
      var appid = 'xxxxx';
      var redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect');
      var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_openWindow__["a" /* default */])(url, thirdpart, 540, 540);
    },
    tencentHandleClick: function tencentHandleClick(thirdpart) {
      this.$store.commit('SET_AUTH_TYPE', thirdpart);
      var client_id = 'xxxxx';
      var redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect');
      var url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_openWindow__["a" /* default */])(url, thirdpart, 540, 540);
    }
  }
});

/***/ }),

/***/ 1143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = openWindow;
/**
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */

function openWindow(url, title, w, h) {
  // Fixes dual-screen position                            Most browsers       Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}

/***/ }),

/***/ 1144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isvalidUsername */
/* unused harmony export validateURL */
/* unused harmony export validateLowerCase */
/* unused harmony export validateUpperCase */
/* unused harmony export validateAlphabets */
/* unused harmony export validateEmail */
/* harmony export (immutable) */ __webpack_exports__["a"] = validateTelphone;


function isvalidUsername(str) {
  var valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
function validateURL(textval) {
  var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
function validateLowerCase(str) {
  var reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
function validateUpperCase(str) {
  var reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
function validateAlphabets(str) {
  var reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/*手机号*/
function validateTelphone(phone) {
  var re = /^1(3|4|5|7|8)\d{9}$/;
  return re.test(phone);
}

/***/ }),

/***/ 1149:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1061);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("b5012e34", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1061, function() {
     var newContent = __webpack_require__(1061);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1174:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1086);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("0e26d5f7", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1086, function() {
     var newContent = __webpack_require__(1086);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1175:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1087);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("a106ea96", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1087, function() {
     var newContent = __webpack_require__(1087);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1177:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1089);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(401)("ab6f0a26", content, false);
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(1089, function() {
     var newContent = __webpack_require__(1089);
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1196:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1149)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1112),
  /* template */
  __webpack_require__(1204),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/countdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] countdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0eb1a0a7", Component.options)
  } else {
    hotAPI.reload("data-v-0eb1a0a7", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 1197:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1177)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1114),
  /* template */
  __webpack_require__(1237),
  /* scopeId */
  "data-v-d46ed16e",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/socialsignin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] socialsignin.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d46ed16e", Component.options)
  } else {
    hotAPI.reload("data-v-d46ed16e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 1204:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-button', {
    staticClass: "sendSmsBtn",
    attrs: {
      "type": "primary"
    }
  }, [_vm._v(_vm._s(_vm._f("change")(_vm.time)))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-0eb1a0a7", module.exports)
  }
}

/***/ }),

/***/ 1234:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-container"
  }, [_c('el-form', {
    ref: "loginForm",
    staticClass: "login-form",
    attrs: {
      "autoComplete": "on",
      "model": _vm.loginForm,
      "rules": _vm.loginRules,
      "label-position": "left"
    }
  }, [_c('div', {
    staticClass: "title-container"
  }, [_c('h3', {
    staticClass: "title"
  }, [_vm._v(_vm._s("系统登陆"))])]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('span', {
    staticClass: "svg-container svg-container_login",
    staticStyle: {
      "font-size": "12px"
    }
  }, [_c('svg-icon', {
    attrs: {
      "icon-class": "user"
    }
  })], 1), _vm._v(" "), _c('el-input', {
    attrs: {
      "name": "username",
      "type": "text",
      "size": "mini",
      "autoComplete": "on",
      "placeholder": '账号'
    },
    model: {
      value: (_vm.loginForm.username),
      callback: function($$v) {
        _vm.$set(_vm.loginForm, "username", $$v)
      },
      expression: "loginForm.username"
    }
  })], 1), _vm._v(" "), (!_vm.codeLogin) ? _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('span', {
    staticClass: "svg-container",
    staticStyle: {
      "font-size": "12px"
    }
  }, [_c('svg-icon', {
    attrs: {
      "icon-class": "password"
    }
  })], 1), _vm._v(" "), _c('el-input', {
    attrs: {
      "name": "password",
      "type": _vm.passwordType,
      "size": "mini",
      "autoComplete": "on",
      "placeholder": '密码'
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.handleLogin($event)
      }
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.handleLogin($event)
      }
    },
    model: {
      value: (_vm.loginForm.password),
      callback: function($$v) {
        _vm.$set(_vm.loginForm, "password", $$v)
      },
      expression: "loginForm.password"
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
  })], 1)], 1) : _c('el-form-item', [_c('span', {
    staticClass: "svg-container",
    staticStyle: {
      "font-size": "12px"
    }
  }, [_c('svg-icon', {
    attrs: {
      "icon-class": "password"
    }
  })], 1), _vm._v(" "), _c('el-input', {
    attrs: {
      "name": "password",
      "type": _vm.passwordType,
      "size": "mini",
      "autoComplete": "on",
      "placeholder": '验证码'
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.handleLogin($event)
      }
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.handleLogin($event)
      }
    },
    model: {
      value: (_vm.loginForm.password),
      callback: function($$v) {
        _vm.$set(_vm.loginForm, "password", $$v)
      },
      expression: "loginForm.password"
    }
  }), _vm._v(" "), _c('count-down', {
    attrs: {
      "start": _vm.start
    },
    on: {
      "countDown": function($event) {
        _vm.start = false
      }
    },
    nativeOn: {
      "click": function($event) {
        return _vm.sendCode($event)
      }
    }
  })], 1), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "width": "100%",
      "margin-bottom": "30px"
    },
    attrs: {
      "type": "primary",
      "loading": _vm.loading
    },
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        return _vm.handleLogin($event)
      }
    }
  }, [_vm._v(_vm._s("登陆") + "\n        ")]), _vm._v(" "), _c('el-button', {
    staticClass: "thirdparty-button",
    staticStyle: {
      "left": "25px"
    },
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.codeLogin = !_vm.codeLogin
      }
    }
  }, [_vm._v(_vm._s(_vm.codeLogin ? '账号密码登陆' : '验证码登陆'))]), _vm._v(" "), _c('el-button', {
    staticClass: "thirdparty-button",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.showDialog = true
      }
    }
  }, [_vm._v(_vm._s("第三方登录") + "\n        ")])], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": '第三方登陆',
      "visible": _vm.showDialog,
      "append-to-body": ""
    },
    on: {
      "update:visible": function($event) {
        _vm.showDialog = $event
      }
    }
  }, [_vm._v("\n        " + _vm._s("请选择登陆平台") + "\n        "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('social-sign')], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-a443cc70", module.exports)
  }
}

/***/ }),

/***/ 1237:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "social-signup-container"
  }, [_c('div', {
    staticClass: "sign-btn",
    on: {
      "click": function($event) {
        _vm.wechatHandleClick('wechat')
      }
    }
  }, [_c('span', {
    staticClass: "wx-svg-container"
  }, [_c('svg-icon', {
    staticClass: "icon",
    attrs: {
      "icon-class": "wechat"
    }
  })], 1), _vm._v(" 微信\n  ")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (true) {
  module.hot.accept()
  if (module.hot.data) {
     __webpack_require__(2).rerender("data-v-d46ed16e", module.exports)
  }
}

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1174)
__webpack_require__(1175)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1113),
  /* template */
  __webpack_require__(1234),
  /* scopeId */
  "data-v-a443cc70",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxiaohui/Documents/cj/code/pos-admin/view/views/login/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(2)
  hotAPI.install(__webpack_require__(3), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a443cc70", Component.options)
  } else {
    hotAPI.reload("data-v-a443cc70", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});