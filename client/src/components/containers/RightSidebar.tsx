import { useAppDispatch, useAppSelector } from "@app/hooks";
import NotificationBodyRightDrawer from "../../screens/features/common/components/NotificationBodyRightDrawer";
import { closeRightDrawer } from "../../screens/features/common/rightDrawerSlice";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { RIGHT_DRAWER_TYPES } from "@utils/globalConstantUtil";

function RightSidebar() {
    const { isOpen, bodyType, extraObject, header } = useAppSelector(
        state => state.rightDrawer
    );
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(closeRightDrawer());
    };

    return (
        <div
            className={
                " fixed inset-0 z-20 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out " +
                (isOpen
                    ? " translate-x-0 opacity-100 transition-opacity duration-500  "
                    : " translate-x-full opacity-0 transition-all delay-500  ")
            }
        >
            <section
                className={
                    "delay-400 bg-layouts-100  absolute right-0 h-full w-80 transform shadow-xl transition-all duration-500 ease-in-out md:w-96  " +
                    (isOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                <div className="relative  flex h-full flex-col  pb-5">
                    {/* Header */}
                    <div className="navbar   flex pl-4 pr-4   shadow-md ">
                        <button
                            className="btn-outline btn-sm btn-circle btn float-left"
                            onClick={() => close()}
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <span className="ml-2 text-xl font-bold">{header}</span>
                    </div>

                    {/* ------------------ Content Start ------------------ */}
                    <div className="overflow-y-scroll pl-4 pr-4">
                        <div className="flex w-full flex-col">
                            {/* Loading drawer body according to different drawer type */}
                            {
                                {
                                    [RIGHT_DRAWER_TYPES.NOTIFICATION]: (
                                        <NotificationBodyRightDrawer
                                            {...extraObject}
                                        />
                                    ),
                                    [RIGHT_DRAWER_TYPES.DEFAULT]: <div></div>,
                                }[bodyType]
                            }
                        </div>
                    </div>
                    {/* ------------------ Content End ------------------ */}
                </div>
            </section>

            <section
                className=" h-full w-screen cursor-pointer "
                onClick={() => close()}
            ></section>
        </div>
    );
}

export default RightSidebar;
