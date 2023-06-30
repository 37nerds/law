import S1GroupOfCompany from "@components/sustomerSetups/S1GroupOfCompany";
import S2Company from "@components/sustomerSetups/S2Company";
import S3Unit from "@components/sustomerSetups/S3Unit";
import S4Client from "@components/sustomerSetups/S4Client";

export const customerSetupSteps = [
    {
        label: "Group of Company",
        component: S1GroupOfCompany,
    },
    {
        label: "Company",
        component: S2Company,
    },
    {
        label: "Unit",
        component: S3Unit,
    },
    {
        label: "Client",
        component: S4Client,
    },
];
