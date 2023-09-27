import type { TOption, TProfileDropdownLink } from "@helpers/types";

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

export const default_theme = "system";

export const redirect_after_login = "/_/dashboard";

export const profile_dropdown_links: TProfileDropdownLink[] = [
    {
        title: "Profile",
        link: "/_/settings/profile",
    },
];
