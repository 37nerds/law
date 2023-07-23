import { TOption } from "@utils/types";
import SelectInput from "@components/inputs/SelectInput";
import { useState } from "react";
import StringInput from "@components/inputs/StringInput";

const SelectEditableInput = ({
    value,
    setValue,
    options,
    errorMessage = "",
    type = "text",
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
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
