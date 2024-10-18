import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

function SearchBar() {
  return (
    <div className="rounded-input flex w-full items-center bg-input px-2 py-2">
      <SearchIcon className="text-secondary-article mx-2 h-8 w-8" />
      <input
        type="text"
        placeholder="Search 198 dog breeds"
        className="text-secondary-article placeholder-secondary-article w-full bg-input text-sm outline-0"
      />
      <Button className="rounded-md">Search</Button>
    </div>
  );
}

export default SearchBar;
