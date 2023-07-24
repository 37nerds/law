import { useFetchCustomerListQuery } from "@states/customers/customerApi";
import Loading from "@components/Loading";
import ErrorText from "@components/typographys/ErrorText";

const CustomerList = () => {
    const { isLoading, error, data } = useFetchCustomerListQuery({});
    // noinspection UnnecessaryLocalVariableJS
    const errorX: any = error;
    const errorMessage = errorX?.data?.message;

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : errorMessage ? (
                <ErrorText>{errorMessage}</ErrorText>
            ) : (
                <>
                    {data["data"].map((x: any, index: number) => (
                        <li key={index}>{x["name"]}</li>
                    ))}
                </>
            )}
        </>
    );
};

export default CustomerList;
