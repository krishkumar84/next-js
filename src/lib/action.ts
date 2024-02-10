"use server";
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import { User } from "./models";
import bcrypt from "bcryptjs";

export const addPost = async (prevState : any , formData : any) => {
  if (!formData) {
    console.error("formData is undefined");
    return; // or handle the error accordingly
  }
  console.log(formData);

    
    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");
    const {title,desc,slug,userId,img} = Object.fromEntries(formData);

    //console.log(title,desc,slug,userId);
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            img,
            userId
        });
        await newPost.save();
        console.log("save to Db");
        revalidatePath("/blog");
        revalidatePath("/admin");
        
    } catch (error) {
        console.log(error);
        return {error: "something went wrong"};
    }
}


export const deletePost = async (formData : any) => {
    
    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");
    const {id} = Object.fromEntries(formData);

    //console.log(title,desc,slug,userId);
    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from Db");
        revalidatePath("/blog");
        revalidatePath("/admin");
        
    } catch (error) {
        console.log(error);
        return {error: "something went wrong"};
    }
}

export const addUser = async (prevState: any,formData: any) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};


export const deleteUser = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};


export const register = async (previousState: any ,formData: any) => {
    const { username, email, password, img, passwordRepeat } =
      Object.fromEntries(formData);
  
    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
  
    try {
      connectToDb();
  
      const user = await User.findOne({ username });
  
      if (user) {
        return { error: "Username already exists" };
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword ,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
  
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };




  export const login = async (prevState: any, formData: any) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
      return { success: true };
      
    } catch (err) {
      console.log(err);
  
      if (err instanceof Error && err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
   throw err;
    // return { error: "something went wrong" };
    }
  };

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