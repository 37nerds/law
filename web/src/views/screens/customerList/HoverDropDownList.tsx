import { useDeleteClientMutation } from "@external/customers";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";

const HoverDropDownList = ({ clientId }: { clientId: number }) => {
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
