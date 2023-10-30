import express from 'express';
import mongoose, { set } from "mongoose";
import { createServer } from 'http';
import cors from 'cors';
import dotenv from "dotenv";
import { Server } from 'socket.io';
import { User } from "./models/userModel.js";

const app = express();
dotenv.config();
set("strictQuery", false);


app.use(cors()); // Add cors middleware
app.use(express.json());

let baseUrl;
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:3000"
} else {
  baseUrl = "https://trizent-auto.vercel.app"
}

main().catch((err) => console.log(`MongoDB Error: ${err}`));
async function main() {
  let res = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`MongoDB Success: Database connected successfully`);
}
console.log(baseUrl )

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${baseUrl}`,
    methods: ['GET', 'POST'],
  },
});

console.log(process.env.NODE_ENV)

app.get('/', (req, res) => {
  res.status(200).send("Hello Ola");
});

app.post('/api/sign-in', async (req, res) => {
  try {
    var userDetails = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      loggedIn: req.body.loggedIn
    }
    let checkUser = await User.find({email: req.body.email })
    if (checkUser.length >= 1) {
      console.log("SDT")
      return res.status(200).send({ message: "Email Already Exists" });
    }
    await User.create(userDetails);
    console.log("User Added Successfully");
    return res.status(200).send({ message: "User Added Successfully" });
  } catch (error) {
    // console.log(req)
    console.log(`Error SignIn: ${error.message}`);
    return res.status(500).send({ message: error.message });
  }
});

app.get("/api/check", async(req, res) => {
  try {
    let users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send("Error Connecting")
  }
 
});
app.post('/api/log-in', async (req, res) => {
  try {
    console.log("############################")
    console.log(await User.find({}))
    console.log(await User.find({ email: req.body.emai, password: req.body.password }))
    var findQuery = await User.find({ email: req.body.emai, password: req.body.password })
    if (findQuery.length < 1) {
      console.log("JJK")
      return res.status(200).send({message: "No matching data"});
      // throw new Error("Not found")
    }
    console.log("KKL")
    // findQuery.push({message: "Success"})
    // console.log(findQuery)
    res.status(200).send(findQuery[0])
  } catch (error) {
    console.log(`Error LogIn: ${error.message}`)
    res.status(500).send({ message: "Error Connecting Database" })
  }

})

app.get('/api/delete-users', async (req, res) => {
  try {
    let del = await User.deleteMany({ email: "elijahdimeji549@gmail.com" })
    res.status(200).send(del)
  } catch (error) {
    return res.status(500).send("MongoDB Error: Error Deleting Users");
    console.log("AFG")
  }
});

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = []

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const { name, room } = data;
    // alert(JSON.stringify({name, room}));
    socket.join(room);

    let __createdTime__ = Date.now();
    socket.to(room).emit('receive_message', {
      message: `${socket.id} has joined the chat room`,
      username: CHAT_BOT,
      __createdTime__,
    })

    socket.emit('receive_message', {
      message: `Welcome ${socket.id}`,
      username: CHAT_BOT,
      __createdTime__,
    })

    chatRoom = room;
    allUsers.push({ id: socket.id, name, room });
    chatRoomUsers = allUsers.filter(user => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  })

  let dadta = ""
  socket.on('toAdmin', (data) => {
    // dadta = data
    console.log(data);
    dadta = JSON.parse(data).request;
    if (dadta.length <= 5) {
      // io.emit('request', JSON.parse(data).request)
      setTimeout(() => {
        io.emit('chat_room', "Hi. How can i help you ? ")
      }, 1000)

    }
    if (data.includes("how")) {
      io.emit('chat_room', JSON.stringify({ response: "FAQ" }));
    }
    // io.emit('request', JSON.parse(data).request)
  })

  socket.on('fromAdmin', (data) => {
    dadta = data
    console.log(data);
    if (data.length <= 5) {
      io.emit('chat_room', "Hi. How can i help you ? ")
    }

  })
})


server.listen(4000, () => console.log('Server is running on port 4000'));



