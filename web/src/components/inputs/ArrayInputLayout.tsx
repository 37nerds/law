import type { ReactNode } from "react";

import { useState } from "react";

import InputLayout from "@components/inputs/InputLayout";
import XIcon from "@components/icons/XIcon";

const ArrayInputLayout = ({
    value,
    input,
    setValue,
    placeholder = "",
    required = false,
    label = null,
    errorMessage = null,
    text,
    setText,
}: {
    value: string[];
    input: ReactNode;
    setValue?: (value: string[]) => void;
    placeholder?: string;
    required: boolean;
    label: string | null;
    errorMessage: string | null;
    text: string;
    setText: (text: string) => void;
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex h-full items-center justify-between gap-2">
                <div className={`input input-bordered w-full rounded-lg py-3 ${value?.length > 0 ? "h-full" : ""}`}>
                    {value?.length <= 0 ? (
                        <div>{placeholder}</div>
                    ) : (
                        value?.map((v, index) => (
                            <div key={index} className="flex justify-between">
                                <div>{v}</div>
                                <XIcon
                                    className="w-4 cursor-pointer"
                                    onClick={() => {
                                        setValue && setValue(value.filter((_, i) => i !== index));
                                    }}
                                />
                            </div>
                        ))
                    )}
                </div>
                <div className="btn btn-primary h-full" onClick={() => setShow(!show)}>
                    {!show ? "New" : "!New"}
                </div>
            </div>
            {show ? (
                <div className="flex h-full items-center justify-between gap-2">
                    <InputLayout input={input} label={label} required={required} errorMessage={errorMessage} />
                    <div
                        className="btn btn-success h-full"
                        onClick={() => {
                            if (setValue && text !== "") {
                                setValue && setValue([...value, text]);
                                setText("");
                            }
                        }}
                    >
                        Add
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ArrayInputLayout;
