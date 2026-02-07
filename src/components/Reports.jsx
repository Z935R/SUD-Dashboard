import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, Search, TrendingUp } from 'lucide-react';

const Reports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    const reports = [
        {
            id: 1,
            title: 'Daily Safety Report',
            date: '2026-01-03',
            type: 'Daily',
            incidents: 4,
            status: 'Ready',
            size: '2.3 MB'
        },
        {
            id: 2,
            title: 'Weekly Incident Summary',
            date: '2025-12-30 - 2026-01-05',
            type: 'Weekly',
            incidents: 18,
            status: 'Ready',
            size: '5.1 MB'
        },
        {
            id: 3,
            title: 'Monthly Safety Analysis',
            date: 'December 2025',
            type: 'Monthly',
            incidents: 52,
            status: 'Ready',
            size: '12.8 MB'
        },
        {
            id: 4,
            title: 'Cooling System Performance',
            date: '2026-01-03',
            type: 'Technical',
            incidents: 142,
            status: 'Ready',
            size: '3.7 MB'
        },
        {
            id: 5,
            title: 'Worker Compliance Report',
            date: '2025-12-01 - 2025-12-31',
            type: 'Compliance',
            incidents: 0,
            status: 'Ready',
            size: '1.9 MB'
        },
    ];

    const quickStats = [
        { label: 'Total Reports', value: '127', trend: '+12' },
        { label: 'This Month', value: '23', trend: '+5' },
        { label: 'Pending Review', value: '3', trend: '-2' },
        { label: 'Exported', value: '98', trend: '+8' },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Safety Reports</h1>
                    <p className="text-slate-400">Generate and download comprehensive safety reports</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <FileText size={18} />
                    Generate New Report
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card"
                    >
                        <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                                <TrendingUp size={14} />
                                {stat.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="card">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-hospital-blue transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-slate-400" />
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-hospital-blue transition-colors"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors">
                        <Calendar size={18} />
                        Date Range
                    </button>
                </div>
            </div>

            {/* Reports List */}
            <div className="card">
                <h2 className="text-xl font-bold text-white mb-4">Available Reports</h2>
                <div className="space-y-3">
                    {reports.map((report, index) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-hospital-blue transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="p-3 bg-hospital-blue/20 rounded-lg group-hover:bg-hospital-blue/30 transition-colors">
                                        <FileText size={24} className="text-hospital-blue" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold mb-1">{report.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {report.date}
                                            </span>
                                            <span className="badge badge-success">{report.type}</span>
                                            {report.incidents > 0 && (
                                                <span>{report.incidents} incidents</span>
                                            )}
                                            <span>{report.size}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="badge badge-success">{report.status}</span>
                                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors group">
                                        <Download size={20} className="text-slate-400 group-hover:text-hospital-blue transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Report Templates */}
            <div className="card">
                <h2 className="text-xl font-bold text-white mb-4">Report Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Incident Summary', 'Worker Performance', 'Equipment Status'].map((template) => (
                        <button
                            key={template}
                            className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-hospital-blue hover:bg-slate-700 transition-all text-left group"
                        >
                            <FileText size={20} className="text-hospital-blue mb-2" />
                            <h3 className="text-white font-medium mb-1">{template}</h3>
                            <p className="text-slate-400 text-sm">Generate custom {template.toLowerCase()} report</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports;
