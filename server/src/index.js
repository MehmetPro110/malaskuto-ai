require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/application');
const clientRoutes = require('./routes/client');

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: db.open ? 'connected' : 'disconnected' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/servers', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
