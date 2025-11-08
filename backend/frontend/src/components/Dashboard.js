import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import MetricsOverview from './MetricsOverview';
import BuildStatus from './BuildStatus';
import DeploymentMetrics from './DeploymentMetrics';
import SystemHealth from './SystemHealth';
import LiveLogs from './LiveLogs';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    builds: [],
    deployments: [],
    systemHealth: {},
    logs: [],
    metrics: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use relative URL when in production (Docker), absolute URL when in development
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:6060/api';

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`);
      setDashboardData(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
      console.error('Error fetching data:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading DevOps Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MetricsOverview data={dashboardData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BuildStatus builds={dashboardData.builds} />
          <DeploymentMetrics deployments={dashboardData.deployments} />
          <SystemHealth health={dashboardData.systemHealth} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LiveLogs logs={dashboardData.logs} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
