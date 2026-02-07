import React, { useState } from 'react';
import { Search, Wifi, WifiOff, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

const TopBar = ({ systemOnline, notificationCount }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="h-16 bg-slate-900/95 backdrop-blur-md border-b border-nadhir-teal/20 fixed top-0 left-64 right-0 z-10 flex items-center justify-between px-6 shadow-lg shadow-black/20">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search workers, alerts, locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-nadhir-teal focus:ring-2 focus:ring-nadhir-teal/20 transition-all"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                {/* System Health Status */}
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: systemOnline ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${systemOnline
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-red-500/20 border border-red-500/30'
                        }`}
                >
                    {systemOnline ? (
                        <>
                            <Wifi size={18} className="text-green-400" />
                            <span className="text-green-400 font-medium text-sm">System Online</span>
                        </>
                    ) : (
                        <>
                            <WifiOff size={18} className="text-red-400" />
                            <span className="text-red-400 font-medium text-sm">System Offline</span>
                        </>
                    )}
                </motion.div>

                {/* Notification Bell */}
                <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
                    <Bell size={20} className="text-slate-400" />
                    {notificationCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-nadhir-coral rounded-full flex items-center justify-center text-xs font-bold text-white"
                        >
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </motion.span>
                    )}
                </button>

                {/* Admin Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-slate-400">Control Center</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-nadhir-teal to-nadhir-coral rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
