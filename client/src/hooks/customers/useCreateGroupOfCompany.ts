import { useState } from "react";
import httpClient from "@utils/httpClient";
import { selectGroupOfCompanySetup } from "@states/customers/customerSelector";

const useCreateGroupOfCompany = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState<any>({});

    const payload = selectGroupOfCompanySetup();

    const save = async () => {
        setLoading(true);
        setErrors({});
        const response = await httpClient.post(
            "/customers/group-of-companies",
            payload
        );

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

export default useCreateGroupOfCompany;
