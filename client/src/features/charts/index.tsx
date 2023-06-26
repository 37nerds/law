import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import PieChart from "./components/PieChart";
import ScatterChart from "./components/ScatterChart";
import StackBarChart from "./components/StackBarChart";

const Charts = () => {
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
