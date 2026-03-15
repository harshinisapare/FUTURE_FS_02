const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// ── GET /api/leads ────────────────────────────────────────────────────────────
// Fetch all leads, newest first
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads', details: err.message });
  }
});

// ── GET /api/leads/:id ────────────────────────────────────────────────────────
// Fetch a single lead by ID
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lead', details: err.message });
  }
});

// ── POST /api/leads ───────────────────────────────────────────────────────────
// Create a new lead
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, source, status, value, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const lead = new Lead({ name, email, phone, company, source, status, value, notes });
    const saved = await lead.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create lead', details: err.message });
  }
});

// ── PATCH /api/leads/:id ──────────────────────────────────────────────────────
// Update any fields of a lead (status, notes, value, etc.)
router.patch('/:id', async (req, res) => {
  try {
    const allowedFields = ['name', 'email', 'phone', 'company', 'source', 'status', 'value', 'notes'];
    const updates = {};

    // Only allow updating known fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true } // return updated doc + validate
    );

    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update lead', details: err.message });
  }
});

// ── DELETE /api/leads/:id ─────────────────────────────────────────────────────
// Delete a lead permanently
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete lead', details: err.message });
  }
});

module.exports = router;