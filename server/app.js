require("dotenv").config();

const express = require("express");
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

//components
const apiRouter = require("./app/router/api-router");

  const DBStiring ="mongodb://localhost:27017/Zomato-Final";

  const PORT = process.env.PORT || 8080;
  
  mongoose.connect(DBStiring,()=>{console.log("database connected successfully")},e=>console.log("Error 404 in database server",e));
  const app = express();

  app.use(cors());
  app.use(bodyparser.json());
  if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path =require('path');
    app.get('./',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
  }
app.use("/api", apiRouter);
app.listen(PORT,()=>console.log(`server is running on the port : ${PORT}`));


