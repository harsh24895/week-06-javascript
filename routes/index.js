var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {

//  Article.find().then(articles => {
//    res.json(articles);
//  });

    res.render('index',{title: 'Donee'});
});

module.exports = router;
