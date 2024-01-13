"use server";
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";

export const addPost = async (formData) => {
    
    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");
    const {title,desc,slug,userId} = Object.fromEntries(formData);

    //console.log(title,desc,slug,userId);
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        });
        await newPost.save();
        console.log("save to Db");
        revalidatePath("/blog")
        
    } catch (error) {
        console.log(error);
        return {error: "something went wrong"};
    }
}


export const deletePost = async (formData) => {
    
    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");
    const {id} = Object.fromEntries(formData);

    //console.log(title,desc,slug,userId);
    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from Db");
        revalidatePath("/blog")
        
    } catch (error) {
        console.log(error);
        return {error: "something went wrong"};
    }
}


export const handleGithubLogin = async () => {
    "use server";

    await signIn("github");

  }

  export const handleGoogleLogin = async () => {
    "use server";

    await signIn("google");

  }

  export const handleLogout = async () => {
    "use server";

    await signOut();

  }