type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-1
    "
    >
      <input
        type="text"
        placeholder="Search User"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => onSearch(value)}
        className="px-4 py-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 transition"
      >
        Search
      </button>
    </div>
  );
}
