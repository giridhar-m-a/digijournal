import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isVisible, children, onClose }) {
  const [modalVisible, setModalVisible] = useState(isVisible);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <div className={isVisible ? "block" : "hidden"}>
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal">
        <div className="p-4 grid place-content-end">
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          </button>
        </div>
        <div className="md:px-24 pb-24 pt-4">{children}</div>
      </div>
    </div>
  );
}
