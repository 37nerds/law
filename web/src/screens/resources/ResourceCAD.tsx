import CAD from "@components/tables/CAD";
import { usePaginatedResourcesQuery, useResourcesDeleteMutation } from "@queries/rbac/resources";
import useResourcesStore from "@states/resources_store";
import { useEffect } from "react";

const ResourceCAD = () => {
    const { selectionList, setSelectionList } = useResourcesStore(state => state);

    const resourceQuery = usePaginatedResourcesQuery();
    const deleteResourcesMutation = useResourcesDeleteMutation();

    useEffect(() => {
        if (deleteResourcesMutation.isSuccess) {
            setSelectionList([]);
        }
    }, [deleteResourcesMutation.isSuccess]);

    return (
        <CAD
            onDeselect={() => setSelectionList([])}
            onSelect={() => setSelectionList(resourceQuery?.data?.data?.map(resource => resource.id) || [])}
            length={selectionList.length}
            checked={selectionList.length === resourceQuery?.data?.data.length}
            api="api/v1/rbac/resources"
            onClick={() => deleteResourcesMutation.mutate(selectionList)}
            disabled={deleteResourcesMutation.isLoading}
        />
    );
};

export default ResourceCAD;
