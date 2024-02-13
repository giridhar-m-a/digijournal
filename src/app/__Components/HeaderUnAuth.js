import React from "react";
import "../globals.css";

export default function HeaderUnAuth() {
  return (
    <div className="h-20 header grid grid-cols-5 place-content-center border-b-2 px-24">
      <div className="col-span-4"></div>
      <div className="col-span-1 grid grid-cols-2 place-items-end">
        <button>Sign Up</button>
        <button>Sign In</button>
      </div>
    </div>
  );
}
