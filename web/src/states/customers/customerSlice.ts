import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: "customers",
    initialState: {
        client: {
            isEdit: false,
            data: {
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
        },

        unit: {
            isEdit: false,
            data: {
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
        },
    },
    reducers: {
        setClientField(state, action) {
            const { key, value } = action.payload as {
                key: string;
                value: any;
            };
            // @ts-ignore
            state.client[key] = value;
        },
        setClientDataField(state, action) {
            const { key, value } = action.payload as {
                key: string;
                value: any;
            };
            // @ts-ignore
            state.client.data[key] = value;
        },
        setUnitField(state, action) {
            const { key, value } = action.payload as {
                key: string;
                value: any;
            };
            // @ts-ignore
            state.unit[key] = value;
        },
        setUnitDataField(state, action) {
            const { key, value } = action.payload as {
                key: string;
                value: any;
            };
            // @ts-ignore
            state.unit.data[key] = value;
        },
    },
});

export const {
    setClientField,
    setClientDataField,
    setUnitField,
    setUnitDataField,
} = customerSlice.actions;
export default customerSlice;
