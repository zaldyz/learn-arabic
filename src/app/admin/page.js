"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";

export default function AdminHome() {
  const { data: session } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      {session ? (
        <>
          <img
            src={session.user.image}
            className="rounded-full h-20 w-20"
          ></img>
          <h1 className="text-3xl font-bold">
            Welcome Back, {session.user.name}!
          </h1>
          <button
            onClick={() => signOut()}
            className="rounded-lg border border-black bg-red-500 p-1"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Logged out</h1>
          <button
            onClick={() => signIn("google")}
            className="rounded-lg border border-black bg-green-500"
          >
            Sign in with Google
          </button>
        </>
      )}
    </main>
  );
}
