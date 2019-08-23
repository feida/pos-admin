
const socketController = require('../../controller/socket');

//进入socket的页面路由
exports.map = function (app) {
	app.get('/socket', socketController.getSocketPage)
};

//socket路由
exports.mapSocket =  (io) =>{
    io.on('connection', (socket)=>{
        console.log(`有新用户登陆`);
        socket.on('login',(obj)=>socketController.loginConnection(io,socket,obj));                       //监听新用户加入
        socket.on('disconnect',(obj)=>socketController.disconnectConnection(io,socket,obj));             //监听用户退出
        socket.on('message',(obj)=>socketController.messageConnection(io,socket,obj))                    //监听用户发布聊天内容
        socket.on('reconnect',(obj)=>socketController.reconnectConnection(io,socket,obj))                    //监听用户发布聊天内容
    });
};

