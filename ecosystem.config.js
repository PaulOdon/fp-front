module.exports = {
  apps: [
    {
      name: "test_front",
      script: "npm",
      args: "start",
      watch: ".",
      env_test: {
        NODE_ENV: "production",
        PORT: 3001,
      }
    },
    {
      name: "val_front",
      script: "npm",
      args: "start",
      watch: ".",
      env_val: {
        NODE_ENV: "production",
        PORT: 4001,
      }
    },
  ],

  deploy: {
    test: {
      user: "debian",
      host: "51.255.171.55",
      ref: "origin/developpement",
      repo: "git@gitlab.com:madava2021/facily_post/front_office.git",
      path: "/var/app/test/frontOffice/",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --only test_front --env test && pm2 save",
      "pre-setup": "",
    },
    val: {
      user: "debian",
      host: "51.255.171.55",
      ref: "origin/val",
      repo: "git@gitlab.com:madava2021/facily_post/front_office.git",
      path: "/var/app/val/frontOffice/",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --only val_front --env val && pm2 save",
      "pre-setup": "",
    },
  },
};
