import { selectLoggedUser } from "@states/authStore";
import type { TLoggedUser } from "@kinds/users";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

const ProfilePicture = () => {
    const loggedUser: TLoggedUser | null = selectLoggedUser();

    const avatar: string | null = loggedUser?.avatar || null;
    const name: string = loggedUser?.name || "";

    return (
        <div className="flex flex-col gap-3">
            <div>Profile picture</div>
            <div className="relative">
                <div className="avatar">
                    <div className="w-52 rounded-full">
                        {avatar ? <img src={avatar} alt={name} /> : <UserIcon className="w-52 bg-base-200 p-5" />}
                    </div>
                </div>
                <div className="absolute bottom-5">
                    <div className="dropdown dropdown-bottom">
                        <label
                            tabIndex={0}
                            className="flex w-[70px] flex-row items-center justify-center gap-1 rounded border-2 border-base-300 bg-base-200 px-2 py-1"
                        >
                            <PencilIcon className="h-5 w-5" />
                            <button>Edit</button>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu rounded-box mt-3 w-44 bg-base-300 p-2 shadow "
                        >
                            <li>
                                <a>Upload a photo...</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicture;
