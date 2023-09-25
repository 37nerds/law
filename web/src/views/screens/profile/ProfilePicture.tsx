import type { TLoggedUser } from "@kinds/users";
import { selectLoggedUser } from "@states/authStore";
import { useState } from "react";
import { useUploadProfilePictureMutation } from "../../../external/auth";
import { getProfileUrlFromAvatarKey } from "@helpers/unknown";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import UploadButton from "@components/image/ImageUploadButton";
import ImageCropper from "@components/image/ImageCropper";
import SubTitle from "@components/pure/SubTitle";

const ProfilePicture = () => {
    const [imageSrc, setImageSrc] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const loggedUser: TLoggedUser | null = selectLoggedUser();

    const avatar: string | null = loggedUser?.user?.avatar || null;
    const name: string = loggedUser?.user?.name || "";

    const uploadProfileMutation = useUploadProfilePictureMutation();

    return (
        <div className="flex flex-col gap-3">
            <SubTitle>Profile picture</SubTitle>
            <ImageCropper
                dialogOpen={dialogOpen}
                imageSrc={imageSrc}
                setDialogOpen={setDialogOpen}
                onDone={image => {
                    uploadProfileMutation.mutate(image);
                }}
            />
            <div className="relative">
                <div className="avatar">
                    <div className="w-72 rounded-full">
                        {avatar ? (
                            <img src={getProfileUrlFromAvatarKey(avatar)} alt={name} />
                        ) : (
                            <UserIcon className="bg-base-200 p-8" />
                        )}
                    </div>
                </div>
                <div className="absolute bottom-5">
                    <div className="dropdown dropdown-bottom">
                        <label
                            tabIndex={0}
                            className={`flex w-[70px] cursor-pointer flex-col justify-between rounded border-2 border-base-300 bg-base-200 `}
                        >
                            <div className="flex flex-row items-center justify-center gap-1 px-2 py-1">
                                <PencilIcon className="h-5 w-5" />
                                <button>Edit</button>
                            </div>
                            {uploadProfileMutation.isLoading ? (
                                <progress className="progress progress-secondary"></progress>
                            ) : (
                                <></>
                            )}
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content rounded-box mt-3 w-44 bg-base-300 p-2 shadow "
                        >
                            <li>
                                <a>
                                    <UploadButton
                                        onChange={image => {
                                            setImageSrc(image);
                                            setDialogOpen(true);
                                        }}
                                    >
                                        Upload a photo...
                                    </UploadButton>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePicture;
