import moment from "moment";
import { useState } from "react";
import TitleCard from "@components/cards/TitleCard";
import { notify } from "@helpers/unknown";

const TopSideButtons = () => {
    const addNewTeamMember = () => {
        notify("success", "Add New Member clicked");
    };

    return (
        <div className="float-right inline-block">
            <button className="btn-primary btn-sm btn px-6 normal-case" onClick={() => addNewTeamMember()}>
                Invite New
            </button>
        </div>
    );
};

const TEAM_MEMBERS = [
    {
        name: "Alex",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
        email: "alex@dashwind.com",
        role: "Owner",
        joinedOn: moment(new Date()).add(-5, "days").format("DD MMM YYYY"),
        lastActive: "5 hr ago",
    },
    {
        name: "Ereena",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
        email: "ereena@dashwind.com",
        role: "Admin",
        joinedOn: moment(new Date())
            .add(-5 * 2, "days")
            .format("DD MMM YYYY"),
        lastActive: "15 min ago",
    },
    {
        name: "John",
        avatar: "https://reqres.in/img/faces/3-image.jpg",
        email: "jhon@dashwind.com",
        role: "Admin",
        joinedOn: moment(new Date())
            .add(-5 * 3, "days")
            .format("DD MMM YYYY"),
        lastActive: "20 hr ago",
    },
    {
        name: "Matrix",
        avatar: "https://reqres.in/img/faces/4-image.jpg",
        email: "matrix@dashwind.com",
        role: "Manager",
        joinedOn: moment(new Date())
            .add(-5 * 4, "days")
            .format("DD MMM YYYY"),
        lastActive: "1 hr ago",
    },
    {
        name: "Virat",
        avatar: "https://reqres.in/img/faces/5-image.jpg",
        email: "virat@dashwind.com",
        role: "Support",
        joinedOn: moment(new Date())
            .add(-5 * 5, "days")
            .format("DD MMM YYYY"),
        lastActive: "40 min ago",
    },
    {
        name: "Miya",
        avatar: "https://reqres.in/img/faces/6-image.jpg",
        email: "miya@dashwind.com",
        role: "Support",
        joinedOn: moment(new Date())
            .add(-5 * 7, "days")
            .format("DD MMM YYYY"),
        lastActive: "5 hr ago",
    },
];

function Team() {
    const [members] = useState(TEAM_MEMBERS);

    const getRoleComponent = (role: string) => {
        if (role === "Admin") return <div className="badge badge-secondary">{role}</div>;
        if (role === "Manager") return <div className="badge">{role}</div>;
        if (role === "Owner") return <div className="badge badge-primary">{role}</div>;
        if (role === "Support") return <div className="badge badge-accent">{role}</div>;
        else return <div className="badge badge-ghost">{role}</div>;
    };

    return (
        <>
            <TitleCard title="Active Members" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {/* Team Member list in table format loaded constant */}
                <div className="w-full overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Joined On</th>
                                <th>Role</th>
                                <th>Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle h-12 w-12">
                                                        <img src={l.avatar} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{l.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{l.email}</td>
                                        <td>{l.joinedOn}</td>
                                        <td>{getRoleComponent(l.role)}</td>
                                        <td>{l.lastActive}</td>
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

export default Team;
