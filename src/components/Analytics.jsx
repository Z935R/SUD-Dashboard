import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analytics = () => {
    // Mock data for charts
    const incidentsByType = [
        { name: 'Fall Detection', value: 12, color: '#ef4444' },
        { name: 'Heat Stress', value: 28, color: '#f97316' },
        { name: 'Disconnected', value: 8, color: '#eab308' },
    ];

    const incidentsByZone = [
        { zone: 'Zone A', incidents: 8 },
        { zone: 'Zone B', incidents: 15 },
        { zone: 'Zone C', incidents: 12 },
        { zone: 'Zone D', incidents: 5 },
    ];

    const weeklyTrend = [
        { day: 'Mon', incidents: 5 },
        { day: 'Tue', incidents: 8 },
        { day: 'Wed', incidents: 6 },
        { day: 'Thu', incidents: 10 },
        { day: 'Fri', incidents: 7 },
        { day: 'Sat', incidents: 4 },
        { day: 'Sun', incidents: 3 },
    ];

    const coolingActivations = [
        { time: '08:00', count: 2 },
        { time: '10:00', count: 5 },
        { time: '12:00', count: 12 },
        { time: '14:00', count: 15 },
        { time: '16:00', count: 8 },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                    <p className="text-white font-bold">{payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Safety Analytics</h1>
                <p className="text-slate-400">Comprehensive insights and trends for worker safety</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">Total Incidents (30d)</p>
                            <h3 className="text-3xl font-bold text-white">48</h3>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                                <TrendingDown size={16} />
                                <span className="text-sm font-medium">-12% from last month</span>
                            </div>
                        </div>
                        <div className="p-3 bg-red-500/20 rounded-lg">
                            <AlertTriangle size={24} className="text-red-400" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">Avg Response Time</p>
                            <h3 className="text-3xl font-bold text-white">2.3<span className="text-lg text-slate-500">min</span></h3>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                                <TrendingDown size={16} />
                                <span className="text-sm font-medium">-0.5min faster</span>
                            </div>
                        </div>
                        <div className="p-3 bg-hospital-blue/20 rounded-lg">
                            <Clock size={24} className="text-hospital-blue" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">Cooling Activations</p>
                            <h3 className="text-3xl font-bold text-white">142</h3>
                            <div className="flex items-center gap-1 mt-2 text-yellow-400">
                                <TrendingUp size={16} />
                                <span className="text-sm font-medium">+18% this week</span>
                            </div>
                        </div>
                        <div className="p-3 bg-orange-500/20 rounded-lg">
                            <Activity size={24} className="text-orange-400" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">Safety Compliance</p>
                            <h3 className="text-3xl font-bold text-white">98.5<span className="text-lg text-slate-500">%</span></h3>
                            <div className="flex items-center gap-1 mt-2 text-green-400">
                                <TrendingUp size={16} />
                                <span className="text-sm font-medium">+2.1% improvement</span>
                            </div>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <Users size={24} className="text-green-400" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Incidents by Type */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Incidents by Type</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={incidentsByType}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {incidentsByType.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {incidentsByType.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-slate-400">{item.name}</span>
                                </div>
                                <span className="text-white font-semibold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Incidents by Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Incidents by Zone</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={incidentsByZone}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="zone" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="incidents" fill="#4A90E2" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Trend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="card"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Weekly Incident Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="incidents" stroke="#FF5733" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Cooling System Usage */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="card"
                >
                    <h2 className="text-xl font-bold text-white mb-4">Cooling System Activations (Today)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={coolingActivations}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default Analytics;
