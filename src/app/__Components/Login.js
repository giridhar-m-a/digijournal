"use client";
import { useState } from "react";
import { postMethod } from "../lib/api.js";
import { setToken, getAuthorised } from "../lib/auth";
import "../globals.css";
import { useRouter } from "next/navigation";

const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`;

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await postMethod(apiUrl, {
        identifier: data.identifier,
        password: data.password,
      });
      console.log(responseData);
      // Use responseData as needed
      setToken(responseData.data);
      if (await getAuthorised()) {
        router.push("/app");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error posting data:", error);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1 className="pb-8 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
        <input
          className="authinput focus:outline-none"
          name="identifier"
          type="text"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          className="authinput focus:outline-none"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}
