import type { TPaginate } from "@helpers/types";
import type { TClient } from "@fetches/customers/customers_type";

import { useClientsQuery } from "@fetches/customers/customers";

import useCustomerListStore from "@states/customer_list_store";
import useSetPageTitle from "@hooks/useSetPageTitle";

import Paginator from "@components/pure/Paginator";
import CustomerTable from "@screens/customers/CustomerTable";
import FilterCustomerList from "@screens/customers/FilterCustomerList";
import QueryWrapper from "@components/wrappers/QueryWrapper";
import PageCard from "@components/cards/PageCard";

const Customers = () => {
    useSetPageTitle("Customer List");

    const clientQuery = useClientsQuery();

    const { clientsFilters, setClientsFiltersField } = useCustomerListStore();

    return (
        <PageCard>
            <QueryWrapper<TPaginate<TClient>> query={clientQuery}>
                {clientQuery.data && (
                    <div className="flex w-full flex-col gap-12">
                        <FilterCustomerList />
                        <CustomerTable data={clientQuery.data?.data} />
                        <Paginator
                            currentPage={clientsFilters.page}
                            totalPages={clientQuery.data?.last_page}
                            totalItems={clientQuery.data.total}
                            totalPerPageItems={clientQuery.data.per_page}
                            onSetCurrentPage={page => setClientsFiltersField("page", page)}
                        />
                    </div>
                )}
            </QueryWrapper>
        </PageCard>
    );
};

export default Customers;
