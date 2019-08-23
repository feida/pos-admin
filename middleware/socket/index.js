/**
 * @author wxh on 2017/11/22
 * @copyright
 * @desc
 */

let socket_io = require('socket.io');

//获取io
module.exports.getSocketio = function(server){

    let io = socket_io.listen(server);

    io.of('/some').on('connection', function (socket) {
        console.log('连接成功22');
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
        // socket.on('click1',function(){
        //
        //     console.log('监听点击事件');
        //     // var datas = [1,2,3,4,5];
        //     // socket.emit('click2', {datas: datas});
        //     // socket.broadcast.emit('click2',  {datas: datas});
        // })
    })

};