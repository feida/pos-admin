<template>
    <div class="app-container">

        <!--订单信息  -->
        <label class="radio-label" style="padding-left:0;">
             订单数据:
            <a :href ="`http://pos.kc.restoplus.cn/pos/LocalPosSyncData/serverCommand?brandId=`+listQuery.brand_id+`&shopId=`+listQuery.shop_id+`&type=serverCommand&sql=`" target="_blank">
                <el-button type="primary" size="mini" v-perm="'b:shop:details:custom:instruct'">窗口指令</el-button>
            </a>
            <a :href ="`http://newpos.log.restoplus.cn/log/`+currentDate+`/`+shopInfo.brand_name+`/`+shopInfo.name+``" target="_blank">
                <el-button type="primary" size="mini" v-perm="'b:shop:details:newpos:log'">newpos日志</el-button>
            </a>

            <el-tooltip content="跳转到此记录详情"  placement="top">
                <router-link :to="'/record_manage/order_record_details/'+listQuery.brand_id+'/'+listQuery.shop_id+'/'+`${listQuery.order_id}`">
                    <el-button type="primary" size="mini" v-perm="'b:shop:details:oline:log'">日志详情</el-button>
                </router-link>
            </el-tooltip>
            <el-tooltip content="同步到线上" placement="top">
                <el-button @click="orderSyncToMysql(listQuery.order_id)" size="mini" type="primary" :loading="loadingSync">同步到线上</el-button>
            </el-tooltip>

            <el-tooltip content="pos数据更新" placement="top">
                <el-button @click="posDataUpdate(listQuery.order_id)" size="mini" type="info" icon="el-icon-refresh" circle plain></el-button>
            </el-tooltip>


        </label>
        <template>
            <el-table :data="orderList" v-loading="orderListLoading" border show-summary style="width: 100%" size="mini">

                <el-table-column  label="订单ID" width="238" >
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>

                <el-table-column  label="流水号" width="150px">
                    <template slot-scope="scope"><span>{{scope.row.serial_number }}</span></template>
                </el-table-column>
                <el-table-column label="桌号" width="50px">
                    <template slot-scope="scope"><span>{{scope.row.table_number }}</span></template>
                </el-table-column>
                <el-table-column prop="accounting_time" label="时间" width="90px"></el-table-column>
                <el-table-column label="状态">
                    <el-table-column width="100px" label="支付">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-select v-model="scope.row.order_state" filterable placeholder="请选择" size="mini" >
                                    <el-option v-for="item in orderStateMapOptions":key="item.code":label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </template>
                            <span v-else><span>{{scope.row.order_state |modeFilter(orderStateMapOptions)}}</span>  ||  <span>{{scope.row.order_state }}</span> </span>
                        </template>

                    </el-table-column>


                    <el-table-column width="100px" label="打印">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-select v-model="scope.row.production_status" filterable placeholder="请选择" size="mini" >
                                    <el-option v-for="item in productionStatusMapOptions":key="item.code":label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </template>
                            <span v-else><span>{{scope.row.production_status |modeFilter(productionStatusMapOptions)}}</span>  ||  <span>{{scope.row.production_status }}</span> </span>
                        </template>
                    </el-table-column>

                </el-table-column>

                <el-table-column label="订单金额">
                    <el-table-column width="120px" prop="order_money" label="订单金额">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input class="edit-input" size="mini" v-model="scope.row.order_money"></el-input>
                            </template>
                            <span v-else>{{ scope.row.order_money }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="90px" prop="amount_with_children" label="订单总计">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input class="edit-input" size="mini" v-model="scope.row.amount_with_children"></el-input>
                            </template>
                            <span v-else>{{ scope.row.amount_with_children }}</span>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="订单折扣及抹零">

                    <el-table-column width="90px" prop="order_pos_discount_money" label="折扣金额">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input class="edit-input" size="mini" v-model="scope.row.order_pos_discount_money"></el-input>
                            </template>
                            <span v-else>{{ scope.row.order_pos_discount_money }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="real_erase_money" label="抹零+优惠" width="100px"></el-table-column>
                    <el-table-column  label="折扣率" width="80px">
                        <template slot-scope="scope"><span>{{scope.row.pos_discount }}</span></template>
                    </el-table-column>
                    <el-table-column width="90px" prop="erase_money" label="抹零">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input class="edit-input" size="mini" v-model="scope.row.erase_money"></el-input>
                            </template>
                            <span v-else>{{ scope.row.erase_money }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="按金额优惠" width="90px">
                        <template slot-scope="scope"><span>{{scope.row.reduce_money }}</span></template>
                    </el-table-column>

                </el-table-column>

                <el-table-column  label="主订单ID" min-width="120px">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.parent_order_id,$event)'>{{scope.row.parent_order_id }}</span></template>
                </el-table-column>


                <!--<el-table-column label="操作" fixed="right" width="170rem;">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row,'tb_order')" size="mini" icon="el-icon-circle-check-outline"></el-button>-->
                        <!--<el-button v-if="scope.row.edit"  size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row,'tb_order')"></el-button>-->
                        <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">Edit</el-button>-->

                        <!--<el-tooltip content="修改newpos部分内容" placement="top">-->
                            <!--<el-button type="text" size="small" @click="syncUpdate(scope.row,`tb_order`)">修改</el-button>-->
                        <!--</el-tooltip>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </template>
        <!--支付信息  -->
        <br>
        <label class="radio-label" style="padding-left:0;" >订单支付项数据: </label>

        <template>
            <el-table :data="paymentList" v-loading="paymentListLoading"  border show-summary style="width: 100%" size="mini">
                <el-table-column  label="ID" width="238">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column width="90px" prop="pay_value" label="金额">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="mini" v-model="scope.row.pay_value"></el-input>
                        </template>
                        <span v-else>{{ scope.row.pay_value }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="220px"  label="支付项">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-select v-model="scope.row.payment_mode_id" filterable placeholder="请选择" size="mini" >
                                <el-option v-for="item in paymentMapOptions":key="item.code":label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                        </template>
                        <span v-else><span>{{scope.row.payment_mode_id |modeFilter(paymentMapOptions)}}</span>  ||  <span>{{scope.row.payment_mode_id }}</span> </span>
                    </template>
                </el-table-column>

                <el-table-column   label="支付时间" width="150">
                    <template slot-scope="scope">
                        <span>{{new Date(+scope.row.pay_time) | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="订单ID">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.order_id,$event)'>{{scope.row.order_id }}</span></template>
                </el-table-column>

                <el-table-column  label="支付回调" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span>{{scope.row.result_data }}</span></template>
                </el-table-column>

                <!--<el-table-column label="操作" fixed="right" width="180rem;" >-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row,'tb_order_payment_item')" size="mini" icon="el-icon-circle-check-outline"></el-button>-->
                        <!--<el-button v-if="scope.row.edit"  size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row,'tb_order_payment_item')"></el-button>-->
                        <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">Edit</el-button>-->

                        <!--<el-tooltip content="修改newpos部分内容" placement="top">-->
                            <!--<el-button type="text" size="small" @click="syncUpdate(scope.row,`tb_order_payment_item`)">修改</el-button>-->
                        <!--</el-tooltip>-->

                        <!--<el-tooltip content="添加newpos此记录" placement="top">-->
                            <!--<el-button type="text" size="small" @click="syncInsert(scope.row,`tb_order_payment_item`)">添加</el-button>-->
                        <!--</el-tooltip>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </template>
        <!--菜品信息  -->
        <br>
        <label class="radio-label" style="padding-left:0;" >订单菜品项数据: </label>
        <template>
            <el-table :data="articleList" v-loading="orderListLoading" border show-summary style="width: 100%" size="mini">
                <el-table-column  label="菜品项ID" width="238">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column  prop="article_name" label="菜品名称" width="150"> </el-table-column>
                <el-table-column  prop="final_price" label="菜品价格(final_price)" width="140"> </el-table-column>
                <el-table-column  label="菜品类型" width="100">
                    <template slot-scope="scope"><span>{{scope.row.type }}</span></template>
                </el-table-column>

                <el-table-column  prop="count" label="当前数量" width="100"> </el-table-column>
                <el-table-column  prop="refund_count" label="退菜数量" width="100"> </el-table-column>
                <el-table-column  prop="grant_count"  label="赠菜数量" width="100"> </el-table-column>
                <el-table-column  label="折扣" width="100">
                    <template slot-scope="scope"><span>{{scope.row.pos_discount }}</span></template>
                </el-table-column>
                <el-table-column   label="创建时间" width="150">
                    <template slot-scope="scope">
                        <span>{{new Date(+scope.row.create_time) | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
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
            </el-table>
        </template>

    </div>
</template>

<script>
    import {
       getPosOrderDetailsByOrderId
    } from '@/api/newpos'
    import {
        orderSyncToMysql
    } from '@/api/restoBrand'
    import {
        newposPush
    } from '@/api/emqPush'
    import {
        getConstantList
    } from '@/api/constant'
    import debounce from 'lodash/debounce'
    import moment from 'moment'
    import async from 'async'
    import uuidv4 from 'uuid/v4'
    import clip from '@/utils/clipboard'
    import clipboard from '@/directive/clipboard/index.js'



    export default {
        name: 'shopManage',
        directives: {
            clipboard
        },
        data() {
            return {
                loadingSync:false,
                currentDate: moment().format('YYYY-MM-DD'),
                //支付项选择框
                paymentMapOptions: [],
                //订单状态选择框
                orderStateMapOptions: [],
                //打印状态选择框
                productionStatusMapOptions: [],
                paymentMapCode: null,

                orderListLoading: true,
                paymentListLoading: true,
                orderList: [],
                paymentList: [],
                articleList: [],
                shopInfo: {},
                newPaymentMap : null,
                listQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    shop_id: this.$route.params && this.$route.params.shop_id,
                    order_id:this.$route.params && this.$route.params.order_id
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
            modeFilter(id,map) {
                let newArr = map.filter(item => item.code == id);
                if(newArr.length>0){
                    return newArr[0].name
                }
            }
        },
        created() {
            this.fetchPaymenConstantData()
        },

        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },

            //获取支付常量
            fetchPaymenConstantData() {
                async.parallel({
                    paymentMapOptions: (done)=>{
                        getConstantList({type:1}).then(response => {
                            this.paymentMapOptions = response.data.constantList;
                            done()
                        });
                    },
                    orderStateMapOptions: (done)=>{
                        getConstantList({type:2}).then(response => {
                            this.orderStateMapOptions = response.data.constantList;
                            done()
                        });
                    },
                    productionStatusMapOptions: (done)=>{
                        getConstantList({type:3}).then(response => {
                            this.productionStatusMapOptions = response.data.constantList;
                            done()
                        });
                    }
                },(error, results)=>{
                    this.fetchData();
                })
            },
            handleCopy(text, event) {
                clip(text, event)
            },
            //查询
            fetchData() {
               this.getPosOrderDetailsByOrderId();
            },
            getPosOrderDetailsByOrderId(){       //获取订单及菜品信息
                getPosOrderDetailsByOrderId(this.listQuery).then(response => {
                    this.orderList   = response.data.orderList;
                    this.articleList = response.data.articleList;
                    this.paymentList = response.data.paymentList;
                    this.orderListLoading = false;
                    this.paymentListLoading = false;
                });
            },
            posDataUpdate(order_id){
                let random = `${moment().format('x')}`;
                let param = {
                    brand_id:this.listQuery.brand_id,
                    shop_id:this.listQuery.shop_id,
                    group:`instruct`,
                    action:`gather`,
                    id:random,
                    content:{
                        "message_id":random,
                        "date": moment().format('YYYY-MM-DD'),
                        "content": order_id
                    }
                };

                newposPush(param).then(response => {
                    if(response.ok){
                        this.$message.success("更新成功");
                        let taht = this;
                        setTimeout(function(){taht.fetchPaymenConstantData()}, 500);
                    }else {
                        this.$message.error(response.message)
                    }
                });
            },

            orderSyncToMysql(order_id){
                this.$confirm('此操作将该记录同步到线上, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {
                        brand_id:this.listQuery.brand_id,
                        order_id:order_id
                    };
                    this.loadingSync = true;
                    orderSyncToMysql(param).then(response => {
                        this.loadingSync = false;
                        if(response.ok){
                            this.$message.success(response.message);
                        }else {
                            this.$message.error(response.message)
                        }
                    });
                }).catch(() => {
                    this.$message.info(`已取消同步!`);
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
