import type { TBottomButton, TOption } from "@helpers/types";
import type { TUnit } from "../../queries/customers/customers_type";

import { useEffect } from "react";
import { legalFromOptions } from "@config/base";
import { useSaveUnitMutation } from "../../queries/customers/customers";
import { notify } from "@helpers/notify";

import useCustomerSetupStore from "@states/customer_setup_store";

import RenderFields from "@screens/customer_setup/RenderFields";
import RenderStep from "@screens/customer_setup/RenderStep";

const S3Unit = () => {
    const { popUpData, unit, setUnitField, setActiveStep, setClientField } = useCustomerSetupStore();

    const companiesOptions: TOption[] = popUpData.companies?.map((goc: any) => ({
        name: goc.name,
        value: goc.id,
    }));

    const addressesOptions: TOption[] = popUpData.companies?.map((goc: any) => ({
        name: goc.address,
        value: goc.address,
    }));

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
                type: "ladderSelect",
                label: "Company",
                field: "company_id",
                options: companiesOptions,
                required: true,
            },
        },
        {
            box: "single",
            type: "editableSelect",
            label: "Address",
            field: "address",
            options: addressesOptions,
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
                options: legalFromOptions,
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

    const handleDispatch = (field: any, value: string) => {
        setUnitField(field, value);
    };

    const saveUnitMutation = useSaveUnitMutation();

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        {
            type: "Save & Next",
            handler: () => {
                saveUnitMutation.mutate(unit);
            },
        },
    ];

    useEffect(() => {
        if (saveUnitMutation.isSuccess) {
            setActiveStep("Client");
            const unit: TUnit = saveUnitMutation.data;
            setClientField("unit_id", unit?.id);
            setClientField("address", unit.address);
        }
        if (saveUnitMutation.isError) {
            notify("error", saveUnitMutation.error?.message);
        }
    }, [saveUnitMutation]);

    return (
        <RenderStep bottomButtons={bottomButtons} title="Unit Setup" loading={saveUnitMutation.isLoading}>
            <div className="flex flex-col gap-6">
                <RenderFields fields={fields} values={unit} handler={handleDispatch} errors={saveUnitMutation.error} />
            </div>
        </RenderStep>
    );
};

export default S3Unit;
