import { useState } from "react";
import ChevronIcon from "@components/icons/ChevronIcon";
import useChangeTheme from "@hooks/useChangeTheme";

const ThemeIcon = () => (
    <svg
        width={20}
        height={20}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
    </svg>
);

const MarkIcon = ({ visible = false }: { visible?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${visible ? "" : "invisible"} h-3 w-3`}
    >
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
);

const themes = [
    "system",
    "light",
    "dracula",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
];

const ThemeDropDown = () => {
    const { theme, setTheme } = useChangeTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div title="Change Theme" className="dropdown dropdown-end">
            <div
                tabIndex={0}
                className="btn btn-ghost gap-1 normal-case"
                onClick={() => {
                    setIsExpanded(!isExpanded);
                    setIsOpen(!isOpen);
                }}
            >
                <ThemeIcon />
                <span className="c hidden capitalize md:inline">{theme}</span>
                <ChevronIcon className="h-5 w-5" isExpanded={isExpanded} />
            </div>
            {isOpen && (
                <div className="dropdown-content top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto rounded-lg bg-base-200 text-base-content shadow-2xl">
                    <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                        {themes.map((_theme, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setTheme(_theme);
                                        setIsOpen(false);
                                    }}
                                    className="overflow-hidden rounded-lg text-left capitalize outline-base-content"
                                    data-set-theme={_theme}
                                    data-act-class="[&_svg]:visible"
                                >
                                    <div
                                        data-theme={_theme}
                                        className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
                                    >
                                        <div className="grid grid-cols-5 grid-rows-3">
                                            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                                                <MarkIcon visible={_theme === theme} />
                                                <div className="flex-grow text-sm font-bold">{_theme}</div>
                                                <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                                                    <div className="w-2 rounded-lg bg-primary" />
                                                    <div className="w-2 rounded-lg bg-secondary" />
                                                    <div className="w-2 rounded-lg bg-accent" />
                                                    <div className="w-2 rounded-lg bg-neutral" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeDropDown;
