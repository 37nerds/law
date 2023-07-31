import ThreeDotButton from "@components/dropdowns/ThreeDotButton";
import { ReactNode, useEffect, useState } from "react";

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
        <div className="dropdown dropdown-left dropdown-hover">
            <label tabIndex={0}>
                <ThreeDotButton />
            </label>
            {open && (
                <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box bg-base-300 p-2 shadow"
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
                            <a>{option.content}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ThreeDotDropdown;
