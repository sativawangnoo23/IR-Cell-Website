const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
  console.log("Homepage Opened");
  res.sendFile(__dirname+'/public/index.html')
})

// Contact form
app.get('/contact', function (req, res) {
  console.log("Contact form Opened");
  res.sendFile(__dirname+'/public/contact.html')
})

app.post('/contact', function(req,res) {
  console.log(req.body)
})

app.listen(3000,function() {
  console.log("Listening on port 3000")
})
