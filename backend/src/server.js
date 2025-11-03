import express from "express"
import { ENV } from "./lib/env.js"
import connectDB from "./lib/db.js";
import path from "path"
import cors from "cors"
import {serve} from "inngest/express"

const app=express();

const __dirname=path.resolve();

//middleware
app.use(express.json());

//credential:true?? means server allows browser(frontend) to include cookies at req
app.use(cors({origin:ENV.CLIENT_URL,credential:true}));

app.use("/api/inngest",serve({client: inngest,functions}));

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

app.listen(ENV.PORT,()=>console.log(`server running on port ${ENV.PORT}`));