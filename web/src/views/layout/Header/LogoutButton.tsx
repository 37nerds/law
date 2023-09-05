import { useLogoutHit } from "../../../external/auth";

const LogoutButton = () => {
    const { hitLogout } = useLogoutHit();

    const logout = async () => {
        await hitLogout();
        window.location.href = "/login";
    };

    return (
        <li>
            <a onClick={logout}>Logout</a>
        </li>
    );
};

export default LogoutButton;
