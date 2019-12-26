module.exports = {
  apps: [{
      name: "gateway",
      script: "gateway.js",
      watch: true,
      ignore_watch: ["node_modules", "assets"],
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "auth",
      script: "microservices/auth/app.js",
      watch: true,
      ignore_watch: ["node_modules", "assets"],
      max_memory_restart: "200M"
    },
    {
      name: "blog",
      script: "microservices/blog/app.js",
      watch: true,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "render",
      script: "microservices/render/app.js",
      watch: true,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "users",
      script: "microservices/users/app.js",
      watch: true,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    },
    {
      name: "home",
      script: "microservices/home/app.js",
      watch: true,
      max_memory_restart: "200M",
      ignore_watch: ["node_modules", "assets"],
    }
  ]
}