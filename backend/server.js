const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6060;  // Changed to 6060

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for dashboard
const mockData = {
  builds: [
    { 
      id: 1, 
      buildNumber: 45, 
      status: 'SUCCESS', 
      duration: 120, 
      triggeredBy: 'Git Push',
      timestamp: new Date().toISOString(),
      commit: 'a1b2c3d4'
    },
    { 
      id: 2, 
      buildNumber: 44, 
      status: 'FAILED', 
      duration: 89, 
      triggeredBy: 'Git Push',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      commit: 'e5f6g7h8'
    }
  ],
  deployments: [
    { 
      name: 'frontend', 
      status: 'Running', 
      version: 'v1.2.3', 
      pods: 3,
      namespace: 'default',
      age: '2d'
    },
    { 
      name: 'backend', 
      status: 'Running', 
      version: 'v1.1.0', 
      pods: 2,
      namespace: 'default',
      age: '1d'
    }
  ],
  systemHealth: {
    cpu: 45,
    memory: 67,
    disk: 23,
    activePods: 5,
    totalPods: 6
  },
  logs: [
    { 
      timestamp: new Date().toISOString(), 
      level: 'INFO', 
      message: 'Deployment successful for frontend:v1.2.3',
      source: 'kubernetes'
    },
    { 
      timestamp: new Date(Date.now() - 60000).toISOString(), 
      level: 'DEBUG', 
      message: 'Health check passed for backend service',
      source: 'docker'
    },
    { 
      timestamp: new Date(Date.now() - 120000).toISOString(), 
      level: 'WARN', 
      message: 'High memory usage detected in pod frontend-7c8b6',
      source: 'monitoring'
    }
  ]
};

// Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'DevOps CI/CD Dashboard API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      dashboard: '/api/dashboard',
      builds: '/api/builds',
      deployments: '/api/deployments',
      systemHealth: '/api/system-health',
      logs: '/api/logs'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/dashboard', (req, res) => {
  res.json(mockData);
});

app.get('/api/builds', (req, res) => {
  res.json(mockData.builds);
});

app.get('/api/deployments', (req, res) => {
  res.json(mockData.deployments);
});

app.get('/api/system-health', (req, res) => {
  res.json(mockData.systemHealth);
});

app.get('/api/logs', (req, res) => {
  res.json(mockData.logs);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DevOps Dashboard Backend running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🏠 Home page: http://localhost:${PORT}`);
});
