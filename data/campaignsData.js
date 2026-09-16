let campaigns = [
  {
    id: 1,
    title: "Весенняя распродажа 2026",
    subject: "Скидки до 50% только на этой неделе!",
    template: "promo_spring_template",
    status: "sent",
    recipientsCount: 1540,
    openRate: 28.4,
    createdAt: "2026-03-01T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Список обновлений платформы",
    subject: "Что нового появилось в марте?",
    template: "newsletter_list",
    status: "scheduled",
    recipientsCount: 3200,
    openRate: 0,
    createdAt: "2026-03-10T14:30:00.000Z"
  },
  {
    id: 3,
    title: "Опрос удовлетворенности клиентов",
    subject: "Помогите нам стать лучше - пройдите опрос",
    template: "feedback_survey",
    status: "draft",
    recipientsCount: 0,
    openRate: 0,
    createdAt: "2026-03-15T09:15:00.000Z"
  }
];

module.exports = campaigns;