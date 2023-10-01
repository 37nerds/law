const SortIcon = ({ sort }: { sort?: "desc" | "asc" | null }) => {
    return sort ? (
        <svg
            className={`w-2 transition-all duration-200 ${sort === "desc" ? "rotate-180" : ""}`}
            viewBox="0 0 100 167"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50 0L93.3013 75H6.69873L50 0Z" fill="#767575" />
            <path d="M50 167L6.69873 92L93.3013 92L50 167Z" fill="#D9D9D9" />
        </svg>
    ) : (
        <svg className="w-2" viewBox="0 0 100 167" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L93.3013 75H6.69873L50 0Z" fill="#D9D9D9" />
            <path d="M50 167L6.69873 92L93.3013 92L50 167Z" fill="#D9D9D9" />
        </svg>
    );
};

export default SortIcon;
