import React from 'react';
import { CheckCircle, XCircle, Clock, GitCommit } from 'lucide-react';

const BuildStatus = ({ builds }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'RUNNING':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'RUNNING':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    return `${seconds}s`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <GitCommit className="h-5 w-5 mr-2 text-gray-600" />
        Build Status
      </h2>
      
      <div className="space-y-4">
        {builds.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No build data available</p>
        ) : (
          builds.slice(0, 5).map((build) => (
            <div key={build.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(build.status)}
                  <span className="font-semibold">#{build.buildNumber}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(build.status)}`}>
                  {build.status || 'UNKNOWN'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Commit:</span>
                  <span className="font-mono text-xs">{build.commit || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{formatDuration(build.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Triggered by:</span>
                  <span>{build.triggeredBy || 'Manual'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{formatTimestamp(build.timestamp)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BuildStatus;
