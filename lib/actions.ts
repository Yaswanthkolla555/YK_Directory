"use server"

import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth/next";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { log } from "console";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch=async (state:any,formData:FormData,pitch:string )=>{
    const session=await getServerSession(authOptions);
    if(!session){
        return parseServerActionResponse({error:"Not Signed In",status:"ERROR"})
    }

    const {title,description,category,link}=Object.fromEntries(
        Array.from(formData).filter(([key])=>key!=="pitch"),
    );

    // to get unique id for the pitch we use slugify
    // install slugify
    const slug=slugify(title as string,{lower:true,strict:true})


    // we need to give _tyoe and _ref or  current for sanity CMS
    try{
        const startup={
            title,
            description,
            category,
            image: link,
            slug:{
                _type:"slug",
                current:slug,
            },
            author:{
                _type:"reference",
                _ref:session?.id,
            },
            pitch,
        }

        // write to sanity CMS and store the data in database
        const result=await writeClient.create({_type:"startup",...startup});
        return parseServerActionResponse({
            ...result,
            status:"SUCCESS",
            error:"",
        })
    }
    catch(error){
        console.log(error);
        return parseServerActionResponse({error:JSON.stringify(error),status:"ERROR"})      
    }
     
    
}