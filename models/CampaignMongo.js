const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'opened', 'bounced'],
    default: 'pending'
  },
  openedAt: {
    type: Date,
    default: null
  }
});

const campaignMongoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  template: {
    type: String,
    default: 'promo_sale'
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sent'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  tags: [String],
  recipients: [recipientSchema],
  authorEmail: {
    type: String,
    default: 'admin@mailspace.com'
  },
  scheduledDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const CampaignMongo = mongoose.model('CampaignMongo', campaignMongoSchema);

module.exports = CampaignMongo;