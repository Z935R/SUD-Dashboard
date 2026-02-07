import React from 'react';
import { LayoutDashboard, Map, BarChart3, FileText } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'map', icon: Map, label: 'Workers Map' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'reports', icon: FileText, label: 'Reports' },
    ];

    return (
        <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-nadhir-teal/20 h-screen fixed left-0 top-0 flex flex-col animate-slide-in shadow-2xl shadow-nadhir-teal/10">
            {/* Logo Section */}
            <div className="p-6 border-b border-nadhir-teal/20">
                <div className="flex items-center justify-center bg-gradient-to-br from-nadhir-teal/5 to-transparent rounded-xl p-4">
                    <img
                        src="/nadhir-logo.png"
                        alt="Nadhir Logo"
                        className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                    />
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-nadhir-teal to-nadhir-cyan text-white shadow-lg shadow-nadhir-teal/30 scale-105'
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-nadhir-teal hover:scale-105 hover:shadow-md hover:shadow-nadhir-teal/10'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <div className="text-xs text-slate-500 text-center">
                    <p>Version 1.0.0</p>
                    <p className="mt-1">© 2026 Nadhir System</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
