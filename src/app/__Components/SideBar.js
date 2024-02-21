import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserData, unsetToken } from "../lib/auth.js";
import { getMethod } from "../lib/api.js";
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const profilePicUrl =
  "https://res.cloudinary.com/dhklpkwbz/image/upload/v1708524892/thumbnail_user_f2014fb8fb.png?updatedAt=2024-02-21T08%3A44%3A53.217Z";

export default function SideBar() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(); // Call the asynchronous function to get user data
        setUserInfo(userData.data); // Assuming userData has a 'data' property
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    // const router = useRouter();
    unsetToken();
    router.push("/getstarted");
  };

  console.log(`Sidebar User Info : ${JSON.stringify(userInfo)}`);

  return (
    <div>
      <div className="profile px-4 py-4 border-solid border-b-2 grid grid-cols-3">
        <div className="rounded-full bg-blue-500">
          <Image
            className="profilepic rounded-full"
            src={userInfo?.ProfilePic?.url || profilePicUrl}
            width="90"
            height="90"
            alt="user icon"
          />
        </div>
        <div className="grid grid-cols-1 place-content-center col-span-2">
          <h3 className="text-center">{`${userInfo?.FirstName || ""} ${
            userInfo?.LastName || "loading"
          }`}</h3>
          <h6 className="text-center">{`${userInfo?.username}`}</h6>
          {/* <button className="button">Edit Profile</button> */}
        </div>
      </div>
      <div className="border-solid border-b-2 grid ">
        <button className="text-left px-4 h-10">Edit Credentials</button>
      </div>
      <div className="border-solid border-b-2 grid ">
        <button className="text-left px-4 h-10">Diary</button>
      </div>
      <div className="border-solid border-b-2 grid ">
        <button className="text-left px-4 h-10" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
}
