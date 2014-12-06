module.exports = {
  mysqlConfigs: {
    host: '199.98.20.114',
    user: 'root',
    password: 'toor',
    database: 'managementsystem'
  },
  sessionSecret: process.env.SESSION_SECRET || 'Custom session secret',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};
