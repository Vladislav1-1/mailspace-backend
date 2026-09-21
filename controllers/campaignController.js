const { Campaign } = require('../models');

const getAllCampaigns = async (req, res, next) => {
  try {
    const { status } = req.query;
    let queryOptions = {};

    if (status) {
      queryOptions.where = { status: status.toLowerCase() };
    }

    const campaigns = await Campaign.findAll(queryOptions);

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
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Некорректный ID", message: "ID должен быть числом" });
    }

    const campaign = await Campaign.findByPk(id);

    if (!campaign) {
      return res.status(404).json({ error: "Не найдено", message: `Рассылка с ID ${id} не найдена` });
    }

    res.status(200).json({ data: campaign });
  } catch (error) {
    next(error);
  }
};

const createCampaign = async (req, res, next) => {
  try {
    const { title, subject, template, recipientsCount, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Ошибка валидации", message: "Поле 'title' обязательно" });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: "Ошибка валидации", message: "Поле 'subject' обязательно" });
    }

    const newCampaign = await Campaign.create({
      title: title.trim(),
      subject: subject.trim(),
      template: template || "default_template",
      status: status || "draft",
      recipientsCount: Number(recipientsCount) || 0,
      openRate: 0.0
    });

    res.status(201).json({
      message: "Email-рассылка успешно создана",
      data: newCampaign
    });
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Некорректный ID", message: "ID должен быть числом" });
    }

    const { title, subject, template, status, recipientsCount, openRate } = req.body;
    if (!title || !subject) {
      return res.status(400).json({ error: "Ошибка валидации", message: "Поля 'title' и 'subject' обязательны при PUT" });
    }

    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ error: "Не найдено", message: `Рассылка с ID ${id} не найдена` });
    }

    await campaign.update({
      title: title.trim(),
      subject: subject.trim(),
      template: template || campaign.template,
      status: status || campaign.status,
      recipientsCount: recipientsCount !== undefined ? Number(recipientsCount) : campaign.recipientsCount,
      openRate: openRate !== undefined ? Number(openRate) : campaign.openRate
    });

    res.status(200).json({
      message: "Email-рассылка успешно обновлена",
      data: campaign
    });
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Некорректный ID", message: "ID должен быть числом" });
    }

    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ error: "Не найдено", message: `Рассылка с ID ${id} не найдена` });
    }

    await campaign.destroy();

    res.status(200).json({
      message: "Рассылка успешно удалена",
      deletedId: id
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
  deleteCampaign
};