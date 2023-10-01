import useSetPageTitle from "@hooks/useSetPageTitle";
import useResourcesStore from "@states/resources_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import EditUserModal from "@screens/users/EditUserModal";
import SearchInput from "@components/inputs/SearchInput";
import BarWrapper from "@components/wrappers/BarWrapper";
import ResourcesListTable from "@screens/resources/ResourcesListTable";
import NewResource from "@screens/resources/NewResource";

const Resources = () => {
    useSetPageTitle("Resources");

    const { editResourceModalOpen, editResourceId, searchQuery } = useResourcesStore(state => state.filters);
    const { setFiltersField } = useResourcesStore();

    return (
        <PageCard>
            <IsPermitted
                api="api/v1/rbac/users"
                method="patch"
                element={
                    <EditUserModal
                        open={editResourceModalOpen}
                        setOpen={value => setFiltersField("editResourceModalOpen", value)}
                        userId={editResourceId}
                    />
                }
            />
            <BarWrapper>
                <div>
                    <IsPermitted api="api/v1/rbac/users" method="post" element={<NewResource />} />
                </div>
                <div>
                    <SearchInput
                        value={searchQuery}
                        placeholder="Search Users"
                        onSearch={s => setFiltersField("searchQuery", s)}
                    />
                </div>
            </BarWrapper>
            <IsPermitted api={"api/v1/rbac/users"} method={"get"} element={<ResourcesListTable />} />
        </PageCard>
    );
};

export default Resources;
