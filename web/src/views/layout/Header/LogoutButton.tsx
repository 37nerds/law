import { useEffect } from "react";
import { useLogoutMutation } from "@fetches/auth/auth";

const LogoutButton = () => {
    const logoutMutation = useLogoutMutation();

    useEffect(() => {
        if (logoutMutation.isSuccess) {
            window.location.href = "/login";
        }
    }, [logoutMutation.isSuccess]);

    return (
        <li>
            <a onClick={() => logoutMutation.mutate()}>Logout</a>
        </li>
    );
};

export default LogoutButton;
