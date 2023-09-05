import { useState } from "react";
import { TPopUpUnit } from "@kinds/customers";
import { useFetchPopUpDataQuery } from "@external/customers";

import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/inputs/internal/SingleInputBox";
import DoubleInputBox from "@components/inputs/internal/DoubleInputBox";
import LadderSelectInput from "@components/inputs/LadderSelectInput";
import SelectEditableInput from "@components/inputs/SelectEditableInput";
import CustomerModalLayout from "./CustomerModalLayout";
import useCustomerListStore from "@states/customerListStore";

/**
 * Show individual unit data by ID and user can edit the data as well
 */
const ShowUnitInModal = ({ id }: { id: number }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { unit, setUnitField } = useCustomerListStore();
    const { companies, units } = useFetchPopUpDataQuery().data || {};

    return (
        <CustomerModalLayout
            title="Unit Details"
            errorMessage=""
            isEdit={isEdit}
            onUpdate={() => {}}
            onEditToggle={() => setIsEdit(!isEdit)}
            isLoading={false}
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
            </>
        </CustomerModalLayout>
    );
};

export default ShowUnitInModal;
