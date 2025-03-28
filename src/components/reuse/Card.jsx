import React from "react";
export const Card = ({ children, style, className }) => {
  return (
    <div
      className="bg-dark-100 shadow-light-100/10 text-white mx-auto"
      style={{
        padding: "15px",
        borderRadius: "5px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
