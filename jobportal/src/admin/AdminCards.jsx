const AdminCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card title="Total Users" value={stats.totalUsers} />
            <Card title="Total Jobs" value={stats.totalJobs} />
            <Card title="Total Companies" value={stats.totalCompanies} />
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-slate-100 rounded-xl p-5 text-center shadow-sm">
        <p className="text-gray-600 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
);

export default AdminCards;
