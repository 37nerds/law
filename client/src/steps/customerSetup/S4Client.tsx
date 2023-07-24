import { useAppDispatch } from "@app/hooks";
import {
    setClientSetupField,
    setRefetchPopUpDate,
} from "@states/customers/customerSlice";
import { selectClientSetup } from "@states/customers/customerSelector";
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
            label: "Unit",
            field: "unit_id",
            options: options,
            required: true,
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Client ID",
            field: "client_id",
        },
        second: {
            type: "string",
            label: "Passport no",
            field: "passport_no",
            required: true,
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Passport issue date",
            field: "passport_issue_date",
        },
        second: {
            type: "string",
            label: "Passport valid date",
            field: "passport_valid_date",
            required: true,
        },
    },
    {
        box: "double",
        first: {
            type: "select",
            label: "Gender",
            field: "gender",
            options: options,
        },
        second: {
            type: "string",
            label: "Position hold",
            field: "position_hold",
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Mobile",
            field: "mobile",
            required: true,
        },
        second: {
            type: "email",
            label: "Email",
            field: "email",
            required: true,
        },
    },
    {
        box: "double",
        first: {
            type: "date",
            label: "Date of birth",
            field: "date_of_birth",
            required: true,
        },
        second: {
            type: "string",
            label: "Nationality",
            field: "nationality",
            options: options,
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Father's name",
            field: "father_name",
            required: true,
        },
        second: {
            type: "string",
            label: "Mother's name",
            field: "mother_name",
            required: true,
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "TIN No",
            field: "tin_no",
        },
        second: {
            type: "string",
            label: "Date of joining",
            field: "date_of_joining",
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Current WP validity date",
            field: "current_wp_validity_date",
        },
        second: {
            type: "string",
            label: "Visa expire date",
            field: "visa_expire_date",
        },
    },
    {
        box: "double",
        first: {
            type: "string",
            label: "Max entry limit",
            field: "max_entry_limit",
        },
        second: {
            type: "string",
            label: "Entry terms",
            field: "entry_terms",
        },
    },
    {
        box: "double",
        first: {
            type: "select",
            label: "Address",
            field: "address",
            options: options,
        },
        second: {
            type: "select",
            label: "Bill to",
            field: "bill_to",
            options: options,
        },
    },
    {
        box: "single",
        type: "text",
        label: "Notes",
        field: "notes",
    },
];

const S4Client = () => {
    const dispatch = useAppDispatch();
    const { save, loading, errors } = useCreateRequest("/customers/clients");
    const clientSetup = selectClientSetup();

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        {
            type: "Save & New",
            handler: () => {
                save(clientSetup);
                dispatch(setRefetchPopUpDate());
            },
        },
        { type: "Save & Close" },
        { type: "Edit" },
        { type: "Export" },
        { type: "Inactive" },
    ];

    const handleDispatch = (field: string, value: string) => {
        dispatch(setClientSetupField({ field, value }));
    };

    return (
        <RenderStep
            bottomButtons={bottomButtons}
            title="Client Setup"
            loading={loading}
        >
            <div className="flex flex-col gap-6">
                <RenderFields
                    fields={fields}
                    values={clientSetup}
                    handler={handleDispatch}
                    errors={errors}
                />
            </div>
        </RenderStep>
    );
};

export default S4Client;
