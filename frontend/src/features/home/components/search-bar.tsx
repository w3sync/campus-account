import { SearchIcon } from "lucide-react";

export const SearchBar = () => {
    // {TODO: add search functionality}
    return (
        <form className="flex w-full max-w-[600px]">
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="search"
                    className="w-lg pl-4 py-2 rounded-full border focus:outline-none focus:border-amber-700"
                />
            </div>
        </form>
    );
};
