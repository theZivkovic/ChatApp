"use strict";

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mainRouter = require('./routes/main');
let IoHandler = require('./modules/ioHandler');

// initialize the app
let app = express();

// set the server 
let server  = require("http").createServer(app);

// initialize session  
let session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + (15 * 60 * 1000))
});

let sharedsession = require("express-socket.io-session");

// initialize socket.io
let io = require("socket.io")(server);
io.use(sharedsession(session));

// Attach session
app.use(session);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
let ioHandler = new IoHandler(io);

server.listen(3000);