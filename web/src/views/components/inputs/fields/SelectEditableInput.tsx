import { useState } from "react";

import SelectInput from "./SelectInput";
import StringInput from "./StringInput";
import LadderSelectInput from "./LadderSelectInput";
import { TLadderOption, TOption } from "@kinds/general";

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
    errorMessage = "",
    type = "text",
    disabled = false,
}: {
    value: string;
    setValue: (_: string) => void;
    options?: TOption[];
    ladderOptions?: TLadderOption[];
    placeholder?: string;
    errorMessage?: string;
    type?: string;
    disabled?: boolean;
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="flex gap-2">
            <div className="w-full">
                {isEdit ? (
                    <StringInput value={value} setValue={setValue} errorMessage={errorMessage} disabled={disabled} />
                ) : type === "editableLadderSelect" ? (
                    <LadderSelectInput
                        value={value}
                        setValue={setValue}
                        options={ladderOptions || []}
                        placeholder="Select"
                        errorMessage={errorMessage}
                        disabled={disabled}
                    />
                ) : (
                    <SelectInput
                        value={value}
                        setValue={setValue}
                        options={options || []}
                        placeholder="Select"
                        errorMessage={errorMessage}
                        disabled={disabled}
                    />
                )}
            </div>
            <button disabled={disabled} onClick={() => setIsEdit(!isEdit)} className="btn">
                {isEdit ? "Select" : "Edit"}
            </button>
        </div>
    );
};

export default SelectEditableInput;
