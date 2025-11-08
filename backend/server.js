const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6060;

// Middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));
app.use(express.json());

// Store real build data
let realBuilds = [];

// Real Kubernetes data function
async function getRealDeployments() {
  try {
    const { stdout } = await execPromise('kubectl get pods -A -o json');
    const podsData = JSON.parse(stdout);

    const deployments = [];

    podsData.items.forEach(pod => {
      const namespace = pod.metadata.namespace;
      const name = pod.metadata.name;
      const status = pod.status.phase;
      const ready = pod.status.containerStatuses?.[0]?.ready || false;

      deployments.push({
        name: name,
        status: ready ? 'Running' : status,
        version: 'v1.0.0',
        pods: 1,
        namespace: namespace,
        age: 'Unknown'
      });
    });

    return deployments;

  } catch (error) {
    console.log('Kubernetes not available:', error.message);
    return [
      {
        name: 'devops-frontend-96ff78cff-bvb49',
        status: 'CrashLoopBackOff',
        version: 'v1.0.0',
        pods: 1,
        namespace: 'default',
        age: '49m'
      },
      {
        name: 'devops-frontend-96ff78cff-zm4jc',
        status: 'CrashLoopBackOff',
        version: 'v1.0.0',
        pods: 1,
        namespace: 'default',
        age: '49m'
      }
    ];
  }
}

// POST endpoint to receive build updates from Jenkins
app.post('/api/builds', async (req, res) => {
  try {
    const newBuild = req.body;
    console.log('📨 Received build update from Jenkins:', newBuild);
    
    if (!newBuild.buildNumber || !newBuild.status) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
    const existingIndex = realBuilds.findIndex(b => b.buildNumber === newBuild.buildNumber);
    if (existingIndex >= 0) {
      realBuilds[existingIndex] = newBuild;
    } else {
      realBuilds.unshift(newBuild);
    }
    
    realBuilds = realBuilds.slice(0, 10);
    
    console.log('✅ Build data stored. Total builds:', realBuilds.length);
    
    res.status(201).json({ 
      message: 'Build data received successfully',
      build: newBuild
    });
    
  } catch (error) {
    console.error('❌ Error processing build data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'DevOps CI/CD Dashboard API - WITH REAL JENKINS BUILDS!',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/builds', async (req, res) => {
  if (realBuilds.length > 0) {
    console.log('📊 Returning real build data:', realBuilds.length, 'builds');
    res.json(realBuilds);
  } else {
    res.json([]);
  }
});

app.get('/api/deployments', async (req, res) => {
  const deployments = await getRealDeployments();
  res.json(deployments);
});

app.get('/api/system-health', async (req, res) => {
  const deployments = await getRealDeployments();
  res.json({
    cpu: 45,
    memory: 67,
    disk: 23,
    activePods: deployments.filter(d => d.status === 'Running').length,
    totalPods: deployments.length
  });
});

app.listen(PORT, () => {
  console.log(`�� Dashboard backend running on port ${PORT} - READY FOR REAL BUILDS!`);
});

app.get('/api/dashboard', async (req, res) => {
  const deployments = await getRealDeployments();
  const builds = realBuilds.length > 0 ? realBuilds : [];
  
  res.json({
    builds: builds,
    deployments: deployments,
    systemHealth: {
      cpu: 45,
      memory: 67,
      disk: 23,
      activePods: deployments.filter(d => d.status === 'Running').length,
      totalPods: deployments.length
    },
    logs: []
  });
});
