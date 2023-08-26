import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";

import NotificationButton from "./NotificationButton";
import ThemeDropDown from "./ThemeDropDown";
import ToastNotification from "./ToastNotification";
import ProfileDropDown from "./ProfileDropDown";
import { selectPageTitle } from "@states/generalStore";

const Header = () => {
    const pageTitle = selectPageTitle();

    return (
        <div className="navbar z-10 flex justify-between bg-base-100 shadow-md ">
            {/* Menu toggle for mobile views or small screen */}
            <div className="">
                <label htmlFor="left-sidebar-drawer" className="btn-primary drawer-button btn lg:hidden">
                    <Bars3Icon className="inline-block h-5 w-5" />
                </label>
                <h1 className="ml-2 text-2xl font-semibold">{pageTitle}</h1>
            </div>

            <div className="order-last">
                <ThemeDropDown />
                <NotificationButton />
                <ProfileDropDown />
                <ToastNotification />
            </div>
        </div>
    );
};

export default Header;
