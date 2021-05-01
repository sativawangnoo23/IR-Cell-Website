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
// app.get('/:pagename',function(req,res) {
//   if (req.params.pagename !== "posts") {
//     res.render(req.params.pagename)
//   }
// })

// Contact form
const contact = require(__dirname+'/contact.js');
app.post('/contact', function (req,res){
  contact.submitContact(req,res)
})

// Posts
const posts = require(__dirname+'/posts.js');
posts.showPosts(app);

// Listening Port
app.listen(port,function() {
  console.log("Listening on port")
})
