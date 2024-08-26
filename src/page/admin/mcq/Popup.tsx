/* eslint-disable @typescript-eslint/no-explicit-any */
// Popup.js
import React, { useState } from "react";

interface popup {
  title: string;
  placeholder: string;
  onCreate: any;
  onClose: any;
}
const Popup: React.FC<popup> = ({ title, placeholder, onCreate, onClose }) => {
  const [inputValue, setInputValue] = useState("");

  const handleCreate = () => {
    onCreate(inputValue);
    setInputValue("");
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>{title}</h2>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
