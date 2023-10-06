import useSetPageTitle from "@hooks/useSetPageTitle";

import PageCard from "@components/cards/PageCard";
import DoubleInputBox from "@components/inputs/DoubleInputBox";
import NumberInput from "@components/inputs/NumberInput";
import SingleInputBox from "@components/inputs/SingleInputBox";
import StringInput from "@components/inputs/StringInput";
import TextInput from "@components/inputs/TextInput";
import QueryWrapper from "@components/wrappers/QueryWrapper";
import { THost, useHostQuery, useUpdateHostMutation } from "@queries/settings/host";
import { useHostStore } from "@states/host_store";
import { useEffect, useState } from "react";

const Host = () => {
    useSetPageTitle("Global Setup");

    const hostQuery = useHostQuery();
    const hostMutation = useUpdateHostMutation();
    const { setHost, host, setHostField, hostError } = useHostStore();

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (hostQuery.isSuccess) {
            setHost(hostQuery.data);
        }
    }, [hostQuery.isSuccess]);

    return (
        <PageCard className="mx-auto max-w-5xl lg:mt-16">
            <QueryWrapper<THost> query={hostQuery}>
                <div className="flex flex-col gap-4 p-5">
                    <div className="flex justify-end">
                        <button
                            className={`btn ${isEdit ? "btn-error" : "btn-success"}`}
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {isEdit ? "Close Edit" : "Edit"}
                        </button>
                    </div>

                    <SingleInputBox
                        label={"Enterprise Name"}
                        element={
                            <StringInput
                                value={host.name}
                                setValue={value => setHostField("name", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage={hostError["name"]}
                    />
                    <SingleInputBox
                        label={"Address"}
                        element={
                            <StringInput
                                value={host.address}
                                setValue={value => setHostField("address", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage={hostError["address"]}
                    />
                    <DoubleInputBox
                        label1={"Telephone"}
                        element1={
                            <StringInput
                                value={host.telephone}
                                setValue={value => setHostField("telephone", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage1={hostError["telephone"]}
                        label2={"Mobile"}
                        element2={
                            <StringInput
                                value={host.mobile}
                                setValue={value => setHostField("mobile", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage2={hostError["mobile"]}
                    />
                    <DoubleInputBox
                        label1={"E-mail"}
                        element1={
                            <StringInput
                                value={host.email}
                                setValue={value => setHostField("email", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage1={hostError["email"]}
                        label2={"Website"}
                        element2={
                            <StringInput
                                value={host.website}
                                setValue={value => setHostField("website", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage2={hostError["website"]}
                    />
                    <SingleInputBox
                        label={"Trade License no"}
                        element={
                            <StringInput
                                value={host.trade_licence_no}
                                setValue={value => setHostField("trade_licence_no", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage={hostError["trade_licence_no"]}
                    />
                    <DoubleInputBox
                        label1={"TIN"}
                        element1={
                            <StringInput
                                value={host.tin}
                                setValue={value => setHostField("tin", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage1={hostError["tin"]}
                        label2={"BIN"}
                        element2={
                            <StringInput
                                value={host.bin}
                                setValue={value => setHostField("bin", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage2={hostError["bin"]}
                    />
                    <DoubleInputBox
                        label1={"Professional License no"}
                        element1={
                            <StringInput
                                value={host.professional_licence_no}
                                setValue={value => setHostField("professional_licence_no", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage1={hostError["professional_licence_no"]}
                        label2={"Membership no"}
                        element2={
                            <StringInput
                                value={host.membership_no}
                                setValue={value => setHostField("membership_no", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage2={hostError["membership_no"]}
                    />
                    <DoubleInputBox
                        label1={"Financial year start"}
                        element1={
                            <StringInput
                                value={host.financial_year_start}
                                setValue={value => setHostField("financial_year_start", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage1={hostError["financial_year_start"]}
                        label2={"Currency Symbol"}
                        element2={
                            <StringInput
                                value={host.currency_symbol}
                                setValue={value => setHostField("currency_symbol", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage2={hostError["currency_symbol"]}
                    />
                    <DoubleInputBox
                        label1={"TDS rate"}
                        element1={
                            <NumberInput
                                value={host.tds_rate}
                                setValue={value => setHostField("tds_rate", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage1={hostError["tds_rate"]}
                        label2={"VDS rate"}
                        element2={
                            <NumberInput
                                value={host.vds_rate}
                                setValue={value => setHostField("vds_rate", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage2={hostError["vds_rate"]}
                    />
                    <SingleInputBox
                        label={"Payment terms"}
                        element={
                            <TextInput
                                value={host.payment_terms}
                                setValue={value => setHostField("payment_terms", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage={hostError["payment_terms"]}
                    />
                    <SingleInputBox
                        label={"Declaration"}
                        element={
                            <TextInput
                                value={host.declaration}
                                setValue={value => setHostField("declaration", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage={hostError["declaration"]}
                    />
                    <SingleInputBox
                        label={"Salutation"}
                        element={
                            <StringInput
                                value={host.salutation}
                                setValue={value => setHostField("salutation", value)}
                                disabled={!isEdit}
                            />
                        }
                        errorMessage={hostError["salutation"]}
                    />

                    <div className="flex justify-end">
                        {isEdit && (
                            <button
                                className={`btn btn-success ${hostMutation.isLoading ? "loading" : ""}`}
                                onClick={() => {
                                    hostMutation.mutate(host);
                                }}
                            >
                                Update
                            </button>
                        )}
                    </div>
                </div>
            </QueryWrapper>
        </PageCard>
    );
};

export default Host;
