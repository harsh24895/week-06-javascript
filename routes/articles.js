const express = require('express');
const router = express.Router();
const Article = require('../models/article');



router.get('/', async(req, res, next) => {
    //this will retuen all the articles from the DB
  const articles = await Article.find({}).catch(() => {  
    return [];
  });

    res.render('articles/archive.pug', { articles });
    //res.send("Workinggggg");
});


router.get('/create', (req, res, next) =>{
  res.render('articles/create', {});
});

router.post('/create', async(req, res, next) =>{
  const article = new Article(req.body);
  await article.save();
  res.redirect('/articles');
});

module.exports = router;