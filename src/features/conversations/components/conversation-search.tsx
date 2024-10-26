import { useState } from "react";
import { Input } from "@/components/ui/input";

type ConversationSearchProps = {
  onSearch: (query: string) => void;
};

export default function ConversationSearch({
  onSearch,
}: ConversationSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="p-2">
      <Input
        type="text"
        placeholder="Search conversations"
        value={query}
        onChange={handleSearch}
        className="w-full rounded-xl"
      />
    </div>
  );
}
