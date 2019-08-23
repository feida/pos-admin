<template>
    <div class="app-container">
        <!--查询  -->
        <el-row>
            <el-input style="width:200px;" v-model="listQuery.content" placeholder="手机号码\用户名" size="mini"></el-input>
            <span style="margin-right: 15px;"></span>
            <el-tooltip class="item" content="搜索" placement="top" >
                <el-button icon="el-icon-search" circle @click="fetchData(1)"  size="mini"></el-button>
            </el-tooltip>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate" v-perm="'b:user:add'">{{textMap.create}}</el-button>
        </el-row>
        <div style="margin-bottom: 15px;"></div>
        <!--列表-->
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="用户名" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="真实姓名" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.full_name}}</span>
                </template>
            </el-table-column>

            <el-table-column width="150px" align="center" label="手机号码">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_mobile }}</span>
                </template>
            </el-table-column>

            <el-table-column width="70px" align="center" label="性别">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_gender?"男":"女" }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="角色">
                <template slot-scope="scope">
                    <el-tag style="margin: 2px;" type="success" v-for="role in scope.row.role_list" :key="role.rid">{{role.rname}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="100px" align="center" label="单点登陆">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.web_sso | statusFilter">{{scope.row.web_sso == true?"是":"否"}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="在线状态" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.online_state | statusFilter">{{scope.row.online_state?"在线":"离线"}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status == 1?"正常":"锁定"}}</el-tag>
                </template>
            </el-table-column>



            <el-table-column width="180px" align="center" label="更新时间">
                <template slot-scope="scope">
                    <span>{{scope.row.update_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top">
                        <!--<router-link :to="'/system/edit/'+scope.row._id">
                        </router-link>-->
                      <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>

                    </el-tooltip>
                    <el-tooltip content="修改角色" placement="top" v-if="!hasAdminRole(scope.row)">
                        <el-button @click="handleUpdateUserRoles(scope.$index,scope.row)" size="medium" type="warning" icon="el-icon-star-off" circle plain></el-button>
                    </el-tooltip>
                    <el-tooltip :content="scope.row.status == 1?'删除':'恢复'" placement="top"  v-perm="'b:user:delete'" v-if="!hasAdminRole(scope.row)">
                        <el-button @click="updateSystemStatus(scope.$index,scope.row,scope.row.status == 1?0:1)" size="medium" :type="scope.row.status == 1?'danger':'success'" icon="el-icon-delete" circle plain></el-button>
                    </el-tooltip>
                    <el-popover  trigger="hover" placement="top" v-else style="display: inline-block;">
                        <el-alert type="warning" :closable="false" title="权限说明">
                            <div>为保证管理员在系统中的最高权限</div>
                            <div>不允许编辑管理员自身的角色</div>
                            <div>不允许删除管理员账号</div>
                        </el-alert>
                        <div slot="reference" >
                            <el-tag style="margin-left: 10px;" type="info">权限说明</el-tag>
                        </div>
                    </el-popover>

                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.page_index" :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper"
                           :total="listQuery.total">
            </el-pagination>
        </div>

        <!--弹出窗口：新增/编辑用户-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="40%">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px">

                <el-form-item label="登录名" prop="admin_name" v-if="dialogStatus=='create'">
                    <el-input v-model="temp.admin_name"></el-input>
                </el-form-item>

                <el-form-item label="昵称" prop="full_name">
                    <el-input v-model="temp.full_name"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="admin_mobile">
                    <el-input v-model.number="temp.admin_mobile"></el-input>
                </el-form-item>

                <el-form-item label="登陆密码" prop="admin_password" v-if="dialogStatus=='create'">
                    <el-input name="password" :type="passwordType" v-model="temp.admin_password"></el-input>
                    <span class="show-pwd" @click="showPwd">
                      <svg-icon icon-class="eye"/>
                    </span>
                </el-form-item>
                <el-form-item label="性别" >
                  <el-radio-group v-model="temp.admin_gender">
                    <el-radio :label="true">男</el-radio>
                    <el-radio :label="false">女</el-radio>
                  </el-radio-group>

                </el-form-item>
                <el-form-item label="是否单点登陆" prop="web_sso">
                  <el-radio-group v-model="temp.web_sso">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              <el-form-item label="上传头像" prop="admin_avatar">
                <!--<el-upload action="http://pf8ti57gk.bkt.clouddn.com" :data="form" drag :multiple="true"-->
                <el-upload class="avatar-uploader" action="http://upload.qiniu.com" :data="form" :multiple="false" v-if="!uploading"
                           ref="upload"
                           :show-file-list="false"
                           :before-upload="beforeUpload"
                           :on-progress="handleProgress"
                           :on-success="handleSuccess"
                           :on-error="handleError"
                >
                  <img v-if="temp.admin_avatar" :src="temp.admin_avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-progress v-else :percentage="percent"></el-progress>
              </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
                <el-button v-else type="primary" @click="updateData">确定</el-button>
            </div>
        </el-dialog>

        <!--弹出窗口：修改用户角色-->
        <el-dialog title="修改用户的角色" :visible.sync="editRolesDialogVisible" width="30%">
            <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="updateUserRolesData.rids">
                    <el-checkbox class="role-checkbox" v-for="role in roleOptions" :label="role._id" :key="role._id">
                        {{role.rname}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editRolesDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="checkUpdateUserRolesData">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getSystemList,getSystemRole,updateSystemRole,updateSystemStatus,createNewAdministrator,updateAdministrator} from '@/api/system'
    import {getToken} from '@/api/qiniu'
    import { debounce ,resetTemp} from '@/utils'
    import {root,confirm,pageParamNames} from '@/utils/constants'
    import {asyncRouterMap} from '@/router' //路由表，定义了菜单和按钮的元数据，可以用来生成权限控制的菜单按钮树
    export default {
        name: 'UserManage',
        data() {
            return {
              uploading: false,
                loaded: 0,
                fileSize: 0,
                percent: 0,
                imgUrl:'',
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
                    admin_gender: true,        //1.男 0.女
                    web_sso: false,             //1.单点登录 0.多人登录
                    admin_avatar: null,     //头像url
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
                    admin_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { pattern: /^(\w){4,20}$/, message: '只能输入4-20个字母、数字、下划线',trigger: 'blur'}
                    ],
                    full_name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                    ],
                    admin_mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
                    ],
                    admin_password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' },
                        { pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线',trigger: 'blur'}
                    ]
                },

                checkAll: false,
                editRolesDialogVisible: false,
                isIndeterminate: true,
                //所有角色(管理员除外)
                roleOptions:[],
                roleMap: new Map(),
                // 更新用户的角色的数据
                updateUserRolesData: {
                    idx: null,
                    uid: null,
                    rids: []
                },
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    0: 'danger',
                    true: 'success',
                    false: 'danger',
                };
                return statusMap[status]
            }
        },

        created() {
            this.initData();
            this.fetchData()
        },

        watch: {
            //延时查询
            'listQuery.content': debounce(function () {
                this.fetchData(1)
            }, 500)
        },

        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            initData() {
                //所有角色选项
                getSystemRole({ page_index: 1,page_size: 10000,}).then(res => {

                    res.data.list.forEach(obj => {
                        if (obj.rval != root.rval) {//排除管理员
                            this.roleOptions.push(obj);
                            this.roleMap.set(obj._id, obj.rname)
                        }
                    })
                })
            },

            hasAdminRole(row) { //过滤超级管理员
                if (row && row.role_list) {
                    return row.role_list.some(role => role.rval == root.rval)
                }
                return false
            },

            //全选
            handleCheckAllChange(val) {
                let allRids = this.roleOptions.map(role => role._id);
                this.updateUserRolesData.rids = val ? allRids : [];
                this.isIndeterminate = false;
            },

            //分页
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.page_index = val;
                this.fetchData();
            },

            //查询
            fetchData(current) {
                if (current) {
                    this.listQuery.page_index = current
                }
                this.listLoading = true;
                getSystemList(this.listQuery).then(response => {
                  console.log('response',response)
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                });
            },

            //更新
            handleUpdate(idx, row) {
                this.temp = Object.assign({}, row);
                this.temp.idx = idx;
                console.log('this.temp111',this.temp)
                this.getToken();
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.$nextTick(() => this.$refs['dataForm'].clearValidate())
            },
            updateData() {
              this.$refs['dataForm'].validate((valid) => {
                if (!valid) return;
                let administrator = {
                  id: this.temp._id,
                  admin_name:this.temp.admin_name,
                  admin_password:this.temp.admin_password,
                  full_name:this.temp.full_name,
                  admin_gender:this.temp.admin_gender,
                  web_sso: this.temp.web_sso,             //1.单点登录 0.多人登录
                  admin_avatar: this.temp.admin_avatar,     //头像url
                  admin_mobile: this.temp.admin_mobile,     //用户手机号码
                };
                updateAdministrator(administrator).then(res => {
                  if(res){
                    this.$message.success("编辑成功");
                    this.dialogFormVisible = false;
                    this.fetchData();
                  }
                });
              })
            },


            //更新用户的角色
            handleUpdateUserRoles(idx, row) {
                // 显示用户的角色
                this.updateUserRolesData = {
                    idx: idx,
                    uid: row._id,
                    rids: row.role_list.map(role=>role._id)
                };
                // 显示弹窗
                this.editRolesDialogVisible = true;
            },

            checkUpdateUserRolesData() {
                const noRolesSelected = this.updateUserRolesData && this.updateUserRolesData.rids && this.updateUserRolesData.rids.length ==0;
                if(noRolesSelected){
                    this.$confirm('当前没有选中任何角色，会清除该用户已有的角色, 是否继续?', '提示', confirm).then(() => {
                        this.invokeUpdateUserRolesApi()
                    }).catch(() => {
                        this.$message("已取消编辑用户角色");
                    });
                }else{
                    this.invokeUpdateUserRolesApi()
                }
            },

            invokeUpdateUserRolesApi() {    //更新角色的函数
                //修改用户角色
                updateSystemRole({ id: this.updateUserRolesData.uid,admin_roles: this.updateUserRolesData.rids}).then(res => {
                    let newRoles = this.updateUserRolesData.rids.map(rid=>{
                        let rname = this.roleMap.get(rid);
                        if(rname) return {_id:rid,rname}
                    });
                    this.list[this.updateUserRolesData.idx].role_list = newRoles;
                    this.editRolesDialogVisible = false;
                    this.$message.success("更新成功")
                })
            },

            //修改用户状态    //status  1(恢复) 0 (锁定)
            updateSystemStatus(idx, row,status) {
                this.$confirm('您确定要永久删除该用户？', '提示', confirm).then(() => {
                    updateSystemStatus({id:row._id,status:status}).then(res => {
                        this.fetchData();
                        this.$message.success("删除成功")
                    });
                }).catch(() => {
                    this.$message.info("已取消删除")
                });
            },

            //新增
            handleCreate() {
                this.temp={
                  idx: null,
                  uid: null,
                  admin_name: null,
                  full_name: null,
                  admin_gender: true,        //1.男 0.女
                  web_sso: false,             //1.单点登录 0.多人登录
                  admin_avatar: null,     //头像url
                  admin_mobile: null,
                  created: null,
                  updated: null
                };
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                });
                this.getToken();
            },
            //获取七牛token
            getToken(){
                getToken().then(res => {
                    console.log('res',res);
                    this.form.token = res.token;
                    this.imgUrl = res.host
                })
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (!valid) return;
                    let administrator = {
                        admin_name:this.temp.admin_name,
                        admin_password:this.temp.admin_password,
                        full_name:this.temp.full_name,
                        admin_gender:this.temp.admin_gender,
                        web_sso: this.temp.web_sso,             //1.单点登录 0.多人登录
                        admin_avatar: this.temp.admin_avatar,     //头像url
                        admin_mobile: this.temp.admin_mobile,     //用户手机号码
                    };
                    createNewAdministrator(administrator).then(res => {
                        if(res){
                            this.$message.success("添加成功");
                            this.dialogFormVisible = false;
                            this.fetchData();
                        }
                    });
                })
            },
            beforeUpload (file) {
              this.form.key = new Date().getTime()
              const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
              const isLt2M = file.size / 1024 / 1024 < 2;

              if (!isJPG) {
                this.$message.error('只能上传图片!');
              }
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
              }
              return isJPG && isLt2M;

            },
            handleProgress (event, file, fileList) {
              this.uploading = true

              this.loaded = (event.loaded / 1000000).toFixed(2)
              this.fileSize = (event.total / 1000000).toFixed(2)
              this.percent = Number((event.loaded / event.total * 100).toFixed(2))
            },
            handleSuccess (response, file, fileList) {
              console.log('上传成功',response,file,fileList)
              this.temp.admin_avatar = this.imgUrl + '/' + this.form.key
              this.result = '上传成功'
              this.percent = 0
              this.uploading = false
              this.$message.success('上传成功');
            },
            handleError (error, response, file) {
              console.log('上传失败',error,response,file)
              this.result = error.toString()
              this.uploading = false
              this.$message.error('上传失败');
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .role-checkbox {
        margin-left: 0px;
        margin-right: 15px;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 0;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px solid #ccc;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
