import { useEffect } from "react";

import RenderFields from "../../components/renderers/RenderFields";
import RenderStep from "../../components/renderers/RenderStep";

import useCustomerSetupStore from "@states/customerSetupStore";

import { TBottomButton, TOption } from "../../types";
import { billToOptions, gendersOptions } from "@config/general";
import { useSaveClientMutation } from "@fetches/customers/customers";
import { notify } from "@helpers/unknown";

const S4Client = () => {
    const { popUpData, client, setClientField } = useCustomerSetupStore();

    const unitsOptions: TOption[] = popUpData.units?.map((goc: any) => ({
        name: goc.name,
        value: goc.id,
    }));

    const addressesOptions: TOption[] = popUpData.units?.map((goc: any) => ({
        name: goc.address,
        value: goc.address,
    }));

    const fields = [
        {
            box: "double",
            first: {
                type: "string",
                label: "Name of the Client",
                field: "name",
                required: true,
            },
            second: {
                type: "ladderSelect",
                label: "Unit",
                field: "unit_id",
                options: unitsOptions,
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
                options: gendersOptions,
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
                options: billToOptions,
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
                type: "date",
                label: "Date of joining",
                field: "date_of_joining",
            },
        },
        {
            box: "double",
            first: {
                type: "date",
                label: "Current WP validity date",
                field: "current_wp_validity_date",
            },
            second: {
                type: "date",
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
                options: addressesOptions,
            },
            second: {
                type: "select",
                label: "Bill to",
                field: "bill_to",
                options: billToOptions,
            },
        },
        {
            box: "single",
            type: "text",
            label: "Notes",
            field: "notes",
        },
    ];

    const handleDispatch = (field: any, value: any) => {
        setClientField(field, value);
    };

    const saveClientMutation = useSaveClientMutation();

    useEffect(() => {
        if (saveClientMutation.isError) {
            notify("error", saveClientMutation.error?.message);
        }
        if (saveClientMutation.isSuccess) {
            notify("success", `You successfully created new Client: ${saveClientMutation.data.name}`);
        }
    }, [saveClientMutation]);

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        {
            type: "Save",
            handler: () => {
                saveClientMutation.mutate(client);
            },
        },
    ];

    return (
        <RenderStep bottomButtons={bottomButtons} title="Client Setup" loading={saveClientMutation.isLoading}>
            <div className="flex flex-col gap-6">
                <RenderFields
                    fields={fields}
                    values={client}
                    handler={handleDispatch}
                    errors={saveClientMutation.error}
                />
            </div>
        </RenderStep>
    );
};

export default S4Client;
