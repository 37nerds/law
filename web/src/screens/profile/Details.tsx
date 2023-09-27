import { useUpdateUserMutation } from "@fetches/auth/auth";
import { convertUsernameLogic } from "@helpers/strings";

import StringInput from "@components/inputs/StringInput";
import useAuthStore from "@states/auth_store";
import SubTitle from "@components/pure/SubTitle";
import Form from "@components/pure/Form";
import { convertToLocalTime } from "@helpers/time";

const Details = () => {
    const { loggedUser, setLoggedUserField } = useAuthStore();

    const updateUserMutation = useUpdateUserMutation();

    const handleSubmit = () => {
        updateUserMutation.mutate({
            name: loggedUser?.name || "",
            email: loggedUser?.email || "",
            username: loggedUser?.username || "",
        });
    };

    return (
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit} loading={updateUserMutation.isLoading}>
            <SubTitle divider={true}>Details</SubTitle>
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
            <StringInput disabled={true} label="Role" value={loggedUser?.role?.name || ""} />
            <StringInput disabled={true} label="Joined On" value={convertToLocalTime(loggedUser?.created_at || "")} />
            <StringInput
                label="Phone"
                value={loggedUser?.phone || ""}
                setValue={value => setLoggedUserField("phone", value)}
            />
            <StringInput
                label="Address"
                value={loggedUser?.phone || ""}
                setValue={value => setLoggedUserField("address", value)}
            />
        </Form>
    );
};

export default Details;
