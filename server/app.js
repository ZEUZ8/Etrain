const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser');
const path = require('path')
const dotenv = require("dotenv") 
// const { Server } = require('socket.io')

const studentRoutes = require("./routes/studentRoutes")
const principalRoutes = require("./routes/principalRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
//socket connection 
const socketConnection = require("./socketIO")

dotenv.config();

const mongoDB = require("./database/connection");


const app = express()

const corsOptions = {
    origin: "http://localhost:3000",
    credentials:true,
    optionSuccessStatus:200,
};
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

mongoDB()

app.use(cors(corsOptions))
app.use("/",studentRoutes)
app.use("/principal",principalRoutes)
app.use("/teacher",teacherRoutes)

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    
});

const port = process.env.PORT
// const server = http.createServer(app)


const server = app.listen(port,()=>{
    console.log(`server running at port ${port}`.bgYellow.white)
})

socketConnection(server)



module.exports = app;

  