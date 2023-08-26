import { useFetchCustomerListQuery } from "@states/customers/customerApi";
import Loading from "@components/pure/Loading";
import ErrorText from "@components/typographys/ErrorText";
import TitleCard from "@components/cards/TitleCard";
import useSetPageTitle from "@hooks/useSetPageTitle";
import Paginator from "@components/Paginator";
import { useState } from "react";
import CustomerTable from "@screens/customerList/CustomerTable";

const CustomerList = () => {
    useSetPageTitle("Customer List");

    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, error, data } = useFetchCustomerListQuery({
        page: currentPage,
    });
    // noinspection UnnecessaryLocalVariableJS
    const errorX: any = error;
    const errorMessage = errorX?.data?.message;

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : (
                <>
                    <TitleCard title="List all Customers" topMargin="mt-2">
                        <div className="flex w-full flex-col gap-12">
                            <CustomerTable data={data.data} />
                            <Paginator
                                currentPage={currentPage}
                                totalPages={data.last_page}
                                onSetCurrentPage={newPage => {
                                    setCurrentPage(newPage);
                                }}
                            />
                        </div>
                    </TitleCard>
                </>
            )}
        </>
    );
};

export default CustomerList;
