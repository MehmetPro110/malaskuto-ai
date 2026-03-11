const express = require('express');
const authenticateToken = require('../middleware/auth');
const { pteroAppClient } = require('../utils/pterodactyl');
const db = require('../db');

const router = express.Router();

// Get available nodes and eggs for server creation
router.get('/options', authenticateToken, async (req, res) => {
  try {
    const nodesRes = await pteroAppClient.get('/nodes');
    const nodes = nodesRes.data.data.map((n) => ({ id: n.attributes.id, name: n.attributes.name }));

    const nestsRes = await pteroAppClient.get('/nests');
    const nests = nestsRes.data.data;

    const eggs = [];
    for (const nest of nests) {
      const eggsRes = await pteroAppClient.get(`/nests/${nest.attributes.id}/eggs`);
      for (const egg of eggsRes.data.data) {
        eggs.push({
          id: egg.attributes.id,
          nest_id: nest.attributes.id,
          name: egg.attributes.name,
          description: egg.attributes.description,
          docker_image: egg.attributes.docker_image,
        });
      }
    }

    res.json({ nodes, eggs });
  } catch (error) {
    console.error('Error fetching options:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch server options' });
  }
});

// Create a server
router.post('/servers', authenticateToken, async (req, res) => {
  const { name, egg_id, nest_id, node_id, plan } = req.body;
  const user = req.user;

  if (!name || !egg_id || !nest_id || !node_id || !plan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Predefined plans based on the user's request (1/2/3GB RAM, 1 Core, 10GB Disk)
  const plans = {
    '1gb': { memory: 1024, cpu: 100, disk: 10240 },
    '2gb': { memory: 2048, cpu: 100, disk: 10240 },
    '3gb': { memory: 3072, cpu: 100, disk: 10240 },
  };

  const selectedPlan = plans[plan];
  if (!selectedPlan) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    // 1. Fetch egg details to get default startup command and env vars
    const eggRes = await pteroAppClient.get(`/nests/${nest_id}/eggs/${egg_id}?include=variables`);
    const eggData = eggRes.data.attributes;
    const envVars = {};
    if (eggRes.data.attributes.relationships && eggRes.data.attributes.relationships.variables) {
      eggRes.data.attributes.relationships.variables.data.forEach((v) => {
        envVars[v.attributes.env_variable] = v.attributes.default_value;
      });
    }

    // 2. Create the server in Pterodactyl
    const serverPayload = {
      name: name,
      user: user.ptero_user_id,
      egg: parseInt(egg_id),
      docker_image: eggData.docker_image,
      startup: eggData.startup,
      environment: envVars,
      limits: {
        memory: selectedPlan.memory,
        swap: 0,
        disk: selectedPlan.disk,
        io: 500,
        cpu: selectedPlan.cpu,
      },
      feature_limits: {
        databases: 0,
        backups: 0,
        allocations: 1, // Require at least 1 allocation
      },
      allocation: {
        default: 0, // Panel should automatically assign an allocation on the node
      },
      deploy: {
        locations: [1], // Default location id 1, or adjust as needed
        dedicated_ip: false,
        port_range: [],
      },
    };

    // Note: We use the 'deploy' object to auto-assign an allocation instead of specifying a node/allocation ID
    // If the panel is setup for deployments. Otherwise we need an allocation ID.
    // Let's try to fetch an unassigned allocation for the node first:
    const allocationsRes = await pteroAppClient.get(`/nodes/${node_id}/allocations`);
    const availableAllocation = allocationsRes.data.data.find(a => !a.attributes.assigned);

    if (!availableAllocation) {
        return res.status(400).json({ error: 'No available allocations (ports) on this node.' });
    }

    serverPayload.allocation = {
        default: availableAllocation.attributes.id
    };
    delete serverPayload.deploy; // Remove deploy since we found an allocation

    const createRes = await pteroAppClient.post('/servers', serverPayload);
    const serverData = createRes.data.attributes;

    // 3. Save to local DB
    const insertStmt = db.prepare('INSERT INTO servers (user_id, ptero_server_id, ptero_uuid, name) VALUES (?, ?, ?, ?)');
    insertStmt.run(user.id, serverData.id, serverData.uuid, name);

    res.status(201).json({ message: 'Server created successfully', server: { uuid: serverData.uuid, name: serverData.name } });
  } catch (error) {
    console.error('Server creation error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create server', details: error.response?.data?.errors });
  }
});

module.exports = router;
