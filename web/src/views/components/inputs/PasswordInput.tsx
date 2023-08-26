import { useState } from "react";

import InputLayout from "./internal/InputLayout";
import DynamicEye from "../icons/DynamicEye";

const PasswordInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
}) => {
    const [type, setType] = useState("password");

    return (
        <InputLayout
            input={
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
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default PasswordInput;
