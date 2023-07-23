import { useAppDispatch } from "@app/hooks";
import { setGroupOfCompanySetupField } from "@states/customers/customerSlice";
import { selectGroupOfCompanySetup } from "@states/customers/customerSelector";
import { TBottomButton, TOption } from "@utils/types";
import RenderFields from "@components/renderers/RenderFields";
import RenderStep from "@components/renderers/RenderStep";
import useCreateRequest from "@hooks/http/useCreateRequest";
import { useEffect } from "react";
import Log from "@utils/Log";

const legalFromOptions: TOption[] = [
    { name: "Foo", value: "foo" },
    { name: "Bar", value: "bar" },
];

const fields: any = [
    {
        box: "single",
        type: "string",
        label: "Name of the Group",
        field: "name",
        required: true,
        options: [],
    },
    {
        box: "single",
        type: "string",
        label: "Address",
        field: "address",
        required: true,
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Telephone",
            field: "telephone",
        },
        second: {
            type: "string",
            label: "Mobile",
            field: "mobile",
            required: true,
        },
    },
    {
        box: "double",
        first: {
            type: "email",
            label: "Email",
            field: "email",
            required: true,
        },
        second: {
            type: "string",
            label: "Website",
            field: "website",
        },
    },
    {
        box: "single",
        type: "string",
        label: "Trade License no",
        field: "trade_license_no",
        required: true,
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "TIN",
            field: "tin",
        },
        second: {
            type: "string",
            label: "BIN",
            field: "bin",
        },
    },
];

const fields2 = [
    {
        box: "double",
        first: {
            type: "string",
            label: "Incorporation No",
            field: "incorporation_no",
        },
        second: {
            type: "string",
            label: "Membership No",
            field: "membership_no",
        },
    },
    {
        box: "single",
        type: "string",
        label: "Member of the association",
        field: "member_of_the_association",
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Business Field",
            field: "business_field",
        },
        second: {
            type: "select",
            label: "Legal form",
            field: "legal_form",
            options: legalFromOptions,
        },
    },
    {
        box: "single",
        type: "text",
        label: "Special notes",
        field: "special_notes",
    },
];

const S1GroupOfCompany = () => {
    const dispatch = useAppDispatch();
    const { save, loading, errors, data } = useCreateRequest(
        "/customers/group-of-companies"
    );
    const groupOfCompanySetup = selectGroupOfCompanySetup();

    useEffect(() => {
        Log.print(data);
    }, [data]);

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        { type: "Save & New", handler: () => save(groupOfCompanySetup) },
        { type: "Save & Close" },
        { type: "Edit" },
        { type: "Export" },
        { type: "Inactive" },
    ];

    const handleDispatch = (field: string, value: string) => {
        dispatch(setGroupOfCompanySetupField({ field, value }));
    };

    return (
        <RenderStep
            bottomButtons={bottomButtons}
            title="Group of Company Setup"
            loading={loading}
        >
            <div className="flex flex-col gap-6">
                <RenderFields
                    fields={fields}
                    values={groupOfCompanySetup}
                    handler={handleDispatch}
                    errors={errors}
                />
                <RenderFields
                    fields={fields2}
                    values={groupOfCompanySetup}
                    handler={handleDispatch}
                    errors={errors}
                />
            </div>
        </RenderStep>
    );
};

export default S1GroupOfCompany;
