import {
    useFetchClientQuery,
    useFetchPopUpDataQuery,
    useUpdateClientMutation,
} from "@states/customers/customerApi";
import useNotifyEffect from "@hooks/useNotifyEffect";
import Loading from "@components/Loading";
import ErrorText from "@components/typographys/ErrorText";
import StringInput from "@components/inputs/fields/StringInput";
import DoubleInputBox from "@components/inputs/wrappers/DoubleInputBox";
import {
    selectClient,
    selectPopUpData,
} from "@states/customers/customerSelector";
import SingleInputBox from "@components/inputs/wrappers/SingleInputBox";
import { useAppDispatch } from "@app/hooks";
import {
    setClientDataField,
    setClientField,
} from "@states/customers/customerSlice";
import LadderSelectInput from "@components/inputs/fields/LadderSelectInput";
import SelectInput from "@components/inputs/fields/SelectInput";
import { useEffect } from "react";

const ShowClientInModal = ({ id }: { id: number }) => {
    const { error, isLoading } = useFetchClientQuery(id);
    const { error: errorY } = useFetchPopUpDataQuery({});

    useNotifyEffect(error, "In fetching client data");
    useNotifyEffect(errorY, "In fetching pop up data");

    let errorX: any = error;

    const { data, isEdit } = selectClient();
    const { units } = selectPopUpData();

    const dispatch = useAppDispatch();

    const setValue = (key: string, value: any) => {
        dispatch(setClientDataField({ key, value }));
    };

    const [updateClient, { error: errorZ, isSuccess }] =
        useUpdateClientMutation({});

    useNotifyEffect(
        errorZ,
        "In updating client",
        isSuccess,
        "Client update successful"
    );

    const setIsEdit = (value: boolean) => {
        dispatch(setClientField({ key: "isEdit", value }));
    };

    useEffect(() => {
        if (isSuccess) {
            setIsEdit(false);
        }
    }, [isSuccess]);

    return (
        <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-3xl font-bold">Client Details</h2>
                <div className="flex gap-3">
                    {isEdit && (
                        <button
                            className={`btn-success btn`}
                            onClick={() => updateClient({ client: data, id })}
                        >
                            Update
                        </button>
                    )}
                    <button
                        className={`btn ${
                            isEdit ? "btn-error" : "btn-success"
                        }`}
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        {isEdit ? "Close Edit" : "Edit"}
                    </button>
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : errorX ? (
                <ErrorText>{errorX.data && errorX.data.message}</ErrorText>
            ) : (
                <div className="flex flex-col gap-3">
                    <DoubleInputBox
                        label1="Name of Client"
                        element1={
                            <StringInput
                                value={data["name"]}
                                disabled={!isEdit}
                                setValue={value => setValue("name", value)}
                            />
                        }
                        label2="Unit"
                        element2={
                            <LadderSelectInput
                                value={data["unit_id"]}
                                options={units?.map((unit: any) => ({
                                    value: unit.id,
                                    name: unit.name,
                                }))}
                                setValue={value => setValue("unit_id", value)}
                                disabled={!isEdit}
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Client ID"
                        element1={
                            <StringInput
                                value={data["client_id"]}
                                disabled={!isEdit}
                                setValue={value => setValue("client_id", value)}
                            />
                        }
                        label2="Passport no"
                        element2={
                            <StringInput
                                value={data["passport_no"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("passport_no", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Passport issue date"
                        element1={
                            <StringInput
                                value={data["passport_issue_date"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("passport_issue_date", value)
                                }
                            />
                        }
                        label2="Passport valid date"
                        element2={
                            <StringInput
                                value={data["passport_valid_date"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("passport_valid_date", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Gender"
                        element1={
                            <StringInput
                                value={data["gender"]}
                                disabled={!isEdit}
                                setValue={value => setValue("gender", value)}
                            />
                        }
                        label2="Position hold"
                        element2={
                            <StringInput
                                value={data["position_hold"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("position_hold", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Mobile"
                        element1={
                            <StringInput
                                value={data["mobile"]}
                                disabled={!isEdit}
                                setValue={value => setValue("mobile", value)}
                            />
                        }
                        label2="Email"
                        element2={
                            <StringInput
                                value={data["email"]}
                                disabled={!isEdit}
                                setValue={value => setValue("email", value)}
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Date of birth"
                        element1={
                            <StringInput
                                value={data["date_of_birth"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("date_of_birth", value)
                                }
                            />
                        }
                        label2="Nationality"
                        element2={
                            <StringInput
                                value={data["nationality"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("nationality", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Father's name"
                        element1={
                            <StringInput
                                value={data["father_name"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("father_name", value)
                                }
                            />
                        }
                        label2="Mother's name"
                        element2={
                            <StringInput
                                value={data["mother_name"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("mother_name", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="TIN No"
                        element1={
                            <StringInput
                                value={data["tin_no"]}
                                disabled={!isEdit}
                                setValue={value => setValue("tin_no", value)}
                            />
                        }
                        label2="Date of joining"
                        element2={
                            <StringInput
                                value={data["date_of_joining"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("date_of_joining", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Current WP validity date"
                        element1={
                            <StringInput
                                value={data["current_wp_validity_date"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("current_wp_validity_date", value)
                                }
                            />
                        }
                        label2="Visa expire date"
                        element2={
                            <StringInput
                                value={data["visa_expire_date"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("visa_expire_date", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Max entry limit"
                        element1={
                            <StringInput
                                value={data["max_entry_limit"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("max_entry_limit", value)
                                }
                            />
                        }
                        label2="Entry terms"
                        element2={
                            <StringInput
                                value={data["entry_terms"]}
                                disabled={!isEdit}
                                setValue={value =>
                                    setValue("entry_terms", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Address"
                        element1={
                            <SelectInput
                                value={data["address"]}
                                disabled={!isEdit}
                                options={units?.map((unit: any) => ({
                                    name: unit.address,
                                    value: unit.address,
                                }))}
                                setValue={value => setValue("address", value)}
                            />
                        }
                        label2="Bill to"
                        element2={
                            <StringInput
                                value={data["bill_to"]}
                                disabled={!isEdit}
                                setValue={value => setValue("bill_to", value)}
                            />
                        }
                    />
                    <SingleInputBox
                        label="Notes"
                        element={
                            <StringInput
                                value={data["notes"]}
                                disabled={!isEdit}
                                setValue={value => setValue("notes", value)}
                            />
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default ShowClientInModal;
