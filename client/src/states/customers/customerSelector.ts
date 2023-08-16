import { useAppSelector } from "@app/hooks";

export const selectCustomers = () => {
    return useAppSelector(state => state.customers);
};
export const selectClient = () => {
    return selectCustomers().client;
};
export const selectUnit = () => {
    return selectCustomers().unit;
};
