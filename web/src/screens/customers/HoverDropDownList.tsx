import { useDeleteClientMutation, useUpdateClientMutation } from "../../queries/customers/customers";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import useCustomerListStore from "@states/customer_list_store";

export const ACTIVE = "active";
export const INACTIVE = "inactive";

const HoverDropDownList = ({ clientId }: { clientId: string }) => {
    const deleteClientMutation = useDeleteClientMutation();
    const updateClientMutation = useUpdateClientMutation();

    const { clientsFilters } = useCustomerListStore();

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className=" btn btn-primary  btn-sm w-full text-xs">Export</button>,
                    handler: () => {},
                },
                {
                    content: (
                        <button className="btn btn-accent btn-sm w-full text-xs">
                            {clientsFilters.status === ACTIVE ? "Inactive" : "Active"}
                        </button>
                    ),
                    handler: () => {
                        updateClientMutation.mutate({
                            id: clientId,
                            status: clientsFilters.status === ACTIVE ? INACTIVE : ACTIVE,
                        });
                    },
                },
                {
                    content: <button className="btn btn-sm w-full text-xs">Delete</button>,
                    handler: () => {
                        if (confirm("Are you sure you want to delete this client?")) {
                            deleteClientMutation.mutate(clientId);
                        }
                    },
                },
            ]}
        />
    );
};

export default HoverDropDownList;
