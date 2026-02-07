import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Flame, UserX, CheckCircle, Clock, MapPin, User } from 'lucide-react';

const IncidentLog = ({ incidents }) => {
    const getIncidentIcon = (type) => {
        if (type === 'fall') return <AlertTriangle size={20} className="text-red-400" />;
        if (type === 'heat_stress') return <Flame size={20} className="text-orange-400" />;
        if (type === 'disconnected') return <UserX size={20} className="text-yellow-400" />;
        return <AlertTriangle size={20} className="text-slate-400" />;
    };

    const getIncidentBadge = (type) => {
        if (type === 'fall') return 'bg-red-500/20 text-red-400 border-red-500/30';
        if (type === 'heat_stress') return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        if (type === 'disconnected') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    };

    const getStatusBadge = (status) => {
        if (status === 'resolved') return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (status === 'in_progress') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    };

    const getStatusText = (status) => {
        if (status === 'resolved') return 'Resolved';
        if (status === 'in_progress') return 'In Progress';
        return 'Pending';
    };

    const getIncidentTypeText = (type) => {
        if (type === 'fall') return 'Fall Detected';
        if (type === 'heat_stress') return 'Heat Stress';
        if (type === 'disconnected') return 'Helmet Disconnected';
        return 'Unknown';
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
                    <h2 className="text-xl font-bold text-white">Recent Incidents</h2>
                    <p className="text-slate-400 text-sm mt-1">Last 24 hours activity log</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-nadhir-coral rounded-full animate-pulse"></div>
                    <span className="text-sm text-slate-400">Live Updates</span>
                </div>
            </div>

            <div className="space-y-3">
                {incidents.length === 0 ? (
                    <div className="text-center py-12">
                        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">No incidents today</p>
                        <p className="text-slate-500 text-sm mt-2">All workers are safe</p>
                    </div>
                ) : (
                    incidents.map((incident, index) => (
                        <motion.div
                            key={incident.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`p-2 rounded-lg border ${getIncidentBadge(incident.type)}`}>
                                    {getIncidentIcon(incident.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div>
                                            <h3 className="text-white font-semibold">{getIncidentTypeText(incident.type)}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <User size={14} className="text-slate-500" />
                                                <span className="text-slate-400 text-sm">{incident.workerName}</span>
                                                <span className="text-slate-600">•</span>
                                                <span className="text-nadhir-teal text-sm font-mono">{incident.workerId}</span>
                                            </div>
                                        </div>
                                        <span className={`badge ${getStatusBadge(incident.status)} whitespace-nowrap`}>
                                            {getStatusText(incident.status)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            <span>{incident.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{incident.time}</span>
                                        </div>
                                    </div>

                                    {incident.description && (
                                        <p className="text-slate-400 text-sm mt-2">{incident.description}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {incidents.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                    <button className="text-nadhir-teal hover:text-nadhir-cyan text-sm font-medium transition-colors">
                        View All Incidents →
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default IncidentLog;
