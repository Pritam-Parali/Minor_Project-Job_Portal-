import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

const AdminCharts = ({ jobsPerWeek, jobsByType }) => {
    return (
        <div className="mt-10">

            {/* GRID CONTAINER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* BAR CHART */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h3 className="text-lg font-semibold mb-3 text-center">
                        Jobs Posted Per Week
                    </h3>

                    <div className="w-full h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={jobsPerWeek}>
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#2563eb" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PIE CHART */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <h3 className="text-lg font-semibold mb-3 text-center">
                        Jobs by Type
                    </h3>

                    <div className="w-full h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={jobsByType}
                                    dataKey="count"
                                    nameKey="type"
                                    outerRadius={90}
                                    label
                                >
                                    {jobsByType.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminCharts;
