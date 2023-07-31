import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import confirmDelete from "@components/confirmDelete";
import { useDeleteClientMutation } from "@states/customers/customerApi";
import { useEffect } from "react";

const DropDown = ({ clientId }: { clientId: number }) => {
    const [deleteClient, { error }] = useDeleteClientMutation();

    /*
     * @TODO show the error data in toast message
     */
    useEffect(() => {
        if (error) {
            console.log("Error in delete customer: ", error);
        }
    }, [error]);

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: (
                        <button className="btn-primary btn-sm btn w-full text-xs">
                            Export
                        </button>
                    ),
                    handler: () => {
                        console.log("Hello");
                    },
                },
                {
                    content: (
                        <button className="btn-accent btn-sm btn w-full text-xs">
                            Inactive
                        </button>
                    ),
                    handler: () => {},
                },
                {
                    content: (
                        <button className="btn-sm btn w-full text-xs">
                            Delete
                        </button>
                    ),
                    handler: () => {
                        confirmDelete({
                            onDelete: () => {
                                deleteClient(clientId);
                            },
                            onCancel: () => {},
                        });
                    },
                },
            ]}
        />
    );
};

const CustomerTable = ({ data }: { data: any }) => {
    const tableStructures = [
        { title: "Client Name", key: "name" },
        { title: "Unit Name", key: "unit_name" },
        { title: "Company Name", key: "company_name" },
        { title: "Group of Company Name", key: "group_of_company_name" },
    ];

    return (
        <table className="table-compact table w-full text-xs">
            <thead>
                <tr>
                    {tableStructures.map((x, index) => (
                        <th key={index}>{x.title}</th>
                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((customer: any, index: number) => {
                    return (
                        <tr
                            key={index}
                            className={`${index % 2 === 1 ? "active" : ""}`}
                        >
                            {tableStructures.map((x, index) => (
                                <th key={index}>{customer[x.key]}</th>
                            ))}
                            <th>
                                <DropDown clientId={customer.id} />
                            </th>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CustomerTable;
