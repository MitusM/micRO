module.exports = {
  apps: [{
      name: "gateway",
      script: "gateway.js",
      watch: false,
      ignore_watch: ["assets"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: "200M"
    },
    {
      name: "auth",
      script: "microservices/auth/app.js",
      watch: false,
      ignore_watch: ["node_modules", "assets"],
      max_memory_restart: "200M"
    },
    {
      name: "blog",
      script: "microservices/blog/app.js",
      watch: false,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "render",
      script: "microservices/render/app.js",
      watch: false,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "users",
      script: "microservices/users/app.js",
      watch: false,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "home",
      script: "microservices/home/app.js",
      watch: false,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "widget",
      script: "microservices/widget/app.js",
      watch: false,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "article",
      script: "microservices/article/app.js",
      watch: true,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "./assets"],
    }
  ]
}