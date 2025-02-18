import { Input } from "../ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Input
      type="text"
      placeholder="Search documents..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
};