const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Junsoor",
    image: "/junsoor.jpeg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "Entrepreneur, Software Engineer",
    bio: "Make a big thing!",
    email: "junsoor37@gmail.com",
    linkedin: "https://www.linkedin.com/in/junsoo-jang-75871a185/",
    github: "https://github.com/junsoo37",
    instagram: "",
  },
  projects: [
    {
      name: `morethan-log`,
      href: "https://github.com/junsoo37/morethan-log",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Junsoor",
    description: "Welcome to Junsoor's World!",
    theme: "auto", // ['light', 'dark', 'auto']
  },

  // CONFIG configration (required)
  link: "https://www.junsoor.com",
  since: 2023, // If leave this empty, current year will be used.
  lang: "en-US", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash
  seo: {
    keywords: ["Blog", "Website", "Notion"],
  },

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: "morethanmin/morethan-log",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}

module.exports = { CONFIG }