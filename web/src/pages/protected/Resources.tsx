import useSetPageTitle from "@hooks/useSetPageTitle";
import useResourcesStore from "@states/resources_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import SearchInput from "@components/inputs/SearchInput";
import BarWrapper from "@components/wrappers/BarWrapper";
import EditResourceModal from "@screens/resources/EditResourceModal";
import NewResource from "@screens/resources/NewResource";
import ResourceCAD from "@screens/resources/ResourceCAD";
import ResourcesListTable from "@screens/resources/ResourcesListTable";

const Resources = () => {
    useSetPageTitle("Resources");

    const { editResourceModalOpen, editResourceId, searchQuery } = useResourcesStore(state => state.filters);
    const { setFiltersField } = useResourcesStore();

    return (
        <PageCard>
            <IsPermitted
                api="api/v1/rbac/resources"
                method="patch"
                element={
                    <EditResourceModal
                        open={editResourceModalOpen}
                        setOpen={value => setFiltersField("editResourceModalOpen", value)}
                        resourceId={editResourceId}
                    />
                }
            />
            <BarWrapper>
                <div className="flex items-center gap-2">
                    <ResourceCAD />
                    <IsPermitted api="api/v1/rbac/resources" method="post" element={<NewResource />} />
                </div>
                <div>
                    <SearchInput
                        value={searchQuery}
                        placeholder="Search Resources"
                        onSearch={s => setFiltersField("searchQuery", s)}
                    />
                </div>
            </BarWrapper>
            <IsPermitted api={"api/v1/rbac/users"} method={"get"} element={<ResourcesListTable />} />
        </PageCard>
    );
};

export default Resources;
