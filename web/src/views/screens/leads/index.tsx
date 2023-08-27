import { useAppDispatch, useAppSelector } from "@app/hooks";
import TitleCard from "@components/cards/TitleCard";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import moment from "moment";
import { useEffect } from "react";
import { openModal } from "@states/app/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import { MODAL_BODY_TYPES } from "@config/general";
import { notify } from "@helpers/unkown";

const TopSideButtons = () => {
    const dispatch = useAppDispatch();

    const openAddNewLeadModal = () => {
        dispatch(
            openModal({
                title: "Add New Lead",
                bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
            })
        );
    };

    return (
        <div className="float-right inline-block">
            <button className="btn-primary btn-sm btn px-6 normal-case" onClick={() => openAddNewLeadModal()}>
                Add New
            </button>
        </div>
    );
};

function Leads() {
    const { leads } = useAppSelector(state => state.lead);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLeadsContent());
    }, []);

    const getDummyStatus = (index: number) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>;
        else if (index % 5 === 1) return <div className="badge-primary badge">In Progress</div>;
        else if (index % 5 === 2) return <div className="badge-secondary badge">Sold</div>;
        else if (index % 5 === 3) return <div className="badge-accent badge">Need Followup</div>;
        else return <div className="badge-ghost badge">Open</div>;
    };

    const deleteCurrentLead = (index: number) => {
        dispatch(deleteLead({ index }));
        notify("success", "Lead Deleted!");
    };

    return (
        <>
            <TitleCard title="Current Leads" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Leads List in table format loaded from slice after api call */}
                <div className="w-full overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads &&
                                leads.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img src={l.avatar} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.first_name}</div>
                                                        <div className="text-sm opacity-50">{l.last_name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.email}</td>
                                            <td>
                                                {moment(new Date())
                                                    .add(-5 * (k + 2), "days")
                                                    .format("DD MMM YY")}
                                            </td>
                                            <td>{getDummyStatus(k)}</td>
                                            <td>{l.last_name}</td>
                                            <td>
                                                <button
                                                    className="btn-ghost btn-square btn"
                                                    onClick={() => deleteCurrentLead(k)}
                                                >
                                                    <TrashIcon className="w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default Leads;
