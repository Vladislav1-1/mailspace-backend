const CampaignMongo = require('../models/CampaignMongo');

const getAllCampaigns = async (req, res, next) => {
  try {
    const { status, tag } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = tag;
    }

    const campaigns = await CampaignMongo.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      total: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    next(error);
  }
};

const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await CampaignMongo.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        error: 'Не найдено',
        message: 'Кампания с указанным ID не найдена'
      });
    }

    res.status(200).json({ data: campaign });
  } catch (error) {
    next(error);
  }
};

const createCampaign = async (req, res, next) => {
  try {
    const { title, subject, template, status, priority, tags, recipients, scheduledDate } = req.body;

    if (!title || !subject) {
      return res.status(400).json({
        error: 'Ошибка валидации',
        message: 'Поля title и subject обязательны'
      });
    }

    const newCampaign = await CampaignMongo.create({
      title,
      subject,
      template,
      status,
      priority,
      tags: tags || [],
      recipients: recipients || [],
      scheduledDate: scheduledDate || null
    });

    res.status(201).json({
      message: 'Кампания успешно создана в MongoDB',
      data: newCampaign
    });
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const updatedCampaign = await CampaignMongo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({
        error: 'Не найдено',
        message: 'Кампания не найдена'
      });
    }

    res.status(200).json({
      message: 'Кампания успешно обновлена',
      data: updatedCampaign
    });
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    const deletedCampaign = await CampaignMongo.findByIdAndDelete(req.params.id);

    if (!deletedCampaign) {
      return res.status(404).json({
        error: 'Не найдено',
        message: 'Кампания не найдена'
      });
    }

    res.status(200).json({
      message: 'Кампания успешно удалена из MongoDB',
      deletedId: req.params.id
    });
  } catch (error) {
    next(error);
  }
};

const addRecipient = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email обязателен' });
    }

    const campaign = await CampaignMongo.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          recipients: { email, status: 'pending' }
        }
      },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: 'Кампания не найдена' });
    }

    res.status(200).json({
      message: 'Получатель успешно добавлен во вложенный массив',
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};

const updateRecipientStatus = async (req, res, next) => {
  try {
    const { recipientId } = req.params;
    const { status } = req.body;

    const campaign = await CampaignMongo.findOneAndUpdate(
      { _id: req.params.id, 'recipients._id': recipientId },
      {
        $set: {
          'recipients.$.status': status,
          'recipients.$.openedAt': status === 'opened' ? new Date() : null
        }
      },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: 'Кампания или получатель не найдены' });
    }

    res.status(200).json({
      message: 'Статус получателя внутри вложенного массива обновлен',
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  addRecipient,
  updateRecipientStatus
};