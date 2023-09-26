import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import useUsersStore from "@states/usersStore";

const UserThreeDotDropdown = ({ userId }: { userId: string }) => {
    const { setFiltersField, setUserId } = useUsersStore();

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
                    handler: () => {
                        setUserId(userId);
                        setFiltersField("editUserModalOpen", true);
                    },
                },
                {
                    content: <button className=" btn btn-error btn-sm w-full text-xs text-base-100">Delete</button>,
                    handler: () => {},
                },
            ]}
        />
    );
};

export default UserThreeDotDropdown;
