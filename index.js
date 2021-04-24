const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static("public"));

app.get('/', function (req, res) {
  console.log("Homepage Opened");
  res.sendFile(__dirname+'/public/index.html')
})


// Define the static file path

app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})


// Contact form
app.get('/contact', function (req, res) {
  console.log("Contact form Opened");
  res.sendFile(__dirname+'/public/contact.html')
})

const password="YKTKDMgSsdQSIbfV"
const dbUrl="mongodb+srv://web-user:"+password+"@ir-cluster.c9zhs.mongodb.net/ir?retryWrites=true&w=majority"
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema={name:String, email:String, date:String, organization:String, designation:String, subject:String, message:String}
const Contact = mongoose.model('Contact',contactSchema)

app.post('/contact', function(req,res) {
  const newContact = new Contact(req.body)
  newContact.date = Date().toString()
  newContact.save()
  res.sendFile(__dirname+'/public/contactsaved.html');
})




// Listening Port
app.listen(3000,function() {
  console.log("Listening on port 3000")
})
