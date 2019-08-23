<template>
    <div class="app-container">
        <!--查询-->
        <el-row>
            <el-input style="width:230px;" v-model="listQuery.content" placeholder="角色名\角色值"></el-input>
                <span style="margin-right: 15px;"></span>
            <el-tooltip class="item" content="搜索" placement="top">
            <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
            </el-tooltip>
        </el-row>
        <div style="margin-bottom: 30px;"></div>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleCreate">{{textMap.create}}</el-button>
        <div style="margin-bottom: 30px;"></div>
        <!--列表-->
        <el-table style="width: 100%"
                  :data="list"
                  v-loading.body="listLoading"
                  element-loading-text="Loading"
                  border fit highlight-current-row>
            <el-table-column prop="_id" label="角色id"></el-table-column>
            <el-table-column prop="rname" label="角色名"></el-table-column>
            <el-table-column prop="rdesc" label="角色描述"></el-table-column>
            <el-table-column prop="rval" label="角色值"></el-table-column>

            <el-table-column label="操作" fixed="right" width="160px">
                <template slot-scope="scope">
                    <el-tooltip content="编辑" placement="top">
                        <el-button @click="handleUpdate(scope.$index,scope.row)" size="medium" type="info" icon="el-icon-edit" circle plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="修改权限" placement="top" v-if="!hasAdminRole(scope.row)">
                        <el-button @click="handleUpdateRolePerms(scope.$index,scope.row)" size="medium" type="warning" icon="el-icon-view" circle plain></el-button>
                    </el-tooltip>
                    <el-tooltip content="删除" placement="top" v-if="!hasAdminRole(scope.row)">
                        <el-button @click="handleDelete(scope.$index,scope.row)" size="medium" type="danger" icon="el-icon-delete" circle plain></el-button>
                    </el-tooltip>
                    <el-popover trigger="hover" placement="top" v-else style="display: inline-block;">
                        <el-alert type="warning" :closable="false" title="权限说明">
                            <div>为保证管理员在系统中的最高权限</div>
                            <div>不允许编辑管理员自身的权限</div>
                            <div>不允许删除管理员角色</div>
                        </el-alert>
                        <div slot="reference">
                            <el-tag style="margin-left: 10px;" type="info">权限说明</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-bottom: 30px;"></div>

        <!--分页-->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.page_index" :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper"
                           :total="listQuery.total">
            </el-pagination>
        </div>

        <!--弹出窗口：编辑角色-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="30%">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="150px" >
                <el-form-item label="角色名" prop="rname" >
                    <el-input v-model="temp.rname"></el-input>
                </el-form-item>
                <el-form-item label="角色值" prop="rval" v-if="dialogStatus=='create'">
                    <el-input v-model="temp.rval"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="rdesc">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入" v-model="temp.rdesc"></el-input>
                </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>

    import {
        getRoleList,
        updateRole,
        deleteRole,
        addRole
    } from '@/api/system'
    import {parseTime, resetTemp} from '@/utils'
    import {pageParamNames, confirm, root} from '@/utils/constants'
    import debounce from 'lodash/debounce'

    export default {
        name: 'RoleManage',
        data() {
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
                    idx: null,//表格的下标
                    _id: null,
                    rname: null,
                    rdesc: null,
                    rval: null,
                },
                textMap: {
                    update: '编辑角色',
                    create: '新增角色'
                },
                rules: {
                    rname: [{required: true, message: '必填', trigger: 'blur'}],
                    rval:  [{required: true, message: '必填', trigger: 'blur'},{pattern: /^[a-z]{3,20}$/, message: '只能输入3-20个小写字母',trigger: 'blur'}]
                },
            }
        },

        created() {
            this.fetchData()
        },

        watch: {
            //延时查询
            'listQuery.content': debounce(function () {
                this.fetchData(1)
            }, 500)
        },//watch

        methods: {
            parseTime,
            hasAdminRole(row) {
                return row && row.rval == root.rval
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
                getRoleList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                })
            },

            //更新
            handleUpdate(idx, row) {
                this.temp = Object.assign({}, row);
                this.temp.idx = idx;
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.$nextTick(() => this.$refs['dataForm'].clearValidate())
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (!valid) return;
                    const tempData = Object.assign({}, this.temp);
                    tempData.rid = tempData._id;
                    updateRole(tempData).then(res => {
                        if(res){
                            if(!res.ok) return this.$message.error(res.message);
                            this.list.splice(tempData.idx, 1, tempData);
                            this.dialogFormVisible = false;
                            this.$message.success('更新角色信息成功')
                        }

                    })
                })
            },

            //更新用户的角色
            handleUpdateRolePerms(idx, row) {
                this.$router.push({path: '/system/role_manage/' + row._id + '/assign_perm'})
            },

            //删除
            handleDelete(idx, row) {
                this.$confirm('您确定要永久删除该用户？', '提示', confirm).then(() => {
                    deleteRole({rid: row._id}).then(res => {
                        if(res){
                            if(!res.ok) return this.$message.error(res.message);
                            this.list.splice(idx, 1);
                            --this.list.total;
                            this.dialogFormVisible = false;
                            this.$message.success('删除角色成功')
                        }
                    })
                }).catch(() => {
                    this.$message.info('已取消删除')
                })
            },

            //新增
            handleCreate() {
                resetTemp(this.temp);
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
                this.$nextTick(() => this.$refs['dataForm'].clearValidate())
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (!valid) return;
                    addRole(this.temp).then((res) => {
                        if(res){
                            if(!res.ok) return  this.$message.error(res.message);
                            this.temp._id = res.role_id;
                            this.list.unshift(Object.assign({}, this.temp));
                            ++this.list.total;
                            this.dialogFormVisible = false;
                            this.$message.success('添加角色成功')
                        }
                    })
                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
