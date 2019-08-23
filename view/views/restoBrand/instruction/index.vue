<template>
    <div class="app-container">
        <el-col :span="12" >
            <taBar :title="'服务器操作'" :type="'查询'"></taBar>
        </el-col>
        <el-col :span="12" >
            <taBar :title="'newpos操作'" :type="'查询'"></taBar>
        </el-col>
    </div>
</template>

<script>
    import taBar from './taBar/taBar'
    export default {
        components:{taBar},
        name: 'instructionManage',
        data() {
            return {
                brand_id:null,
                shop_id:null,
            }
        },
        created() {
            this.brand_id  = this.$route.params && this.$route.params.brand_id;
            this.shop_id  = this.$route.params && this.$route.params.shop_id;
        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
