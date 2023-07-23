import { createSlice } from "@reduxjs/toolkit";

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
    },
});

export const { setGroupOfCompanySetupField } = customerSlice.actions;
export default customerSlice;
