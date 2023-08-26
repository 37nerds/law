import { useState } from "react";

import ModalOpener from "@components/dropdowns/ModalOpener";

import CustomerModal, { TCustomerModalOpenFor } from "./CustomerModal";
import CustomerListDropDown from "./CustomerListDropDown";

/**
 * Show all keys.ts in a paginated table
 */
const CustomerTable = ({ data }: { data: any }) => {
    const [modalOpenFor, setModalOpenFor] = useState<TCustomerModalOpenFor | null>(null);

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
                        <tr key={index} className={`${index % 2 === 1 ? "active" : ""}`}>
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
                                <CustomerListDropDown clientId={customer.id} />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTable;
