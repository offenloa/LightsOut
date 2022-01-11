const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 8080
const path = require('path')

var url = 'mongodb://localhost:27017/'

app.use(express.static("public"))


app.post('/leaderboard', function(req, res) {
    console.log(req.query);
    res.send("Recieved a post request");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err1, res) {
    if (err1) throw err1;
    console.log("Collection created!");
    db.close();
  });
});*/