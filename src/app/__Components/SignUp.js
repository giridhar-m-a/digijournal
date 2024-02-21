import { useState } from "react";
import { postMethod } from "../lib/api.js";
import { setToken, getAuthorised } from "../lib/auth.js";
import "../globals.css";
import { useRouter } from "next/navigation";

const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`;
const apikey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    FirstName: "",
    LastName: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await postMethod(
        apiUrl,
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          FirstName: userData.FirstName,
          LastName: userData.LastName,
        },
        {
          headers: {
            "x-api-key": apikey,
          },
        }
      );
      console.log(responseData);
      setToken(responseData.data);
      if (await getAuthorised()) {
        router.push("/");
      }
    } catch (error) {
      console.log(`error posting Data : ${error}`);
    }
  };

  const handleChange = (e) => {
    if (
      e.target.name === "confirmPassword" &&
      userData.password !== e.target.value
    ) {
      setPasswordError("Passwords do not match");
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      setPasswordError("");
    }
  };

  return (
    <div>
      <h1 className="pb-8 text-center">Sign Up</h1>
      <form
        className="grid grid-cols-1 place-items-center gap-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 gap-2">
            <label className="px-2">First Name</label>
            <input
              className="authinput focus:outline-none"
              type="text"
              placeholder="First Name"
              name="FirstName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className="px-2">Last Name</label>
            <input
              className="authinput focus:outline-none"
              type="text"
              placeholder="Last Name"
              name="LastName"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className="px-2">Email</label>
            <input
              className="authinput focus:outline-none"
              type="Email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className="px-2">UserName</label>
            <input
              className="authinput focus:outline-none"
              type="text"
              placeholder="UserName"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className="px-2">Password</label>
            <input
              className="authinput focus:outline-none"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label className="px-2">Confirm Password</label>
            <input
              className="authinput focus:outline-none"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div>
          <p className="passworderror">{passwordError}</p>
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
