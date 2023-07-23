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
import Loading from "@components/Loading";

const S1GroupOfCompany = () => {
    const dispatch = useAppDispatch();
    const { save, loading, errors } = useCreateGroupOfCompany();
    const groupOfCompanySetup = selectGroupOfCompanySetup();

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
        const buttonButton = bottomButtons.find(b => b.type === type);
        if (!buttonButton || !buttonButton.handler) return;
        buttonButton.handler();
    };

    return (
        <CustomerSetupStepLayout
            title="Group of Company Setup"
            buttons={bottomButtons.map(b => b.type)}
            onButtonClick={handleButtonClick}
            loading={loading}
        >
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SingleInputBox
                            required={true}
                            label="Name of the Group"
                            element={
                                <StringInput
                                    value={groupOfCompanySetup.name}
                                    setValue={value =>
                                        handleDispatch("name", value)
                                    }
                                    errorMessage={errors["name"]}
                                />
                            }
                        />
                        <SingleInputBox
                            required={true}
                            label="Address"
                            element={
                                <StringInput
                                    value={groupOfCompanySetup.address}
                                    setValue={value =>
                                        handleDispatch("address", value)
                                    }
                                    errorMessage={errors["address"]}
                                />
                            }
                        />
                        <DoubleInputBox
                            label1="Telephone"
                            element1={
                                <StringInput
                                    value={groupOfCompanySetup.telephone}
                                    setValue={value =>
                                        handleDispatch("telephone", value)
                                    }
                                    errorMessage={errors["telephone"]}
                                />
                            }
                            label2="Mobile"
                            required2={true}
                            element2={
                                <StringInput
                                    value={groupOfCompanySetup.mobile}
                                    setValue={value =>
                                        handleDispatch("mobile", value)
                                    }
                                    errorMessage={errors["mobile"]}
                                />
                            }
                        />
                        <DoubleInputBox
                            label1="Email"
                            required1={true}
                            element1={
                                <StringInput
                                    value={groupOfCompanySetup.email}
                                    setValue={value =>
                                        handleDispatch("email", value)
                                    }
                                    errorMessage={errors["email"]}
                                />
                            }
                            label2="Website"
                            element2={
                                <StringInput
                                    value={groupOfCompanySetup.website}
                                    setValue={value =>
                                        handleDispatch("website", value)
                                    }
                                    errorMessage={errors["website"]}
                                />
                            }
                        />
                        <SingleInputBox
                            label="Trade License no"
                            required={true}
                            element={
                                <StringInput
                                    value={groupOfCompanySetup.trade_license_no}
                                    setValue={value =>
                                        handleDispatch(
                                            "trade_license_no",
                                            value
                                        )
                                    }
                                    errorMessage={errors["trade_license_no"]}
                                />
                            }
                        />
                        <DoubleInputBox
                            label1="TIN"
                            element1={
                                <StringInput
                                    value={groupOfCompanySetup.tin}
                                    setValue={value =>
                                        handleDispatch("tin", value)
                                    }
                                    errorMessage={errors["tin"]}
                                />
                            }
                            label2="BIN"
                            element2={
                                <StringInput
                                    value={groupOfCompanySetup.bin}
                                    setValue={value =>
                                        handleDispatch("bin", value)
                                    }
                                    errorMessage={errors["bin"]}
                                />
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <DoubleInputBox
                            label1="Incorporation No"
                            element1={
                                <StringInput
                                    value={groupOfCompanySetup.incorporation_no}
                                    setValue={value =>
                                        handleDispatch(
                                            "incorporation_no",
                                            value
                                        )
                                    }
                                    errorMessage={errors["incorporation_no"]}
                                />
                            }
                            label2="Membership No"
                            element2={
                                <StringInput
                                    value={groupOfCompanySetup.membership_no}
                                    setValue={value =>
                                        handleDispatch("membership_no", value)
                                    }
                                    errorMessage={errors["membership_no"]}
                                />
                            }
                        />
                        <SingleInputBox
                            label="Member of the association"
                            element={
                                <StringInput
                                    value={
                                        groupOfCompanySetup.member_of_the_association
                                    }
                                    setValue={value =>
                                        handleDispatch(
                                            "member_of_the_association",
                                            value
                                        )
                                    }
                                    errorMessage={
                                        errors["member_of_the_association"]
                                    }
                                />
                            }
                        />
                        <DoubleInputBox
                            label1="Business Field"
                            element1={
                                <StringInput
                                    value={groupOfCompanySetup.business_field}
                                    setValue={value =>
                                        handleDispatch("business_field", value)
                                    }
                                    errorMessage={errors["business_field"]}
                                />
                            }
                            label2="Legal form"
                            element2={
                                <SelectInput
                                    value={groupOfCompanySetup.legal_form}
                                    setValue={value =>
                                        handleDispatch("legal_form", value)
                                    }
                                    options={[
                                        { name: "Foo", value: "foo" },
                                        { name: "Bar", value: "bar" },
                                    ]}
                                    placeholder="Select Again"
                                    errorMessage={errors["legal_form"]}
                                />
                            }
                        />
                        <SingleInputBox
                            label="Special notes"
                            element={
                                <TextInput
                                    value={groupOfCompanySetup.special_notes}
                                    setValue={value =>
                                        handleDispatch("special_notes", value)
                                    }
                                    errorMessage={errors["special_notes"]}
                                />
                            }
                        />
                    </div>
                </div>
            )}
        </CustomerSetupStepLayout>
    );
};

export default S1GroupOfCompany;
