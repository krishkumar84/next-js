import React from 'react'
import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

function postCard({post}) {

  var originalDateString = post.createdAt.toString();

// Convert the original date string to a Date object
var dateObject = new Date(originalDateString);

// Use the toLocaleDateString method with the desired options
var formattedDateString = dateObject.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

//console.log(formattedDateString); 
  return (
    <div className={styles.container}>
      <div className={styles.top}>
      {post.img && <div className={styles.imgContainer}>
          <Image
            src={post.img}
            alt=""
            fill
            className={styles.img}
          />
        </div>}
        <span className={styles.date}>{formattedDateString}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>
          {post.body}
        </p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
      </div>
    </div>
  );
}

export default postCard
