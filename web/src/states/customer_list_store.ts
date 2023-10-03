import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TClient, TClientKey, TStatus, TUnit, TUnitKey } from "../queries/customers/customers_type";

type TClientsFilters = {
    status: TStatus;
    page: number;
};

type TState = {
    client: TClient;
    unit: TUnit;
    clientsFilters: TClientsFilters;
};

type TAction = {
    setClient: (client: TClient) => void;
    setClientField: (key: TClientKey, value: any) => void;
    setUnit: (unit: TUnit) => void;
    setUnitField: (key: TUnitKey, value: any) => void;
    setClientsFiltersField: (key: keyof TClientsFilters, value: any) => void;
};

const useCustomerListStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
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

            clientsFilters: {
                status: "active",
                page: 1,
            },

            setClient: client => {
                set(state => {
                    state.client = client;
                });
            },

            setClientField: (key, value) => {
                set(state => {
                    state.client[key] = value as never;
                });
            },

            setUnit: unit => {
                set(state => {
                    state.unit = unit;
                });
            },

            setUnitField: (key, value) => {
                set(state => {
                    state.unit[key] = value as never;
                });
            },

            setClientsFiltersField: (key, value) => {
                set(state => {
                    state.clientsFilters[key] = value as never;
                });
            },
        }))
    )
);

export default useCustomerListStore;
