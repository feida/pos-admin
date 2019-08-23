<template>
    <div style="border: 1px solid black; width: 100%; height: 600px;">
        <h2 style="background-color: #290543;color: white; height: 30px; line-height: 30px; text-align: center; margin-top: 0px;">{{title}}</h2>
        <div class="query-container">
            <div>
                <input type="text" placeholder="流水号">
                <el-dropdown  @click="handleClick">
                      <span class="el-dropdown-link">
                        查询类型<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>订单详情</el-dropdown-item>
                        <el-dropdown-item>菜品详情</el-dropdown-item>
                        <el-dropdown-item>支付详情</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <button>{{type}}</button>
            </div>
            <div class="query-content">
                <h2>查询结果: </h2>
                <div style="border-bottom: 1px solid black"></div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props:['title', 'type'],
    name: 'TaBar',
    methods: {
      handleClick() {
        alert('button click');
      }
    }
  }
</script>

<style scoped>

</style>