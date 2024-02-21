"use client";
import { useState, useEffect } from "react";
import { getAuthorised } from "../lib/auth.js";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import HeaderUnAuth from "../__Components/HeaderUnAuth";

export default function Home() {
  const router = useRouter();
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
      <HeaderUnAuth />
    </main>
  );
}

// Home.useClient;
