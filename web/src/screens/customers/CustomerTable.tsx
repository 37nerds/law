import { ReactNode, useState } from "react";
import { TCustomerModalOpenFor } from "@fetches/customers/customers_type";

import CustomerModal from "./CustomerModal";
import HoverDropDownList from "./HoverDropDownList";

const ModalOpener = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
    return (
        <label htmlFor="___the-modal" className="cursor-pointer" onClick={onClick}>
            {children}
        </label>
    );
};

const CustomerTable = ({ data }: { data: any }) => {
    const [modalOpenFor, setModalOpenFor] = useState<TCustomerModalOpenFor | null>(null);

    return (
        <>
            <CustomerModal modalOpenFor={modalOpenFor} />
            <table className="table table-sm w-full border border-base-300 text-xs">
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
                        <tr key={index} className={`${index % 2 === 1 ? "bg-base-200" : ""}`}>
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
                                <HoverDropDownList clientId={customer.id} />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTable;
