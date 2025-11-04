import { requireAuth } from '@clerk/express'
import User from "../models/User.js"


export const protectRoute=[
   requireAuth(),
   async(req,resizeBy,next)=>{
    try{
        const clerkId=req.auth().userId;

        if(!clerkId) return resizeBy.status(401).json({
            message:"unauthorized -invalid token"
        });

        const user=await User.findOne({clerkId});
        
        if(!user) return resizeBy.status(404).json({message:"User not found"});

        //attach user to req
        req.user=user;

        next();
    }
    catch(error){
        console.log("Error in protectRoutemiddleware",error);
        resizeBy.status(500).json({message:"Internal Server Error"});
    }
   },
];
