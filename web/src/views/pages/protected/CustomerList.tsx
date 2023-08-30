import { useCustomerListQuery } from "@external/customers";

import Loading from "@components/pure/Loading";
import ErrorText from "@components/pure/ErrorText";
import TitleCard from "@components/cards/TitleCard";
import useSetPageTitle from "@hooks/useSetPageTitle";
import Paginator from "@components/Paginator";
import CustomerTable from "@screens/customerList/CustomerTable";

const CustomerList = () => {
    useSetPageTitle("Customer List");

    const { query, page, setPage } = useCustomerListQuery();

    return (
        <>
            {query.isLoading ? (
                <Loading />
            ) : query.isError ? (
                <ErrorText>{query.error?.message || ""}</ErrorText>
            ) : (
                <>
                    <TitleCard title="List all Customers" topMargin="mt-2">
                        <div className="flex w-full flex-col gap-12">
                            <CustomerTable data={query.data?.data} />
                            <Paginator
                                currentPage={page}
                                totalPages={query.data?.last_page}
                                onSetCurrentPage={setPage}
                            />
                        </div>
                    </TitleCard>
                </>
            )}
        </>
    );
};

export default CustomerList;
