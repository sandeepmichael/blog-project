//jshint esversion:6

const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')
const mongoose = require('mongoose')

const homestartingpoint = "THIS IS THE HOMEPAGE OF MY BLOG..!!"

const aboutContent = "Iam sandeep michael currently iam pursuing BTech in JNTU Hyderabad."
const contactContent = "This is the contact page You can reach out me by sending emails to this emailId:sandeepmichael65@outlook.com Iam excited to receive anything from anyone see u all :)" 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sandy:sandy234@cluster0.ehpkf.mongodb.net/blog1DB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);



app.get('/', (req, res) => {
 Post.find({}, (err, posts) => {res.render('home', {startingcontent : homestartingpoint, newPosts: posts})
})
})

app.get('/about', (req, res) => {
    res.render('about', {aboutpoint : aboutContent})
  })
  

  app.get('/contact', (req, res) => {
    res.render('contact', {contactpoint : contactContent})
  })
  app.get('/compose', (req, res) => {
    res.render('compose')
  })


  app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
          Title: post.title,
          Content: post.content
        });
      });
    
    })



app.post('/compose', (req, res) => {
    
    const post = new Post({
        title:req.body.addtext,
        content:req.body.postbody
    })
post.save((err) => {
      if(!err) {
        res.redirect('/')
      }
    })
})

app.post('/delete', (req, res) => {
  const deletedpostId = req.body.submit
  Post.findByIdAndRemove(deletedpostId, (err) => {
    if(!err) {
      console.log("succeesfuly deleted")
      res.redirect("/")
    } else {
      res.render('home', {startingcontent : homestartingpoint, newPosts: posts})
    }
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
