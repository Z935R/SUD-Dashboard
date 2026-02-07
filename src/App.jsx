import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StatsCard from './components/StatsCard';
import LiveMonitoringTable from './components/LiveMonitoringTable';
import IncidentAlert from './components/IncidentAlert';
import IncidentLog from './components/IncidentLog';
import WorkersMap from './components/WorkersMap';
import Analytics from './components/Analytics';
import Reports from './components/Reports';
import { Users, AlertTriangle, Thermometer, Battery } from 'lucide-react';

// Mock data with helmet information
const mockWorkers = [
  {
    id: 'WRK-001',
    name: 'Ahmed Hassan',
    location: 'Zone A - Floor 3',
    heartRate: 78,
    oxygen: 98,
    temperature: 36.8,
    fallDetected: false,
    status: 'normal',
    helmet: {
      connected: true,
      coolingActive: false,
      battery: 92
    }
  },
  {
    id: 'WRK-002',
    name: 'Mohammed Ali',
    location: 'Zone B - Floor 2',
    heartRate: 125,
    oxygen: 92,
    temperature: 38.2,
    fallDetected: false,
    status: 'warning',
    helmet: {
      connected: true,
      coolingActive: true,
      battery: 78
    }
  },
  {
    id: 'WRK-003',
    name: 'Ahmed',
    location: 'Zone C - Floor 1',
    heartRate: 145,
    oxygen: 88,
    temperature: 39.1,
    fallDetected: true,
    status: 'critical',
    helmet: {
      connected: true,
      coolingActive: true,
      battery: 45
    }
  },
  {
    id: 'WRK-004',
    name: 'Omar Ibrahim',
    location: 'Zone A - Floor 1',
    heartRate: 72,
    oxygen: 97,
    temperature: 37.1,
    fallDetected: false,
    status: 'normal',
    helmet: {
      connected: true,
      coolingActive: false,
      battery: 88
    }
  },
  {
    id: 'WRK-005',
    name: 'Layla Mahmoud',
    location: 'Zone D - Floor 4',
    heartRate: 85,
    oxygen: 96,
    temperature: 36.9,
    fallDetected: false,
    status: 'normal',
    helmet: {
      connected: true,
      coolingActive: false,
      battery: 95
    }
  },
  {
    id: 'WRK-006',
    name: 'Youssef Karim',
    location: 'Zone B - Floor 3',
    heartRate: 110,
    oxygen: 94,
    temperature: 37.8,
    fallDetected: false,
    status: 'warning',
    helmet: {
      connected: true,
      coolingActive: true,
      battery: 15
    }
  }
];

const mockIncidents = [
  {
    id: 'INC-001',
    type: 'fall',
    workerName: 'Ahmed',
    workerId: 'WRK-003',
    location: 'Zone C - Floor 1',
    time: '14:23',
    status: 'in_progress',
    description: 'Fall detected with high body temperature (39.1°C). Emergency team dispatched.'
  },
  {
    id: 'INC-002',
    type: 'heat_stress',
    workerName: 'Mohammed Ali',
    workerId: 'WRK-002',
    location: 'Zone B - Floor 2',
    time: '13:45',
    status: 'resolved',
    description: 'Cooling system activated. Worker moved to shaded area and recovered.'
  },
  {
    id: 'INC-003',
    type: 'heat_stress',
    workerName: 'Youssef Karim',
    workerId: 'WRK-006',
    location: 'Zone B - Floor 3',
    time: '12:18',
    status: 'resolved',
    description: 'Elevated temperature detected. Cooling system activated automatically.'
  },
  {
    id: 'INC-004',
    type: 'disconnected',
    workerName: 'Ahmed Hassan',
    workerId: 'WRK-001',
    location: 'Zone A - Floor 3',
    time: '11:30',
    status: 'resolved',
    description: 'Helmet connection lost temporarily. Reconnected after 2 minutes.'
  }
];

const mockIncident = {
  type: 'Fall Detected + Heat Stress',
  severity: 'critical',
  workerName: 'Ahmed',
  workerId: 'WRK-003',
  location: 'Zone C - Floor 1, Section 12',
  timestamp: new Date().toLocaleString(),
  vitals: {
    heartRate: 145,
    oxygen: 88,
    temperature: 39.1
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showIncident, setShowIncident] = useState(true);
  const [systemOnline, setSystemOnline] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);

  const handleDispatchEmergency = () => {
    alert('Emergency services dispatched to Zone C - Floor 1!');
    setShowIncident(false);
    setNotificationCount(prev => prev - 1);
  };

  const handleCloseIncident = () => {
    setShowIncident(false);
  };

  // Calculate stats
  const totalWorkers = mockWorkers.length;
  const activeAlerts = mockWorkers.filter(w => w.status === 'critical' || w.status === 'warning').length;
  const avgTemp = (mockWorkers.reduce((sum, w) => sum + w.temperature, 0) / totalWorkers).toFixed(1);
  const lowBatteryHelmets = mockWorkers.filter(w => w.helmet?.battery < 20).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <TopBar
        systemOnline={systemOnline}
        notificationCount={notificationCount}
      />

      <main className="ml-64 mt-16 p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-nadhir-teal to-white bg-clip-text text-transparent mb-2 drop-shadow-lg">
                Safety Dashboard Overview
              </h1>
              <p className="text-slate-400">
                Real-time monitoring of industrial worker safety metrics
              </p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <StatsCard
                title="Total Workers"
                value={totalWorkers}
                icon={Users}
                trend="up"
                trendValue="+2 from yesterday"
              />
              <StatsCard
                title="Active Alerts"
                value={activeAlerts}
                icon={AlertTriangle}
                isPulse={activeAlerts > 0}
              />
              <StatsCard
                title="Avg Site Temperature"
                value={avgTemp}
                unit="°C"
                icon={Thermometer}
                trend="up"
                trendValue="+1.2°C"
              />
              <StatsCard
                title="Low Battery Helmets"
                value={lowBatteryHelmets}
                icon={Battery}
                isPulse={lowBatteryHelmets > 0}
              />
            </div>

            {/* Incident Log */}
            <IncidentLog incidents={mockIncidents} />

            {/* Live Monitoring Table */}
            <LiveMonitoringTable workers={mockWorkers} />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="animate-fade-in">
            <WorkersMap workers={mockWorkers} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in">
            <Analytics />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="animate-fade-in">
            <Reports />
          </div>
        )}
      </main>

      {/* Incident Alert Modal */}
      {showIncident && (
        <IncidentAlert
          incident={mockIncident}
          onClose={handleCloseIncident}
          onDispatch={handleDispatchEmergency}
        />
      )}
    </div>
  );
}

export default App;
