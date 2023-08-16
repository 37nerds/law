import { useEffect, useState } from "react";

import StringInput from "@components/inputs/fields/StringInput";
import SingleInputBox from "@components/inputs/wrappers/SingleInputBox";
import DoubleInputBox from "@components/inputs/wrappers/DoubleInputBox";
import LadderSelectInput from "@components/inputs/fields/LadderSelectInput";
import SelectEditableInput from "@components/inputs/fields/SelectEditableInput";
import CustomerModalLayout from "./CustomerModalLayout";

import useNotifyEffect from "@hooks/useNotifyEffect";
import useFetchPopUpDataMid from "@hooks/useFetchPopUpDataMid";

import { useAppDispatch } from "@app/hooks";

import {
    useFetchUnitQuery,
    useUpdateUnitMutation,
} from "@states/customers/customerApi";
import { selectUnit } from "@states/customers/customerSelector";
import { setUnitDataField } from "@states/customers/customerSlice";
import { TPopUpCompany, TPopUpUnit } from "@kinds/customers";

/**
 * Show individual unit data by ID and user can edit the data as well
 */
const ShowUnitInModal = ({ id }: { id: number }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { error, isLoading } = useFetchUnitQuery(id);
    useNotifyEffect(error, "In fetching unit data");
    let errorX: any = error;

    const { data } = selectUnit();
    const { companies, units } = useFetchPopUpDataMid();

    const setValue = (key: string, value: any) => {
        dispatch(setUnitDataField({ key, value }));
    };

    const [updateUnit, { error: errorZ, isSuccess }] = useUpdateUnitMutation();
    useNotifyEffect(
        errorZ,
        "In updating unit",
        isSuccess,
        "Unit updated successful"
    );

    useEffect(() => {
        if (isSuccess) {
            setIsEdit(false);
        }
    }, [isSuccess]);

    return (
        <CustomerModalLayout
            title="Unit Details"
            errorMessage={errorX && errorX.data && errorX.data.message}
            isEdit={isEdit}
            onUpdate={() => updateUnit({ client: data, id })}
            onEditToggle={() => setIsEdit(!isEdit)}
            isLoading={isLoading}
        >
            <>
                <DoubleInputBox
                    label1="Unit Name"
                    element1={
                        <StringInput
                            value={data["name"]}
                            disabled={!isEdit}
                            setValue={value => setValue("name", value)}
                        />
                    }
                    label2="Company"
                    element2={
                        <LadderSelectInput
                            value={data["company_id"]}
                            options={companies?.map(
                                (company: TPopUpCompany) => ({
                                    value: company.id,
                                    name: company.name,
                                })
                            )}
                            setValue={value => setValue("company_id", value)}
                            disabled={!isEdit}
                        />
                    }
                />
                <SingleInputBox
                    label="Address"
                    element={
                        <SelectEditableInput
                            value={data["address"]}
                            disabled={!isEdit}
                            setValue={value => setValue("address", value)}
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
