import InputText2 from "@components/inputs/InputText2";
import SingleInputBox from "@components/wrappers/SingleInputBox";
import { useState } from "react";

const S1GroupOfCompany = () => {
    const [nameOfTheGroup, setNameOfTheGroup] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl">Group of Company Setup</h2>
            <div className="flex flex-col gap-2">
                <SingleInputBox
                    label="Name of the Group"
                    element={
                        <InputText2
                            value={nameOfTheGroup}
                            setValue={value => setNameOfTheGroup(value)}
                        />
                    }
                />
                <SingleInputBox
                    label="Address"
                    element={
                        <InputText2
                            value={address}
                            setValue={value => setAddress(value)}
                        />
                    }
                />
                <div className="flex w-full items-center">
                    <div className="w-1/5">Telephone</div>
                    <div className="flex w-4/5 items-center">
                        <div className="w-[42.85%]">
                            <InputText2
                                value={address}
                                setValue={value => setAddress(value)}
                            />
                        </div>
                        <div className="w-[14.29%] pr-">Mobile</div>
                        <div className="w-[42.85%]">
                            <InputText2
                                value={address}
                                setValue={value => setAddress(value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default S1GroupOfCompany;
