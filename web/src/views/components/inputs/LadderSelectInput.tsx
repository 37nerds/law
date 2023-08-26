import { useState } from "react";
import { TLadderOption } from "@kinds/general";

import InputLayout from "./internal/InputLayout";

const LadderSelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: string;
    setValue: (_: string) => void;
    options: TLadderOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const currentName = options.find(option => {
        return option.value === value;
    })?.name[0];

    return (
        <InputLayout
            input={
                <div className="dropdown w-full ">
                    {disabled ? (
                        <input value={currentName || ""} disabled={true} className="input-bordered input w-full" />
                    ) : (
                        <label
                            tabIndex={0}
                            className="select-bordered select flex w-full items-center"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {currentName || placeholder || "Select"}
                        </label>
                    )}
                    {!disabled && isOpen && (
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
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default LadderSelectInput;
