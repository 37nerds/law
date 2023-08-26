import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import confirmDelete from "@components/confirmDelete";

import { useDeleteClientMutation } from "@states/customers/customerApi";
import useNotifyEffect from "@hooks/useNotifyEffect";
import log from "@helpers/log";

const CustomerListDropDown = ({ clientId }: { clientId: number }) => {
    const [deleteClient, { isSuccess, error }] = useDeleteClientMutation();

    useNotifyEffect(error, "Error in delete customer", isSuccess, "You successfully deleted the client ! xx");

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className="btn-primary btn-sm btn w-full text-xs">Export</button>,
                    handler: () => {
                        log.print("Hello");
                    },
                },
                {
                    content: <button className="btn-accent btn-sm btn w-full text-xs">Inactive</button>,
                    handler: () => {},
                },
                {
                    content: <button className="btn-sm btn w-full text-xs">Delete</button>,
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

export default CustomerListDropDown;
