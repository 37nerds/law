import { getProfileUrlFromAvatarKey } from "@helpers/location";

import UserIcon from "@heroicons/react/24/outline/UserIcon";

const UserAvatar = ({ avatarUri }: { avatarUri: string | null | undefined }) => {
    return (
        <div className="avatar">
            <div className="w-8 rounded-full ring ring-success ring-offset-2 ring-offset-base-100">
                {avatarUri ? (
                    <img src={getProfileUrlFromAvatarKey(avatarUri)} alt="" />
                ) : (
                    <UserIcon className="bg-base-200 p-1" />
                )}
            </div>
        </div>
    );
};

export default UserAvatar;
