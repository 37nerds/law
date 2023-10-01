import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";

const ChevronIcon = ({ isExpanded = false, className = "" }: { isExpanded?: boolean; className?: string }) => {
    return (
        <ChevronDownIcon
            className={`delay-400 float-right transition-all duration-200 ${className} ${isExpanded && "rotate-180"}`}
        />
    );
};

export default ChevronIcon;
