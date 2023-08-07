import { createSlice } from "@reduxjs/toolkit";

// interface UnitSetup {
//     name: string;
//     company_id: string;
//     address: string;
//     telephone: string;
//     mobile: string;
//     email: string;
//     website: string;
//     trade_license_no: string;
//     tin: string;
//     bin: string;
//     bida_reg_no: string;
//     incorporation_no: string;
//     membership_no: string;
//     member_of_the_association: string;
//     business_field: string;
//     legal_form: string;
//     contact_person: string;
//     contact_person_mobile: string;
//     contact_person_email: string;
// }
//
// interface CompanySetup {
//     name: string;
//     group_of_company_id: string;
//     address: string;
//     telephone: string;
//     mobile: string;
//     email: string;
//     website: string;
//     trade_license_no: string;
//     tin: string;
//     bin: string;
//     bida_reg_no: string;
//     incorporation_no: string;
//     membership_no: string;
//     member_of_the_association: string;
//     authorized_capital: number;
//     paid_up_capital: number;
//     business_field: string;
//     legal_form: string;
//     contact_person: string;
//     contact_person_mobile: string;
//     contact_person_email: string;
// }

export const customerSlice = createSlice({
    name: "customers",
    initialState: {
        groupOfCompanySetup: {
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
        companySetup: {
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
        unitSetup: {
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
        clientSetup: {
            name: "",
            unit_id: "",
            client_id: "",
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

        popUpData: {
            group_of_companies: [],
            companies: [],
            units: [],
        },
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
    },
    reducers: {
        setGroupOfCompanySetupField(state, action) {
            const { field, value } = action.payload as {
                field: string;
                value: string;
            };
            // @ts-ignore
            state.groupOfCompanySetup[field] = value;
        },
        setCompanySetupField(state, action) {
            const { field, value } = action.payload as {
                field: string;
                value: string;
            };
            // @ts-ignore
            state.companySetup[field] = value;
        },
        setUnitSetupField(state, action) {
            const { field, value } = action.payload as {
                field: string;
                value: string;
            };
            // @ts-ignore
            state.unitSetup[field] = value;
        },
        setClientSetupField(state, action) {
            const { field, value } = action.payload as {
                field: string;
                value: string;
            };
            // @ts-ignore
            state.clientSetup[field] = value;
        },
        setPopUpData(state, action) {
            state.popUpData = action.payload;
        },
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
    },
});

export const {
    setGroupOfCompanySetupField,
    setCompanySetupField,
    setUnitSetupField,
    setClientField,
    setClientSetupField,
    setPopUpData,
    setClientDataField,
} = customerSlice.actions;
export default customerSlice;
