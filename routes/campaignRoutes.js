const express = require('express');
const router = express.Router();
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaignController');

router.get('/', getAllCampaigns);
router.post('/', createCampaign);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

module.exports = router;