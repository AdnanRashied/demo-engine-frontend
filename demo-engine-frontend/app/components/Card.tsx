"use client";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  gradient?: string;
  backgroundColor?: string;
  borderColor?: string;
  width?: string;
  height?: string;
  className?: string;
  transition?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  gradient,
  backgroundColor = "bg-white",
  borderColor = "border-gray-300",
  width = "w-full max-w-md",
  height = "h-auto",
  transition = "transition-all duration-300",
  className = "",
}) => {
  return (
    <div
      className={`p-6 rounded-xl border shadow-lg text-white ${borderColor} ${width} ${height} ${className} ${
        gradient ? gradient : backgroundColor
      } ${transition}`}
    >
      {children}
    </div>
  );
};

export default Card;
