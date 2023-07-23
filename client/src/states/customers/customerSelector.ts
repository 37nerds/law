import { useAppSelector } from "@app/hooks";

export const selectGroupOfCompanySetup = () => {
    return useAppSelector(state => state.customers.groupOfCompanySetup);
};
