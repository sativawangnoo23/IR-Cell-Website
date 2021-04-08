const express = require('express')
const app = express()

app.get('/', function (req, res) {
  console.log("Homepage Opened");
  res.sendFile(__dirname+'/public/index.html')
})


// Define the static file path

app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})


app.listen(3000,function() {
  console.log("Listening on port 3000")
})
