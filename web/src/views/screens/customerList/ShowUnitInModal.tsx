import {useEffect, useState} from "react";
import {TPopUpUnit} from "@fetches/customers/customers-type";
import {useFetchPopUpDataQuery, useUnitQuery, useUpdateUnitMutation} from "@fetches/customers/customers";
import {legalFromOptions} from "@config/general";

import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/layouts/SingleInputBox";
import DoubleInputBox from "@components/layouts/DoubleInputBox";
import LadderSelectInput from "@components/inputs/LadderSelectInput";
import SelectEditableInput from "@components/inputs/SelectEditableInput";
import useCustomerListStore from "@states/customerListStore";
import CustomerModalLayout from "@screens/customerList/CustomerModalLayout";
import SelectInput from "@components/inputs/SelectInput";
import EmailInput from "@components/inputs/EmailInput";

/**
 * Show individual unit data by ID and user can edit the data as well
 */
const ShowUnitInModal = ({ id }: { id: number }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const unitQuery = useUnitQuery(id);
    const updateUnitMutation = useUpdateUnitMutation();

    const { unit, setUnitField } = useCustomerListStore();
    const { companies, units } = useFetchPopUpDataQuery().data || {};

    useEffect(() => {
        if (updateUnitMutation.isSuccess) {
            setIsEdit(false);
        }
    }, [updateUnitMutation.isSuccess]);

    return (
        <CustomerModalLayout
            title="Unit Details"
            errorMessage={updateUnitMutation.error?.message || ""}
            isEdit={isEdit}
            onUpdate={() => updateUnitMutation.mutate(unit)}
            onEditToggle={() => setIsEdit(!isEdit)}
            isLoading={unitQuery.isLoading}
        >
            <>
                <DoubleInputBox
                    label1="Unit Name"
                    element1={
                        <StringInput
                            value={unit["name"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("name", value)}
                        />
                    }
                    label2="Company"
                    element2={
                        <LadderSelectInput
                            value={unit["company_id"]}
                            options={
                                companies?.map((company: any) => ({
                                    value: company.id,
                                    name: company.name,
                                })) || []
                            }
                            setValue={value => setUnitField("company_id", value)}
                            disabled={!isEdit}
                        />
                    }
                />
                <SingleInputBox
                    label="Address"
                    element={
                        <SelectEditableInput
                            value={unit["address"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("address", value)}
                            options={units?.map((x: TPopUpUnit) => ({
                                name: x.address,
                                value: x.address,
                            }))}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Telephone"
                    element1={
                        <StringInput
                            value={unit["telephone"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("telephone", value)}
                        />
                    }
                    label2="Mobile"
                    element2={
                        <StringInput
                            value={unit["mobile"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("mobile", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Email"
                    element1={
                        <StringInput
                            value={unit["email"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("email", value)}
                        />
                    }
                    label2="Website"
                    element2={
                        <StringInput
                            value={unit["website"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("website", value)}
                        />
                    }
                />
                <SingleInputBox
                    label="Trade License no"
                    element={
                        <StringInput
                            value={unit["trade_license_no"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("trade_license_no", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="TIN"
                    element1={
                        <StringInput
                            value={unit["tin"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("tin", value)}
                        />
                    }
                    label2="BIN"
                    element2={
                        <StringInput
                            value={unit["bin"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("bin", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="BIDA Reg No"
                    element1={
                        <StringInput
                            value={unit["bida_reg_no"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("bida_reg_no", value)}
                        />
                    }
                    label2="Incorporation No"
                    element2={
                        <StringInput
                            value={unit["incorporation_no"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("incorporation_no", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Membership No"
                    element1={
                        <StringInput
                            value={unit["membership_no"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("membership_no", value)}
                        />
                    }
                    label2="Member of the association"
                    element2={
                        <StringInput
                            value={unit["member_of_the_association"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("member_of_the_association", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Business Field"
                    element1={
                        <StringInput
                            value={unit["business_field"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("business_field", value)}
                        />
                    }
                    label2="Legal form"
                    element2={
                        <SelectInput
                            value={unit["legal_form"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("legal_form", value)}
                            options={legalFromOptions}
                        />
                    }
                />
                <SingleInputBox
                    label="Contact person"
                    element={
                        <StringInput
                            value={unit["contact_person"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("contact_person", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Contact person mobile"
                    element1={
                        <StringInput
                            value={unit["contact_person_mobile"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("contact_person_mobile", value)}
                        />
                    }
                    label2="Contact person email"
                    element2={
                        <EmailInput
                            value={unit["contact_person_email"]}
                            disabled={!isEdit}
                            setValue={value => setUnitField("contact_person_email", value)}
                        />
                    }
                />
            </>
        </CustomerModalLayout>
    );
};

export default ShowUnitInModal;
