import { useQuery } from "react-query";
import { FETCH_POPUP_DATA_QUERY_CACHE } from "@config/customers";
import { fetchPopUpData } from "@services/customersService";

const useFetchPopUpDataMid = () => {
    const fetchPopUpDataQuery = useQuery({
        queryKey: [FETCH_POPUP_DATA_QUERY_CACHE],
        queryFn: fetchPopUpData,
    });

    const { companies, units } = fetchPopUpDataQuery.data || {};

    return { isLoading: fetchPopUpDataQuery.isLoading, companies, units };
};

export default useFetchPopUpDataMid;
