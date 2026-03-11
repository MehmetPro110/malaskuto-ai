const express = require('express');
const authenticateToken = require('../middleware/auth');
const { pteroClientClient } = require('../utils/pterodactyl');
const db = require('../db');

const router = express.Router();

// Get user's servers from local DB and fetch their current status from Pterodactyl
router.get('/', authenticateToken, async (req, res) => {
  try {
    const servers = db.prepare('SELECT * FROM servers WHERE user_id = ?').all(req.user.id);

    // We can also fetch the real-time status for each server if needed,
    // but for listing, just returning the DB records or fetching from panel is fine.
    // Fetching from panel client API ensures we get exact details:
    const pteroServersRes = await pteroClientClient.get('/');
    const pteroServers = pteroServersRes.data.data.map(s => s.attributes);

    // Filter to only show servers that belong to this user based on our local DB
    const userServerUuids = servers.map(s => s.ptero_uuid);
    const result = pteroServers.filter(s => userServerUuids.includes(s.uuid));

    res.json({ servers: result });
  } catch (error) {
    console.error('Error fetching servers:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch servers' });
  }
});

// Helper to verify server ownership
const verifyOwnership = (userId, uuid) => {
  const server = db.prepare('SELECT * FROM servers WHERE user_id = ? AND ptero_uuid = ?').get(userId, uuid);
  return !!server;
};

// Get specific server details
router.get('/:uuid', authenticateToken, async (req, res) => {
  if (!verifyOwnership(req.user.id, req.params.uuid)) {
    return res.status(403).json({ error: 'Unauthorized access to this server' });
  }

  try {
    const serverRes = await pteroClientClient.get(`/servers/${req.params.uuid}`);
    res.json(serverRes.data.attributes);
  } catch (error) {
    console.error('Error fetching server details:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch server details' });
  }
});

// Send a power signal (start, stop, restart, kill)
router.post('/:uuid/power', authenticateToken, async (req, res) => {
  if (!verifyOwnership(req.user.id, req.params.uuid)) {
    return res.status(403).json({ error: 'Unauthorized access to this server' });
  }

  const { signal } = req.body;
  if (!['start', 'stop', 'restart', 'kill'].includes(signal)) {
    return res.status(400).json({ error: 'Invalid power signal' });
  }

  try {
    await pteroClientClient.post(`/servers/${req.params.uuid}/power`, { signal });
    res.json({ message: `Power signal '${signal}' sent successfully` });
  } catch (error) {
    console.error('Error sending power signal:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send power signal' });
  }
});

// Get websocket credentials for live console
router.get('/:uuid/websocket', authenticateToken, async (req, res) => {
  if (!verifyOwnership(req.user.id, req.params.uuid)) {
    return res.status(403).json({ error: 'Unauthorized access to this server' });
  }

  try {
    const wsRes = await pteroClientClient.get(`/servers/${req.params.uuid}/websocket`);
    res.json(wsRes.data.data);
  } catch (error) {
    console.error('Error fetching websocket credentials:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch websocket credentials' });
  }
});

module.exports = router;
