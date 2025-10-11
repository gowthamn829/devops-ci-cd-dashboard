import React from 'react';
import { Server, Circle, Calendar } from 'lucide-react';

const DeploymentMetrics = ({ deployments }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPodStatus = (pods, status) => {
    if (status !== 'Running') return 0;
    return pods || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Server className="h-5 w-5 mr-2 text-gray-600" />
        Deployment Metrics
      </h2>
      
      <div className="space-y-4">
        {deployments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No deployment data available</p>
        ) : (
          deployments.map((deployment) => (
            <div key={deployment.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Circle className={`h-3 w-3 ${
                    deployment.status === 'Running' ? 'text-green-500 fill-green-500' : 
                    deployment.status === 'Failed' ? 'text-red-500 fill-red-500' : 
                    'text-yellow-500 fill-yellow-500'
                  }`} />
                  <span className="font-semibold">{deployment.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                  {deployment.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between items-center">
                  <span>Version:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {deployment.version || 'v1.0.0'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Pods:</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{getPodStatus(deployment.pods, deployment.status)}</span>
                    <span className="text-gray-400">active</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span>Namespace:</span>
                  <span>{deployment.namespace || 'default'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Age:</span>
                  <span>{deployment.age || '1d'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeploymentMetrics;
