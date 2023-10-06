import { TColumnErrors } from "@helpers/types";
import { THost } from "@queries/settings/host";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TStore = {
    host: THost;
    setHost: (host: THost) => void;
    setHostField: <K extends keyof THost>(key: K, value: THost[K]) => void;

    hostError: TColumnErrors;
    setHostError: (hostError: TColumnErrors) => void;
    setHostErrorField: (key: string, value: string[]) => void;
    setHostErrorEmpty: () => void;
};

export const useHostStore = create<TStore>()(
    immer(
        devtools(set => ({
            host: {
                id: "",
                created_at: "",
                updated_at: "",
                name: "",
                address: "",
                telephone: "",
                mobile: "",
                email: "",
                website: "",
                trade_licence_no: "",
                tin: "",
                bin: "",
                professional_licence_no: "",
                membership_no: "",
                financial_year_start: "",
                currency_symbol: "",
                tds_rate: 0,
                vds_rate: 0,
                payment_terms: "",
                declaration: "",
                salutation: "",
            },
            setHost: host => {
                set(state => {
                    state.host = host;
                });
            },
            setHostField: (key, value) => {
                set(state => {
                    state.host[key] = value;
                });
            },

            hostError: {},
            setHostError: hostError => {
                set(state => {
                    state.hostError = hostError;
                });
            },
            setHostErrorField: (key, value) => {
                set(state => {
                    state.hostError[key] = value;
                });
            },
            setHostErrorEmpty: () => {
                set(state => {
                    state.hostError = {};
                });
            },
        }))
    )
);
