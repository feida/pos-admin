
const _ = require('lodash');

exports.getSocketPage = function (req, res, next) {
	console.log("1111");
	res.render('socket',{
		title: 'socket',
	})
};

exports.loginConnection = function (io,socket,obj) {
    socket.name=obj.userid;
    if(!onlineUser.hasOwnProperty(obj.userid)){ //检查用户在线列表
        onlineUser[obj.userid]=obj.username;
        onlineCount++; //在线人数+1
    }


    //广播消息
    io.emit('login',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});

    //广播消息去除自己
    // socket.broadcast.emit('login',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});

    // //私发
    // if(onlineUser.hasOwnProperty(`5b7fce1bca96274f8abe7ad1`)){
    //     var toSocket = _.find(io.sockets.sockets, {name: `5b7fce1bca96274f8abe7ad1`});
    //     toSocket.emit('login', {onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
    // }

    console.log(obj.username+"加入了聊天室");
};

exports.disconnectConnection = function (io,socket) {
    //将退出用户在在线列表删除
    if(onlineUser.hasOwnProperty(socket.name)){
        //退出用户信息
        var obj={userid:socket.name, username:onlineUser[socket.name]};
        //删除
        delete onlineUser[socket.name];
        //在线人数-1
        onlineCount--;
        //广播消息
        io.emit('logout',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});

        // //私发
        // if(onlineUser.hasOwnProperty(`5b7fce1bca96274f8abe7ad1`)){
        //     var toSocket = _.find(io.sockets.sockets, {name: `5b7fce1bca96274f8abe7ad1`});
        //     toSocket.emit('logout',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
        // }

        console.log(obj.username+"退出了聊天室");
    }
};

exports.messageConnection = function (io,socket,obj) {
	//向所有客户端广播发布的消息
    io.emit('message', obj);
    // console.log(onlineUser)
    // console.log(obj)
    // console.log(obj.username+'说：'+obj.content);
};

exports.reconnectConnection = function (io,socket,obj) {
    //向所有客户端广播发布的消息
    console.log('9999999')
    // console.log(obj)
    // console.log(obj.username+'说：'+obj.content);
};

