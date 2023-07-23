import StringInput from "@components/inputs/StringInput";
import SelectInput from "@components/inputs/SelectInput";
import TextInput from "@components/inputs/TextInput";
import SingleInputBox from "@components/wrappers/SingleInputBox";
import DoubleInputBox from "@components/wrappers/DoubleInputBox";
import CustomerSetupStepLayout from "@components/layouts/CustomerSetupStepLayout";
import { useAppDispatch } from "@app/hooks";
import { setGroupOfCompanySetupField } from "@states/customers/customerSlice";
import { selectGroupOfCompanySetup } from "@states/customers/customerSelector";
import { TBottomButton } from "@utils/types";
import useCreateGroupOfCompany from "@hooks/customers/useCreateGroupOfCompany";

const S1GroupOfCompany = () => {
    const dispatch = useAppDispatch();
    const { save, loading, error } = useCreateGroupOfCompany();

    const {
        name,
        address,
        bin,
        business_field,
        email,
        incorporation_no,
        legal_form,
        member_of_the_association,
        membership_no,
        mobile,
        tin,
        special_notes,
        telephone,
        trade_license_no,
        website,
    } = selectGroupOfCompanySetup();

    const handleDispatch = (field: string, value: string) => {
        dispatch(setGroupOfCompanySetupField({ field, value }));
    };

    const bottomButtons: TBottomButton[] = [
        { type: "Previous" },
        { type: "Save & New", handler: save },
        { type: "Save & Close" },
        { type: "Edit" },
        { type: "Export" },
        { type: "Inactive" },
    ];

    const handleButtonClick = (type: string) => {
        const buttonButton = bottomButtons.find(b => b.type == type);
        if (!buttonButton) return;
        if (!buttonButton?.handler) return;
        buttonButton?.handler();
    };

    return (
        <CustomerSetupStepLayout
            title="Group of Company Setup"
            buttons={bottomButtons.map(b => b.type)}
            onButtonClick={handleButtonClick}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <SingleInputBox
                        label="Name of the Group"
                        element={
                            <StringInput
                                value={name}
                                setValue={value =>
                                    handleDispatch("name", value)
                                }
                            />
                        }
                    />
                    <SingleInputBox
                        label="Address"
                        element={
                            <StringInput
                                value={address}
                                setValue={value =>
                                    handleDispatch("address", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Telephone"
                        element1={
                            <StringInput
                                value={telephone}
                                setValue={value =>
                                    handleDispatch("telephone", value)
                                }
                            />
                        }
                        label2="Mobile"
                        element2={
                            <StringInput
                                value={mobile}
                                setValue={value =>
                                    handleDispatch("mobile", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Email"
                        element1={
                            <StringInput
                                value={email}
                                setValue={value =>
                                    handleDispatch("email", value)
                                }
                            />
                        }
                        label2="Website"
                        element2={
                            <StringInput
                                value={website}
                                setValue={value =>
                                    handleDispatch("website", value)
                                }
                            />
                        }
                    />
                    <SingleInputBox
                        label="Trade License no"
                        element={
                            <StringInput
                                value={trade_license_no}
                                setValue={value =>
                                    handleDispatch("trade_license_no", value)
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="TIN"
                        element1={
                            <StringInput
                                value={tin}
                                setValue={value => handleDispatch("tin", value)}
                            />
                        }
                        label2="BIN"
                        element2={
                            <StringInput
                                value={bin}
                                setValue={value => handleDispatch("bin", value)}
                            />
                        }
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <DoubleInputBox
                        label1="Incorporation No"
                        element1={
                            <StringInput
                                value={incorporation_no}
                                setValue={value =>
                                    handleDispatch("incorporation_no", value)
                                }
                            />
                        }
                        label2="Membership No"
                        element2={
                            <StringInput
                                value={membership_no}
                                setValue={value =>
                                    handleDispatch("membership_no", value)
                                }
                            />
                        }
                    />
                    <SingleInputBox
                        label="Member of the association"
                        element={
                            <StringInput
                                value={member_of_the_association}
                                setValue={value =>
                                    handleDispatch(
                                        "member_of_the_association",
                                        value
                                    )
                                }
                            />
                        }
                    />
                    <DoubleInputBox
                        label1="Business Field"
                        element1={
                            <StringInput
                                value={business_field}
                                setValue={value =>
                                    handleDispatch("business_field", value)
                                }
                            />
                        }
                        label2="Legal form"
                        element2={
                            <SelectInput
                                value={legal_form}
                                setValue={value =>
                                    handleDispatch("legal_form", value)
                                }
                                options={[
                                    { name: "Foo", value: "foo" },
                                    { name: "Bar", value: "bar" },
                                ]}
                                placeholder="Select Again"
                            />
                        }
                    />
                    <SingleInputBox
                        label="Special notes"
                        element={
                            <TextInput
                                value={special_notes}
                                setValue={value =>
                                    handleDispatch("special_notes", value)
                                }
                            />
                        }
                    />
                </div>
            </div>
        </CustomerSetupStepLayout>
    );
};

export default S1GroupOfCompany;
