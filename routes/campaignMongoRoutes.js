const express = require('express');
const router = express.Router();
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  addRecipient,
  updateRecipientStatus
} = require('../controllers/campaignMongoController');

router.get('/', getAllCampaigns);
router.post('/', createCampaign);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

router.post('/:id/recipients', addRecipient);
router.patch('/:id/recipients/:recipientId', updateRecipientStatus);

module.exports = router;