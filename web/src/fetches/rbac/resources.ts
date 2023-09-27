import type { TBase } from "@helpers/types";

export type TResource = TBase & {
    api: string;
    web: string;
    method: string;
    label: string;
    group: string;
};
