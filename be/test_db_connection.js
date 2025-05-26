const tunnel = require('tunnel-ssh');
const { Sequelize } = require('sequelize');
const fs = require('fs');

const config = {
  username: 'ubuntu',
  host: '43.199.71.100',
  port: 22,
  privateKey: fs.readFileSync('\Users\User\Downloads\home@23871104.pem'),
  dstHost: 'database-1.cr2ggicgueb4.ap-east-1.rds.amazonaws.com',
  dstPort: 3306,
  localHost: '127.0.0.1',
  localPort: 3306,
  keepAlive: true
};

tunnel(config, (error, server) => {
  if (error) {
    console.error('SSH tunnel error:', error);
    return;
  }

  const sequelize = new Sequelize('jamming', 'admin', '12345678', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  });

  sequelize.authenticate()
    .then(() => console.log('Database connected through SSH tunnel'))
    .catch(err => console.error('Database connection error:', err));
});
