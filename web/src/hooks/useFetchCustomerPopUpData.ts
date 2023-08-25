import { useQuery } from "react-query";
import { FETCH_POPUP_DATA_QUERY_CACHE } from "@config/customers";
import { fetchPopUpData } from "@external/customers";
import { useEffect } from "react";
import useCustomerSetupStore from "@states/useCustomerSetupStore";

const useFetchCustomerPopUpData = () => {
    const { setPopUpData } = useCustomerSetupStore();

    const fetchPopUpDataQuery = useQuery({
        queryKey: [FETCH_POPUP_DATA_QUERY_CACHE],
        queryFn: fetchPopUpData,
    });

    useEffect(() => {
        if (fetchPopUpDataQuery.isSuccess) {
            setPopUpData(fetchPopUpDataQuery.data);
        }
    }, [fetchPopUpDataQuery]);

    return fetchPopUpDataQuery;
};

export default useFetchCustomerPopUpData;
