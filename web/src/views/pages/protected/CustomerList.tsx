import { useClientsQuery } from "@external/customers";
import { useNavigate } from "react-router-dom";
import { TPaginate } from "@kinds/general";
import { TClient } from "@kinds/customers";
import useSetPageTitle from "@hooks/useSetPageTitle";
import Paginator from "@components/pure/Paginator";
import CustomerTable from "@screens/customerList/CustomerTable";
import Card from "@components/cards/Card";
import FilterCustomerList from "@screens/customerList/FilterCustomerList";
import useCustomerListStore from "@states/customerListStore";
import QueryLayout from "@components/layouts/QueryLayout";

const CustomerList = () => {
    useSetPageTitle("Customer List");

    const navigate = useNavigate();
    const query = useClientsQuery();

    const { clientsFilters, setClientsFiltersField } = useCustomerListStore();

    return (
        <QueryLayout<TPaginate<TClient>> query={query}>
            <>
                {query.data ? (
                    <Card
                        title="List all Customers"
                        content={
                            <div className="flex w-full flex-col gap-12">
                                <FilterCustomerList />
                                <CustomerTable data={query.data?.data} />
                                <Paginator
                                    currentPage={clientsFilters.page}
                                    totalPages={query.data?.last_page}
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
