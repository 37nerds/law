import { useState } from "react";
import httpClient from "@utils/httpClient";

const useCreateRequest = (endpoint: string) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState<any>({});
    const [data, setDate] = useState({});
    const save: any = async (payload: any) => {
        setLoading(true);
        setErrorMessage("");
        setErrors({});
        setDate({});

        const response = await httpClient.post(endpoint, payload);

        if (response.code !== 201) {
            setErrorMessage(response.payload.message);
            setErrors(response.payload.errors);
        } else {
            setDate(response.payload.data);
        }

        setLoading(false);
    };
    return { save, loading, errorMessage, errors, data };
};

export default useCreateRequest;
