<template>
    <div class="app-container">
        <!--订单信息  -->
        <label class="radio-label" style="padding-left:0;" >订单修改记录:</label>
        <template>
            <el-table :data="orderRecordList" v-loading="listLoading" border  style="width: 100%" size="mini">
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

                <el-table-column  align="center" label="订单id" width="235px">
                    <template slot-scope="scope">
                        <span>{{scope.row.order_id }}</span>
                    </template>
                </el-table-column>


                <el-table-column  align="center" label="订单流水号" width="160px">
                    <template slot-scope="scope">
                        <span>{{scope.row.serial_number }}</span>
                    </template>
                </el-table-column>

                <el-table-column   align="center" label="原订单状态" width="85px">
                    <template slot-scope="scope">
                        <span>{{scope.row.order_state }}</span>
                    </template>
                </el-table-column>

                <el-table-column   align="center" label="原打印状态" width="85px">
                    <template slot-scope="scope">
                        <span>{{scope.row.production_status }}</span>
                    </template>
                </el-table-column>

                <el-table-column  align="center" label="原订单金额" width="95px">
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

                <el-table-column  align="center" label="原订单抹零金额"  >
                    <template slot-scope="scope">
                        <span>{{scope.row.erase_money }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--支付信息  -->
        <br>
        <label class="radio-label" style="padding-left:0;" >订单支付项修改记录:</label>

        <template>
            <el-table :data="paymentRecordList" v-loading="listLoading" border  style="width: 100%" size="mini">
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

                <el-table-column  align="center" label="订单id" width="235px">
                    <template slot-scope="scope">
                        <span>{{scope.row.order_id }}</span>
                    </template>
                </el-table-column>

                <el-table-column  align="center" label="原支付项" width="105px">
                    <template slot-scope="scope">
                        <!--<span>{{scope.row.payment_mode_id }}</span>-->
                        <span>{{scope.row.payment_mode_id |paymentModeFilter(paymentMapOptions)}}</span>  ||  <span>{{scope.row.payment_mode_id }}</span>
                    </template>
                </el-table-column>

                <el-table-column  align="center" label="原支付订单金额" >
                    <template slot-scope="scope">
                        <span>{{scope.row.pay_value }}</span>
                    </template>
                </el-table-column>


            </el-table>
        </template>
        <!--菜品信息  -->
        <br>
        <!--<label class="radio-label" style="padding-left:0;" >订单菜品项数据: </label>-->
        <!--<template>-->
            <!--<el-table :data="articleList" v-loading="orderListLoading" border show-summary style="width: 100%" size="mini">-->
                <!--<el-table-column  label="ID" width="238">-->
                    <!--<template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>-->
                <!--</el-table-column>-->
                <!--<el-table-column  prop="article_name" label="菜品名称" width="150"> </el-table-column>-->
                <!--<el-table-column  prop="final_price" label="菜品价格(final_price)" width="140"> </el-table-column>-->
                <!--<el-table-column  label="菜品类型" width="100">-->
                    <!--<template slot-scope="scope"><span>{{scope.row.type }}</span></template>-->
                <!--</el-table-column>-->

                <!--<el-table-column  prop="count" label="当前数量" width="100"> </el-table-column>-->
                <!--<el-table-column  prop="refund_count" label="退菜数量" width="100"> </el-table-column>-->
                <!--<el-table-column  label="折扣" width="100">-->
                    <!--<template slot-scope="scope"><span>{{scope.row.pos_discount }}</span></template>-->
                <!--</el-table-column>-->
                <!--<el-table-column   label="创建时间" width="150">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="操作" fixed="right" width="160rem;">-->
                    <!--<template slot-scope="scope">-->

                        <!--<el-tooltip content="修改newpos部分内容" placement="top">-->
                            <!--<el-button type="text" size="small" @click="syncUpdate(scope.row,`tb_order_item`)">修改</el-button>-->
                        <!--</el-tooltip>-->

                        <!--<el-tooltip content="添加newpos此记录" placement="top">-->
                            <!--<el-button type="text" size="small" @click="syncInsert(scope.row,`tb_order_item`)">添加</el-button>-->
                        <!--</el-tooltip>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        <!--</template>-->

    </div>
</template>

<script>

    import {
        getOrderRecordDetailsByOrderId
    } from '@/api/record'
    import {
        getConstantList
    } from '@/api/constant'
    import debounce from 'lodash/debounce'
    import moment from 'moment'


    export default {
        name: 'shopManage',
        directives: {

        },
        data() {
            return {
                currentDate: moment().format('YYYY-MM-DD'),

                //支付项选择框
                paymentMapOptions: [],
                paymentMapCode: null,

                listLoading: true,
                orderRecordList: [],
                paymentRecordList: [],

                listQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    shop_id: this.$route.params && this.$route.params.shop_id,
                    order_id:this.$route.params && this.$route.params.order_id,
                    page_size:100
                },
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                };
                return statusMap[status]
            },
            paymentModeFilter(id,paymentMap) {
                let newArr = paymentMap.filter(item => item.code == id);
                if(newArr.length>0){
                    return newArr[0].name
                }
            }
        },
        created() {
            this.fetchPaymenConstantData()
            // this.fetchData()
        },

        methods: {

            //获取支付常量
            fetchPaymenConstantData() {
                getConstantList({type:1}).then(response => {
                    this.paymentMapOptions = response.data.constantList;
                    this.fetchData()
                });
            },
            handleCopy(text, event) {
                clip(text, event)
            },
            //查询
            fetchData() {
                getOrderRecordDetailsByOrderId(this.listQuery).then(response => {
                    this.orderRecordList = response.data.getOrderUpdateRecordList;
                    this.paymentRecordList = response.data.getOrderPaymentItemUpdateRecordList;

                    this.listLoading = false;
                });
            },
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

    .edit-input {
        padding-right: 0px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 8px;
    }
</style>
