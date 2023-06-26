import { useAppSelector } from "@app/hooks";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import ThemeDropDown from "./ThemeDropDown";

const Header = () => {
    const { pageTitle } = useAppSelector(state => state.header);

    function logoutUser() {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <div className="navbar  z-10 flex justify-between  bg-base-100 shadow-md ">
            {/* Menu toggle for mobile view or small screen */}
            <div className="">
                <label
                    htmlFor="left-sidebar-drawer"
                    className="btn-primary drawer-button btn lg:hidden"
                >
                    <Bars3Icon className="inline-block h-5 w-5" />
                </label>
                <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1>
            </div>

            <div className="order-last">
                <ThemeDropDown />
                <Notification />

                {/* Profile icon, opening menu on click */}
                <div className="dropdown-end dropdown ml-4">
                    <label
                        tabIndex={0}
                        className="btn-ghost btn-circle avatar btn"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src="https://placeimg.com/80/80/people"
                                alt="profile"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                    >
                        <li className="justify-between">
                            <Link to={"/app/settings-profile"}>
                                Profile Settings
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li className="">
                            <Link to={"/app/settings-billing"}>
                                Bill History
                            </Link>
                        </li>
                        <div className="divider mb-0 mt-0"></div>
                        <li>
                            <a onClick={logoutUser}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
