import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import { useState } from "react";
import { TOption } from "@utils/types";

export type TUpdateFormValue = (_: {
    updateType: string | undefined;
    value: string;
}) => void;

type Props = {
    labelTitle: string;
    placeholder: string;
    options: TOption[];
    containerStyle: string;
    labelStyle: string;
    updateFormValue: TUpdateFormValue;
    labelDescription?: string;
    defaultValue?: string;
    updateType?: string;
};

const SelectBox = ({
    labelTitle,
    placeholder,
    options,
    containerStyle,
    labelStyle,
    labelDescription,
    defaultValue,
    updateType,
    updateFormValue,
}: Props) => {
    const [value, setValue] = useState(defaultValue || "");

    const updateValue = (newValue: string) => {
        const x = { updateType, value: newValue };
        updateFormValue({ updateType, value: newValue });
        setValue(newValue);
    };

    return (
        <div className={`inline-block ${containerStyle}`}>
            <label className={`label  ${labelStyle}`}>
                <div className="label-text">
                    {labelTitle}
                    {labelDescription && (
                        <div
                            className="tooltip tooltip-right"
                            data-tip={labelDescription}
                        >
                            <InformationCircleIcon className="h-4 w-4" />
                        </div>
                    )}
                </div>
            </label>

            <select
                className="select-bordered select w-full"
                value={value}
                onChange={e => updateValue(e.target.value)}
            >
                <option disabled value="PLACEHOLDER">
                    {placeholder}
                </option>
                {options.map((o, k) => {
                    return (
                        <option value={o.value || o.name} key={k}>
                            {o.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectBox;
