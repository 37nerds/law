import { useAppSelector } from "@app/hooks";

export const selectGroupOfCompanySetup = () => {
    return useAppSelector(state => state.customers.groupOfCompanySetup);
};

export const selectCompanySetup = () => {
    return useAppSelector(state => state.customers.companySetup);
};

export const selectUnitSetup = () => {
    return useAppSelector(state => state.customers.unitSetup);
};

export const selectClientSetup = () => {
    return useAppSelector(state => state.customers.clientSetup);
};
