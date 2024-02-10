import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async (slug: any) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if (!res.ok) {
     throw new Error("Something went wrong");
  }

   return res.json();
 };


const SinglePostPage = async (params: any) => {
  const {slug} = params;
  //const post = await getData(slug);
  const post = await getPost(slug);

 //console.log(post.createdAt.toString())

 
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          className={styles.img}
          src={post.img}
          alt=""
          fill
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="/noavatar.png"
            alt=""
            width={50}
            height={50}
          />

            {post && (<Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>)} 

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(4,16)}</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.desc}
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage
