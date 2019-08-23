<template>
    <div class="dashboard-container">
        <component :is="currentRole"></component>
      <!--<div>
        <input type="text" v-model="msg">
        <button @click="changeContent(msg)">确认</button>
        <button @click="toggle1">切换</button>
        <br>
        connectStatus: {{ connectStatus }}
        <br>
        &lt;!&ndash;not_connectStatus: {{ not_connectStatus }}&ndash;&gt;
        <br>
        info: {{ info }}
        <br>
        inputMessage: {{ message }}
      </div>-->

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import adminDashboard from './admin'
    import editorDashboard from './editor'

    export default {
        name: 'dashboard',
        components: {adminDashboard, editorDashboard},
        data() {
            return {
                currentRole: 'adminDashboard',

                msg:''
            }
        },
        computed: {
            ...mapGetters([
                'perms',


//                'connectStatus',
//                'info',
//                'message',
            ])
        },
        created() {
            if(!this.perms.some(p=>p.val=="*")){
                this.currentRole = 'editorDashboard'
            }
        },
      methods: {
//        toggle1() {
//          console.log('this.info',this.info)
//          this.$socket.emit('login', {userid:'111',username:'oo'});
//        },
//        changeContent(){
//          this.$store.dispatch('changeContent', this.msg)
//        }
      }

    }
</script>
