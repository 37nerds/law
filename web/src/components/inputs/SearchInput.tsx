import { useState } from "react";

import StringInput from "@components/inputs/StringInput";

const SearchInput = ({
    onSearch,
    placeholder = "",
    className = "",
    value = "",
}: {
    onSearch: (searchString: string) => void;
    placeholder?: string;
    className?: string;
    value?: string;
}) => {
    const [searchString, setSearchString] = useState<string>(value);

    return (
        <form className={`flex w-[450px] gap-2 rounded-lg ${className}`} onSubmit={e => e.preventDefault()}>
            <StringInput
                id="search"
                placeholder={placeholder}
                value={searchString}
                setValue={value => setSearchString(value)}
                required={true}
            />
            <button
                type="submit"
                className="text btn btn-success rounded-lg text-base-100"
                onClick={() => onSearch(searchString)}
            >
                search
            </button>
        </form>
    );
};

export default SearchInput;
