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

const COLORS = ["#10b981", "#2563eb", "#f59e0b","#ef4444",];

const AdminCharts = ({ jobsPerWeek, jobsByType }) => {
    return (
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* BAR CHART */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Jobs Posted Per Week
                </h2>

                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={jobsPerWeek}>
                            <XAxis
                                dataKey="week"
                                tick={{ fill: "#6b7280", fontSize: 12 }}
                            />
                            <YAxis
                                tick={{ fill: "#6b7280", fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    fontSize: "13px",
                                }}
                            />
                            <Bar
                                dataKey="count"
                                fill="#2563eb"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* PIE CHART */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Jobs by Type
                </h2>

                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={jobsByType}
                                dataKey="count"
                                nameKey="type"
                                innerRadius={70}
                                outerRadius={100}
                                label={({ value }) => value}
                                labelStyle={{ fontSize: "13px" }}
                            >
                                {jobsByType.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                wrapperStyle={{
                                    fontSize: "13px",
                                    paddingTop: "10px",
                                }}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                    fontSize: "13px",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default AdminCharts;
