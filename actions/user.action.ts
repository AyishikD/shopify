"use server"

import user from "@/models/user"

import connectToDatabase from "@/lib/mongodb"

export async function createUser(User:any) {
    try{
          
        await connectToDatabase();
        const newUser = await user.create(User);
        return JSON.parse(JSON.stringify(newUser));
    }
    catch(error){
 console.log(error);
    }
    
}