import { TLadderOption, TOption } from "@utils/types";
import SelectInput from "@components/inputs/fields/SelectInput";
import { useState } from "react";
import StringInput from "@components/inputs/fields/StringInput";
import LadderSelectInput from "@components/inputs/fields/LadderSelectInput";

const SelectEditableInput = ({
    value,
    setValue,
    options,
    ladderOptions,
    errorMessage = "",
    type = "text",
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
    ladderOptions?: TLadderOption[];
    placeholder?: string;
    errorMessage?: string;
    type?: string;
}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="flex gap-2">
            <div className="w-full">
                {isEdit ? (
                    <StringInput
                        type={type}
                        value={value}
                        setValue={setValue}
                        errorMessage={errorMessage}
                    />
                ) : type === "editableLadderSelect" ? (
                    <LadderSelectInput
                        value={value}
                        setValue={setValue}
                        options={ladderOptions || []}
                        placeholder="Select"
                        errorMessage={errorMessage}
                    />
                ) : (
                    <SelectInput
                        value={value}
                        setValue={setValue}
                        options={options || []}
                        placeholder="Select"
                        errorMessage={errorMessage}
                    />
                )}
            </div>
            <button onClick={() => setIsEdit(!isEdit)} className="btn">
                {isEdit ? "Select" : "Edit"}
            </button>
        </div>
    );
};

export default SelectEditableInput;
