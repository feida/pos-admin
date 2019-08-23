<template>
    <div class="app-container">
        <!--查询  -->
        <el-row >
            <el-input style="width:200px;" v-model="listQuery.content" placeholder="用户名"></el-input>
            <span style="margin-right: 15px;"></span>
            <el-tooltip class="item" content="搜索" placement="top">
                <el-button icon="el-icon-search" circle @click="fetchData(1)"></el-button>
            </el-tooltip>
        </el-row>
        <span style="margin-right: 30px;"></span>
        <!--列表-->
        <el-table  :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;" >

            <el-table-column align="center" label="操作描述" >
                <template slot-scope="scope">
                    <span>{{scope.row.admin_action}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="用户ID" >
                <template slot-scope="scope">
                    <span>{{scope.row.admin_id?scope.row.admin_id._id:"-" }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="用户名" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_id?scope.row.admin_id.admin_name:"-"}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="真实姓名" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_id?scope.row.admin_id.full_name:"-"}}</span>
                </template>
            </el-table-column>

            <el-table-column width="150px" align="center" label="手机号码">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_id?scope.row.admin_id.admin_mobile:"-"}}</span>
                </template>
            </el-table-column>

            <el-table-column width="70px" align="center" label="性别">
                <template slot-scope="scope">
                    <span>{{scope.row.admin_id?scope.row.admin_id.admin_gender?"男":"女":"-"}}</span>
                </template>
            </el-table-column>

            <el-table-column width="100px" align="center" label="单点登陆">
                <template slot-scope="scope">
                    <el-tag :type="(scope.row.admin_id?scope.row.admin_id.web_sso :'-')| statusFilter">{{scope.row.admin_id?scope.row.admin_id.web_sso == true ?"是":"否":'-'}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="更新时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column label="操作" fixed="right" width="160px">-->
                <!--<template slot-scope="scope">-->
                <!--</template>-->
            <!--</el-table-column>-->
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
    import {getAdministratorRecordList} from '@/api/system';
    import { debounce ,resetTemp} from '@/utils';
    export default {
        name: 'administrator_record',
        data() {
            return {
                x:{
                    a:"foo",
                },
                listLoading: true,
                list: null,
                listQuery: {
                    page_index: 1,
                    page_size: 10,
                    total: 0,
                    content: null
                }
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    true: 'success',
                    false: 'danger'
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
                    this.listQuery.page_index = current
                }
                this.listLoading = true;
                getAdministratorRecordList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                });
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
