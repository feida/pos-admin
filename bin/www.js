/**
 * @author wxh on 2017/11/14
 * @copyright
 * @desc
 */

const app = require('../app');

const http = require('http');

/**
 * Get port from environment and store in Express.
 */
let port = app.get('port') || 8001;
/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/*
 * @desc 是否有socket.io
 * */

if (app.socket) {
    const io = app.socket.io(server);

    app.socket.routers.forEach(function (router) {
        router.mapSocket(io)
    });
}


// let socket = require('../middleware/socket');
//
// socket.getSocketio(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
