<template>
    <div class="app-container">

        <el-button type="primary" icon="el-icon-plus" size="mini" @click="platformUserCreate" v-perm="'b:platform_user:add'">{{textMap.create}}</el-button>
        <div style="margin-bottom: 5px;"></div>
        <!--列表-->
        <el-table style="width: 100%" :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe border fit highlight-current-row>
            <el-table-column  label="id" width="150px" :show-overflow-tooltip="true">
                <template slot-scope="scope"><span @click='handleCopy(scope.row._id,$event)'>{{scope.row._id }}</span></template>
            </el-table-column>
            <el-table-column  prop="user_name" label="用户名" width="150"> </el-table-column>
            <el-table-column  prop="merchant_brand" label="品牌" width="150"> </el-table-column>
            <el-table-column  label="token" width="250">
                <template slot-scope="scope">
                    <span @click='handleCopy(scope.row.login_token?scope.row.login_token.token:"",$event)'>
                        {{scope.row.login_token?scope.row.login_token.token:"" }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column   label="有效期" width="180">
                <template slot-scope="scope">
                    <span>{{(scope.row.login_token? scope.row.login_token.expire:"")  | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </template>
            </el-table-column>
            <el-table-column  prop="login_token.token_update_time" label="上次更新时间" width="180">
                <template slot-scope="scope">
                    <span>{{(scope.row.login_token? scope.row.login_token.token_update_time:"")  | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </template>
            </el-table-column>
            <el-table-column  label="平台" width="150">
                <template slot-scope="scope">
                    <el-tag >{{scope.row.platform_type == 1?"饿了么":"美团"}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160px">
                <template slot-scope="scope">
                    <el-tooltip content="平台数据更新" placement="top">
                        <el-button @click="platformDataUpdate(scope.$index,scope.row)" size="mini" type="info" icon="el-icon-refresh" circle plain></el-button>
                    </el-tooltip>
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
    </div>
</template>

<script>
    import {
        getMerchantUserList,
        startImplementOnceTask
    } from '@/api/spider'
    import clip from '@/utils/clipboard'
    import clipboard from '@/directive/clipboard/index.js'
    import debounce from 'lodash/debounce'

    export default {
        name: 'businessManage',
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
                temp: {
                    idx: null,
                    uid: null,
                    user_name:null,
                    user_password:null,
                    merchant_brand:null,
                    platform_type:1,
                    recently_spider_time:null,
                    created: null,
                    updated: null
                },
                textMap: {
                    update: '编辑用户',
                    create: '新增用户'
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

            //分页
            handleSizeChange(val) {
                this.listQuery.page_size = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.page_index = val;
                this.fetchData();
            },
            handleCopy(text, event) {
                clip(text, event)
            },
            //查询
            fetchData(current) {
                if (current) {
                    this.listQuery.page_index = current
                }
                this.listLoading = true;
                getMerchantUserList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                })
            },
            platformDataUpdate(index,row){
                startImplementOnceTask({merchant_user_id:row._id}).then(response => {
                    this.$message.success(response.message)
                })
            },
            platformUserCreate(){

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .demo-table-expand {
        font-size: 5px;
    }
    .demo-table-expand label {
        width: 40px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
