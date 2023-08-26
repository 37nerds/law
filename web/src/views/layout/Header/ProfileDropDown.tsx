import { Link } from "react-router-dom";
import UserIcon from "@heroicons/react/24/outline/UserIcon";

import { hitLogout } from "@external/auth";
import { selectLoggedUserAvatar } from "@states/authStore";

const ProfileDropDown = () => {
    const logout = async () => {
        await hitLogout();
        window.location.href = "/login";
    };

    const avatar = selectLoggedUserAvatar();

    return (
        <div className="dropdown-end dropdown ml-4">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                    {avatar ? <img src={avatar} alt="profile" /> : <UserIcon className="bg-base-200 p-1" />}
                </div>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
                <li className="justify-between">
                    <Link to={"/app/settings/profile"}>
                        Profile Settings
                        <span className="badge">New</span>
                    </Link>
                </li>
                <li className="">
                    <Link to={"/app/settings-billing"}>Bill History</Link>
                </li>
                <div className="divider mb-0 mt-0"></div>
                <li>
                    <a onClick={logout}>Logout</a>
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropDown;
