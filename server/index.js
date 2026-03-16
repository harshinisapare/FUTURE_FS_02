const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const leadsRouter = require('./routes/leads');

const app = express();

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'https://forgecrm.vercel.app',
    'https://forgecrm-ixau8vilh-harshinisapare30-7229s-projects.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.use('/api/leads', leadsRouter);

// Health check — visit http://localhost:5000/api/health to confirm server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Forge CRM API is running' });
});

// ── DATABASE + SERVER START ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    ssl: true,
    tls: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });