<template>
    <div class="app-container">
        <!--查询  -->
        <el-row>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addData" v-perm="'b:server:add'">
                {{textMap.create}}
            </el-button>
        </el-row>

        <div style="margin-bottom: 15px;"></div>
        <!--列表-->
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="服务器ip" width="120rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.ip"></el-input>
                    </template>
                    <span v-else>{{ scope.row.ip }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="服务器名称" width="110rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.name"></el-input>
                    </template>
                    <span v-else>{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="服务器http" width="200rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.pos_http_url"></el-input>
                    </template>
                    <span v-else>{{ scope.row.pos_http_url }}</span>
                </template>

            </el-table-column>

            <el-table-column align="center" label="http_path" width="90rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.http_path"></el-input>
                    </template>
                    <span v-else>{{ scope.row.http_path }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="服务器mqtt" width="260rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.pos_mqtt_url"></el-input>
                    </template>
                    <span v-else>{{ scope.row.pos_mqtt_url }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="pos_web_url" width="300rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.pos_web_url"></el-input>
                    </template>
                    <span v-else>{{ scope.row.pos_web_url }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="winpos_receive_platform" width="200rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.receive_platform"></el-input>
                    </template>
                    <span v-else>{{ scope.row.receive_platform }}</span>
                </template>
            </el-table-column>



            <el-table-column align="center" label="publish_theme_pos_admin" width="200rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.publish_theme_pos_admin"></el-input>
                    </template>
                    <span v-else>{{ scope.row.publish_theme_pos_admin }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="publish_theme_resto" width="200rem">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="mini" v-model="scope.row.publish_theme_resto"></el-input>
                    </template>
                    <span v-else>{{ scope.row.publish_theme_resto }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row,'tb_order_payment_item')" size="mini" >✔</el-button>
                    <el-button v-if="scope.row.edit"  size="mini"  type="warning" @click="cancelEdit(scope.row,'tb_order_payment_item')">✘</el-button>
                    <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>
                    <el-button @click="deleteAliyColonyServerConfigById(scope.$index,scope.row)" size="medium" :type="'danger'" icon="el-icon-delete" circle plain></el-button>
                </template>
            </el-table-column>
        </el-table>

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
        getAliyColonyServerConfig,
        updateAliyColonyServerConfig,
        deleteAliyColonyServerConfigById
    } from '@/api/serverConfig'

    import {debounce, resetTemp} from '@/utils'

    export default {
        name: 'ServerManage',
        data() {
            return {
                listLoading: true,
                list: null,
                listQuery: {
                    page_index: 1,
                    page_size: 10,
                    total: 0,
                    content: null
                },
                textMap: {
                    create: '新增配置'
                },
            }
        },

        created() {
            this.fetchData()
        },

        watch: {
            //延时查询
            'listQuery.content': debounce(function () {
                this.fetchData(1)
            }, 500)
        },

        methods: {
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
                getAliyColonyServerConfig(this.listQuery).then(response => {
                    this.list = response.data.rows.map(v => {
                        this.$set(v, 'edit', false);
                        v.receive_platform  = v.receive_platform.join(',');
                        v.originalIp = v.ip;
                        v.originalName = v.name;
                        v.originalPosHttpUrl = v.pos_http_url;
                        v.originalHttpPath = v.http_path;
                        v.originalPosMqttUrl = v.pos_mqtt_url;
                        v.posWebUrl = v.pos_web_url;
                        v.receivePlatform = v.receive_platform;
                        v.publishThemePosAdmin = v.publish_theme_pos_admin;
                        v.publishThemeResto = v.publish_theme_resto;
                        return v
                    });
                    this.listQuery.total = response.data.count;
                    this.listLoading = false
                });
            },
            confirmEdit(row) {
                row.edit = false;
                row.originalIp = row.ip;
                row.originalName = row.name;
                row.originalPosHttpUrl = row.pos_http_url;
                row.originalHttpPath = row.http_path;
                row.originalPosMqttUrl = row.pos_mqtt_url;
                row.posWebUrl = row.pos_web_url;
                row.receivePlatform = row.receive_platform;
                row.publishThemePosAdmin = row.publish_theme_pos_admin;
                row.publishThemeResto = row.publish_theme_resto;

                let param = {
                    ip:row.originalIp,
                    name:row.originalName,
                    pos_http_url:row.originalPosHttpUrl,
                    http_path:row.originalHttpPath,
                    pos_mqtt_url:row.originalPosMqttUrl,
                    pos_web_url:row.posWebUrl,
                    receive_platform:row.receivePlatform,
                    publish_theme_pos_admin:row.publishThemePosAdmin,
                    publish_theme_resto:row.publishThemeResto
                };

                updateAliyColonyServerConfig(param).then(response => {
                    if(response &&response.ok){
                        this.$message.success("修改成功")
                    }else {
                        if(response){
                            this.$message.error(response.message)
                        }
                        this.fetchData();
                    }
                });
            },
            cancelEdit(row){
                row.edit = false;
                row.ip = row.originalIp;
                row.name = row.originalName;
                row.pos_http_url = row.originalPosHttpUrl;
                row.http_path = row.originalHttpPath;
                row.pos_mqtt_url = row.originalPosMqttUrl;
                row.pos_web_url = row.posWebUrl;
                row.receive_platform = row.receivePlatform;
                row.publish_theme_pos_admin = row.publishThemePosAdmin;
                row.publish_theme_resto = row.publishThemeResto;
                this.$message.warning(`The content has been restored to the original value`)
            },
            //添加数据
            addData() {
                let j = {
                    edit:false,
                    ip:'',
                    name:'',
                    pos_http_url:'',
                    http_path:'/v1',
                    pos_mqtt_url:'',
                };
                this.list.push(j);
                j.edit = true;
            },
            //删除数据
            deleteAliyColonyServerConfigById(index,row) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {
                        id:row._id
                    };
                    deleteAliyColonyServerConfigById(param).then(response => {
                        this.fetchData();
                        this.$message.success("删除成功")
                    });
                }).catch(() => {
                    this.$message.info(`已取消删除!`);
                });
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .role-checkbox {
        margin-left: 0px;
        margin-right: 15px;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 0;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #ccc;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
