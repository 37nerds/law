import { TOption } from "@kinds/general";

export const MODAL_BODY_TYPES = {
    USER_DETAIL: "USER_DETAIL",
    LEAD_ADD_NEW: "LEAD_ADD_NEW",
    DEFAULT: "",
};

export const gendersOptions: TOption[] = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" },
];

export const legalFromOptions: TOption[] = [
    { name: "Foo", value: "foo" },
    { name: "Bar", value: "bar" },
];

export const billToOptions: TOption[] = [
    { name: "Foo", value: "foo" },
    { name: "Bar", value: "bar" },
];
