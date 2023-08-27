import { Link } from "react-router-dom";
import { selectLoggedUserAvatar } from "@states/authStore";
import { profile_dropdown_links } from "@config/header";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import LogoutButton from "@layout/Header/LogoutButton";

const ProfileDropDown = () => {
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
                {profile_dropdown_links.map(({ link, title }, index) => (
                    <li key={index}>
                        <Link to={link}>{title}</Link>
                    </li>
                ))}

                <div className="divider mb-0 mt-0"></div>
                <LogoutButton />
            </ul>
        </div>
    );
};

export default ProfileDropDown;
