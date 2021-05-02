const mongoose = require('mongoose');
const moment = require('moment');

const mongopassword = process.env.mongoPassword  //Hide at end
const dbUrl = "mongodb+srv://web-user:" + mongopassword + "@ir-cluster.c9zhs.mongodb.net/ir?retryWrites=true&w=majority"
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = {
  id: Number,
  title: String,
  author: String,
  email: String,
  date: String,
  text: String,
  other: String,
  visibility: {
    type: Boolean,
    default: false
  }
};

const Post = mongoose.model('Post', postSchema);


function showPosts(app) {
  var maxPage = 10
  var page=0
  app.get("/posts", function(req, res) {

    Post.find({visibility:true},null,{sort:{id:-1}}, function(err, posts) {
      maxPage=Math.floor(posts.length/10 + 1)
      res.render("posts",{ posts:posts.slice(page*10,page*10+11)});
    });
  });

  app.post("/posts",function(req,res){
      Post.find({visibility:true},null,{sort:{id:-1}}, function(err, posts) {
      maxPage=Math.floor(posts.length/10 + 1)
      if (page>-1 && page<maxPage){
        if(req.body.btn=='prev'){page=page-1}
        if(req.body.btn=='next'){page=page+1}
      }
      res.render("posts",{ posts:posts.slice(page*10,page*10+10)});
    });
  })

}

exports.showPosts = showPosts

function createPost(app){
  app.get('/createpost', function(req,res){
    res.render("createpost")
  })

  app.post('/createpost', function(req,res){
    const newPost = new Post(req.body)
    newPost.date = moment().utcOffset(330).format('YYYY MM DD HH:mm:ss')
    newPost.save()
    res.render('postsuccess',{createdPost: newPost})
  })
}

exports.createPost = createPost

function showPost(app,express){
  app.use('/posts/:id',express.static("public"))
  app.get('/posts/:id',function(req,res){
    var findId = req.params.id
    Post.findOne({id:findId, visibility:true},function(err,foundPost){
      res.render('post',{post:foundPost})
    })
  })
}

exports.showPost=showPost
