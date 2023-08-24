import http from "@helpers/http";

export const registerUser = async (registerData: {
    username: string;
    name: string;
    email: string;
    password: string;
}) => {
    await http.get("/csrf-cookie", {}, {}, false);

    const response = await http.post("/auth/register", {
        ...registerData,
        password_confirmation: registerData.password,
    });

    const payload = await response.json();

    if (response.status !== 201) {
        throw payload;
    }

    return payload;
};

export const loggedUser = async () => {};
