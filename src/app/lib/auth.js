import Cookies from "js-cookie";
import { getMethod } from "./api.js";
import { useRouter } from "next/navigation.js";

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export const setToken = (data) => {
  if (typeof window !== "undefined") {
    Cookies.set("id", data.user.id);
    Cookies.set("username", data.user.username);
    Cookies.set("jwt", data.jwt);
  }
};

export const unsetToken = () => {
  if (typeof window !== "undefined") {
    Cookies.remove("id");
    Cookies.remove("jwt");
    Cookies.remove("username");
  }
};

export const getUserData = async () => {
  const jwt = Cookies.get("jwt");
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "x-api-key": apiKey,
  };
  let userData = await getMethod(`${apiUrl}/users/me/?populate=*`, headers);
  return userData;
};

export const getAuthorised = async () => {
  const user = await getUserData();
  if (user.status == 200) {
    return true;
  } else {
    return false;
  }
};

// Other functions...

/*export const getUserFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`${process.env.api}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.username;
      })
      .catch((error) => console.error(error));
  } else {
    return;
  }
};

export const getIdFromLocalCookie = () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return fetcher(`${process.env.api}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((data) => {
      return data.id;
    });
  } else {
    return;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};

export const getIdFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};
*/
