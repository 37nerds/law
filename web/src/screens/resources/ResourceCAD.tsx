import CAD from "@components/tables/CAD";
import { usePaginatedResourcesQuery } from "@queries/rbac/resources";
import useResourcesStore from "@states/resources_store";

const ResourceCAD = () => {
    const { selectionList, setSelectionList } = useResourcesStore(state => state);

    const resourceQuery = usePaginatedResourcesQuery();

    // useEffect(() => {
    //     if (deleteUsersMutation.isSuccess) {
    //         setSelectionList([]);
    //     }
    // }, [deleteUsersMutation.isSuccess]);

    return (
        <CAD
            onDeselect={() => setSelectionList([])}
            onSelect={() => setSelectionList(resourceQuery?.data?.data?.map(resource => resource.id) || [])}
            length={selectionList.length}
            checked={selectionList.length === resourceQuery?.data?.data.length}
            api="api/v1/rbac/resources"
            onClick={() => console.log("delete")}
            // disabled={deleteUsersMutation.isLoading}
        />
    );
};

export default ResourceCAD;
