"use client";

import React from "react";

interface TextFieldProps {
  type?: string;
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  errorMessage = "",
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextField;
