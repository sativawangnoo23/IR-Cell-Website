// Module Requirements
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejs = require('ejs');

// Secrets  (Change at Last)
const mongopassword="YKTKDMgSsdQSIbfV"

// Listening Port
const port = process.env.PORT || 3000

// Express and EJS
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Homepage
app.get('/', function (req, res) {
  res.render('home')
})

// Other Static Pages
app.get('/:pagename',function(req,res) {
  res.render(req.params.pagename)
})

// Contact form
app.get('/contact', function (req, res) {
  console.log("Contact form Opened");
  res.sendFile(__dirname+'/public/contact.html')
})

const dbUrl="mongodb+srv://web-user:"+mongopassword+"@ir-cluster.c9zhs.mongodb.net/ir?retryWrites=true&w=majority"
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
app.listen(port,function() {
  console.log("Listening on port")
})
