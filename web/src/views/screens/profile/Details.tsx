import { convertUsernameLogic } from "@helpers/unkown";
import { useUpdateUserMutation } from "@external/auth";

import StringInput from "@components/inputs/StringInput";
import useAuthStore from "@states/authStore";
import SubTitle from "@components/pure/SubTitle";
import Form from "@components/pure/Form";

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
        <Form className="flex flex-col gap-2" onSubmit={handleSubmit} loading={updateUserMutation.isLoading}>
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
        </Form>
    );
};

export default Details;
