<template>
    <div class="app-container">

        <!--查询  -->
        <el-row style="margin-bottom: 30px;">
            <el-cascader
                    style="width:10rem;"
                    :options="options"
                    change-on-select
                    filterable
                    placeholder="请选择品牌或店铺"
                    v-model="defaultOptions"
                    size="mini">
            </el-cascader>
            <el-input style="width:14rem;" v-model="listQuery.content" placeholder="id/手机号码/昵称" clearable size="mini"></el-input>

            <el-drag-select v-model="value_drag" style="width:11rem;" multiple placeholder="性别" size="mini">
                <el-option v-for="item in options_drag" :label="item.label" :value="item.value" :key="item.value" />
            </el-drag-select>
            <span style="margin-right: 15px;"></span>

            <el-tooltip class="item" content="搜索" placement="top">
                <el-button icon="el-icon-search" circle   @click="fetchData(1)" size="mini"></el-button>
            </el-tooltip>

        </el-row>

        <!--&lt;!&ndash;列表&ndash;&gt;-->
        <el-table style="width: 100%" :data="list"  size="mini" v-loading.body="listLoading" element-loading-text="Loading"  stripe border fit highlight-current-row >
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


            <el-table-column label="操作" fixed="right" width="100rem;">
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
        getBrandShopAll,
        getCustomerInfoList
    } from '@/api/restoBrand'
    import debounce from 'lodash/debounce'
    import clip from '@/utils/clipboard'
    import clipboard from '@/directive/clipboard/index.js'
    import ElDragSelect from '@/components/DragSelect' // base on element-ui


    export default {
        name: 'shopManage',
        directives: {
            clipboard
        },
        components: {
            ElDragSelect
        },
        data() {
            return {
                value_drag: [],
                options_drag: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }, {
                    value: '0',
                    label: '未知'
                }],
                options: [],        // 店铺选择
                value:[],
                // defaultOptions: [`${this.$route.params && this.$route.params.brand_id}`,`${this.$route.params && this.$route.params.shop_id}`],        // 店铺跳转的默认值
                defaultOptions: [`${this.$route.params && this.$route.params.brand_id}`],        // 店铺跳转的默认值
                listLoading: true,
                list: [],
                listQuery: {
                    brand_id:this.$route.params && this.$route.params.brand_id,
                    shop_id:this.$route.params && this.$route.params.shop_id,
                    page_index: 1,
                    page_size: 10,
                    total: 0,
                    content: null,
                    sex:this.value_drag,
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
                    0: 'danger',
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
            }, 500),
            //延时查询
            'value_drag': debounce(function () {    //下啦多选
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

                getCustomerInfoList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                })
            },
            //获取品牌\门店信息
            fetchOptions() {
                getBrandShopAll().then(response => {
                    this.options = response.data.options;
                    this.options.map((value) => {
                        delete value.children;
                    });

                    if(this.$route.params.brand_id ==`:brand_id`){
                        this.listQuery.brand_id = response.data.defaultBrandId;
                        this.listQuery.shop_id = response.data.defaultShopId;
                        // this.defaultOptions = [`${this.listQuery.brand_id}`,`${this.listQuery.shop_id}`];
                        this.defaultOptions = [`${this.listQuery.brand_id}`];
                    }
                    this.fetchData();
                })
            },
            handleItemChange() {
                this.listQuery.brand_id = this.defaultOptions[0];
                // this.listQuery.shop_id = this.defaultOptions[1];
                this.listQuery.sex = this.value_drag ;
                this.fetchData(1)
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
