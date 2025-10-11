import React, { useState, useEffect, useRef } from 'react';
import { FileText, Filter, Download, Search } from 'lucide-react';

const LiveLogs = ({ logs }) => {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'WARN':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'INFO':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'DEBUG':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLogIcon = (level) => {
    switch (level) {
      case 'ERROR':
        return '🔴';
      case 'WARN':
        return '��';
      case 'INFO':
        return '🔵';
      case 'DEBUG':
        return '⚪';
      default:
        return '⚪';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'ALL' || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString();
  };

  const downloadLogs = () => {
    const logText = filteredLogs.map(log => 
      `[${formatTimestamp(log.timestamp)}] [${log.level}] [${log.source}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devops-logs-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="h-5 w-5 mr-2 text-gray-600" />
          Live Logs
        </h2>
        <button
          onClick={downloadLogs}
          className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Levels</option>
            <option value="ERROR">Error</option>
            <option value="WARN">Warning</option>
            <option value="INFO">Info</option>
            <option value="DEBUG">Debug</option>
          </select>
        </div>
      </div>

      {/* Logs Container */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 h-96 overflow-y-auto p-4">
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No logs available</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`p-3 rounded border-l-4 ${
                  log.level === 'ERROR' ? 'border-l-red-500' :
                  log.level === 'WARN' ? 'border-l-yellow-500' :
                  log.level === 'INFO' ? 'border-l-blue-500' :
                  'border-l-gray-500'
                } bg-white shadow-sm`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{getLogIcon(log.level)}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {log.source}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{log.message}</p>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>Showing {filteredLogs.length} of {logs.length} logs</span>
        <span>Auto-refresh every 10 seconds</span>
      </div>
    </div>
  );
};

export default LiveLogs;
