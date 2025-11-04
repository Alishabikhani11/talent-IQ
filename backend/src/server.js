import express from "express"
import { ENV } from "./lib/env.js"
import connectDB from "./lib/db.js";
import path from "path"
import cors from "cors"
import {serve} from "inngest/express"
import {inngest,functions} from "./lib/inngest.js"
import { clerkMiddleware } from '@clerk/express'
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";


const app=express();

const __dirname=path.resolve();

//middleware
app.use(express.json());

//credential:true?? means server allows browser(frontend) to include cookies at req
app.use(cors({origin:ENV.CLIENT_URL,credential:true}));

app.use("/api/inngest",serve({client: inngest,functions}));

app.use("/api/chat",chatRoutes);
app.use("/api/sessions",sessionRoutes);

app.use(clerkMiddleware()); //this adds auth field to request object: req auth()

app.get('/health',(req,res)=>{
    req.auth;
    res.status(200).json({"msg":"api is running and up"});
});


//make our app ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });

}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();