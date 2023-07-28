import { useEffect, useState } from "react";
import InputFieldLayout from "@components/layouts/InputFieldLayout";
import { TLadderOption } from "@utils/types";

const SelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
    errorMessage = "",
}: {
    value: string;
    setValue: (_: string) => void;
    options: TLadderOption[];
    placeholder?: string;
    errorMessage?: string;
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const currentName = options.find(option => option.value === value)?.name[0];

    useEffect(() => {
        setIsOpen(true);
    }, [isOpen]);

    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <div className="dropdown w-full ">
                <label
                    tabIndex={0}
                    className="select-bordered select flex w-full items-center"
                >
                    {currentName || placeholder || "Select"}
                </label>
                {isOpen && (
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box flex h-96 w-full flex-col flex-nowrap gap-2 overflow-auto bg-base-100 p-2 shadow"
                        style={{
                            visibility: "visible",
                        }}
                    >
                        {options.map((o, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    setIsOpen(false);
                                    setValue(o.value);
                                }}
                            >
                                <a className="flex w-full flex-col justify-start bg-base-300 leading-[0.5]">
                                    {o.name.map((n, j) => (
                                        <div
                                            key={j}
                                            className="w-full pl-5"
                                            style={{
                                                paddingLeft: `${1.27 * j}rem`,
                                            }}
                                        >
                                            {n}
                                        </div>
                                    ))}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </InputFieldLayout>
    );
};

export default SelectInput;
