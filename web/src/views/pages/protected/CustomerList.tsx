import { useClientsQuery } from "@external/customers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import Loading from "@components/pure/Loading";
import ErrorText from "@components/pure/ErrorText";
import useSetPageTitle from "@hooks/useSetPageTitle";
import Paginator from "@components/pure/Paginator";
import CustomerTable from "@screens/customerList/CustomerTable";
import Card from "@components/cards/Card";

const CustomerList = () => {
    useSetPageTitle("Customer List");

    const navigate = useNavigate();

    const { page: paramPage } = useParams();

    const { query, page, setPage } = useClientsQuery();

    useEffect(() => {
        setPage(Number(paramPage) || 1);
    }, [paramPage]);

    return (
        <>
            {query.isLoading ? (
                <Loading />
            ) : query.isError ? (
                <ErrorText>{query.error?.message || ""}</ErrorText>
            ) : (
                <>
                    <Card
                        title="List all Customers"
                        content={
                            <div className="flex w-full flex-col gap-12">
                                <CustomerTable data={query.data?.data} />
                                <Paginator
                                    currentPage={page}
                                    totalPages={query.data?.last_page}
                                    onSetCurrentPage={page => {
                                        navigate(`/_/customers/${page}`);
                                    }}
                                />
                            </div>
                        }
                    />
                </>
            )}
        </>
    );
};

export default CustomerList;
