<template>
    <div class="login-container">

        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title-container">
                <h3 class="title">{{"系统登陆"}}</h3>
            </div>
            <el-form-item prop="username" >
                <span class="svg-container svg-container_login" style="font-size: 12px;" >
                    <svg-icon icon-class="user" />
                </span>
                <el-input name="username" type="text" size="mini" v-model="loginForm.username" autoComplete="on" :placeholder="'账号'"/>
            </el-form-item>

            <el-form-item prop="password" v-if="!codeLogin">
                <span class="svg-container" style="font-size: 12px;">
                    <svg-icon icon-class="password"/>
                </span>
                <el-input name="password" :type="passwordType" size="mini" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" @keyup.enter="handleLogin" :placeholder="'密码'"/>
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye"/>
                </span>
            </el-form-item>
            <el-form-item v-else>
                <span class="svg-container" style="font-size: 12px;">
                    <svg-icon icon-class="password"/>
                </span>
            <el-input name="password" :type="passwordType" size="mini" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" @keyup.enter="handleLogin" :placeholder="'验证码'"/>
            <count-down :start='start' @countDown ='start=false' @click.native='sendCode'/>
          </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading"
                       @click.native.prevent="handleLogin">{{"登陆"}}
            </el-button>
            <el-button class="thirdparty-button" style="left: 25px;" type="primary" @click="codeLogin= !codeLogin">{{codeLogin ? '账号密码登陆' : '验证码登陆'}}</el-button>
            <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{"第三方登录"}}
            </el-button>
        </el-form>

        <el-dialog :title="'第三方登陆'" :visible.sync="showDialog" append-to-body>
            {{"请选择登陆平台"}}
            <br/>
            <br/>
            <br/>
            <social-sign/>
        </el-dialog>

    </div>
</template>

<script>
    import {isvalidUsername, validateTelphone} from '@/utils/validate'
    import {sendCode} from '@/api/login'
    import LangSelect from '@/components/LangSelect'
    import SocialSign from './socialsignin'
    import CountDown from './countdown'


    export default {
        components: {LangSelect, SocialSign, CountDown},
        name: 'login',
        data() {
            const validatePassword = (rule, value, callback) => {
                (value.length < 6) ? callback(new Error('密码不能少于6位数!')) : callback()
            };
            return {
                loginForm: {        //默认用户名密码
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, pattern: /^(\w){6,20}$/, message: '密码不能少于6位数!',trigger: 'blur'}]

                    // password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                loading: false,
                showDialog: false,
                start : false,
                codeLogin:false,

            }
        },
        methods: {

            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('LoginByUsername', this.loginForm).then((response) => {
                            this.loading = false;
                            if (response.ok) {
                                return this.$router.push({path: '/'})
                            }
                            this.$message({
                                type: 'error',
                                message: response.message
                            });
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            },
            sendCode(value) {
                if(!validateTelphone(this.loginForm.username)) {
                  return this.$message.error('请输入正确的手机号码！');
                }
                if ( !this.start) {
                    sendCode({username:this.loginForm.username}).then(response => {
                        if(response.ok){
                          this.$message({
                            message: response.message,
                            type: 'success'
                          });
                        } else {
                          this.$message.error(response.message);
                        }
                        this.start = true
                    })
                }

            },
            afterQRScan() {
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
        created() {
            // window.addEventListener('hashchange', this.afterQRScan)
        },
        destroyed() {
            // window.removeEventListener('hashchange', this.afterQRScan)
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    $light_gray: #eee;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
            &::first-line {
                color: $light_gray;
            }
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 25rem;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
            .set-language {
                color: #fff;
                position: absolute;
                top: 5px;
                right: 0px;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
        .thirdparty-button {
            max-width: 150px;
            position: absolute;
            right: 35px;
            /*bottom: 28px;*/
            bottom: -15px;
        }
    }
</style>
