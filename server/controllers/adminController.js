import Register from "../models/register.js";
import Job from "../models/Job.js";

// ============================
// DASHBOARD CARDS
// ============================
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await Register.countDocuments({
            userType: { $ne: "Admin" },
        });

        const totalJobs = await Job.countDocuments();

        const companies = await Job.distinct("companyName");

        res.status(200).json({
            totalUsers,
            totalJobs,
            totalCompanies: companies.length,
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ============================
// JOBS PER WEEK (BAR CHART)
export const jobsPerWeek = async (req, res) => {
    try {
        const today = new Date();
        const sixWeeksAgo = new Date();
        sixWeeksAgo.setDate(today.getDate() - 42); // last 6 weeks

        const data = await Job.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixWeeksAgo },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $isoWeekYear: "$createdAt" },
                        week: { $isoWeek: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } },
        ]);

        // Build last 6 weeks even if count = 0
        const result = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i * 7);

            const year = getISOWeekYear(d);
            const week = getISOWeek(d);

            const found = data.find(
                (x) => x._id.week === week && x._id.year === year
            );

            result.push({
                week: `Week ${week}`,
                count: found ? found.count : 0,
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Jobs per week error:", error);
        res.status(500).json({ message: "Chart error" });
    }
};

// ISO helpers
function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getISOWeekYear(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    return d.getUTCFullYear();
}



// ============================
// JOBS BY TYPE (PIE CHART)
// ============================
export const jobsByType = async (req, res) => {
    try {
        const data = await Job.aggregate([
            {
                $group: {
                    _id: "$jobType",
                    count: { $sum: 1 },
                },
            },
        ]);

        const formatted = data.map((item) => ({
            type: item._id,
            count: item.count,
        }));

        res.status(200).json(formatted);
    } catch (error) {
        console.error("Jobs by type error:", error);
        res.status(500).json({ message: "Chart error" });
    }
};
