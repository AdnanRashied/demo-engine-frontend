"use client";

import React from "react";

interface RoundButtonProps {
  text: string;
  color?: string;
  width: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  text,
  color = "bg-green-500",
  width = "w-32",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className={`text-white font-semibold py-2 px-4 rounded-full ${color} ${width} hover:opacity-80 transition`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default RoundButton;
