import axios from "axios";

export const postMethod = async (apiUrl, postData) => {
  try {
    const response = await axios.post(apiUrl, postData);
    return response;
  } catch (error) {
    // You can handle errors here if needed
    throw new Error(`Error posting data: ${error}`);
  }
};

export const getMethod = async (apiUrl, headers) => {
  try {
    const response = await axios.get(apiUrl, { headers });
    return response;
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

export async function fetcher(url, options = {}) {
  let response;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }
  const data = await response.json();
  return data;
}
