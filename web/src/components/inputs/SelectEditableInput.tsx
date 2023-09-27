import type { TLadderOption, TOption } from "@helpers/types";

import { useState } from "react";

import StringInput from "./StringInput";
import LadderSelectInput from "./LadderSelectInput";
import SelectInput from "./SelectInput";

/**
 * Select input field with editable capability.
 *
 * User can select options or ladder options also can be able
 * to edit the value with pressing edit button
 */
const SelectEditableInput = ({
    value,
    setValue,
    options = [],
    ladderOptions = [],
    type = "text",
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: string;
    setValue: (value: string) => void;
    options?: TOption[];
    ladderOptions?: TLadderOption[];
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="flex gap-2">
            <div className="w-full">
                {isEdit ? (
                    <StringInput
                        value={value}
                        setValue={setValue}
                        errorMessage={errorMessage}
                        disabled={disabled}
                        required={required}
                    />
                ) : type === "editableLadderSelect" ? (
                    <LadderSelectInput
                        value={value}
                        setValue={setValue}
                        options={ladderOptions || []}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        label={label}
                        errorMessage={errorMessage}
                    />
                ) : (
                    <SelectInput
                        value={value}
                        setValue={setValue}
                        options={options || []}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        label={label}
                        errorMessage={errorMessage}
                    />
                )}
            </div>
            <button disabled={disabled} onClick={() => setIsEdit(!isEdit)} className="btn btn-neutral">
                {isEdit ? "Select" : "Edit"}
            </button>
        </div>
    );
};

export default SelectEditableInput;
