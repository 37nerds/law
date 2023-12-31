export type TCustomerSetupSteps = "Group of Company" | "Company" | "Unit" | "Client";

export type TGroupOfCompany = {
    id?: string;
    name: string;
    address: string;
    telephone: string;
    mobile: string;
    email: string;
    website: string;
    trade_license_no: string;
    tin: string;
    bin: string;
    incorporation_no: string;
    membership_no: string;
    member_of_the_association: string;
    business_field: string;
    legal_form: string;
    special_notes: string;
};

export type TGroupOfCompanyKey = keyof TGroupOfCompany;

export type TCompany = {
    id?: string;
    name: string;
    group_of_company_id: string;
    address: string;
    telephone: string;
    mobile: string;
    email: string;
    website: string;
    trade_license_no: string;
    tin: string;
    bin: string;
    bida_reg_no: string;
    incorporation_no: string;
    membership_no: string;
    member_of_the_association: string;
    authorized_capital: number;
    paid_up_capital: number;
    business_field: string;
    legal_form: string;
    contact_person: string;
    contact_person_mobile: string;
    contact_person_email: string;
};

export type TCompanyKey = keyof TCompany;

export type TPopUPGroupOfCompany = {
    id: string;
    name: string;
    address: string;
};

export type TPopUpCompany = {
    id: string;
    name: string[];
    address: string;
};

export type TPopUpUnit = {
    id: string;
    name: string[];
    address: string;
};

export type TPopOfData = {
    group_of_companies: TPopUPGroupOfCompany[];
    companies: TPopUpCompany[];
    units: TPopUpUnit[];
};

export type TUnit = {
    id?: string;
    name: string;
    company_id: string;
    address: string;
    telephone: string;
    mobile: string;
    email: string;
    website: string;
    trade_license_no: string;
    tin: string;
    bin: string;
    bida_reg_no: string;
    incorporation_no: string;
    membership_no: string;
    member_of_the_association: string;
    business_field: string;
    legal_form: string;
    contact_person: string;
    contact_person_mobile: string;
    contact_person_email: string;
};

export type TUnitKey = keyof TUnit;

export type TClient = {
    id?: string;
    name: string;
    unit_id: string;
    client_id: string;
    unit_name: string;
    passport_no: string;
    passport_issue_date: string;
    passport_valid_date: string;
    gender: string;
    position_hold: string;
    mobile: string;
    email: string;
    date_of_birth: string;
    nationality: string;
    father_name: string;
    mother_name: string;
    tin_no: string;
    date_of_joining: string;
    current_wp_validity_date: string;
    visa_expire_date: string;
    max_entry_limit: string;
    entry_terms: string;
    address: string;
    bill_to: string;
    notes: string;
};

export type TClientKey = keyof TClient;

export type TUpdateClient = {
    id: string;
    status?: "active" | "inactive";
    name?: string;
    unit_id?: string;
    client_id?: string;
    unit_name?: string;
    passport_no?: string;
    passport_issue_date?: string;
    passport_valid_date?: string;
    gender?: string;
    position_hold?: string;
    mobile?: string;
    email?: string;
    date_of_birth?: string;
    nationality?: string;
    father_name?: string;
    mother_name?: string;
    tin_no?: string;
    date_of_joining?: string;
    current_wp_validity_date?: string;
    visa_expire_date?: string;
    max_entry_limit?: string;
    entry_terms?: string;
    address?: string;
    bill_to?: string;
    notes?: string;
};

export type TCustomerModalOpenFor = {
    id: number;
    type: "client" | "unit" | "company" | "group_of_company";
};

export type TStatus = "active" | "inactive";
