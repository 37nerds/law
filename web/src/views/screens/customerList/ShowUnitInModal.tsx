import {useEffect, useState} from "react";

import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/inputs/internal/wrappers/SingleInputBox";
import DoubleInputBox from "@components/inputs/internal/wrappers/DoubleInputBox";
import LadderSelectInput from "@components/inputs/LadderSelectInput";
import SelectEditableInput from "@components/inputs/SelectEditableInput";
import CustomerModalLayout from "./CustomerModalLayout";

import useNotifyEffect from "@hooks/useNotifyEffect";

import {useAppDispatch} from "@app/hooks";
import {useFetchUnitQuery, useUpdateUnitMutation} from "@states/customers/customerApi";
import {selectUnit} from "@states/customers/customerSelector";
import {setUnitDataField} from "@states/customers/customerSlice";
import {TPopUpUnit} from "@kinds/customers";
import {useFetchPopUpDataQuery} from "@external/customers";

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
    const { companies, units } = useFetchPopUpDataQuery().data || {};

    const setValue = (key: string, value: any) => {
        dispatch(setUnitDataField({ key, value }));
    };

    const [updateUnit, { error: errorZ, isSuccess }] = useUpdateUnitMutation();
    useNotifyEffect(errorZ, "In updating unit", isSuccess, "Unit updated successful");

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
                            options={
                                companies?.map((company: any) => ({
                                    value: company.id,
                                    name: company.name,
                                })) || []
                            }
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