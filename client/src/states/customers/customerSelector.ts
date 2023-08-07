import { useAppSelector } from "@app/hooks";

export const selectCustomers = () => {
    return useAppSelector(state => state.customers);
};

export const selectGroupOfCompanySetup = () => {
    return selectCustomers().groupOfCompanySetup;
};

export const selectCompanySetup = () => {
    return selectCustomers().companySetup;
};

export const selectUnitSetup = () => {
    return selectCustomers().unitSetup;
};

export const selectClientSetup = () => {
    return selectCustomers().clientSetup;
};

export const selectClient = () => {
    return selectCustomers().client;
};

export const selectPopUpData = (): any => {
    return selectCustomers().popUpData;
};
