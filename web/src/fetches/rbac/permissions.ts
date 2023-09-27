import type { TResource } from "@fetches/rbac/resources";
import type { TBase } from "src/types";

export type TPermission = TBase & {
    role_id: string;
    resource_id: string;
    resource: TResource;
};
