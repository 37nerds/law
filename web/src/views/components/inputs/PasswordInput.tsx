import { useState } from "react";

import Input from "@components/inputs/internal/Input";
import InputLayout from "@components/inputs/internal/InputLayout";
import DynamicEye from "@components/icons/DynamicEye";

const PasswordInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    newPassword = false,
    label = null,
    errorMessage = null,
    id = "",
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    newPassword?: boolean;
    label?: string | null;
    errorMessage?: string | null;
    id?: string;
}) => {
    const [type, setType] = useState<"password" | "text">("password");

    return (
        <InputLayout
            input={
                <div className="flex gap-2">
                    <Input
                        value={value || ""}
                        type={type}
                        placeholder={placeholder}
                        setValue={setValue}
                        required={required}
                        disabled={disabled}
                        autoComplete={newPassword ? "new-password" : "current-password"}
                        id={id}
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
