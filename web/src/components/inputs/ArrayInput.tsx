import InputLayout from "@components/inputs/InputLayout";
import Input from "@components/inputs/Input";
import { useState } from "react";

const ArrayInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
    id = "",
}: {
    value: string[];
    setValue?: (value: string[]) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
    id?: string;
}) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    return (
        <div className="flex flex-col gap-2">
            <div className="flex h-full items-center justify-between gap-2">
                <div className={`input input-bordered w-full rounded-lg py-3 ${value.length > 0 ? "h-full" : ""}`}>
                    {value?.length <= 0 ? <div>{placeholder}</div> : value.map(v => <div>{v}</div>)}
                </div>
                <button className="btn btn-primary h-full" onClick={() => setShow(!show)}>
                    {!show ? "New" : "!New"}
                </button>
            </div>
            {show ? (
                <div className="flex h-full items-center justify-between gap-2">
                    <InputLayout
                        input={
                            <Input
                                value={text}
                                type="text"
                                placeholder="Enter here"
                                setValue={setText}
                                required={required}
                                disabled={disabled}
                                id={id}
                                autoComplete="on"
                            />
                        }
                        label={label}
                        required={required}
                        errorMessage={errorMessage}
                    />
                    <button
                        className="btn btn-success h-full"
                        onClick={() => {
                            if (setValue && text !== "") {
                                setValue && setValue([...value, text]);
                                setText("");
                            }
                        }}
                    >
                        Add
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ArrayInput;
