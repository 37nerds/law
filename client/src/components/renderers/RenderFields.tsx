import BoxSelection from "@components/inputs/BoxSelection";

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
            {fields.map((field: any, index: number) => (
                <BoxSelection
                    key={index}
                    field={field}
                    values={values}
                    handler={handler}
                    errors={errors}
                />
            ))}
        </div>
    );
};

export default RenderFields;
