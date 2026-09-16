let campaigns = require('../data/campaignsData');

const getAllCampaigns = (req, res, next) => {
  try {
    const { status } = req.query;
    if (status) {
      const filtered = campaigns.filter(
        c => c.status.toLowerCase() === status.toLowerCase()
      );
      return res.status(200).json({
        total: filtered.length,
        data: filtered
      });
    }
    res.status(200).json({
      total: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    next(error);
  }
};

const getCampaignById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Некорректный ID",
        message: "Параметр ID должен быть числом"
      });
    }

    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) {
      return res.status(404).json({
        error: "Не найдено",
        message: `Рассылка с ID ${id} не найдена`
      });
    }

    res.status(200).json({ data: campaign });
  } catch (error) {
    next(error);
  }
};

const createCampaign = (req, res, next) => {
  try {
    const { title, subject, template, recipientsCount, status } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        error: "Ошибка валидации",
        message: "Поле 'title' обязательно и не должно быть пустым"
      });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({
        error: "Ошибка валидации",
        message: "Поле 'subject' обязательно и не должно быть пустым"
      });
    }

    const newId = campaigns.length > 0
      ? Math.max(...campaigns.map(c => c.id)) + 1
      : 1;

    const newCampaign = {
      id: newId,
      title: title.trim(),
      subject: subject.trim(),
      template: template || "default_template",
      status: status || "draft",
      recipientsCount: Number(recipientsCount) || 0,
      openRate: 0,
      createdAt: new Date().toISOString()
    };

    campaigns.push(newCampaign);

    res.status(201).json({
      message: "Email-рассылка успешно создана",
      data: newCampaign
    });
  } catch (error) {
    next(error);
  }
};

const updateCampaign = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Некорректный ID",
        message: "Параметр ID должен быть числом"
      });
    }

    const index = campaigns.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({
        error: "Не найдено",
        message: `Рассылка с ID ${id} не найдена`
      });
    }

    const { title, subject, template, status, recipientsCount, openRate } = req.body;

    if (!title || !subject) {
      return res.status(400).json({
        error: "Ошибка валидации",
        message: "При полном обновлении (PUT) поля 'title' и 'subject' обязательны"
      });
    }

    campaigns[index] = {
      id: id,
      title: title.trim(),
      subject: subject.trim(),
      template: template || campaigns[index].template,
      status: status || campaigns[index].status,
      recipientsCount: recipientsCount !== undefined ? Number(recipientsCount) : campaigns[index].recipientsCount,
      openRate: openRate !== undefined ? Number(openRate) : campaigns[index].openRate,
      createdAt: campaigns[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    res.status(200).json({
      message: "Email-рассылка успешно обновлена",
      data: campaigns[index]
    });
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Некорректный ID",
        message: "Параметр ID должен быть числом"
      });
    }

    const index = campaigns.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({
        error: "Не найдено",
        message: `Рассылка с ID ${id} не найдена или уже была удалена ранее`
      });
    }

    const deletedItem = campaigns.splice(index, 1)[0];

    res.status(200).json({
      message: "Рассылка успешно удалена",
      deletedId: id,
      deletedItem: deletedItem
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