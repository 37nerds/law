import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import {
    TClient,
    TClientKey,
    TCompany,
    TCompanyKey,
    TCustomerSetupSteps,
    TGroupOfCompany,
    TGroupOfCompanyKey,
    TPopOfData,
    TUnit,
    TUnitKey,
} from "@kinds/customers";

type TState = {
    activeStep: TCustomerSetupSteps;
    groupOfCompany: TGroupOfCompany;
    company: TCompany;
    popUpData: TPopOfData;
    unit: TUnit;
    client: TClient;
};

type TAction = {
    setActiveStep: (stepLabel: TCustomerSetupSteps) => void;
    setGroupOfCompanyField: (key: TGroupOfCompanyKey, value: any) => void;
    setCompanyField: (key: TCompanyKey, value: any) => void;
    setPopUpData: (data: TPopOfData) => void;
    setUnitField: (key: TUnitKey, value: any) => void;
    setClientField: (key: TClientKey, value: any) => void;
};

const useCustomerSetupStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            activeStep: "Group of Company",
            setActiveStep: stepLabel => {
                set(state => {
                    state.activeStep = stepLabel;
                });
            },
            groupOfCompany: {
                name: "",
                address: "",
                telephone: "",
                mobile: "",
                email: "",
                website: "",
                trade_license_no: "",
                tin: "",
                bin: "",
                incorporation_no: "",
                membership_no: "",
                member_of_the_association: "",
                business_field: "",
                legal_form: "",
                special_notes: "",
            },
            setGroupOfCompanyField: (field, value) => {
                set(state => {
                    state.groupOfCompany[field] = value as never;
                });
            },
            company: {
                name: "",
                group_of_company_id: "",
                address: "",
                telephone: "",
                mobile: "",
                email: "",
                website: "",
                trade_license_no: "",
                tin: "",
                bin: "",
                bida_reg_no: "",
                incorporation_no: "",
                membership_no: "",
                member_of_the_association: "",
                authorized_capital: 0,
                paid_up_capital: 0,
                business_field: "",
                legal_form: "",
                contact_person: "",
                contact_person_mobile: "",
                contact_person_email: "",
            },
            setCompanyField: (key, value) => {
                set(state => {
                    state.company[key] = value as never;
                });
            },
            popUpData: {
                group_of_companies: [],
                companies: [],
                units: [],
            },
            setPopUpData: data => {
                set(state => {
                    state.popUpData = data;
                });
            },
            unit: {
                name: "",
                company_id: "",
                address: "",
                telephone: "",
                mobile: "",
                email: "",
                website: "",
                trade_license_no: "",
                tin: "",
                bin: "",
                bida_reg_no: "",
                incorporation_no: "",
                membership_no: "",
                member_of_the_association: "",
                business_field: "",
                legal_form: "",
                contact_person: "",
                contact_person_mobile: "",
                contact_person_email: "",
            },
            setUnitField: (key, value) => {
                set(state => {
                    state.unit[key] = value as never;
                });
            },
            client: {
                name: "",
                unit_id: "",
                client_id: "",
                unit_name: "",
                passport_no: "",
                passport_issue_date: "",
                passport_valid_date: "",
                gender: "",
                position_hold: "",
                mobile: "",
                email: "",
                date_of_birth: "",
                nationality: "",
                father_name: "",
                mother_name: "",
                tin_no: "",
                date_of_joining: "",
                current_wp_validity_date: "",
                visa_expire_date: "",
                max_entry_limit: "",
                entry_terms: "",
                address: "",
                bill_to: "",
                notes: "",
            },
            setClientField: (key, value) => {
                set(state => {
                    state.client[key] = value as never;
                });
            },
        }))
    )
);

export default useCustomerSetupStore;
