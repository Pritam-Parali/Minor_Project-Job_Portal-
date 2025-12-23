import { Users, Briefcase, Building2 } from "lucide-react";

const AdminCards = ({ stats }) => {
    const cards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <Users size={26} />,
            gradient: "from-pink-400 to-rose-500",
        },
        {
            title: "Total Jobs",
            value: stats.totalJobs,
            icon: <Briefcase size={26} />,
            gradient: "from-blue-400 to-blue-600",
        },
        {
            title: "Total Companies",
            value: stats.totalCompanies,
            icon: <Building2 size={26} />,
            gradient: "from-emerald-400 to-teal-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl h-[150px] 
                    flex items-center justify-center text-white shadow-lg 
                    bg-gradient-to-r ${card.gradient}`}
                >
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />

                    {/* Icon */}
                    <div className="absolute top-4 right-4 opacity-40">
                        {card.icon}
                    </div>

                    {/* CENTER CONTENT */}
                    <div className="text-center z-10">
                        <p className="text-sm font-medium opacity-90">
                            {card.title}
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {card.value}
                        </h2>

                        <p className="text-xs mt-2 opacity-80">
                            Updated just now
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminCards;
