import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Fan, Battery, Heart, Activity, Thermometer, Wifi, WifiOff, Power } from 'lucide-react';

const WorkersMap = ({ workers }) => {
    const [selectedWorker, setSelectedWorker] = useState(null);

    // Map zones layout (simplified floor plan)
    const zones = [
        { id: 'A', name: 'Zone A', x: 15, y: 20, width: 35, height: 40 },
        { id: 'B', name: 'Zone B', x: 55, y: 20, width: 35, height: 40 },
        { id: 'C', name: 'Zone C', x: 15, y: 65, width: 35, height: 30 },
        { id: 'D', name: 'Zone D', x: 55, y: 65, width: 35, height: 30 },
    ];

    // Worker positions on map (percentage-based)
    const workerPositions = {
        'WRK-001': { zone: 'A', x: 25, y: 35 },
        'WRK-002': { zone: 'B', x: 70, y: 30 },
        'WRK-003': { zone: 'C', x: 30, y: 75 },
        'WRK-004': { zone: 'A', x: 40, y: 45 },
        'WRK-005': { zone: 'D', x: 75, y: 80 },
        'WRK-006': { zone: 'B', x: 65, y: 50 },
    };

    const getStatusColor = (status) => {
        if (status === 'critical') return 'bg-red-500 border-red-400';
        if (status === 'warning') return 'bg-yellow-500 border-yellow-400';
        return 'bg-green-500 border-green-400';
    };

    const getStatusPulse = (status) => {
        if (status === 'critical') return 'animate-ping';
        return '';
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Workers Location Map</h1>
                <p className="text-slate-400">Real-time tracking of worker positions and helmet status</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map Area */}
                <div className="lg:col-span-2">
                    <div className="card h-[600px] relative">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Site Floor Plan</h2>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-slate-400">Normal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-slate-400">Warning</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-slate-400">Critical</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div className="relative w-full h-[500px] bg-slate-900 rounded-lg border-2 border-slate-700 overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-20">
                                <svg width="100%" height="100%">
                                    <defs>
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="1" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            {/* Zones */}
                            {zones.map((zone) => (
                                <div
                                    key={zone.id}
                                    className="absolute border-2 border-hospital-blue/30 bg-hospital-blue/5 rounded-lg"
                                    style={{
                                        left: `${zone.x}%`,
                                        top: `${zone.y}%`,
                                        width: `${zone.width}%`,
                                        height: `${zone.height}%`,
                                    }}
                                >
                                    <div className="absolute top-2 left-2 text-hospital-blue font-bold text-sm">
                                        {zone.name}
                                    </div>
                                </div>
                            ))}

                            {/* Worker Markers */}
                            {workers.map((worker) => {
                                const position = workerPositions[worker.id];
                                if (!position) return null;

                                return (
                                    <motion.div
                                        key={worker.id}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute cursor-pointer group"
                                        style={{
                                            left: `${position.x}%`,
                                            top: `${position.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        onClick={() => setSelectedWorker(worker)}
                                    >
                                        {/* Pulse effect for critical status */}
                                        {worker.status === 'critical' && (
                                            <div className="absolute inset-0 w-12 h-12 -m-2">
                                                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                                            </div>
                                        )}

                                        {/* Worker Icon */}
                                        <div className={`relative w-8 h-8 rounded-full border-2 ${getStatusColor(worker.status)} flex items-center justify-center shadow-lg transition-transform group-hover:scale-125`}>
                                            <MapPin size={16} className="text-white" />
                                        </div>

                                        {/* Tooltip on hover */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                                                <p className="text-white font-medium text-sm">{worker.name}</p>
                                                <p className="text-slate-400 text-xs">{worker.id}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Helmet Details Panel */}
                <div className="lg:col-span-1">
                    <AnimatePresence mode="wait">
                        {selectedWorker ? (
                            <motion.div
                                key={selectedWorker.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="card h-[600px] overflow-y-auto"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-700">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedWorker.name}</h3>
                                        <p className="text-hospital-blue font-mono text-sm">{selectedWorker.id}</p>
                                        <p className="text-slate-400 text-sm mt-1">{selectedWorker.location}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedWorker(null)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Helmet Status */}
                                <div className="space-y-4">
                                    {/* Connection Status */}
                                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-slate-400 text-sm font-medium">Helmet Connection</span>
                                            {selectedWorker.helmet?.connected ? (
                                                <Wifi size={18} className="text-green-400" />
                                            ) : (
                                                <WifiOff size={18} className="text-red-400" />
                                            )}
                                        </div>
                                        <p className={`font-bold ${selectedWorker.helmet?.connected ? 'text-green-400' : 'text-red-400'}`}>
                                            {selectedWorker.helmet?.connected ? 'Connected' : 'Disconnected'}
                                        </p>
                                    </div>

                                    {/* Cooling System */}
                                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Fan size={18} className={selectedWorker.helmet?.coolingActive ? 'text-hospital-blue animate-spin' : 'text-slate-500'} />
                                                <span className="text-slate-400 text-sm font-medium">Cooling System</span>
                                            </div>
                                            <div className={`px-2 py-1 rounded text-xs font-bold ${selectedWorker.helmet?.coolingActive
                                                    ? 'bg-hospital-blue/20 text-hospital-blue'
                                                    : 'bg-slate-700 text-slate-400'
                                                }`}>
                                                {selectedWorker.helmet?.coolingActive ? 'ACTIVE' : 'OFF'}
                                            </div>
                                        </div>
                                        {selectedWorker.helmet?.coolingActive && (
                                            <p className="text-xs text-slate-500 mt-2">
                                                Peltier cooling activated due to high temperature
                                            </p>
                                        )}
                                    </div>

                                    {/* Battery Level */}
                                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Battery size={18} className={
                                                    selectedWorker.helmet?.battery > 50 ? 'text-green-400' :
                                                        selectedWorker.helmet?.battery > 20 ? 'text-yellow-400' : 'text-red-400'
                                                } />
                                                <span className="text-slate-400 text-sm font-medium">Battery Level</span>
                                            </div>
                                            <span className={`font-bold text-lg ${selectedWorker.helmet?.battery > 50 ? 'text-green-400' :
                                                    selectedWorker.helmet?.battery > 20 ? 'text-yellow-400' : 'text-red-400'
                                                }`}>
                                                {selectedWorker.helmet?.battery}%
                                            </span>
                                        </div>
                                        {/* Battery Bar */}
                                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${selectedWorker.helmet?.battery > 50 ? 'bg-green-400' :
                                                        selectedWorker.helmet?.battery > 20 ? 'bg-yellow-400' : 'bg-red-400'
                                                    }`}
                                                style={{ width: `${selectedWorker.helmet?.battery}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Vital Signs */}
                                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                                        <h4 className="text-white font-semibold mb-3">Vital Signs</h4>
                                        <div className="space-y-3">
                                            {/* Heart Rate */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Heart size={16} className="text-red-400" />
                                                    <span className="text-slate-400 text-sm">Heart Rate</span>
                                                </div>
                                                <span className="text-white font-mono font-bold">
                                                    {selectedWorker.heartRate} <span className="text-slate-500 text-xs">BPM</span>
                                                </span>
                                            </div>

                                            {/* Oxygen */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Activity size={16} className="text-hospital-blue" />
                                                    <span className="text-slate-400 text-sm">SpO2</span>
                                                </div>
                                                <span className="text-white font-mono font-bold">
                                                    {selectedWorker.oxygen}<span className="text-slate-500 text-xs">%</span>
                                                </span>
                                            </div>

                                            {/* Temperature */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Thermometer size={16} className="text-orange-400" />
                                                    <span className="text-slate-400 text-sm">Body Temp</span>
                                                </div>
                                                <span className="text-white font-mono font-bold">
                                                    {selectedWorker.temperature}<span className="text-slate-500 text-xs">°C</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fall Detection */}
                                    <div className={`rounded-lg p-4 border ${selectedWorker.fallDetected
                                            ? 'bg-red-500/20 border-red-500/30'
                                            : 'bg-green-500/20 border-green-500/30'
                                        }`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-medium">Fall Detection</span>
                                            <span className={`font-bold ${selectedWorker.fallDetected ? 'text-red-400' : 'text-green-400'}`}>
                                                {selectedWorker.fallDetected ? '⚠️ FALL DETECTED' : '✓ Normal'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Overall Status */}
                                    <div className={`rounded-lg p-4 border ${selectedWorker.status === 'critical' ? 'bg-red-500/20 border-red-500/30' :
                                            selectedWorker.status === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30' :
                                                'bg-green-500/20 border-green-500/30'
                                        }`}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-medium">Overall Status</span>
                                            <span className={`font-bold uppercase ${selectedWorker.status === 'critical' ? 'text-red-400' :
                                                    selectedWorker.status === 'warning' ? 'text-yellow-400' :
                                                        'text-green-400'
                                                }`}>
                                                {selectedWorker.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="card h-[600px] flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <MapPin size={48} className="text-slate-600 mx-auto mb-4" />
                                    <p className="text-slate-400 text-lg">Select a worker on the map</p>
                                    <p className="text-slate-500 text-sm mt-2">Click on any marker to view helmet details</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default WorkersMap;
