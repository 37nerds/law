export type TOption = {
    name: string;
    value: string;
};

export type TLadderOption = {
    name: string[];
    value: string;
};

export type TBottomButton = {
    type: string;
    handler?: () => void;
};
