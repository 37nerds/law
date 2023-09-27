import { ReactNode, useEffect, useState } from "react";

import ThreeDotButton from "./ThreeDotButton";

type TDropDownOption = {
    content: ReactNode;
    handler: () => void;
};

const ThreeDotDropdown = ({ options }: { options: TDropDownOption[] }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(true);
    }, [open]);

    return (
        <div className="dropdown-left dropdown-hover dropdown">
            <label tabIndex={0}>
                <ThreeDotButton />
            </label>
            {open && (
                <ul
                    tabIndex={0}
                    className="menu dropdown-content rounded-box w-32 bg-base-300 p-2 shadow"
                    style={{ zIndex: 2000 }}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="flex flex-col justify-center "
                            onClick={() => {
                                option.handler();
                                setOpen(false);
                            }}
                        >
                            <a className="flex items-center justify-center">{option.content}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ThreeDotDropdown;
