import { useFetchClientQuery } from "@states/customers/customerApi";

const ShowClientInModal = ({ id }: { id: number }) => {
    const { data, error } = useFetchClientQuery(id);

    return <>{JSON.stringify(data)}</>;
};

export default ShowClientInModal;
