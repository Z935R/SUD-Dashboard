import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

const HeartRateChart = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                    <p className="text-slate-400 text-xs mb-1">{payload[0].payload.time}</p>
                    <p className="text-white font-bold">
                        {payload[0].value} <span className="text-slate-500 text-sm">BPM</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="card"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Average Heart Rate Trend</h2>
                    <p className="text-slate-400 text-sm mt-1">Site-wide monitoring over time</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-hospital-blue rounded-full"></div>
                    <span className="text-sm text-slate-400">Average BPM</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                        domain={[60, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="avgHeartRate"
                        stroke="#4A90E2"
                        strokeWidth={3}
                        fill="url(#heartRateGradient)"
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default HeartRateChart;
