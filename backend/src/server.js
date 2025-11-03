import express from "express"
import { ENV } from "./lib/env.js"
import connectDB from "./lib/db.js";

import path from "path"

const app=express();

const __dirname=path.resolve();

app.get('/health',(req,res)=>{
    res.status(200).json({"msg":"api is running and up"});
});
app.get('/books',(req,res)=>{
    res.status(200).json({"msg":"interesting books for you"});
});
//make our app ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });

}

const startServer= async()=>{
    try{
    await connectDB();    
    app.listen(ENV.PORT,()=>{console.log(`server running on port ${ENV.PORT}`);});
    }
    catch(error){
    console.log("Error in connecting Server",error);
    }
}

startServer();