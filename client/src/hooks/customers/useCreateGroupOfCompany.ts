import { useState } from "react";
import httpClient from "@utils/httpClient";
import { selectGroupOfCompanySetup } from "@states/customers/customerSelector";

const useCreateGroupOfCompany = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const data = selectGroupOfCompanySetup();

    const save = async () => {
        setLoading(true);
        const response = await httpClient.post(
            "/customers/group-of-companies",
            data
        );
        if (response.status !== 201) {
            setError(response.message);
        }
        setLoading(false);
    };
    return { save, loading, error };
};

export default useCreateGroupOfCompany;
