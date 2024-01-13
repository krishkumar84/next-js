import { addPost, deletePost } from '@/lib/action'
import React from 'react'

function page() {
  return (
    <div>
        <form className='text-black' action={addPost}>
            <input type="text" placeholder='title'name='title' />
            <input type="text" placeholder='desc' name='desc'/>
            <input type="text" placeholder='slug' name='slug'/>
            <input type="text" placeholder='userId'name='userId' />
           
      <button >Create</button>
      </form>

      <form className='text-black' action={deletePost}>
        <input type="text" placeholder='postId' name='id'/>
        <button>Delete</button>
      </form>
    </div>
  )
}

export default page
