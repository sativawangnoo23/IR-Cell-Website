const express = require('express')
const app = express()

app.use(express.static("public"));

app.get('/', function (req, res) {
  console.log("Homepage Opened");
  res.sendFile(__dirname+'/public/index.html')
})

app.listen(3000,function() {
  console.log("Listening on port 3000")
})
