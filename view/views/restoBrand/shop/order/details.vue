<template>
    <div class="app-container">

        <!--订单信息  -->
        <label class="radio-label" style="padding-left:0;">
            {{shopInfo.brand_name ? shopInfo.brand_name+"/":""}}{{shopInfo.name? shopInfo.name+"/":""}}{{ shopInfo.mode? shopInfo.mode+"/":""}} 订单数据:
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

            <el-tooltip content="跳转到此记录详情"  placement="top">
                <router-link :to="'/shop_manage/pos_order_details/'+listQuery.brand_id+'/'+listQuery.shop_id+'/'+`${listQuery.order_id}`">
                    <el-button type="primary" size="mini" v-perm="'b:shop:order:details'">pos订单详情</el-button>
                </router-link>
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
                <el-table-column label="人数" width="90px">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="mini" type="number" v-model="scope.row.customer_count"></el-input>
                        </template>
                        <span v-else>{{ scope.row.customer_count }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="accounting_time" label="时间" width="90px"></el-table-column>
                <el-table-column label="状态">
                    <el-table-column width="120px" label="支付">
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
                    <el-table-column width="120px" label="打印">
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

                    <el-table-column width="120px" label="评论">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-select v-model="scope.row.allow_appraise" filterable placeholder="请选择" size="mini" >
                                    <el-option v-for="item in appraiseStatusMapOptions":key="item.code":label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </template>
                            <span v-else><span>{{scope.row.allow_appraise |modeFilter(appraiseStatusMapOptions)}}</span>  ||  <span>{{scope.row.allow_appraise }}</span> </span>
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


                    <!--<el-table-column prop="order_pos_discount_money" label="折扣金额" width="70px"></el-table-column>-->
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


                <el-table-column label="操作" fixed="right" width="170rem;">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row,'tb_order')" size="mini" >✔️</el-button>
                        <el-button v-if="scope.row.edit"  size="mini"  type="warning" @click="cancelEdit(scope.row,'tb_order')">✘</el-button>
                        <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>
                        <el-tooltip content="修改newpos部分内容" placement="top">
                            <el-button type="text" size="small" @click="syncUpdate(scope.row,`tb_order`)">同步</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--支付信息  -->
        <br>
        <label class="radio-label" style="padding-left:0;" >订单支付项数据: <el-button class="el-icon-plus" style="text-align: left;"@click.prevent="addPayment()" size="mini"></el-button></label>

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
                        <span>{{scope.row.pay_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="订单ID">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.order_id,$event)'>{{scope.row.order_id }}</span></template>
                </el-table-column>

                <el-table-column  label="支付回调" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span>{{scope.row.result_data }}</span></template>
                </el-table-column>

                <el-table-column label="操作" fixed="right" width="180rem;" >
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row,'tb_order_payment_item')" size="mini" >✔</el-button>
                        <el-button v-if="scope.row.edit"  size="mini"  type="warning" @click="cancelEdit(scope.row,'tb_order_payment_item')">✘</el-button>
                        <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>

                        <el-tooltip content="修改newpos部分内容" placement="top">
                            <el-button type="text" size="small" @click="syncUpdate(scope.row,`tb_order_payment_item`)">修改</el-button>
                        </el-tooltip>

                        <el-tooltip content="添加newpos此记录" placement="top">
                            <el-button type="text" size="small" @click="syncInsert(scope.row,`tb_order_payment_item`)">添加</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
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
                <el-table-column  prop="final_price" label="菜品价格(final_price)" width="140">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="mini" type="number"  v-model="scope.row.final_price"></el-input>
                        </template>
                        <span v-else>{{ scope.row.final_price }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="菜品类型" width="100">
                    <template slot-scope="scope"><span>{{scope.row.type }}</span></template>
                </el-table-column>

                <el-table-column  prop="count" label="当前数量" width="100">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="mini" type="number" v-model="scope.row.count"></el-input>
                        </template>
                        <span v-else>{{ scope.row.count }}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="refund_count" label="退菜数量" width="100">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="mini" type="number" v-model="scope.row.refund_count"></el-input>
                        </template>
                        <span v-else>{{ scope.row.refund_count }}</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="grant_count"  label="赠菜数量" width="100">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="mini" type="number" v-model="scope.row.grant_count"></el-input>
                        </template>
                        <span v-else>{{ scope.row.grant_count }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="折扣" width="100">
                    <template slot-scope="scope"><span>{{scope.row.pos_discount }}</span></template>
                </el-table-column>
                <el-table-column   label="创建时间" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180rem;">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row,'tb_order_item')" size="mini" >✔</el-button>
                        <el-button v-if="scope.row.edit"  size="mini"  type="warning" @click="cancelEdit(scope.row,'tb_order_item')">✘</el-button>
                        <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>

                        <el-tooltip content="修改newpos部分内容" placement="top">
                            <el-button type="text" size="small" @click="syncUpdate(scope.row,`tb_order_item`)">修改</el-button>
                        </el-tooltip>

                        <el-tooltip content="添加newpos此记录" placement="top">
                            <el-button type="text" size="small" @click="syncInsert(scope.row,`tb_order_item`)">添加</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <el-table :data="customerList" v-loading="customerListLoading" border  style="width: 100%" size="mini">
            <el-table-column :label="'用户信息'" >
                <el-table-column  label="id" width="120rem" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column prop="nickname" label="微信昵称" width="120rem" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="telephone" label="手机号码" width="120rem" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remain" label="余额" width="90rem" ></el-table-column>
                <el-table-column prop="order_money_count" label="订单总额" width="100rem" ></el-table-column>
                <el-table-column prop="order_count" label="订单数量" width="100rem" ></el-table-column>
                <el-table-column prop="mean" label="订单平均" width="100rem" ></el-table-column>
                <el-table-column prop="coupon_count" label="优惠卷数量" width="100rem" ></el-table-column>
                <el-table-column prop="appraise_count" label="评论数量" width="100rem" ></el-table-column>
                <el-table-column  label="性别" width="80rem" >
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.sex | statusFilter">{{scope.row.sex == 1?"男":scope.row.sex == 2?"女":"未知"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="city" label="城市" width="80rem" :show-overflow-tooltip="true"></el-table-column>

                <el-table-column prop="is_bind_phine" label="是否注册" width="80rem" >
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.is_bind_phone | statusFilter">{{scope.row.is_bind_phone == 1?"是":"否"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="share_telephone" label="被邀请手机号码" width="110rem"></el-table-column>
                <el-table-column prop="birth_date" label="生日" width="100rem" ></el-table-column>
                <el-table-column prop="bind_phone_time" label="注册时间" width="140rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.bind_phone_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="最近登录时间" width="140rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.last_login_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>

            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180rem;">
                <template slot-scope="scope">
                    <el-tooltip content="详情" placement="top">
                        <router-link :to="'/shop_manage/shop_customer_details/'+listQuery.brand_id+'/'+`${scope.row.id}`">
                            <el-button type="text" size="small" >详情</el-button>
                        </router-link>
                    </el-tooltip>

                    <el-tooltip content="模拟微信" placement="top">
                        <a :href ="scope.row.wechat_url_qp" target="_blank">
                            <el-button type="text" size="mini">模拟微信</el-button>
                        </a>

                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    import {
        getShopOrderDetailsByBrandIdAndOrderId,
        updateShopOrderDetailsByBrandIdAndTableAndId,
        getShopOrderPaymentDetailsByBrandIdAndOrderId,
        getCustomerInfoById
    } from '@/api/restoBrand'
    import {
        javaNewposPushUpdateInfo,
        javaNewposPushInsertInfo
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
                currentDate: moment().format('YYYY-MM-DD'),
                //支付项选择框
                paymentMapOptions: [],
                //订单状态选择框
                orderStateMapOptions: [],
                //打印状态选择框
                productionStatusMapOptions: [],
                //评论状态选择框
                appraiseStatusMapOptions: [
                    {
                        code:0,
                        name:"不允许",
                    },
                    {
                        code:1,
                        name:"允许"
                    }

                ],
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

                //微信会员信息
                customerList: [],
                customerListLoading: true,
                customerListQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    customer_id:``
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
            // this.fetchData()
        },

        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            //添加订单支付项
            addPayment() {
                let j = {
                    id: uuidv4().replace(/-/g,''),
                    coupon_article_id:``,
                    edit:false,
                    is_use_bonus:0,
                    order_id:this.listQuery.order_id,
                    originalPayValue:0,
                    pay_value:0,
                    payment_mode_id:1,
                    originalPaymentModeId:1,
                    pay_time:`${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    remark:`pos-admin添加`,
                    result_data:``,
                    to_pay_id:``,
                };
                this.paymentList.push(j);
                j.edit = true;
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
               this.getShopOrderDetailsByBrandIdAndOrderId();
               this.getShopOrderPaymentDetailsByBrandIdAndOrderId();
            },
            getShopOrderDetailsByBrandIdAndOrderId(){       //获取订单及菜品信息
                getShopOrderDetailsByBrandIdAndOrderId(this.listQuery).then(response => {
                    this.shopInfo = response.data.shopInfo;
                    this.orderList = response.data.orderList.map(v => {
                        this.$set(v, 'edit', false);
                        if(!v.parent_order_id){

                            this.fetchCustomerListData(v.customer_id)
                        }
                        v.originalOrderState = v.order_state;
                        v.customerCount = v.customer_count;
                        v.originalProductionStatus = v.production_status;
                        v.originalOrderMoney = v.order_money;
                        v.originalAmountWithChildren = v.amount_with_children;
                        v.originalOrderPosDiscountMoney = v.order_pos_discount_money;
                        v.originalEraseMoney = v.erase_money;
                        v.originalAllowAppraise = v.allow_appraise;
                        return v
                    });
                    // this.articleList = response.data.articleList;
                    // console.log(`-----this.articleList------`,this.articleList)
                    this.articleList = response.data.articleList.map(v => {
                        this.$set(v, 'edit', false);
                        v.originalFinalPrice = v.final_price;
                        v.customerGrant_count = v.grant_count;
                        v.customerCount = v.count;
                        v.customerRefundCount = v.refund_count;
                        return v
                    });


                    this.orderListLoading = false
                });
            },
            getShopOrderPaymentDetailsByBrandIdAndOrderId(){    //获取订单支付项信息
                getShopOrderPaymentDetailsByBrandIdAndOrderId(this.listQuery).then(response => {
                    this.paymentList = response.data.paymentList.map(v => {
                        this.$set(v, 'edit', false);
                        v.originalPayValue = v.pay_value;
                        v.originalPaymentModeId = v.payment_mode_id;
                        return v
                    });
                    this.paymentListLoading = false;
                });
            },
            syncUpdate(row,table){
                let content = {
                    brand_id:this.listQuery.brand_id,
                    shop_id:this.listQuery.shop_id,
                    table:table,
                    id:row.id
                };
                javaNewposPushUpdateInfo(content).then(response => {
                    if(response.ok){
                        this.$message.success("修改同步成功")
                    }else {
                        this.$message.error(response.message)
                    }
                })
            },
            //查询微信用户信息
            fetchCustomerListData(customer_id) {
                this.customerListLoading = true;
                this.customerListQuery.customer_id = customer_id;
                if(this.customerListQuery.customer_id && this.customerListQuery.customer_id!=0){
                    getCustomerInfoById(this.customerListQuery).then(response => {
                        this.customerList = response.data.list;
                        this.customerListQuery.total = response.data.count;
                        this.customerListLoading = false
                    })
                }else {
                    this.customerList = [];
                    this.customerListQuery.total = 0;
                    this.customerListLoading = false
                }

            },

            syncInsert(row,table){
                let content = {
                    brand_id:this.listQuery.brand_id,
                    shop_id:this.listQuery.shop_id,
                    table:table,
                    id:row.id
                };
                javaNewposPushInsertInfo(content).then(response => {
                    if(response.ok){
                        this.$message.success("插入发送同步成功")
                    }else {
                        this.$message.error(response.message)
                    }
                })
            },

            cancelEdit(row,table) {
                if(table == `tb_order`){
                    row.edit = false;
                    row.order_state = row.originalOrderState;
                    row.customer_count = row.customerCount;
                    row.production_status = row.originalProductionStatus;
                    row.order_money = row.originalOrderMoney;
                    row.amount_with_children = row.originalAmountWithChildren;
                    row.order_pos_discount_money = row.originalOrderPosDiscountMoney;
                    row.erase_money = row.originalEraseMoney;
                    row.allow_appraise = row.originalAllowAppraise;
                }else if(table == 'tb_order_payment_item'){
                    row.edit = false;
                    row.pay_value = row.originalPayValue;
                    row.payment_mode_id = row.originalPaymentModeId;
                    this.getShopOrderPaymentDetailsByBrandIdAndOrderId();   //刷新支付项信息
                }else {
                    row.edit = false;
                    row.final_price = row.originalFinalPrice;
                    row.grant_count = row.customerGrant_count;
                    row.count = row.customerCount;
                    row.refund_count = row.customerRefundCount;
                }
                this.$message({
                    message: 'The content has been restored to the original value',
                    type: 'warning'
                })

            },
            confirmEdit(row,table) {

                if(table == 'tb_order'){
                    row.edit = false;
                    row.originalOrderState = row.order_state;
                    row.customerCount      = row.customer_count;
                    row.originalProductionStatus = row.production_status;
                    row.originalOrderMoney = row.order_money;
                    row.originalAmountWithChildren = row.amount_with_children;
                    row.originalOrderPosDiscountMoney = row.order_pos_discount_money;
                    row.originalEraseMoney = row.erase_money;
                    row.originalAllowAppraise = row.allow_appraise;
                    row.real_erase_money = Number(row.erase_money)+Number(row.reduce_money);

                    let param = {
                        brand_id:this.listQuery.brand_id,
                        shop_id:this.listQuery.shop_id,
                        shop_name:this.shopInfo.name,
                        brand_name:this.shopInfo.brand_name,
                        table:table,
                        id:row.id,
                        order_state:row.originalOrderState,
                        customer_count:row.customerCount,
                        production_status:row.originalProductionStatus,
                        order_money:row.originalOrderMoney,
                        amount_with_children:row.originalAmountWithChildren,
                        order_pos_discount_money:row.originalOrderPosDiscountMoney,
                        erase_money:row.originalEraseMoney,
                        allow_appraise:row.originalAllowAppraise,
                        reduce_money:row.reduce_money,
                    };

                    updateShopOrderDetailsByBrandIdAndTableAndId(param).then(response => {
                        if(response.ok){
                            this.$message.success("订单表修改成功")
                        }else {
                            this.$message.error(response.message)
                        }
                    });
                }else if(table == 'tb_order_payment_item'){
                    row.edit = false;
                    row.originalPayValue = row.pay_value;
                    row.originalPaymentModeId = row.payment_mode_id;

                    let param = {
                        brand_id:this.listQuery.brand_id,
                        shop_id:this.listQuery.shop_id,
                        table:table,
                        id:row.id,
                        pay_value:row.originalPayValue,
                        payment_mode_id:row.originalPaymentModeId,
                        order_id:row.order_id,
                        remark:row.remark,
                        result_data:row.result_data,
                    };

                    updateShopOrderDetailsByBrandIdAndTableAndId(param).then(response => {
                        if(response.ok){
                            this.$message.success("支付表修改成功")
                        }else {
                            this.$message.error(response.message)
                        }
                    });
                }else {
                    row.edit = false;
                    row.originalFinalPrice = row.final_price;
                    row.customerGrant_count = row.grant_count;
                    row.customerCount = row.count;
                    row.customerRefundCount = row.refund_count;

                    let param = {
                        brand_id:this.listQuery.brand_id,
                        shop_id:this.listQuery.shop_id,
                        table:table,
                        id:row.id,
                        final_price:row.final_price,
                        grant_count:row.grant_count,
                        count:row.count,
                        refund_count:row.refund_count,
                    };

                    updateShopOrderDetailsByBrandIdAndTableAndId(param).then(response => {
                        if(response.ok){
                            this.$message.success("菜品表修改成功")
                        }else {
                            this.$message.error(response.message)
                        }
                    });
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

    .edit-input {
        padding-right: 0px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 8px;
    }
</style>
