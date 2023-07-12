const  { Server } = require( "socket.io");
const colors = require("colors");


function socketConnection(server){
    console.log('socket Connection Calling'.bgYellow.white);
    const io = new Server(server,{
        cors :{
            origin: "http://localhost:3000",
            methods:["GET","POST"],
        }
    })

    let users = []

    const addUser = (userId,socketId)=>{
        !users.some((user) => user.userId === userId)&&
        users.push({userId,socketId})
    }

    const removeUser = (sockeId)=>{
        users = users.filter((user) => user.sockeId !== sockeId)
    }
    const getUser = (userId)=>{
        return users.find((user)=>user.userId === userId)
    }
   


    io.on("connection",(socket)=>{
        //when connected 
        // console.log("user socket connected")

        //take userId and socketId from user 
        socket.on("addUser",userId=>{
            // addUser(userId,socket.id)
            socket.join(123)
            io.emit("getUsers",users)
        })

        //send and get message
        socket.on("sendMessage",({senderId,receiverId,text})=>{
            // const user = getUser(receiverId)
            // console.log(user?.socketId,user,'the user')
            // io.to(user?.socketId).emit("getMessage",{
            //     senderId,text
            // })
            console.log('send messge')
            socket.to(123).emit("getMessage",{senderId,receiverId,text})
            socket.to(123).emit("getNotify",{receiverId,read:false,text})
        })

        //when disconnect
        socket.on("disconnect",()=>{
            removeUser(socket.id)
            io.emit("getUsers",users)
        })


    })
}


module.exports= socketConnection