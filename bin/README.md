# resto-admin -port 8001

#开发规范
- 所有接口必须经过测试通过才能交付上线
- 程序变量一律使用英文驼峰方式命名，禁止出现汉语拼音和错误的英语单词
- 接口变量命名使用下划线("_")进行单词分割，禁止出现汉语拼音和错误的英语单词
- 除非特殊需要，代码中一律不能保留console.log或者其他debug信息
- Tab占用4个空格
- 代码行末尾一律添加分号(;)
- 变量使用 let 声明，禁止再使用var声明
- 包引用和常量一律使用 const 声明，禁止再使用var声明
- redis 存储的键如下  article:stock:id.${article_id}       菜品/库存/字段名称/内容id

#所使用的主要技术
- express.js API框架
- socket.io.js 长连接框架
- sequelize.js mysql的ORM框架
- mongoose.js  mongodb的ORM框架
- redis.js  redis框架
- amqplib.js  rabbitmq框架


#项目结构
- bin 程序的启动入口
- config 配置文件存放地
- controller 控制器
- lib 所有自定义模块
- middlware 全局中间件
- pubblic 公共模块
 |- model 业务模型层
 |- service 底层服务
- resource 资源存放地
- router 路由映射
- test 测试文件

#依赖说明
#####指令说明添加子模块
> git submodule init
> git submodule update

#####指令说明添加子模块及主程序依赖
> cd public/ & npm install
> cd ../ & npm install


#接口测试
#####在开发环境运行测试
> gulp test

> NODE_ENV=dev gulp test

#####在预发布环境运行测试
> NODE_ENV=pre gulp test

#程序启动

####NODE_ENV环境变量，控制加载配置
#####参数说明
- NODE_ENV存在三种值，"dev"/"pre"/"pro"
- dev 表示加载开发环境配置，对应的文件是 /config/dev/index.js
- pre 表示加载预发布环境配置，对应的文件是 /config/pre/index.js
- pro 表示加载生产环境配置，对应的文件是 /config/pro/index.js

#####使用方式
> npm run dev #开发环境
> npm run build #打包前端
> npm run pre #测试环境
> npm run pro #生产环境

#####注意事项
> 代码拉下后来 执行如下命令　
a. 添加公共模块
 1. git submodule init
 2. git submodule update
b.添加依赖
 1. cd public/ & npm install
 2. cd ../ & npm install

## git submodule add git@gitee.com:resto/public.git