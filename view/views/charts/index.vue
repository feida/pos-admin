<template>
    <iframe v-if="$route.query.src" :src='$route.query.src' class="iframe" ref="iframe"
            v-loading.fullscreen.lock="fullscreenLoading"></iframe>
    <iframe v-else :src="urlPath" class="iframe" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading"></iframe>
</template>

<script>
    export default {
        name: 'myiframe',
        data() {
            return {
                fullscreenLoading: false,
                //urlPath: this.getUrlPath()
                //urlPath: 'http://127.0.0.1:8081/pages/charts/index.html'
            }
        },
        created() {
            this.getUrlPath()
            console.log('this.$route', this.$route)

        },
        mounted() {
            this.iframeInit()
            window.onresize = () => {
                this.iframeInit()
            }
        },
        props: ['routerPath',],
        watch: {
            routerPath: function (val) {
                this.urlPath = this.getUrlPath()
            }
        },
        components: {},
        methods: {
            iframeInit() {
                const iframe = this.$refs.iframe
                const clientHeight = document.documentElement.clientHeight - 90
                iframe.style.height = `${clientHeight}px`
                if (iframe.attachEvent) {
                    iframe.attachEvent('onload', () => {
                        this.fullscreenLoading = false
                    })
                } else {
                    iframe.onload = () => {
                        this.fullscreenLoading = false
                    }
                }
            },
            getUrlPath: function () {
                let path = this.$route && this.$route.path.substring(7)
                let url = window.location.origin
                this.urlPath = url + path + '/index.html'
                console.log('this.urlPath', this.urlPath)
            }
        }
    }
</script>

<style>
    .iframe {
        width: 100%;
        height: 100%;
        border: 0;
        overflow: hidden;
        box-sizing: border-box;
    }
</style>