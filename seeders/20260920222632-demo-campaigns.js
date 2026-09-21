'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Campaigns', [
      {
        title: "Весенняя распродажа 2026",
        subject: "Скидки до 50% только на этой неделе!",
        template: "promo_spring_template",
        status: "sent",
        recipientsCount: 1540,
        openRate: 28.4,
        priority: "high",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Список обновлений платформы",
        subject: "Что нового появилось в марте?",
        template: "newsletter_digest",
        status: "scheduled",
        recipientsCount: 3200,
        openRate: 0.0,
        priority: "normal",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Опрос удовлетворенности клиентов",
        subject: "Помогите нам стать лучше — пройдите опрос",
        template: "feedback_survey",
        status: "draft",
        recipientsCount: 0,
        openRate: 0.0,
        priority: "low",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Campaigns', null, {});
  }
};