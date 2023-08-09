export type TOption = {
    name: string;
    value: string;
};

export type TLadderOption = {
    name: string[];
    value: string;
};

export const genders: TOption[] = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" },
];
