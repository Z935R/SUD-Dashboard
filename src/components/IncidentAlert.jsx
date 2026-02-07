import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, MapPin, Phone, Clock } from 'lucide-react';

const IncidentAlert = ({ incident, onClose, onDispatch }) => {
    if (!incident) return null;

    const getSeverityColor = (severity) => {
        if (severity === 'critical') return 'from-red-600 to-nadhir-coral';
        if (severity === 'high') return 'from-orange-600 to-yellow-600';
        return 'from-yellow-600 to-orange-500';
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900 border-2 border-nadhir-coral rounded-xl shadow-2xl max-w-lg w-full overflow-hidden pulse-alert"
                >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${getSeverityColor(incident.severity)} p-6`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                    <AlertTriangle size={28} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">CRITICAL ALERT</h2>
                                    <p className="text-white/90 text-sm mt-1">{incident.type}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Worker Info */}
                        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <h3 className="text-sm font-semibold text-slate-400 mb-3">WORKER INFORMATION</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Name:</span>
                                    <span className="text-white font-medium">{incident.workerName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400">ID:</span>
                                    <span className="text-nadhir-teal font-mono">{incident.workerId}</span>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-3 bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <MapPin size={20} className="text-nadhir-coral mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-400 mb-1">LOCATION</p>
                                <p className="text-white">{incident.location}</p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-3 bg-slate-800 rounded-lg p-4 border border-slate-700">
                            <Clock size={20} className="text-nadhir-teal mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-400 mb-1">TIME DETECTED</p>
                                <p className="text-white">{incident.timestamp}</p>
                            </div>
                        </div>

                        {/* Vitals if available */}
                        {incident.vitals && (
                            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                <h3 className="text-sm font-semibold text-slate-400 mb-3">VITAL SIGNS</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500">Heart Rate</p>
                                        <p className="text-lg font-bold text-red-400">{incident.vitals.heartRate} BPM</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">SpO2</p>
                                        <p className="text-lg font-bold text-yellow-400">{incident.vitals.oxygen}%</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Temp</p>
                                        <p className="text-lg font-bold text-orange-400">{incident.vitals.temperature}°C</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="p-6 bg-slate-800/50 border-t border-slate-700 flex gap-3">
                        <button
                            onClick={onDispatch}
                            className="flex-1 bg-gradient-to-r from-nadhir-coral to-red-600 hover:shadow-lg hover:shadow-nadhir-coral/50 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                        >
                            <Phone size={20} />
                            Dispatch Emergency
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default IncidentAlert;
