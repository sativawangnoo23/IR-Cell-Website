// Module Requirements
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs');

// Secrets  (Change at Last)


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
app.get('/about', function (req, res) {
  res.render('about')
})
app.get('/mous', function (req, res) {
  res.render('mous')
})
app.get('/team', function (req, res) {
  res.render('team')
})
app.get('/events', function (req, res) {
  res.render('events')
})
app.get('/partners', function (req, res) {
  res.render('partners')
})

// Contact form
const contact = require(__dirname+'/contact.js');
app.get('/contact', function (req, res) {
  res.render('contact')
})
app.post('/contact', function (req,res){
  contact.submitContact(req,res)
})

// Posts
const posts = require(__dirname+'/posts.js');
posts.showPosts(app);
posts.createPost(app);
posts.showPost(app,express);

// Listening Port
app.listen(port,function() {
  console.log("Listening on port")
})
