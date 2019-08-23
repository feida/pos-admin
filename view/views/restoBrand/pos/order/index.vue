<template>
    <div class="app-container">

        <!--查询  -->
        <el-row style="margin-bottom: 30px;">
            <el-cascader
                    style="width:14rem;"
                    :options="options"
                    change-on-select
                    filterable
                    placeholder="请选择品牌或店铺"
                    v-model="defaultOptions"
                    size="mini"
            ></el-cascader>

            <el-input style="width:14rem;" v-model="listQuery.content" placeholder="id/流水号" clearable size="mini"></el-input>
            <span style="margin-right: 15px;"></span>
            <el-tooltip class="item" content="搜索" placement="top">
                <el-button icon="el-icon-search" circle   @click="fetchData(1)" size="mini"></el-button>
            </el-tooltip>

            <el-date-picker
                    v-model="gatherDate"
                    type="date"
                    placeholder="数据采集"
                    size="mini">
            </el-date-picker>
            <el-button type="primary" size="mini" v-perm="'b:pos:order:details:gather'" @click="startGather()">执行</el-button>

        </el-row>

        <!--列表-->
        <el-table style="width: 100%" :data="list" v-loading.body="listLoading" element-loading-text="Loading" show-summary stripe border fit highlight-current-row>
            <el-table-column prop="id" label="id" width="120px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="parent_order_id" label="主订单ID" width="120px" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="serial_number" label="流水号" width="170px" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column prop="table_number" label="桌号" width="80px"></el-table-column>
            <el-table-column prop="accounting_time" label="时间" width="100px"></el-table-column>
            <el-table-column prop="order_state" label="支付状态" width="100px"></el-table-column>
            <el-table-column prop="production_status" label="打印状态" width="100px"></el-table-column>

            <el-table-column prop="order_money" label="订单金额" width="120px"></el-table-column>
            <el-table-column prop="amount_with_children"  label="订单累计金额" width="200px"></el-table-column>
            <el-table-column prop="shop_detail_id"  label="店铺ID" width="200px" :show-overflow-tooltip="true"></el-table-column>


            <el-table-column label="操作" fixed="right" width="100rem;">
                <template slot-scope="scope">
                    <el-tooltip content="详情" placement="top">
                        <router-link :to="'/shop_manage/pos_order_details/'+listQuery.brand_id+'/'+scope.row.shop_detail_id+'/'+`${scope.row.parent_order_id?scope.row.parent_order_id:scope.row.id}`">
                            <el-button type="text" size="small" >详情</el-button>
                        </router-link>
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
        getBrandShopAll
    } from '@/api/restoBrand'
    import {
        getOrderListByBrandIdShopId
    } from '@/api/newpos'
    import {
        newposPush
    } from '@/api/emqPush'
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
                options: [],        // 店铺选择
                value:[],
                defaultOptions: [`${this.$route.params && this.$route.params.brand_id}`,`${this.$route.params && this.$route.params.shop_id}`],        // 店铺跳转的默认值
                listLoading: true,
                list: [],
                listQuery: {
                    brand_id:this.$route.params && this.$route.params.brand_id,
                    shop_id:this.$route.params && this.$route.params.shop_id,
                    page_index: 1,
                    page_size: 10,
                    total: 0,
                    content: null
                },
                gatherDate:'',
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
            this.fetchOptions();
        },

        watch: {
            //延时查询
            'listQuery.content': debounce(function () {
                this.fetchData(1)
            }, 500),
            //延时查询
            'defaultOptions': debounce(function () {    //二级联动
                this.handleItemChange()
            }, 1000)
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
                getOrderListByBrandIdShopId(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                })
            },
            //获取品牌\门店信息
            fetchOptions() {
                getBrandShopAll().then(response => {
                    this.options = response.data.options;
                    if(this.$route.params.brand_id ==`:brand_id`){
                        this.listQuery.brand_id = response.data.defaultBrandId;
                        this.listQuery.shop_id = response.data.defaultShopId;
                        this.defaultOptions = [`${this.listQuery.brand_id}`,`${this.listQuery.shop_id}`];
                    }
                    this.fetchData();
                })
            },
            handleItemChange() {
                this.listQuery.brand_id = this.defaultOptions[0];
                this.listQuery.shop_id = this.defaultOptions[1];
                this.fetchData(1)
            },
            startGather() {
                if(!this.gatherDate){
                    return this.$message.error(`请先选择采集日期`)
                }
                if(this.listQuery.brand_id && this.listQuery.shop_id){
                    let random = `${moment().format('x')}`;
                    let param = {
                        brand_id:this.listQuery.brand_id,
                        shop_id:this.listQuery.shop_id,
                        group:`instruct`,
                        action:`gather`,
                        id:random,
                        content:{
                            "message_id":random,
                            "date": moment(this.gatherDate).format('YYYY-MM-DD'),
                        }
                    };
                    newposPush(param).then(response => {
                        if(response.ok){
                            this.$message.success("采集成功");
                            let that = this;
                            setTimeout(function(){that.fetchData(1)}, 2000);
                        }else {
                            this.$message.error(response.message)
                        }
                    });
                }else {
                    return this.$message.error(`采集必须选择门店`)
                }
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
