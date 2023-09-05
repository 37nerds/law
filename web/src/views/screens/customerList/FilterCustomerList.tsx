import Select from "@components/inputs/Select";
import useCustomerListStore from "@states/customerListStore";

const FilterCustomerList = () => {
    const { clientsFilters, setClientsFiltersField } = useCustomerListStore();

    return (
        <div className="flex justify-between">
            <div className="join">
                <div>
                    <div>
                        <input className="join-item input input-bordered" placeholder="Search" />
                    </div>
                </div>

                <div className="indicator">
                    <button className="join-item btn">Search</button>
                </div>
            </div>
            <div className="join">
                <Select
                    placeholder="Status"
                    value={clientsFilters.status}
                    setValue={value => setClientsFiltersField("status", value)}
                    options={[
                        { name: "Active", value: "active" },
                        { name: "Inactive", value: "inactive" },
                    ]}
                    className="join-item"
                />
            </div>
        </div>
    );
};

export default FilterCustomerList;
