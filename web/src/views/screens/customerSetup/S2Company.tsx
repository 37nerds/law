import { useEffect } from "react";

import useCustomerSetupStore from "@states/customerSetupStore";

import RenderFields from "@components/renderers/RenderFields";
import RenderStep from "@components/renderers/RenderStep";

import { legalFromOptions } from "@config/general";
import { TBottomButton, TOption } from "@kinds/general";
import { TCompany, TCompanyKey } from "@kinds/customers";
import { useSaveCompanyMutation } from "@external/customers";
import { notify } from "@helpers/unkown";

const S2Company = () => {
    const { popUpData, company, setCompanyField, setActiveStep, setUnitField } = useCustomerSetupStore();

    const groupOfCompaniesOptions: TOption[] = popUpData?.group_of_companies?.map((goc: any) => ({
        name: goc.name,
        value: goc.id,
    }));

    const addressesOptions: TOption[] = popUpData?.group_of_companies?.map((goc: any) => ({
        name: goc.address,
        value: goc.address,
    }));

    const fields = [
        {
            box: "double",
            first: {
                type: "string",
                label: "Name of the Company",
                field: "name",
                required: true,
            },
            second: {
                type: "select",
                label: "Group of Company",
                field: "group_of_company_id",
                options: groupOfCompaniesOptions,
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
                type: "number",
                label: "Authorized capital",
                field: "authorized_capital",
            },
            second: {
                type: "number",
                label: "Paid up capital",
                field: "paid_up_capital",
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

    const handleDispatch = (field: TCompanyKey, value: any) => {
        setCompanyField(field, value);
    };

    const saveCompanyMutation = useSaveCompanyMutation();

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        {
            type: "Save & Next",
            handler: () => {
                saveCompanyMutation.mutate(company);
            },
        },
    ];

    useEffect(() => {
        if (saveCompanyMutation.isSuccess) {
            setActiveStep("Unit");
            const company: TCompany = saveCompanyMutation.data;
            setUnitField("company_id", company?.id);
            setUnitField("address", company.address);
        }
        if (saveCompanyMutation.isError) {
            notify("error", saveCompanyMutation.error?.message);
        }
    }, [saveCompanyMutation]);

    return (
        <RenderStep bottomButtons={bottomButtons} title="Company Setup" loading={saveCompanyMutation.isLoading}>
            <div className="flex flex-col gap-6">
                <RenderFields
                    fields={fields}
                    values={company}
                    handler={handleDispatch}
                    errors={saveCompanyMutation.error}
                />
            </div>
        </RenderStep>
    );
};

export default S2Company;
