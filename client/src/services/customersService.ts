import { TClient, TCompany, TGroupOfCompany, TUnit } from "@kinds/customers";
import http from "@helpers/http";
import notify from "@helpers/notify";

export const fetchPopUpData = async () => {
    const response = await http.get("/customers/pop-up-data");
    if (response.code !== 200) {
        notify("error", response.payload.message);
        throw response.payload;
    }
    return response.payload.data;
};

export const saveGroupOfCompany = async (groupOfCompany: TGroupOfCompany) => {
    const response = await http.post(
        "/customers/group-of-companies",
        groupOfCompany
    );
    if (response.code !== 201) {
        notify("error", response.payload.message);
        throw response.payload.errors;
    }
    return response.payload.data;
};

export const saveCompany = async (company: TCompany) => {
    const response = await http.post("/customers/companies", company);
    if (response.code !== 201) {
        notify("error", response.payload.message);
        throw response.payload.errors;
    }
    return response.payload.data;
};

export const saveUnit = async (unit: TUnit) => {
    const response = await http.post("/customers/units", unit);
    if (response.code !== 201) {
        notify("error", response.payload.message);
        throw response.payload.errors;
    }
    return response.payload.data;
};

export const saveClient = async (client: TClient) => {
    const response = await http.post("/customers/clients", client);
    if (response.code !== 201) {
        notify("error", response.payload.message);
        throw response.payload.errors;
    }

    const returnedClient: TClient = response.payload.data;
    notify(
        "success",
        `You successfully created new Client: ${returnedClient.name}`
    );
    return returnedClient;
};
