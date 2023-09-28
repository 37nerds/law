import type { ReactNode } from "react";
import type { TMethod } from "@helpers/types";

import { isPermitted } from "@states/auth_store";

const IsPermitted = ({ api, method, element }: { api: string; method: TMethod; element: ReactNode }) => {
    return <>{isPermitted(api, method) ? element : <></>}</>;
};

export default IsPermitted;
