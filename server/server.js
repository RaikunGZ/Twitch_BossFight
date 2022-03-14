// initializing
const express = require("express");
const Datastore = require('nedb');
const cors = require('cors'); // Sicherheit Ben! nachlesen

// Express to function -> listen@all
const app = express();
app.listen(3000, ()=> console.log("listening at 3000"))
app.use(cors());
app.use(express.json({limit: "1mb"}))
app.use(express.static('public'))

// Create databases (login and boss)
const loginDB = new Datastore('login.db');
const bossDB = new Datastore('boss.db');
loginDB.loadDatabase();
bossDB.loadDatabase();

// insert formData to bossDB -> bossSpawned
app.post('/bossAPI', (request, response) => {
  console.log('bossSpawned')
  console.log(request.body)
  console.log(response)
  const bossData = request.body;
  bossDB.insert(bossData)
  console.log(bossDB)
  response.json({
    bossName: request.body.bossName,
    health: request.body.health,
    level: request.body.level,
    multiplier: request.body.multiplier,
    deathMSG: request.body.deathMSG,
    emoteDMG: request.body.emote,
    followDMG: request.body.follow,
    subDMG: request.body.sub,
    prefix: request.body.prefix,
  })
})


// insert LoginData to LoginDB -> success Login route
app.post('/loginAPI', (request, response) => {
  console.log('success')
  console.log(request.body)
  console.log(response)
  const bossData = request.body;
  bossDB.insert(bossData)
  console.log(bossDB)
  response.json({
    loginName: request.body.loginName,
    password: request.body.password,
  })
})


// insert registerData to LoginDB -> successfull registrated register route
app.post('/registerAPI', (request, response) => {
  console.log('success')
  console.log(request.body)
  console.log(response)
  const loginData = request.body;
  loginDB.insert(loginData)
  console.log(bossDB)
  response.json({
    loginName: request.body.loginName,
    password: request.body.password,
  })
})