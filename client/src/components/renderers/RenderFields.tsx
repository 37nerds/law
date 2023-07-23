import SingleInputBox from "@components/wrappers/SingleInputBox";
import InputRenderer from "@components/renderers/InputRenderer";
import DoubleInputBox from "@components/wrappers/DoubleInputBox";

const RenderFields = ({
    fields,
    values,
    handler,
    errors = [],
}: {
    fields: any;
    values: any;
    handler: (filed: string, value: any) => void;
    errors: any;
}) => {
    return (
        <div className="flex flex-col gap-3">
            {fields.map((field: any, index: number) =>
                field.box === "single" ? (
                    <SingleInputBox
                        key={index}
                        required={field.required}
                        label={field.label}
                        element={
                            <InputRenderer
                                type={field.type || ""}
                                field={field.field || ""}
                                options={field?.options || []}
                                values={values}
                                setValue={handler}
                                errors={errors}
                            />
                        }
                    />
                ) : (
                    <DoubleInputBox
                        key={index}
                        label1={field.first.label}
                        required1={field.first.required}
                        element1={
                            <InputRenderer
                                type={field.first.type || ""}
                                field={field.first.field || ""}
                                options={field?.first.options || []}
                                values={values}
                                setValue={handler}
                                errors={errors}
                            />
                        }
                        label2={field.second.label}
                        required2={field.second.required}
                        element2={
                            <InputRenderer
                                type={field.second.type || ""}
                                field={field.second.field || ""}
                                options={field?.second.options || []}
                                values={values}
                                setValue={handler}
                                errors={errors}
                            />
                        }
                    />
                )
            )}
        </div>
    );
};

export default RenderFields;
