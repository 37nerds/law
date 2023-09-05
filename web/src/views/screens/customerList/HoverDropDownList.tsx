import { useDeleteClientMutation, useUpdateClientMutation } from "@external/customers";
import { INACTIVE } from "@constants/status";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";

const HoverDropDownList = ({ clientId }: { clientId: string }) => {
    const deleteClientMutation = useDeleteClientMutation();
    const updateClientMutation = useUpdateClientMutation();

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className=" btn btn-primary  btn-sm w-full text-xs">Export</button>,
                    handler: () => {},
                },
                {
                    content: <button className="btn btn-accent btn-sm w-full text-xs">Inactive</button>,
                    handler: () => {
                        updateClientMutation.mutate({
                            id: clientId,
                            status: INACTIVE,
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
