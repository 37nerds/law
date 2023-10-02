import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

const XIcon = ({ onClick, className }: { onClick?: () => void; className?: string }) => {
    return <XMarkIcon className={className} onClick={onClick} />;
};

export default XIcon;
