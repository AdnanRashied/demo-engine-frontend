import React from "react";

interface DropdownMenuProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="role" className="block text-sm font-medium text-white">
        {label}
      </label>
      <select
        id="role"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-emerald-900 text-white border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
