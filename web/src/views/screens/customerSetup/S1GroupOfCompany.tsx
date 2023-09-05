import { useEffect, useState } from "react";

import useCustomerSetupStore from "@states/customerSetupStore";

import RenderFields from "@components/renderers/RenderFields";
import RenderStep from "@components/renderers/RenderStep";

import { legalFromOptions } from "../../../config/general";
import { TGroupOfCompany } from "@kinds/customers";
import { TBottomButton } from "@kinds/general";
import { useSaveGroupOfCompanyMutation } from "../../../external/customers";
import { notify } from "@helpers/unknown";

const fields = [
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
    const { groupOfCompany, setGroupOfCompanyField, setActiveStep, setCompanyField } = useCustomerSetupStore();

    const handleDispatch = (field: string, value: string) => {
        setGroupOfCompanyField(field as any, value);
    };

    const saveGroupOfCompanyMutation = useSaveGroupOfCompanyMutation();

    const [isAfterHitSave, setIsAfterHitSave] = useState(false);

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        {
            type: "Save & Next",
            handler: () => {
                saveGroupOfCompanyMutation.mutate(groupOfCompany);
                setIsAfterHitSave(true);
            },
        },
    ];

    useEffect(() => {
        if (saveGroupOfCompanyMutation.isError && isAfterHitSave) {
            notify("error", saveGroupOfCompanyMutation.error?.message);
            setIsAfterHitSave(false);
        }
        if (saveGroupOfCompanyMutation.isSuccess) {
            setActiveStep("Company");
            const groupOfCompany: TGroupOfCompany = saveGroupOfCompanyMutation.data;
            setCompanyField("group_of_company_id", groupOfCompany?.id);
            setCompanyField("address", groupOfCompany.address);
        }
        if (saveGroupOfCompanyMutation.isError) {
            notify("error", saveGroupOfCompanyMutation.error?.message);
        }
    }, [saveGroupOfCompanyMutation]);

    return (
        <RenderStep
            bottomButtons={bottomButtons}
            title="Group of Company Setup"
            loading={saveGroupOfCompanyMutation.isLoading}
        >
            <div className="flex flex-col gap-6">
                <RenderFields
                    fields={fields}
                    values={groupOfCompany}
                    handler={handleDispatch}
                    errors={saveGroupOfCompanyMutation.error?.errors}
                />
                <RenderFields
                    fields={fields2}
                    values={groupOfCompany}
                    handler={handleDispatch}
                    errors={saveGroupOfCompanyMutation.error?.errors}
                />
            </div>
        </RenderStep>
    );
};

export default S1GroupOfCompany;
