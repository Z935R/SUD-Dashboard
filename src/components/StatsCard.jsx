import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, unit, icon: Icon, trend, trendValue, isPulse }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`card card-hover group ${isPulse ? 'pulse-alert' : ''}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-bold text-white">{value}</h3>
                        {unit && <span className="text-slate-500 text-sm">{unit}</span>}
                    </div>

                    {trend && (
                        <div className={`flex items-center gap-1 mt-3 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span className="text-sm font-medium">{trendValue}</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-lg transition-all duration-300 ${isPulse
                    ? 'bg-nadhir-coral/20 border border-nadhir-coral/30 group-hover:shadow-lg group-hover:shadow-nadhir-coral/30'
                    : 'bg-nadhir-teal/20 border border-nadhir-teal/30 group-hover:shadow-lg group-hover:shadow-nadhir-teal/30'
                    }`}>
                    <Icon size={24} className={isPulse ? 'text-nadhir-coral' : 'text-nadhir-teal'} />
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
