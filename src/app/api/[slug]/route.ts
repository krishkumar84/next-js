import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (params : any) => {
    const {slug}= params;
    try {
        connectToDb();

        const post = await Post.findOne({slug});
        return NextResponse.json(post)


        
    } catch (error) {
        console.log(error);
        throw new Error("failded to fetch post");
        
    }
}

export const DELETE = async (params : any) => {
    const {slug}= params;
    try {
        connectToDb();

        const post = await Post.deleteOne({slug});
        return NextResponse.json(post)


        
    } catch (error) {
        console.log(error);
        throw new Error("failded to delete post");
        
    }
}