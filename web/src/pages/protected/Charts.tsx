import LineChart from "@screens/charts/LineChart";
import BarChart from "@screens/charts/BarChart";
import DoughnutChart from "@screens/charts/DoughnutChart";
import PieChart from "@screens/charts/PieChart";
import ScatterChart from "@screens/charts/ScatterChart";
import StackBarChart from "@screens/charts/StackBarChart";
import useSetPageTitle from "@hooks/useSetPageTitle";

const Charts = () => {
    useSetPageTitle("Charts");

    return (
        <>
            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <StackBarChart />
                <BarChart />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DoughnutChart />
                <PieChart />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ScatterChart />
                <LineChart />
            </div>
        </>
    );
};

export default Charts;
