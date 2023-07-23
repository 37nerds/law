import { useState } from "react";
import httpClient from "@utils/httpClient";
import { selectUnitSetup } from "@states/customers/customerSelector";

const useCreateUnit = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState<any>({});

    const payload = selectUnitSetup();

    const save = async () => {
        setLoading(true);
        setErrors({});
        const response = await httpClient.post("/customers/units", payload);

        if (response.code !== 201) {
            setErrorMessage(response.data.message);
            setErrors(response.data.errors);
        } else {
            // window.location.href = "/";
        }
        setLoading(false);
    };
    return { save, loading, errorMessage, errors };
};

export default useCreateUnit;
