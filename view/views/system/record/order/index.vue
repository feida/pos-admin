<template>
    <div class="app-container">

        <!--查询  -->
        <el-row style="margin-bottom: 30px;">


            <el-input style="width:14rem;" v-model="listQuery.content" placeholder="id/流水号" clearable></el-input>
            <span style="margin-right: 15px;"></span>
            <el-tooltip class="item" content="搜索" placement="top">
                <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
            </el-tooltip>
        </el-row>


        <!--列表-->
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" size="mini">
            <el-table-column align="center" label="品牌/门店" width="170">
                <template slot-scope="scope">
                    <span>{{scope.row.brand_name}}/{{scope.row.shop_name}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="用户名" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_id?scope.row.admin_id.full_name:"-"}}</span>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="更新时间" width="140px">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="更新内容" width="175px">
                <template slot-scope="scope">
                    <el-tag style="margin: 2px;" type="success" v-for="action of scope.row.action_details" >{{action}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="订单流水号" width="170px">
                <template slot-scope="scope">
                    <span>{{scope.row.serial_number }}</span>
                </template>
            </el-table-column>

            <el-table-column   align="center" label="订单状态" width="95px">
                <template slot-scope="scope">
                    <span>{{scope.row.order_state }}</span>
                </template>
            </el-table-column>

            <el-table-column   align="center" label="打印状态" width="95px">
                <template slot-scope="scope">
                    <span>{{scope.row.production_status }}</span>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="原订单金额" width="105px">
                <template slot-scope="scope">
                    <span>{{scope.row.order_money }}</span>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="原订单累计金额" width="125px">
                <template slot-scope="scope">
                    <span>{{scope.row.amount_with_children }}</span>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="原pos折扣金额" width="125px">
                <template slot-scope="scope">
                    <span>{{scope.row.order_pos_discount_money }}</span>
                </template>
            </el-table-column>

            <el-table-column  align="center" label="原订单抹零金额" >
                <template slot-scope="scope">
                    <span>{{scope.row.erase_money }}</span>
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
    </div>
</template>

<script>
    import {getOrderUpdateRecordList} from '@/api/record'
    import {getConstantList} from '@/api/constant'
    import debounce from 'lodash/debounce'
    export default {
        name: 'order_record',
        data() {
            return {
                listLoading: true,
                list: null,
                listQuery: {
                    page_index: 1,
                    page_size: 10,
                    total: 0,
                    content: null
                },
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
                this.fetchData()
            }, 500)
        },
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
                    this.listQuery.page_index = current;
                }
                this.listLoading = true;
                getOrderUpdateRecordList(this.listQuery).then(response => {
                    this.list = response.data.list;

                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                });
            },
        }
    }
</script>

