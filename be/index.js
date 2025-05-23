const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const Track = require('./models/track')


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// http://localhost:3001/api/search?term=abc

/*

    req.query is like : 

    {
        term: "abc"
    }
*/

app.get("/api/search", (req, res)=>{
    // const term = req.query['term']

    const allTracks = Track.findAll()

    res.send(allTracks)

})

app.get("/api/db_sync", (req, res)=>{
    Track.sync()
    res.send("Database synced")
})

// ---------------------- Create ssh tunnel and start server -----------------------

const { createTunnel } = require('tunnel-ssh');

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
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Tunnel error:', err);
  });






