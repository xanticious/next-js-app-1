import Link from "next/link";
import React from "react";
import { auth } from "./auth";

const NavBar = async () => {
  const session = await auth();

  return (
    <div className="flex bg-slate-200 p-5">
      <Link href="/" className="mr-5">
        Home
      </Link>
      <Link href="/products" className="mr-5">
        Products
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      <Link href="/admin" className="mr-5">
        Admin
      </Link>
      {session ? (
        <div>
          {session.user!.name}
          <Link href="/api/auth/signout" className="ml-3">
            Sign Out
          </Link>
        </div>
      ) : (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
