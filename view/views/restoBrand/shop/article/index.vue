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
        <el-table style="width: 100%" :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe border fit highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand" >
                        <el-form-item label="店铺ID" style="width: 49%"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></el-form-item>
                        <el-form-item label="品牌ID" style="width: 49%"><span @click='handleCopy(scope.row.brand_id,$event)'>{{scope.row.brand_id }}</span></el-form-item>
                        <el-form-item label="店铺地址" style="width: 49%"><span>{{scope.row.address }}</span></el-form-item>
                        <el-form-item label="店铺电话" style="width: 49%"><span>{{scope.row.phone }}</span></el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="brand_name" label="品牌名称" width="130px"></el-table-column>
            <el-table-column prop="name" label="店铺名称" width="220px"></el-table-column>
            <el-table-column prop="mode" label="店铺模式" width="130px"></el-table-column>
            <el-table-column  label="店铺激活码" width="160px">
                <template slot-scope="scope">
                    <span @click='handleCopy(scope.row.pos_key,$event)'>
                        {{scope.row.pos_key | keyFilter }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    class-name="status-col"
                    label="是否开启2.0"
                    width="110px"
                    prop="pos_version"
                    :filters="[{ text: '是', value: 1 }, { text: '否', value: 0 }]"
                    :filter-method="filterPosVersion"
                    filter-placement="bottom-end">
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

            <el-table-column label="操作" fixed="right" width="200px">
                <template slot-scope="scope">
                    <el-tooltip content="指令" placement="top">
                        <router-link :to="'/restoBrand/instruction/'+scope.row.brand_id+'/'+scope.row.id">
                            <!--<el-button type="primary" size="small" icon="el-icon-edit">指令</el-button>-->
                            <el-button type="text" size="small" >指令</el-button>
                        </router-link>
                    </el-tooltip>
                    <el-tooltip content="新窗口" placement="top">
                        <a :href ="`http://pos.kc.restoplus.cn/pos/LocalPosSyncData/serverCommand?brandId=`+scope.row.brand_id+`&shopId=`+scope.row.id+`&type=serverCommand&sql=`" target="_blank">
                            <el-button type="text" size="small" >窗口指令</el-button>
                        </a>
                    </el-tooltip>
                    <el-tooltip content="日志" placement="top">
                        <a :href ="`http://newpos.log.restoplus.cn/log/`+currentDate+`/`+scope.row.brand_name+`/`+scope.row.name+``" target="_blank">
                            <el-button type="text" size="small" >日志</el-button>
                        </a>
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
        getShopDetailList
    } from '@/api/restoBrand'
    import debounce from 'lodash/debounce'
    import moment from 'moment'
    import clip from '@/utils/clipboard'
    import clipboard from '@/directive/clipboard/index.js'


    export default {
        name: 'shopManage',
        directives: {
            clipboard
        },
        data() {
            return {
                listLoading: true,
                currentDate: moment().format('YYYY-MM-DD'),
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
            },
            keyFilter(key) {
                if(key){
                    return key.replace(/\s/g,' ').replace(/(.{4})/g,"$1 ");
                }
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
            handleCopy(text, event) {
                clip(text, event)
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
                getShopDetailList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                })
            },
            filterPosVersion(value, row, column) {
                return row.pos_version === value;
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
