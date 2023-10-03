import type { THeader } from "@helpers/types";
import type { TResource, TSortableResourceColumn } from "../../queries/rbac/resources";
import type { TThreeDropDownOption } from "@helpers/types";

import { useDeleteResourceMutation, usePaginatedResourcesQuery } from "../../queries/rbac/resources";
import { convertToLocalTime } from "@helpers/time";
import { isPermitted } from "@states/auth_store";

import useResourcesStore from "@states/resources_store";

import PaginationWrapper from "@components/wrappers/PaginationWrapper";
import Td from "@components/tables/Td";
import Th from "@components/tables/Th";
import Table from "@components/tables/Table";
import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import EditButton from "@components/buttons/EditButton";
import DeleteButton from "@components/buttons/DeleteButton";

const ResourcesThreeDotDropdown = ({ resourceId }: { resourceId: string }) => {
    const { setFiltersField } = useResourcesStore();

    const deleteResourceMutation = useDeleteResourceMutation();

    const options: TThreeDropDownOption[] = [];

    if (isPermitted("api/v1/rbac/resources", "patch")) {
        options.push({
            content: <EditButton />,
            handler: () => {
                setFiltersField("editResourceId", resourceId);
                setFiltersField("editResourceModalOpen", true);
            },
        });
    }

    if (isPermitted("api/v1/rbac/resources", "delete")) {
        options.push({
            content: <DeleteButton />,
            handler: () => {
                if (confirm("Are you sure you want to delete this resource?")) {
                    deleteResourceMutation.mutate(resourceId);
                    setFiltersField("editResourceId", "");
                }
            },
        });
    }

    return <ThreeDotDropdown options={options} />;
};

const ResourcesListTable = () => {
    const resourcesQuery = usePaginatedResourcesQuery();

    const { page, sortColumn, sortOrder } = useResourcesStore(state => state?.filters);
    const { setFiltersField } = useResourcesStore(state => state);

    const handleSort = (column: TSortableResourceColumn) => {
        setFiltersField("page", 1);
        if (sortColumn !== column) {
            setFiltersField("sortColumn", column);
            setFiltersField("sortOrder", "asc");
        } else {
            const nextOrder = sortOrder === "asc" ? "desc" : "asc";
            setFiltersField("sortOrder", nextOrder);
        }
    };

    const headers: THeader<TSortableResourceColumn>[] = [
        { name: "label", label: "Label" },
        { name: "method", label: "Method" },
        { name: "api", label: "API" },
        { name: null, label: "Web" },
        { name: "group", label: "Group" },
        { name: null, label: "Dependencies" },
        { name: "created_at", label: "Created At" },
    ];

    return (
        <PaginationWrapper<TResource>
            query={resourcesQuery}
            page={page}
            onSetPage={page => {
                setFiltersField("page", page);
            }}
        >
            <Table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <Th<TSortableResourceColumn>
                                key={index}
                                onClick={handleSort}
                                column={sortColumn}
                                order={sortOrder}
                                name={header.name}
                                label={header.label}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {resourcesQuery?.data?.data?.map((resource, index) => {
                        return (
                            <tr key={index} className={`${index % 2 === 1 ? "bg-base-200" : ""}`}>
                                <Td>{resource.label}</Td>
                                <Td>{resource.method}</Td>
                                <Td>{resource.api}</Td>
                                <Td>
                                    {resource.web.length === 0
                                        ? null
                                        : resource.web?.map((w, index) => <div key={index}>{w}</div>)}
                                </Td>
                                <Td>{resource.group}</Td>
                                <Td>
                                    {resource.dependencies.length === 0
                                        ? null
                                        : resource.dependencies?.map((dependency, index) => (
                                              <div key={index}>
                                                  {dependency.method} {dependency.api}
                                              </div>
                                          ))}
                                </Td>
                                <Td>{convertToLocalTime(resource?.created_at)}</Td>
                                <Td>
                                    <ResourcesThreeDotDropdown resourceId={resource.id} />
                                </Td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </PaginationWrapper>
    );
};

export default ResourcesListTable;
