const express = require('express'),
    app = express(),
    server = require('http').createServer(app);

    io = require('socket.io')(server);

    let timerId = null,
    sockets = new Set();
    var tradedate = require('./data');

    var localData;

    app.use(express.static(__dirname + '/dist'));

    io.on('connection', socket => {
        console.log(`Socket ${socket.id} added`);
        localData = tradedate.data;
        sockets.add(socket);
        if(!timerId){
            startTimer();
        }
        socket.on('clientdata', data => {
            console.log(data)
        });
        
        socket.on('disconnect', () => {
            console.log(`Deleting socket: ${socket.id}`);
            sockets.delete(socket);
            console.log(`Remaining sockets: ${sockets.size}`);
        });
    });

    function startTimer() {
        timerId = setInterval(() => {
            if(!sockets.size) {
                clearInterval(timerId);
                timerId = null;
                console.log('timer stopped');
            }
            updateData();
            for (const s of sockets) {
                s.emit('data',{ data: localData});
            }
        },10);
    }

    function getRandomInt(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max-min)) + min;
    }
    function updateData() {
        localData.forEach(
            (a) => {
                a.Coupon = getRandomInt(10,500);
                a.Notional = getRandomInt(1000000,7000000)
            });
    };

   

    server.listen(8080);
    console.log('server started')