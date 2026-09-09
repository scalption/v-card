/**
 * Данные проставил через ИИ
 */
import type { LinkType, SkillCategory } from '../generated/prisma/enums.js';

export interface SeedData {
  slug: string;
  name: string;
  headline: string;
  description: string;
  location?: string;
  email?: string;
  links: Array<{ label: string; url: string; type: LinkType }>;
  skills: Array<{ name: string; category: SkillCategory; level?: number }>;
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    summary?: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description?: string;
    repoUrl?: string;
    liveUrl?: string;
    stack: string[];
    featured?: boolean;
    year?: number;
  }>;
}

export const seedData: SeedData = {
  slug: 'ogol-vladimir',
  name: 'Оголь Владимир',
  headline: 'Fullstack-разработчик',
  description:
    'Fullstack-разработчик с опытом создания веб-приложений с 2018 года. Работаю с проектами разной сложности: SPA и SSR-приложения, микросервисы, дашборды, внутренние системы, публичные веб-сервисы и SaaS. Быстро погружаюсь в существующий код и стек, проектирую архитектуру с нуля и развиваю имеющуюся, уверенно работаю как в команде, так и самостоятельно. Формат работы - удалённо, готов к редким командировкам.',
  location: 'Астана, Казахстан',
  email: 'vldmr_s@icloud.com',

  links: [
    { label: 'GitHub', url: 'https://github.com/r5800h', type: 'GITHUB' },
    { label: 'Telegram', url: 'https://t.me/aqtobe_67', type: 'TELEGRAM' },
    { label: 'Email', url: 'mailto:vldmr_s@icloud.com', type: 'EMAIL' },
    { label: 'Телефон', url: 'tel:+77064447070', type: 'OTHER' },
    { label: 'WhatsApp', url: 'https://wa.me/77064447070', type: 'OTHER' },
  ],

  skills: [
    { name: 'TypeScript', category: 'LANGUAGE', level: 5 },
    { name: 'JavaScript', category: 'LANGUAGE', level: 5 },
    { name: 'PHP', category: 'LANGUAGE', level: 4 },
    { name: 'Python', category: 'LANGUAGE', level: 3 },
    { name: 'SQL', category: 'LANGUAGE', level: 4 },
    { name: 'HTML и CSS', category: 'LANGUAGE', level: 5 },

    { name: 'React', category: 'FRAMEWORK', level: 5 },
    { name: 'Next.js', category: 'FRAMEWORK', level: 5 },
    { name: 'Node.js', category: 'FRAMEWORK', level: 5 },
    { name: 'NestJS', category: 'FRAMEWORK', level: 4 },
    { name: 'Express', category: 'FRAMEWORK', level: 4 },
    { name: 'Laravel', category: 'FRAMEWORK', level: 4 },
    { name: 'Vue.js', category: 'FRAMEWORK', level: 3 },
    { name: 'Svelte', category: 'FRAMEWORK', level: 3 },
    { name: 'Django', category: 'FRAMEWORK', level: 3 },

    { name: 'PostgreSQL', category: 'DATABASE', level: 4 },
    { name: 'MySQL', category: 'DATABASE', level: 4 },
    { name: 'SQLite', category: 'DATABASE', level: 4 },
    { name: 'MongoDB', category: 'DATABASE', level: 3 },
    { name: 'Supabase', category: 'DATABASE', level: 3 },
    { name: 'Firebase', category: 'DATABASE', level: 3 },
    { name: 'Prisma', category: 'DATABASE', level: 4 },

    { name: 'Git и GitHub', category: 'TOOL', level: 5 },
    { name: 'Docker и Docker Compose', category: 'TOOL', level: 4 },
    { name: 'Docker Swarm', category: 'TOOL', level: 3 },
    { name: 'GitHub Actions', category: 'TOOL', level: 4 },
    { name: 'Dokploy', category: 'TOOL', level: 3 },
    { name: 'CapRover', category: 'TOOL', level: 3 },
    { name: 'Linux', category: 'TOOL', level: 4 },

    {
      name: 'Проектирование REST и WebSocket API',
      category: 'PRACTICE',
      level: 4,
    },
    { name: 'Интеграция со сторонними API', category: 'PRACTICE', level: 5 },
    {
      name: 'Монолитная и микросервисная архитектура',
      category: 'PRACTICE',
      level: 4,
    },
    { name: 'SSR и оптимизация фронтенда', category: 'PRACTICE', level: 4 },
    {
      name: 'Деплой и настройка инфраструктуры',
      category: 'PRACTICE',
      level: 4,
    },
    { name: 'Web3 и блокчейн-интеграции', category: 'PRACTICE', level: 3 },
    {
      name: 'Техническое лидерство в небольшой команде',
      category: 'PRACTICE',
      level: 3,
    },
  ],

  experiences: [
    {
      company: 'Частная практика / аутсорсинг (ИП)',
      position: 'Fullstack-разработчик, Team Lead, DevOps',
      startDate: '2018-01',
      endDate: null,
      summary:
        'Веду веб-проекты полного цикла: от обсуждения задачи и проектирования архитектуры до деплоя и поддержки на продакшене.',
      achievements: [
        'Разрабатываю SPA и SSR-приложения на React и Next.js, а также дашборды, внутренние системы и публичные SaaS-сервисы',
        'Проектирую и реализую backend на Node.js (NestJS, Express), PHP (Laravel) и Python: собственные REST и WebSocket API, интеграции со сторонними сервисами',
        'Работаю с монолитной и микросервисной архитектурой, выбирая подход под задачу продукта',
        'Настраиваю инфраструктуру и деплой: Docker и Docker Compose, Docker Swarm, Dokploy, CapRover, CI/CD на GitHub Actions, домены и собственный почтовый сервис',
        'Беру на себя роль тимлида на части проектов: декомпозиция задач, код-ревью, технические решения и коммуникация с заказчиком',
        'Быстро подключаюсь к существующим кодовым базам, включая легаси на jQuery и PHP',
      ],
    },
  ],

  projects: [
    {
      name: 'Цифровая визитка',
      description:
        'Собственный сервис-визитка: GraphQL API на NestJS + Prisma + PostgreSQL',
      stack: [
        'TypeScript',
        'NestJS',
        'GraphQL',
        'Prisma',
        'PostgreSQL',
        'Docker',
      ],
      featured: true,
      year: 2026,
    },
  ],
};
