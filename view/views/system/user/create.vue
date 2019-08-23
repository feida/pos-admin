<template>
    <div class="app-container">
    用户创建
    </div>
</template>

<script>
    import { getSystemList } from '@/api/system'

    export default {
        name: 'systemList',
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>
    .edit-input {
        padding-right: 100px;
    }
    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }
</style>
