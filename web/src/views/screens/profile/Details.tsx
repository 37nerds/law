import { convertUsernameLogic } from "@helpers/unkown";
import { useUpdateUserMutation } from "@external/auth";

import StringInput from "@components/inputs/StringInput";
import useAuthStore from "@states/authStore";

const Details = () => {
    const { loggedUser, setLoggedUserField } = useAuthStore();

    const updateUserMutation = useUpdateUserMutation();

    return (
        <>
            <div>Details</div>
            <StringInput
                label="Name"
                value={loggedUser?.name || ""}
                setValue={value => setLoggedUserField("name", value)}
            />
            <StringInput
                label="Email"
                value={loggedUser?.email || ""}
                setValue={value => setLoggedUserField("email", value)}
            />
            <StringInput
                label="Username"
                value={loggedUser?.username || ""}
                setValue={value => setLoggedUserField("username", convertUsernameLogic(value))}
            />
            <div className="">
                <button
                    className={`btn ${updateUserMutation.isLoading ? "loading" : ""}`}
                    onClick={() =>
                        updateUserMutation.mutate({
                            name: loggedUser?.name || "",
                            email: loggedUser?.email || "",
                            username: loggedUser?.username || "",
                        })
                    }
                >
                    Update
                </button>
            </div>
        </>
    );
};

export default Details;
