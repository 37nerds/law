import type { TThreeDropDownOption } from "@helpers/types";

import { useEffect, useState } from "react";

import ThreeDotIcon from "@components/icons/ThreeDotIcon";

const ThreeDotDropdown = ({ options }: { options: TThreeDropDownOption[] }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(true);
    }, [open]);

    if (options.length <= 0) {
        return <></>;
    }

    return (
        <div className="dropdown dropdown-left dropdown-hover">
            <label tabIndex={0}>
                <ThreeDotIcon />
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
