import React from 'react';
import { CheckCircle, XCircle, Clock, PlayCircle } from 'lucide-react';

const MetricsOverview = ({ data }) => {
  const { builds = [], deployments = [], systemHealth = {} } = data;

  const successfulBuilds = builds.filter(build => build.status === 'SUCCESS').length;
  const failedBuilds = builds.filter(build => build.status === 'FAILED').length;
  const runningBuilds = builds.filter(build => build.status === 'RUNNING').length;
  const activeDeployments = deployments.filter(deploy => deploy.status === 'Running').length;

  const metrics = [
    {
      label: 'Successful Builds',
      value: successfulBuilds,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Failed Builds',
      value: failedBuilds,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      label: 'Running Builds',
      value: runningBuilds,
      icon: PlayCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Active Deployments',
      value: activeDeployments,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-gray-600 text-sm mt-1">{metric.label}</p>
            </div>
            <div className={`p-3 rounded-full ${metric.bgColor}`}>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;
