import { Link } from "react-router-dom";
import { selectLoggedUserAvatar } from "@states/auth_store";
import { profile_dropdown_links } from "@config/base";
import { getProfileUrlFromAvatarKey } from "@helpers/location";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import LogoutButton from "./LogoutButton";

const ProfileDropDown = () => {
    const avatar = selectLoggedUserAvatar();

    return (
        <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                    {avatar ? (
                        <img src={getProfileUrlFromAvatarKey(avatar)} alt="profile" />
                    ) : (
                        <UserIcon className="bg-base-200 p-1" />
                    )}
                </div>
            </label>
            <ul
                tabIndex={0}
                className="menu-compact menu dropdown-content rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
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
