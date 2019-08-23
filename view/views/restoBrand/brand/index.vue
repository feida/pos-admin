<template>
    <div class="app-container">

        <!--查询  -->
        <el-row style="margin-bottom: 30px;">
            <el-input style="width:200px;" v-model="listQuery.content" placeholder="品牌/店铺/模式"></el-input>
            <span style="margin-right: 15px;"></span>
            <el-tooltip class="item" content="搜索" placement="top">
                <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
            </el-tooltip>
        </el-row>

        <!--列表-->
        <el-table style="width: 100%" :data="list" v-loading.body="listLoading" element-loading-text="Loading"  stripe border fit highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand" >
                        <el-form-item label="店铺ID" style="width: 49%"><span>{{scope.row.id }}</span></el-form-item>
                        <el-form-item label="品牌ID" style="width: 49%"><span>{{scope.row.brand_id }}</span></el-form-item>
                        <el-form-item label="店铺地址" style="width: 49%"><span>{{scope.row.address }}</span></el-form-item>
                        <el-form-item label="店铺电话" style="width: 49%"><span>{{scope.row.phone }}</span></el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="brand_name" label="品牌名称" width="130px"></el-table-column>
            <el-table-column prop="name" label="店铺名称" width="220px"></el-table-column>
            <el-table-column prop="mode" label="店铺模式" width="130px"></el-table-column>
            <el-table-column prop="pos_key" label="店铺激活码" width="160px"></el-table-column>
            <el-table-column class-name="status-col" label="是否开启2.0" width="110px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.pos_version | statusFilter">{{scope.row.pos_version == 1?"是":"否"}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="城市" width="100px"></el-table-column>
            <el-table-column  label="营业时间" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.open_time }}</span> - <span>{{scope.row.close_time }}</span>
                </template>
            </el-table-column>
            <el-table-column  label="更新时间" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
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
        getShopDetailList
    } from '@/api/restoBrand'
    import debounce from 'lodash/debounce'

    export default {
        name: 'shopManage',
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
                    id: null,
                    name: null,
                    open_time: null,
                    close_time: null,
                    update_time:null
                }
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    0: 'danger'
                };
                return statusMap[status]
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

            //查询
            fetchData(current) {
                if (current) {
                    this.listQuery.page_index = current
                }
                this.listLoading = true;
                getShopDetailList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                })
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
