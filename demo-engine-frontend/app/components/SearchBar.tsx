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
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search User"
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-full w-full text-black outline-none"
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
