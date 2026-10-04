const Lead = require('../models/Lead');

// POST /api/leads (public - the enquiry form)
const createLead = async (req, res) => {
  const { name, schoolOrg, phone, email } = req.body;
  if (!name || !schoolOrg || !phone || !email) {
    return res.status(400).json({ message: 'Name, school, phone and email are required' });
  }
  // simple honeypot spam protection
  if (req.body.website) return res.status(200).json({ message: 'Thank you!' });

  const lead = await Lead.create(req.body);
  res.status(201).json({ message: 'Enquiry submitted successfully', lead });
};

// GET /api/leads (admin)
const getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
};

const updateLeadStatus = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  lead.status = req.body.status || lead.status;
  await lead.save();
  res.json(lead);
};

const deleteLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  await lead.deleteOne();
  res.json({ message: 'Lead deleted' });
};

module.exports = { createLead, getLeads, updateLeadStatus, deleteLead };
