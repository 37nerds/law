import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import confirmDelete from "@components/confirmDelete";
import { useDeleteClientMutation } from "@states/customers/customerApi";
import { useState } from "react";
import ModalOpener from "@components/dropdowns/ModalOpener";
import CustomerModal, { TModalOpenFor } from "./CustomerModal";
import useNotifyEffect from "@hooks/useNotifyEffect";

const DropDown = ({ clientId }: { clientId: number }) => {
    const [deleteClient, { isSuccess, error }] = useDeleteClientMutation();

    useNotifyEffect(
        error,
        "Error in delete customer",
        isSuccess,
        "You successfully deleted the client ! xx"
    );

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
    const [modalOpenFor, setModalOpenFor] = useState<TModalOpenFor | null>(
        null
    );

    return (
        <>
            <CustomerModal modalOpenFor={modalOpenFor} />
            <table className="table-compact table w-full text-xs">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Unit Name</th>
                        <th>Company Name</th>
                        <th>Group of Company Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((customer: any, index: number) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 1 ? "active" : ""}`}
                        >
                            <th>
                                <ModalOpener
                                    onClick={() => {
                                        setModalOpenFor({
                                            type: "client",
                                            id: customer.id,
                                        });
                                    }}
                                >
                                    {customer["name"]}
                                </ModalOpener>
                            </th>
                            <th>
                                <ModalOpener
                                    onClick={() => {
                                        setModalOpenFor({
                                            type: "unit",
                                            id: customer.unit_id,
                                        });
                                    }}
                                >
                                    {customer["unit_name"]}
                                </ModalOpener>
                            </th>
                            <th>
                                <ModalOpener
                                    onClick={() => {
                                        setModalOpenFor({
                                            type: "company",
                                            id: customer.unit_id,
                                        });
                                    }}
                                >
                                    {customer["company_name"]}
                                </ModalOpener>
                            </th>
                            <th>
                                <ModalOpener
                                    onClick={() => {
                                        setModalOpenFor({
                                            type: "group_of_company",
                                            id: customer.group_of_company_id,
                                        });
                                    }}
                                >
                                    {customer["group_of_company_name"]}
                                </ModalOpener>
                            </th>
                            <th>
                                <DropDown clientId={customer.id} />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTable;
