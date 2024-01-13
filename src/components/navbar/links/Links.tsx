"use client";

import { useState } from "react";
import React from 'react'
import Link from 'next/link';
import NavLink from './navLink/navLink';
import { render } from "react-dom";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

function Links({session}) {
    const links = [
        {
          title: "Homepage",
          path: "/",
        },
        {
          title: "About",
          path: "/about",
        },
        {
          title: "Contact",
          path: "/contact",
        },
        {
          title: "Blog",
          path: "/blog",
        },
      ];

      // const session = true;
      const isAdmin = true;

      const [open, setOpen] = useState(false);
      
  return (
    <div className="">
    <div className=' hidden  md:flex items-center justify-center gap-5'>
      { links.map((link=>(
        <NavLink item={link} key={link.title} />
      )))
      }{session?.user ? (
        <>
          {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
            <button className="bg-white px-5 py-2.5 rounded-2xl text-black">Logout</button>
            </form>
       
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
     <Image
     className=" block  md:hidden cursor-pointer"
     src="/menu.png"
     alt=""
     width={30}
     height={30}
     onClick={() => setOpen((prev) => !prev)}
   />
   {open && (
     <div className="absolute top-[100px] right-0 w-1/2 flex flex-col items-center justify-center gap-5 h-[100vh-100px] bg-[var(--bg)]   md:hidden">
       {links.map((link) => (
         <NavLink item={link} key={link.title} />
       ))}
     </div>
   )}
   </div>
  )
}

export default Links
