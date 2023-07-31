import S1GroupOfCompany from "./S1GroupOfCompany";
import S2Company from "./S2Company";
import S3Unit from "./S3Unit";
import S4Client from "./S4Client";
import { ReactNode } from "react";

export type TNavigatorStep = {
    label: string;
    component: ReactNode;
};

export const customersSetupSteps: TNavigatorStep[] = [
    {
        label: "Group of Company",
        component: <S1GroupOfCompany />,
    },
    {
        label: "Company",
        component: <S2Company />,
    },
    {
        label: "Unit",
        component: <S3Unit />,
    },
    {
        label: "Client",
        component: <S4Client />,
    },
];

export const getStepComponentByLabel = (label: string): ReactNode => {
    const customersSetupStep = customersSetupSteps.find(c => c.label == label);
    return (
        customersSetupStep
            ? customersSetupStep.component
            : () => customersSetupSteps[0].component
    ) as ReactNode;
};
