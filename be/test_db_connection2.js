const { createTunnel } = require('tunnel-ssh');
const { Sequelize } = require('sequelize');

const tunnelOptions = { autoClose: true };
const serverOptions = { port: 3307 }; // local port to forward
const sshOptions = {
  host: '43.199.71.100',
  port: 22,
  username: 'ubuntu',
  privateKey: require('fs').readFileSync('/Users/jason/Downloads/2025-05@dg-innotech.com.pem')
};
const forwardOptions = {
  srcAddr: '127.0.0.1',
  srcPort: 3307,
  dstAddr: 'database-1.cr2ggicgueb4.ap-east-1.rds.amazonaws.com',
  dstPort: 3306
};

createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions)
  .then(([server, conn]) => {
    console.log('SSH tunnel established');
    // Now connect Sequelize to localhost:3307

    const sequelize = new Sequelize('jamming', 'admin', '12345678', {
        host: '127.0.0.1',
        port: 3307,
        dialect: 'mysql',
      });
    
      sequelize.authenticate()
        .then(() => console.log('Database connected through SSH tunnel'))
        .catch(err => console.error('Database connection error:', err));

  })
  .catch(err => {
    console.error('Tunnel error:', err);
  });
