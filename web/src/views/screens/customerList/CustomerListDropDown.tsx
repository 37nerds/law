import { useDeleteClientMutation } from "@external/customers";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import confirmDelete from "@components/pure/confirmDelete";

const CustomerListDropDown = ({ clientId }: { clientId: number }) => {
    const deleteClientMutation = useDeleteClientMutation();

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className=" btn btn-primary  btn-sm w-full text-xs">Export</button>,
                    handler: () => {},
                },
                {
                    content: <button className="btn btn-accent btn-sm w-full text-xs">Inactive</button>,
                    handler: () => {},
                },
                {
                    content: <button className="btn btn-sm w-full text-xs">Delete</button>,
                    handler: () => {
                        confirmDelete({
                            onDelete: () => {
                                deleteClientMutation.mutate(clientId);
                            },
                            onCancel: () => {},
                        });
                    },
                },
            ]}
        />
    );
};

export default CustomerListDropDown;
