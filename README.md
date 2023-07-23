# LowAutoERP

ERP solution for Low Firm

# Models

## GroupOfCompany

```
name: [string, required],
address: [text, required],
telephone: [string, optional],
mobile: [string, required],
email: [string, required],
website: [string, optional],
trade_license_no: [text, required],
tin: [string, optional],
bin: [string, optional],
incorporation_no: [string, optional],
membership_no: [string, optional],
member_of_the_association: [text, optional],
business_field: [string, optional],
legal_form: [string, optional],
special_notes: [text, optional],
is_active: [boolean, default: true]
```
