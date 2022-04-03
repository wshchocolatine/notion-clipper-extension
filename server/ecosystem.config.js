module.exports = {
    apps: [
      {
        name: 'Notion Clipper',
        script: './build/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
  }