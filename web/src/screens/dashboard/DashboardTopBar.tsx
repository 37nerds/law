import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import SelectBox, { TUpdateFormValue } from "@components/inputs/old/SelectBox";

const periodOptions = [
    { name: "Today", value: "TODAY" },
    { name: "Yesterday", value: "YESTERDAY" },
    { name: "This Week", value: "THIS_WEEK" },
    { name: "Last Week", value: "LAST_WEEK" },
    { name: "This Month", value: "THIS_MONTH" },
    { name: "Last Month", value: "LAST_MONTH" },
];

export type TUpdateDashboardPeriod = (_: string) => void;

type Props = {
    updateDashboardPeriod: TUpdateDashboardPeriod;
};

function DashboardTopBar({ updateDashboardPeriod }: Props) {
    const updateSelectBoxValue: TUpdateFormValue = ({ updateType, value }) => {
        updateDashboardPeriod(value);
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="">
                <SelectBox
                    options={periodOptions}
                    labelTitle="Period"
                    placeholder="Select date range"
                    containerStyle="w-72"
                    labelStyle="hidden"
                    defaultValue="TODAY"
                    updateFormValue={updateSelectBoxValue}
                />
            </div>
            <div className="text-right ">
                <button className="btn btn-ghost btn-sm normal-case">
                    <ArrowPathIcon className="mr-2 w-4" />
                    Refresh Data
                </button>
                <button className="btn btn-ghost btn-sm ml-2  normal-case">
                    <ShareIcon className="mr-2 w-4" />
                    Share
                </button>

                <div className="dropdown-end dropdown dropdown-bottom  ml-2">
                    <label tabIndex={0} className="btn btn-square btn-ghost btn-sm normal-case ">
                        <EllipsisVerticalIcon className="w-5" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu-compact menu dropdown-content  rounded-box w-52 bg-base-100 p-2 shadow"
                    >
                        <li>
                            <a>
                                <EnvelopeIcon className="w-4" />
                                Email Digests
                            </a>
                        </li>
                        <li>
                            <a>
                                <ArrowDownTrayIcon className="w-4" />
                                Download
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardTopBar;
