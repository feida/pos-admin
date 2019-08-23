<template>
    <div class="app-container">
    编辑用户
    </div>
</template>

<script>
    import { getSystemList } from '@/api/system'

    export default {
        name: 'edit',
        data() {
            return {
                // list: null,
                // total: 0,
                // listLoading: true,
                // listQuery: {
                //     page_index: 1,
                //     page_size: 10
                // }
            }
        },
        filters: {

        },
        created() {

        },
        methods: {
            getUserInfo() {
                this.listLoading = true;
                // getSystemList(this.listQuery).then(response => {
                //     this.list = response.data.list;
                //     this.total = response.data.count;
                //     this.listLoading = false
                // })
            }
        }
    }
</script>

<style scoped>

</style>
