const express = require('express')
const app = express()

app.use(express.static("public"));

app.get('/', function (req, res) {
  console.log("Homepage Opened");
  res.sendFile(__dirname+'/public/index.html')
})

app.get('/contact', function (req, res) {
  console.log("Contact form Opened");
  res.sendFile(__dirname+'/public/contact.html')
})

app.listen(3000,function() {
  console.log("Listening on port 3000")
})
