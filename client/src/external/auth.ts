import http from "@helpers/http";
import notify from "@helpers/notify";

export const registerUser = async (registerData: {
    username: string;
    name: string;
    email: string;
    password: string;
}) => {
    const response = await http.post("/auth/register", registerData);

    if (response.code !== 201) {
        throw response.payload;
    }

    return response.payload;
};
