/**
 * @author wxh on 2018/9/10
 * @copyright
 * @desc
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


import Layout from '@/views/layout/Layout'


export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true},
    {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
    {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true},
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'dashboard',
            meta: {title: '首页', icon: 'dashboard', noCache: true}
        }]
    }
];

export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表

export const asyncRouterMap = [


    {
        path: '/restoBrand',
        component: Layout,
        meta: { perm:'m:restoBrand', title: '商户管理', icon: 'chart' },
        children: [
            {
                path: '/shop_manage',
                name: 'shop_manage',
                component: () => import('@/views/restoBrand/shop/index'),
                redirect: '/shop_manage/shop_list',
                meta: { perm: 'm:restoBrand:shop', title: '店铺管理', icon: 'table', noCache: true },
                children: [
                    { path: 'shop_list', name: '店铺列表', component: ()=>import('@/views/restoBrand/shop/shop/index'), meta: { perm:'m:restoBrand:shop:list', title: '店铺列表' }},
                    { path: 'shop_order_list/:brand_id/:shop_id', name: '线上订单', component: ()=>import('@/views/restoBrand/shop/order/index'), meta: { perm:'m:restoBrand:shop:order:list', title:'线上订单'},hidden: true},
                    { path: 'shop_order_details/:brand_id/:shop_id/:order_id', name: '订单详情', component: ()=>import('@/views/restoBrand/shop/order/details'), meta: { perm:'m:restoBrand:shop:order:details', title:'订单详情'},hidden: true},
                    { path: 'shop_article_list/:brand_id/:shop_id', name: '菜品列表', component: ()=>import('@/views/restoBrand/shop/article/index'), meta: { perm:'m:restoBrand:shop:article:list', title: '菜品列表' },hidden: true},

                    { path: 'pos_order_list/:brand_id/:shop_id', name: 'pos订单', component: ()=>import('@/views/restoBrand/pos/order/index'), meta: { perm:'m:restoBrand:pos:order:list', title:'pos订单'},hidden: true},
                    { path: 'pos_order_details/:brand_id/:shop_id/:order_id', name: 'pos订单详情', component: ()=>import('@/views/restoBrand/pos/order/details'), meta: { perm:'m:restoBrand:pos:order:details', title:'pos订单详情'},hidden: true},

                    { path: 'shop_customer_list/:brand_id/:shop_id', name: '顾客列表', component: ()=>import('@/views/restoBrand/shop/customer/index'), meta: { perm:'m:restoBrand:shop:customer:list', title: '顾客列表' }},
                    { path: 'shop_customer_details/:brand_id/:customer_id', name: '顾客详情', component: ()=>import('@/views/restoBrand/shop/customer/details'), meta: { perm:'m:restoBrand:shop:customer:details', title: '顾客详情' }},

                    { path: 'shop_abnormal_list/:brand_id/:shop_id', name: '异常订单', component: ()=>import('@/views/restoBrand/shop/abnormal/index'), meta: { perm:'m:restoBrand:abnormal:order:list', title:'异常订单'}},
                ]
            },

            {
                path: 'instruction/:brand_id/:shop_id',
                name: 'instruction_manage',
                component: () => import('@/views/restoBrand/instruction/index'),
                meta: { perm: 'm:restoBrand:instruction', title: '指令管理', icon: 'table', noCache: true },
                hidden: true
            },
        ]
    },


    {
        path: '/spider',
        component: Layout,
        meta: { perm:'m:spider', title: '爬虫管理', icon: 'chart' },
        children: [
            {
                path: 'merchants_user_manage',
                name: 'merchants_user_manage',
                component: () => import('@/views/spider/merchants_user/index'),
                meta: { perm: 'm:spider:merchants_user', title: '商业用户', icon: 'table', noCache: true }
            },
            {
                path: '/management_manage',
                name: 'management_manage',
                component: () => import('@/views/spider/management/index'),
                redirect: '/shop_manage/shop_list',
                meta: { perm: 'm:spider:management', title: '经营分析', icon: 'table', noCache: true },
                children: [
                    { path: 'business_list', name: '营业统计', component: ()=>import('@/views/spider/management/business/index'), meta: { perm:'m:spider:management:business:list', title: '营业统计' }},
                ]
            }
        ]
    },

    // {
    //     path: '/statement',
    //     component: Layout,
    //     meta: { perm:'m:statement', title: '报表管理', icon: 'chart' },
    //     children: [
    //         {
    //             path: 'statement_manage',
    //             name: 'statement_manage',
    //             component: () => import('@/views/statement/user/index'),
    //             meta: { perm: 'm:statement:user', title: '用户管理', icon: 'table', noCache: true }
    //         }
    //     ]
    // },

    {
        path: '/agenda',
        component: Layout,
        meta: { perm:'m:agenda', title: '任务管理', icon: 'chart' },
        children: [
            {
                path: 'instruction/:brand_id/:shop_id',
                name: 'instruction_manage',
                component: () => import('@/views/restoBrand/instruction/index'),
                meta: { perm: 'm:restoBrand:agenda', title: '任务列表', icon: 'table', noCache: true },
                hidden: true
            },

        ]
    },


    {
        path: '/charts',
        component: Layout,
        meta: {perm:'m:charts',title: '图表管理',icon: 'chart'},
        children: [
            { path: 'keyboard', component: () => import('@/views/charts/keyboard'), name: '键盘图表', meta: { title: '键盘图表', noCache: true }},
            { path: 'line', component: () => import('@/views/charts/line'), name: '折线图表', meta: { title: '折线图表', noCache: true }},
            { path: 'mixchart', component: () => import('@/views/charts/mixChart'), name: '混合图表', meta: { title: '混合图表', noCache: true }},
            { path: 'pages/charts', component: () => import('@/views/charts/index'), name: 'charts', meta: { title: 'charts', noCache: true }},
        ]
    },

    {
        path: '/server',
        component: Layout,
        meta: {perm:'m:server',title: '服务配置',icon: 'chart'},
        children: [
            { path: 'colony', component: () => import('@/views/server/colony'), name: '集群配置', meta: { title: '集群配置', noCache: true }}
        ]
    },

    {
        path: '/system',
        component: Layout,
        meta: { perm:'m:sys', title: '系统', icon: 'chart' },
        children: [
            {
                path: 'user_manage',
                name: 'user_manage',
                component: () => import('@/views/system/user/index'),
                meta: { perm: 'm:sys:user', title: '用户管理', icon: 'peoples', noCache: true }
            },
            {
                path: 'edit/:id',
                component: () => import('@/views/system/user/edit'),
                name: 'edit',
                meta: {hiddenTag: true , title: '用户编辑'},
                hidden: true,
            },
            {
                path: 'create',
                component: () => import('@/views/system/user/create'),
                name: 'create',
                meta: {hiddenTag: true , title: '用户创建'},
                hidden: true,
            },
            {
                path: 'role_manage',
                name: 'role_manage',
                component: () => import('@/views/system/role/index'),
                meta: { perm: 'm:sys:role', title: '角色管理', icon: 'chart', noCache: true },
            },
            {
                path: 'role_manage/:roleId/assign_perm',
                name: 'role_manage_assign_perm',
                component: () => import('@/views/system/role/assign_perm'),
                meta: { hiddenTag: true , title: '角色授权'},
                hidden: true,
            },
            {
                path: 'perm_manage',
                name: 'perm_manage',
                component:  () => import('@/views/system/perm/index'),
                meta: { perm: 'm:sys:perm', title: '权限管理', icon: 'chart', noCache: true }

            },
            {
                path: '/record_manage',
                name: 'record_manage',
                component: ()=>import('@/views/system/record/index'),
                redirect: '/record_manage/administrator_record',
                meta: { perm:'m:sys:record', title: '行为记录', icon: 'table',noCache: true},
                children: [
                    { path: 'administrator_record', name: '用户记录', component: ()=>import('@/views/system/record/administrator/index'), meta: { perm:'m:sys:record:administrator', title: '用户记录' }},
                    { path: 'order_record', name: '订单记录', component: ()=>import('@/views/system/record/order/index'), meta: { perm:'m:sys:record:order', title: '订单记录' }},
                    { path: 'order_record_details/:brand_id/:shop_id/:order_id', name: '订单记录详情', component: ()=>import('@/views/system/record/order/details'), meta: { perm:'m:sys:record:order:details', title:'订单记录详情'}},

                ]
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]
