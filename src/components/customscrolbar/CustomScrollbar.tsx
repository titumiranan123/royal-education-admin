/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import "./CustomScrollbar.css"; // Import your custom styles for the scrollbar
interface CustomScrollbarProps {
  children: ReactNode; // ReactNode can be any valid React node (e.g., JSX, string, number)
}
const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children }) => {
  return (
    <div className="custom-scrollbar w-full">
      <div className="custom-scrollbar-content">{children}</div>
    </div>
  );
};

export default CustomScrollbar;
