"use client";
import { useState, useEffect } from "react";
import { getAuthorised } from "../lib/auth.js";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "../__Components/Header.js";
import SideBar from "../__Components/SideBar.js";

export default function Home() {
  const router = useRouter();
  // console.log(`cookies:${Cookies.get("jwt")}`);
  useEffect(() => {
    if (Cookies.get("jwt")) {
      if (!getAuthorised()) {
        router.push("/getstarted");
      }
    } else {
      router.push("/getstarted");
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="grid grid-cols-6">
        <div className="col-span-1 border-solid border-r-2 h-screen">
          <SideBar />
        </div>
      </div>
    </main>
  );
}

// Home.useClient;
