import { useEffect, useState } from "react";
import httpClient from "@utils/httpClient";
import { useDispatch } from "react-redux";

const useFetchRequest = (
    endpoint: string,
    reducer: any,
    _isFetchAble = true
) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [data, setDate] = useState({});
    const [isFetchAble, setIsFetchAble] = useState(_isFetchAble);
    const [refetch, setRefetch] = useState(true);

    useEffect(() => {
        if (isFetchAble) {
            (async () => {
                setLoading(true);
                setErrorMessage("");
                setErrors({});
                setDate({});

                const response = await httpClient.get(endpoint);

                if (response.code !== 200) {
                    setErrorMessage(response.payload.message);
                    setErrors(response.payload.errors);
                } else {
                    dispatch(reducer(response.payload.data));
                    setDate(response.payload.data);
                }

                setLoading(false);
            })();
        }
    }, [isFetchAble, refetch]);
    return { setIsFetchAble, loading, errorMessage, errors, data, setRefetch };
};

export default useFetchRequest;
