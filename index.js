const express = require('express')
const app = express()

app.get('/', function (req, res) {
  console.log("Homepage Opened");
  res.send('Hello World')
})

app.listen(3000,function() {
  console.log("Listening on port 3000")
})
