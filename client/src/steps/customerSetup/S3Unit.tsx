import { useAppDispatch } from "@app/hooks";
import {
    setRefetchPopUpDate,
    setUnitSetupField,
} from "@states/customers/customerSlice";
import { selectUnitSetup } from "@states/customers/customerSelector";
import { TBottomButton, TOption } from "@utils/types";
import RenderFields from "@components/renderers/RenderFields";
import RenderStep from "@components/renderers/RenderStep";
import useCreateRequest from "@hooks/http/useCreateRequest";

const options: TOption[] = [
    { name: "Foo", value: "foo" },
    { name: "Bar", value: "bar" },
];

const fields = [
    {
        box: "double",
        first: {
            type: "string",
            label: "Name of the Unit",
            field: "name",
            required: true,
        },
        second: {
            type: "select",
            label: "Company",
            field: "company_id",
            options: options,
            required: true,
        },
    },
    {
        box: "single",
        type: "editableSelect",
        label: "Address",
        field: "address",
        options: options,
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
    {
        box: "double",
        first: {
            type: "string",
            label: "BIDA Reg No",
            field: "bida_reg_no",
        },
        second: {
            type: "string",
            label: "Incorporation No",
            field: "incorporation_no",
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Membership No",
            field: "membership_no",
        },
        second: {
            type: "string",
            label: "Member of the association",
            field: "member_of_the_association",
        },
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
            options: options,
        },
    },
    {
        box: "single",
        type: "string",
        label: "Contact person",
        field: "contact_person",
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Contact person mobile",
            field: "contact_person_mobile",
        },
        second: {
            type: "email",
            label: "Contact person email",
            field: "contact_person_email",
        },
    },
];

const S3Unit = () => {
    const dispatch = useAppDispatch();
    const { save, loading, errors } = useCreateRequest("/customers/units");
    const unitSetup = selectUnitSetup();

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        {
            type: "Save & New",
            handler: () => {
                save(unitSetup);
                dispatch(setRefetchPopUpDate());
            },
        },
        { type: "Save & Close" },
        { type: "Edit" },
        { type: "Export" },
        { type: "Inactive" },
    ];

    const handleDispatch = (field: string, value: string) => {
        dispatch(setUnitSetupField({ field, value }));
    };

    return (
        <RenderStep
            bottomButtons={bottomButtons}
            title="Unit Setup"
            loading={loading}
        >
            <div className="flex flex-col gap-6">
                <RenderFields
                    fields={fields}
                    values={unitSetup}
                    handler={handleDispatch}
                    errors={errors}
                />
            </div>
        </RenderStep>
    );
};

export default S3Unit;
