import React from 'react';
import { Cpu, HardDrive, Container, Database } from 'lucide-react';

const SystemHealth = ({ health }) => {
  const { cpu = 0, memory = 0, disk = 0, activePods = 0, totalPods = 0 } = health;

  const getUsageColor = (usage) => {
    if (usage > 80) return 'bg-red-500';
    if (usage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUsageLevel = (usage) => {
    if (usage > 80) return 'High';
    if (usage > 60) return 'Medium';
    return 'Low';
  };

  const metrics = [
    {
      label: 'CPU Usage',
      value: cpu,
      icon: Cpu,
      unit: '%',
      color: 'text-blue-600'
    },
    {
      label: 'Memory Usage',
      value: memory,
      icon: Database,  // Using Database icon instead of Memory
      unit: '%',
      color: 'text-purple-600'
    },
    {
      label: 'Disk Usage',
      value: disk,
      icon: HardDrive,
      unit: '%',
      color: 'text-green-600'
    },
    {
      label: 'Pod Status',
      value: activePods,
      icon: Container,
      unit: `/${totalPods} active`,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">System Health</h2>
      
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              <span className="text-sm font-semibold">
                {metric.value}{metric.unit}
              </span>
            </div>
            
            {metric.unit === '%' ? (
              <>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full ${getUsageColor(metric.value)}`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span className={`font-medium ${
                    metric.value > 80 ? 'text-red-600' : 
                    metric.value > 60 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {getUsageLevel(metric.value)} Usage
                  </span>
                  <span>100%</span>
                </div>
              </>
            ) : (
              <div className="text-xs text-gray-500 mt-1">
                {metric.value === totalPods ? (
                  <span className="text-green-600 font-medium">All pods healthy</span>
                ) : (
                  <span className="text-yellow-600 font-medium">
                    {totalPods - metric.value} pod(s) not ready
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;
