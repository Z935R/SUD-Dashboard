import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';

const LiveMonitoringTable = ({ workers }) => {
    const getStatusIcon = (status) => {
        if (status === 'critical') return <AlertTriangle size={16} className="text-red-400" />;
        if (status === 'warning') return <AlertTriangle size={16} className="text-yellow-400" />;
        return <CheckCircle size={16} className="text-green-400" />;
    };

    const getStatusColor = (status) => {
        if (status === 'critical') return 'text-red-400';
        if (status === 'warning') return 'text-yellow-400';
        return 'text-green-400';
    };

    const getVitalColor = (type, value) => {
        if (type === 'heartRate') {
            if (value > 120 || value < 50) return 'text-red-400';
            if (value > 100 || value < 60) return 'text-yellow-400';
            return 'text-green-400';
        }
        if (type === 'oxygen') {
            if (value < 90) return 'text-red-400';
            if (value < 95) return 'text-yellow-400';
            return 'text-green-400';
        }
        if (type === 'temp') {
            if (value > 38.5 || value < 35) return 'text-red-400';
            if (value > 37.5) return 'text-yellow-400';
            return 'text-green-400';
        }
        return 'text-white';
    };

    return (
        <div className="card overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Live Worker Monitoring</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-400">Real-time</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="table-header">
                            <th className="px-4 py-3 text-left">Worker ID</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Location</th>
                            <th className="px-4 py-3 text-center">Heart Rate</th>
                            <th className="px-4 py-3 text-center">SpO2</th>
                            <th className="px-4 py-3 text-center">Body Temp</th>
                            <th className="px-4 py-3 text-center">Fall Status</th>
                            <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map((worker, index) => (
                            <motion.tr
                                key={worker.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="table-row"
                            >
                                <td className="px-4 py-4 text-nadhir-teal font-mono">{worker.id}</td>
                                <td className="px-4 py-4 text-white font-medium">{worker.name}</td>
                                <td className="px-4 py-4 text-slate-400">{worker.location}</td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Heart size={16} className={getVitalColor('heartRate', worker.heartRate)} />
                                        <span className={`font-mono ${getVitalColor('heartRate', worker.heartRate)}`}>
                                            {worker.heartRate}
                                        </span>
                                        <span className="text-slate-500 text-xs">BPM</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Activity size={16} className={getVitalColor('oxygen', worker.oxygen)} />
                                        <span className={`font-mono ${getVitalColor('oxygen', worker.oxygen)}`}>
                                            {worker.oxygen}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Thermometer size={16} className={getVitalColor('temp', worker.temperature)} />
                                        <span className={`font-mono ${getVitalColor('temp', worker.temperature)}`}>
                                            {worker.temperature}°C
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className={`badge ${worker.fallDetected ? 'badge-danger' : 'badge-success'}`}>
                                        {worker.fallDetected ? 'FALL DETECTED' : 'Normal'}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {getStatusIcon(worker.status)}
                                        <span className={`text-sm font-medium ${getStatusColor(worker.status)}`}>
                                            {worker.status.toUpperCase()}
                                        </span>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LiveMonitoringTable;
