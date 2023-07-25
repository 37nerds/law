import { useFetchCustomerListQuery } from "@states/customers/customerApi";
import Loading from "@components/Loading";
import ErrorText from "@components/typographys/ErrorText";
import TitleCard from "@components/cards/TitleCard";
import useSetPageTitle from "@hooks/useSetPageTitle";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Paginator from "@components/Paginator";
import { useState } from "react";

const CustomerList = () => {
    useSetPageTitle("Customer List");

    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, error, data } = useFetchCustomerListQuery({
        page: currentPage,
    });
    // noinspection UnnecessaryLocalVariableJS
    const errorX: any = error;
    const errorMessage = errorX?.data?.message;

    const tableStructures = [
        { title: "Client Name", key: "name" },
        { title: "Unit Name", key: "unit_name" },
        { title: "Company Name", key: "company_name" },
        { title: "Group of Company Name", key: "group_of_company_name" },
    ];

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : (
                <>
                    <TitleCard title="List all Customers" topMargin="mt-2">
                        <div className="flex w-full flex-col gap-3 overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        {tableStructures.map((x, index) => (
                                            <th key={index}>{x.title}</th>
                                        ))}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map(
                                        (customer: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    {tableStructures.map(
                                                        (x, index) => (
                                                            <th key={index}>
                                                                {
                                                                    customer[
                                                                        x.key
                                                                    ]
                                                                }
                                                            </th>
                                                        )
                                                    )}
                                                    <td>
                                                        <button
                                                            className="btn-ghost btn-square btn"
                                                            onClick={() => {}}
                                                        >
                                                            <TrashIcon className="w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
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
