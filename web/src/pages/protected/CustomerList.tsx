import type { TPaginate } from "@helpers/types";
import type { TClient } from "@fetches/customers/customers_type";

import { useClientsQuery } from "@fetches/customers/customers";
import { useNavigate } from "react-router-dom";

import useCustomerListStore from "@states/customer_list_store";
import useSetPageTitle from "@hooks/useSetPageTitle";

import Paginator from "@components/pure/Paginator";
import CustomerTable from "@screens/customer_list/CustomerTable";
import Card from "@components/cards/Card";
import FilterCustomerList from "@screens/customer_list/FilterCustomerList";
import QueryLayout from "@components/layouts/QueryLayout";

const CustomerList = () => {
    useSetPageTitle("Customer List");

    const navigate = useNavigate();
    const clientQuery = useClientsQuery();

    const { clientsFilters } = useCustomerListStore();

    return (
        <QueryLayout<TPaginate<TClient>> query={clientQuery}>
            <>
                {clientQuery.data ? (
                    <Card
                        title="List all Customers"
                        content={
                            <div className="flex w-full flex-col gap-12">
                                <FilterCustomerList />
                                <CustomerTable data={clientQuery.data?.data} />
                                <Paginator
                                    currentPage={clientsFilters.page}
                                    totalPages={clientQuery.data?.last_page}
                                    totalItems={clientQuery.data.total}
                                    totalPerPageItems={clientQuery.data.per_page}
                                    onSetCurrentPage={page => {
                                        navigate(`/_/customers/${page}`);
                                    }}
                                />
                            </div>
                        }
                    />
                ) : (
                    <></>
                )}
            </>
        </QueryLayout>
    );
};

export default CustomerList;
