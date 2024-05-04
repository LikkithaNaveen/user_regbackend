require('./config/db')
const express = require("express");
const bodyParser = require('body-parser');
const Userrouter=require('./api/User')
const cors=require('cors')
const app = express();
app.use(express.json())
app.use(bodyParser.json())

app.use('/user',Userrouter)
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json("Sucessfully connected");
  });
  
  app.listen(5000, () => {
    console.log("the port is listening on port 5000");
  });
  