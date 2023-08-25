import SingleInputBox from "@components/inputs/wrappers/SingleInputBox";
import InputSelection from "@components/inputs/InputSelection";
import DoubleInputBox from "@components/inputs/wrappers/DoubleInputBox";

const BoxSelection = ({
    field,
    values,
    handler,
    errors = [],
}: {
    field: any;
    values: any;
    handler: (filed: string, value: any) => void;
    errors: any;
}) => {
    return field.box === "single" ? (
        <SingleInputBox
            required={field.required}
            label={field.label}
            element={
                <InputSelection
                    type={field.type || ""}
                    field={field.field || ""}
                    options={field?.options || []}
                    ladderOptions={field?.ladderOptions || []}
                    values={values}
                    setValue={handler}
                    errors={errors}
                />
            }
        />
    ) : (
        <DoubleInputBox
            label1={field.first.label}
            required1={field.first.required}
            element1={
                <InputSelection
                    type={field.first.type || ""}
                    field={field.first.field || ""}
                    options={field?.first.options || []}
                    ladderOptions={field?.first?.options || []}
                    values={values}
                    setValue={handler}
                    errors={errors}
                />
            }
            label2={field.second.label}
            required2={field.second.required}
            element2={
                <InputSelection
                    type={field.second.type || ""}
                    field={field.second.field || ""}
                    options={field?.second.options || []}
                    ladderOptions={field?.second?.options || []}
                    values={values}
                    setValue={handler}
                    errors={errors}
                />
            }
        />
    );
};

export default BoxSelection;
