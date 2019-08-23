<template>
    <div class="app-container">

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
            <el-table-column label="操作" fixed="right" width="100rem">
                <template slot-scope="scope">
                    <el-dropdown class="avatar-container right-menu-item" trigger="click">
                        <div class="avatar-wrapper">更多<i class="el-icon-caret-bottom"></i></div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >
                                <el-button type="primary" @click="deleteWeChatShoppingCartByCustomerId(scope.row.id)"size="mini" >清空购物车</el-button>
                            </el-dropdown-item>
                            <!--<el-dropdown-item >-->
                                <!--<el-button type="primary" size="mini" >编辑</el-button>-->
                            <!--</el-dropdown-item>-->
                            <!--<el-dropdown-item >-->
                                <!--<el-button type="danger" size="mini" >解除绑定</el-button>-->
                            <!--</el-dropdown-item>-->
                            <!--<el-dropdown-item >-->
                                <!--<el-button type="danger" size="mini" >清空用户全部数据</el-button>-->
                            <!--</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <!--微信用户订单-->
        <br/>
        <el-table :data="customerOrderList" v-loading="customerOrderListLoading" border  style="width: 100%" size="mini">
            <el-table-column :label="'订单记录'" >
                <el-table-column  label="id" width="120rem" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column prop="brand_name" label="品牌" width="100rem" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="shop_name" label="店铺" width="130rem" ></el-table-column>
                <el-table-column prop="shop_mode" label="店铺模式" width="100rem" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column  label="就餐模式" width="80rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.distribution_mode_id == 1 ? '堂吃':'外带'}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="订单流水号" width="145rem">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.serial_number,$event)'>{{scope.row.serial_number}}</span></template>
                </el-table-column>
                <el-table-column prop="table_number" label="桌号" width="50rem" ></el-table-column>
                <el-table-column prop="customer_count" label="人数" width="50rem"></el-table-column>
                <el-table-column  label="支付状态" width="100rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.order_state |modeFilter(orderStateMapOptions)}}</span>  ||  <span>{{scope.row.order_state }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="打印状态" width="100rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.production_status |modeFilter(productionStatusMapOptions)}}</span>  ||  <span>{{scope.row.production_status }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="创建时间" width="150rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="parent_order_id" label="主订单ID" :show-overflow-tooltip="true"></el-table-column>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100rem">
                <template slot-scope="scope">
                    <router-link :to="'/shop_manage/shop_order_details/'+scope.row.brand_id+'/'+scope.row.shop_detail_id+'/'+`${scope.row.parent_order_id?scope.row.parent_order_id:scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <br/>
        <div >
            <el-pagination background @size-change="handleSizeChange_order" @current-change="handleCurrentChange_order"
                           :current-page="customerOrderListQuery.page_index" :page-sizes="[5,10,20,30, 50]"
                           :page-size="customerOrderListQuery.page_size" layout="total, sizes, prev, pager, next, jumper"
                           :total="customerOrderListQuery.total">
            </el-pagination>
        </div>


        <!--微信用户充值-->
        <br/>
        <el-table :data="customerChargeList" v-loading="customerChargeListLoading" border  style="width: 100%" size="mini">
            <el-table-column :label="'充值记录'" >
                <el-table-column  label="id" width="120rem" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column prop="brand_name" label="品牌" width="100rem" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="shop_name" label="店铺" width="130rem" ></el-table-column>
                <el-table-column  label="充值时间" width="150rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="充值方式" width="80rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.type == 1?'微信':'POS' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="charge_money" label="充值金额" width="90rem" ></el-table-column>
                <el-table-column prop="reward_money" label="赠送金额" width="90rem" ></el-table-column>
                <el-table-column prop="arrival_days" label="到账天数" width="90rem" ></el-table-column>
                <el-table-column  label="完成时间" width="150rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.finish_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="charge_balance" label="充值剩余余额" width="100rem" ></el-table-column>
                <el-table-column prop="reward_balance" label="赠送剩余余额" width="100rem" ></el-table-column>
                <el-table-column prop="total_balance" label="账户总余额" width="100rem" ></el-table-column>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100rem">
                <template slot-scope="scope">
                    <router-link :to="'/shop_manage/shop_order_details/'+scope.row.brand_id+'/'+scope.row.shop_detail_id+'/'+`${scope.row.parent_order_id?scope.row.parent_order_id:scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <br/>
        <div >
            <el-pagination background @size-change="handleSizeChange_charge" @current-change="handleCurrentChange_charge"
                           :current-page="customerChargeListQuery.page_index" :page-sizes="[5,10,20,30, 50]"
                           :page-size="customerChargeListQuery.page_size" layout="total, sizes, prev, pager, next, jumper"
                           :total="customerChargeListQuery.total">
            </el-pagination>
        </div>

        <!--微信用户评论-->
        <br/>
        <el-table :data="customerAppraiseList" v-loading="customerAppraiseListLoading" border  style="width: 100%" size="mini">
            <el-table-column :label="'评论记录'" >
                <el-table-column  label="id" width="120rem" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column prop="brand_name" label="品牌" width="100rem" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="shop_name" label="店铺" width="130rem" ></el-table-column>
                <el-table-column prop="serial_number" label="订单编号" width="130rem" ></el-table-column>
                <el-table-column  label="评论星级" width="120rem" >
                    <template slot-scope="scope">
                        <el-rate disabled show-score v-model="scope.row.level" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                    </template>
                </el-table-column>
                <el-table-column  label="评论时间" width="140rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>

                <el-table-column  label="评论状态" width="80rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.status == 1?'已评论':'已取消' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="red_money" label="红包金额" width="170rem" ></el-table-column>
                <el-table-column prop="content" label="评论内容" :show-overflow-tooltip="true"></el-table-column>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100rem">
                <template slot-scope="scope">
                    <router-link :to="'/shop_manage/shop_order_details/'+scope.row.brand_id+'/'+scope.row.shop_detail_id+'/'+`${scope.row.parent_order_id?scope.row.parent_order_id:scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <br/>
        <div >
            <el-pagination background @size-change="handleSizeChange_appraise" @current-change="handleCurrentChange_appraise"
                           :current-page="customerAppraiseListQuery.page_index" :page-sizes="[5,10,20,30, 50]"
                           :page-size="customerAppraiseListQuery.page_size" layout="total, sizes, prev, pager, next, jumper"
                           :total="customerAppraiseListQuery.total">
            </el-pagination>
        </div>

        <!--微信用户优惠卷-->
        <br/>
        <el-table :data="customerCouponList" v-loading="customerCouponListLoading" border  style="width: 100%" size="mini">
            <el-table-column :label="'优惠卷记录'" >
                <el-table-column  label="id" width="120rem" :show-overflow-tooltip="true">
                    <template slot-scope="scope"><span @click='handleCopy(scope.row.id,$event)'>{{scope.row.id }}</span></template>
                </el-table-column>
                <el-table-column  label="优惠卷状态" width="110rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.is_used == 1?'已使用':'未使用' }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="优惠卷所属" width="110rem">
                    <template slot-scope="scope">
                        <span>{{scope.row.shop_name?'店铺':'品牌' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shop_name" label="所属门店" width="130rem" ></el-table-column>
                <el-table-column  label="优惠卷类型" width="130rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.coupon_type == 0?'新用户注册': scope.row.coupon_type ==1 ? '邀请注册':'通用'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="优惠卷名称" width="130rem" ></el-table-column>
                <el-table-column  label="优惠卷领取时间" width="140rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="value" label="优惠卷金额" width="100rem" ></el-table-column>
                <el-table-column prop="min_amount" label="最低消费金额" width="100rem" ></el-table-column>
                <el-table-column prop="begin_date" label="开始日期" width="100rem" ></el-table-column>
                <el-table-column prop="end_date" label="结束日期" width="100rem" ></el-table-column>
                <el-table-column prop="begin_time" label="开始时间" width="100rem" ></el-table-column>
                <el-table-column prop="end_time" label="结束时间" width="100rem" ></el-table-column>
                <el-table-column  label="是否可与余额一起使用" width="120rem" >
                    <template slot-scope="scope">
                        <span>{{scope.row.use_with_account == 1?'是': '否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="recommend_delay_time" label="分享优惠券延迟使用时间(小时)" width="130rem" ></el-table-column>

            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100rem">
                <template slot-scope="scope">
                    <router-link :to="'/shop_manage/shop_order_details/'+scope.row.brand_id+'/'+scope.row.shop_detail_id+'/'+`${scope.row.parent_order_id?scope.row.parent_order_id:scope.row.id}`">
                        <el-button type="primary" size="mini">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <br/>
        <div >
            <el-pagination background @size-change="handleSizeChange_coupon" @current-change="handleCurrentChange_coupon"
                           :current-page="customerCouponListQuery.page_index" :page-sizes="[5,10,20,30, 50]"
                           :page-size="customerCouponListQuery.page_size" layout="total, sizes, prev, pager, next, jumper"
                           :total="customerCouponListQuery.total">
            </el-pagination>
        </div>

    </div>
</template>

<script>

    import {
        getCustomerInfoById,
        getWeChatOrderByCustomerIdOrPhone,
        getWeChatChargeByCustomerIdOrPhone,
        getWeChatAppraiseByCustomerIdOrPhone,
        getWeChatCouponByCustomerIdOrPhone,
        deleteWeChatShoppingCartByCustomerId
    } from '@/api/restoBrand'
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
                newPaymentMap : null,

                //微信会员信息
                customerList: [],
                customerListLoading: true,
                customerListQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    customer_id:this.$route.params && this.$route.params.customer_id
                },

                //微信订单信息
                customerOrderList: [],
                customerOrderListLoading: true,
                customerOrderListQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    content:this.$route.params && this.$route.params.customer_id,
                    page_index: 1,
                    page_size: 5,
                    total: 0
                },
                //微信充值信息
                customerChargeList: [],
                customerChargeListLoading: true,
                customerChargeListQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    content:this.$route.params && this.$route.params.customer_id,
                    page_index: 1,
                    page_size: 5,
                    total: 0
                },
                //微信评论信息
                customerAppraiseList: [],
                customerAppraiseListLoading: true,
                customerAppraiseListQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    content:this.$route.params && this.$route.params.customer_id,
                    page_index: 1,
                    page_size: 5,
                    total: 0
                },
                //微信优惠卷信息
                customerCouponList: [],
                customerCouponListLoading: true,
                customerCouponListQuery: {
                    brand_id: this.$route.params && this.$route.params.brand_id,
                    content:this.$route.params && this.$route.params.customer_id,
                    page_index: 1,
                    page_size: 5,
                    total: 0
                },
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    0: 'danger',
                };
                return statusMap[status]
            },
            keyFilter(key) {
                if(key){
                    return key.replace(/\s/g,' ').replace(/(.{4})/g,"$1 ");
                }
            },
            modeFilter(id,map) {
                let newArr = map.filter(item => item.code == id);
                if(newArr.length>0){
                    return newArr[0].name
                }
            }
        },
        created() {
            this.fetchCustomerListData();
            this.fetchPaymenConstantData();
            this.fetchCustomerChargeListData();
            this.fetchCustomerAppraiseListData();
            this.fetchCustomerCouponListData();
        },

        methods: {
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
                    this.fetchCustomerOrderListData();
                })
            },
            handleCopy(text, event) {
                clip(text, event)
            },
            //查询微信用户信息
            fetchCustomerListData() {
                this.customerListLoading = true;
                getCustomerInfoById(this.customerListQuery).then(response => {
                    this.customerList = response.data.list;
                    this.customerListQuery.total = response.data.count;
                    this.customerListLoading = false
                })
            },

            //-------订单
            //分页
            handleSizeChange_order(val) {
                this.customerOrderListQuery.page_size = val;
                this.fetchCustomerOrderListData();
            },
            handleCurrentChange_order(val) {
                this.customerOrderListQuery.page_index = val;
                this.fetchCustomerOrderListData();
            },

            //查询微信用户订单信息
            fetchCustomerOrderListData(current) {
                if (current) {
                    this.customerOrderListQuery.page_index = current
                }
                this.customerOrderListLoading = true;
                getWeChatOrderByCustomerIdOrPhone(this.customerOrderListQuery).then(response => {

                    this.customerOrderList = response.data.list;
                    this.customerOrderListQuery.total = response.data.count;
                    this.customerOrderListLoading = false
                })
            },

            //-------充值记录
            //分页
            handleSizeChange_charge(val) {
                this.customerChargeListQuery.page_size = val;
                this.fetchCustomerChargeListData();
            },
            handleCurrentChange_charge(val) {
                this.customerChargeListQuery.page_index = val;
                this.fetchCustomerChargeListData();
            },

            //查询微信用户充值信息
            fetchCustomerChargeListData(current) {
                if (current) {
                    this.customerChargeListQuery.page_index = current
                }
                this.customerChargeListLoading = true;
                getWeChatChargeByCustomerIdOrPhone(this.customerChargeListQuery).then(response => {
                    this.customerChargeList = response.data.list;
                    this.customerChargeListQuery.total = response.data.count;
                    this.customerChargeListLoading = false
                })
            },

            //-------评论记录
            //分页
            handleSizeChange_appraise(val) {
                this.customerAppraiseListQuery.page_size = val;
                this.fetchCustomerAppraiseListData();
            },
            handleCurrentChange_appraise(val) {
                this.customerAppraiseListQuery.page_index = val;
                this.fetchCustomerAppraiseListData();
            },

            //查询微信用户充值信息
            fetchCustomerAppraiseListData(current) {
                if (current) {
                    this.customerAppraiseListQuery.page_index = current
                }
                this.customerAppraiseListLoading = true;
                getWeChatAppraiseByCustomerIdOrPhone(this.customerAppraiseListQuery).then(response => {
                    this.customerAppraiseList = response.data.list;
                    this.customerAppraiseListQuery.total = response.data.count;
                    this.customerAppraiseListLoading = false
                })
            },

            //-------优惠卷记录
            //分页
            handleSizeChange_coupon(val) {
                this.customerCouponListQuery.page_size = val;
                this.fetchCustomerCouponListData();
            },
            handleCurrentChange_coupon(val) {
                this.customerCouponListQuery.page_index = val;
                this.fetchCustomerCouponListData();
            },

            //查询微信用户优惠卷信息
            fetchCustomerCouponListData(current) {
                if (current) {
                    this.customerCouponListQuery.page_index = current
                }
                this.customerCouponListLoading = true;
                getWeChatCouponByCustomerIdOrPhone(this.customerCouponListQuery).then(response => {
                    this.customerCouponList = response.data.list;
                    this.customerCouponListQuery.total = response.data.count;
                    this.customerCouponListLoading = false
                })
            },
            deleteWeChatShoppingCartByCustomerId(CustomerId){
                deleteWeChatShoppingCartByCustomerId({brand_id:this.customerAppraiseListQuery.brand_id,customer_id:CustomerId}).then(response => {
                    this.$message.success(response.message)
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

    .edit-input {
        padding-right: 0px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 8px;
    }
</style>
