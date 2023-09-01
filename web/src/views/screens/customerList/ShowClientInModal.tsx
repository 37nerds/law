import { useEffect, useState } from "react";
import { gendersOptions } from "@config/general";
import { useClientQuery, useFetchPopUpDataQuery, useUpdateClientMutation } from "@external/customers";

import TextInput from "@components/inputs/TextInput";
import DateInput from "@components/inputs/DateInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/inputs/internal/wrappers/SingleInputBox";
import DoubleInputBox from "@components/inputs/internal/wrappers/DoubleInputBox";
import LadderSelectInput from "@components/inputs/LadderSelectInput";
import CustomerModalLayout from "./CustomerModalLayout";
import useCustomerListStore from "@states/customerListStore";

/**
 * Show individual client data by ID and user can edit the data as well
 */
const ShowClientInModal = ({ id }: { id: number }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const clientQuery = useClientQuery(id);
    const updateClientMutation = useUpdateClientMutation();

    const { client, setClientField } = useCustomerListStore();
    const { units } = useFetchPopUpDataQuery().data || {};

    useEffect(() => {
        if (updateClientMutation.isSuccess) {
            setIsEdit(false);
        }
    }, [updateClientMutation.isSuccess]);

    return (
        <CustomerModalLayout
            title="Client Details"
            errorMessage={updateClientMutation.error?.message || ""}
            isEdit={isEdit}
            onUpdate={() => updateClientMutation.mutate(client)}
            onEditToggle={() => setIsEdit(!isEdit)}
            isLoading={clientQuery.isLoading}
        >
            <>
                <DoubleInputBox
                    label1="Name of Client"
                    element1={
                        <StringInput
                            value={client["name"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("name", value)}
                        />
                    }
                    label2="Unit"
                    element2={
                        <LadderSelectInput
                            value={client["unit_id"]}
                            options={
                                units?.map((unit: any) => ({
                                    value: unit.id,
                                    name: unit.name,
                                })) || []
                            }
                            setValue={value => setClientField("unit_id", value)}
                            disabled={!isEdit}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Client ID"
                    element1={
                        <StringInput
                            value={client["client_id"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("client_id", value)}
                        />
                    }
                    label2="Passport no"
                    element2={
                        <StringInput
                            value={client["passport_no"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("passport_no", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Passport issue date"
                    element1={
                        <DateInput
                            value={client["passport_issue_date"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("passport_issue_date", value)}
                        />
                    }
                    label2="Passport valid date"
                    element2={
                        <DateInput
                            value={client["passport_valid_date"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("passport_valid_date", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Gender"
                    element1={
                        <SelectInput
                            value={client["gender"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("gender", value)}
                            options={gendersOptions}
                        />
                    }
                    label2="Position hold"
                    element2={
                        <StringInput
                            value={client["position_hold"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("position_hold", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Mobile"
                    element1={
                        <StringInput
                            value={client["mobile"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("mobile", value)}
                        />
                    }
                    label2="Email"
                    element2={
                        <StringInput
                            type="email"
                            value={client["email"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("email", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Date of birth"
                    element1={
                        <DateInput
                            value={client["date_of_birth"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("date_of_birth", value)}
                        />
                    }
                    label2="Nationality"
                    element2={
                        <StringInput
                            value={client["nationality"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("nationality", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Father's name"
                    element1={
                        <StringInput
                            value={client["father_name"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("father_name", value)}
                        />
                    }
                    label2="Mother's name"
                    element2={
                        <StringInput
                            value={client["mother_name"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("mother_name", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="TIN No"
                    element1={
                        <StringInput
                            value={client["tin_no"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("tin_no", value)}
                        />
                    }
                    label2="Date of joining"
                    element2={
                        <DateInput
                            value={client["date_of_joining"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("date_of_joining", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Current WP validity date"
                    element1={
                        <DateInput
                            value={client["current_wp_validity_date"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("current_wp_validity_date", value)}
                        />
                    }
                    label2="Visa expire date"
                    element2={
                        <DateInput
                            value={client["visa_expire_date"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("visa_expire_date", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Max entry limit"
                    element1={
                        <StringInput
                            value={client["max_entry_limit"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("max_entry_limit", value)}
                        />
                    }
                    label2="Entry terms"
                    element2={
                        <StringInput
                            value={client["entry_terms"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("entry_terms", value)}
                        />
                    }
                />
                <DoubleInputBox
                    label1="Address"
                    element1={
                        <SelectInput
                            value={client["address"]}
                            disabled={!isEdit}
                            options={
                                units?.map((unit: any) => ({
                                    name: unit.address,
                                    value: unit.address,
                                })) || []
                            }
                            setValue={value => setClientField("address", value)}
                        />
                    }
                    label2="Bill to"
                    element2={
                        <StringInput
                            value={client["bill_to"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("bill_to", value)}
                        />
                    }
                />
                <SingleInputBox
                    label="Notes"
                    element={
                        <TextInput
                            value={client["notes"]}
                            disabled={!isEdit}
                            setValue={value => setClientField("notes", value)}
                        />
                    }
                />
            </>
        </CustomerModalLayout>
    );
};

export default ShowClientInModal;
