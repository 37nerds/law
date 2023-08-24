import InputFieldLayout from "@components/layouts/InputFieldLayout";
import { useState } from "react";
import DynamicEye from "@components/icons/DynamicEye";

const StringInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    disabled = false,
    label = "",
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string;
}) => {
    const [type, setType] = useState("password");

    return (
        <InputFieldLayout errorMessage={errorMessage} label={label}>
            <div className="flex gap-2">
                <input
                    value={value || ""}
                    type={type}
                    placeholder={placeholder}
                    onChange={e => setValue && setValue(e.target.value)}
                    className="input-bordered input w-full"
                    required={required}
                    disabled={disabled}
                />
                <DynamicEye
                    isEyeOpen={type === "text"}
                    onClick={() => setType(type === "text" ? "password" : "text")}
                />
            </div>
        </InputFieldLayout>
    );
};

export default StringInput;
