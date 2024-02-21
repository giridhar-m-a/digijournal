import "../globals.css";
import { useEffect, useState } from "react";
import react from "react";
import Modal from "./Modal";
import Login from "./Login";
import SignUp from "./SignUp";

export default function HeaderUnAuth() {
  const [isVisible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const defineOptions = (type) => {
    setVisible(true);
    setModalType(type);
  };
  return (
    <div>
      <div className="h-20 header grid grid-cols-5 place-content-center border-b-2 border-b-textColor px-24">
        <div className="col-span-4"></div>
        <div className="col-span-1 grid grid-cols-2 place-items-end">
          <button className="button" onClick={() => defineOptions("SignUp")}>
            Sign Up
          </button>
          <button className="button" onClick={() => defineOptions("SignIn")}>
            Sign In
          </button>
        </div>
      </div>
      {/* {modalType == "SignUp" ? (
        <Modal classValue={classValue}>{<SignUp />}</Modal>
      ) : (
        <Modal classValue={classValue}>{<Login />}</Modal>
      )} */}
      <Modal
        isVisible={isVisible}
        modalType={modalType}
        onClose={() => setVisible(false)}
      >
        {modalType === "SignUp" && <SignUp />}
        {modalType === "SignIn" && <Login />}
      </Modal>
    </div>
  );
}
