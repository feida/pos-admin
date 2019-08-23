<template>
    <div class="app-container">


        <!--列表-->
        <el-table style="width: 100%" :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe border fit highlight-current-row>
            <el-table-column  label="id" width="150px" :show-overflow-tooltip="true">
                <template slot-scope="scope"><span @click='handleCopy(scope.row._id,$event)'>{{scope.row._id }}</span></template>
            </el-table-column>
            <el-table-column  prop="statistics_date" label="日期" width="150"> </el-table-column>
            <el-table-column  prop="turnover" label="营业额" width="150"> </el-table-column>
            <el-table-column  prop="settleAcc" label="预计订单收入" width="150"> </el-table-column>
            <el-table-column  prop="effectiveOrders" label="有效订单" width="150"> </el-table-column>
            <el-table-column  prop="invalidOrders" label="无效订单" width="150"> </el-table-column>
            <el-table-column  prop="merchant_user_id.merchant_brand" label="品牌" width="150"></el-table-column>
            <el-table-column  label="更新时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.update_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
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
        getBusinessStatisticsInfo
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
                getBusinessStatisticsInfo(this.listQuery).then(response => {
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
