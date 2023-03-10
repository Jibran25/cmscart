var express = require('express');

var router = express.Router();


router.get('/', function(req, res){
    res.send('Admin area');
});

//Get add pages
router.get('/add-page', function(req, res){
    var title= "";
    var slug= "";
    var content= "";

    res.render('admin/add_page',{
        title:title,
        slug:slug,
        content:content
    });
});

router.post('/add-page', function(req, res){
    
    req.checkBody('title','Title Must have a value').notEmpty();
    req.checkBody('content','Content Must have a value').notEmpty();
     
    var title =req.body.title;
    var slug =req.body.slug.replace(/\s+/g,'-').toLowerCase();
    if(slug =="") slug = title.replace(/\s+/g,'-').toLowerCase();
    var content =req.body.content;

    var errors = req.validationErrors();

    if(errors){
       
        res.render('admin/add_page',{
            errors:errors,
            title:title,
            slug:slug,
            content:content
        });
    } else{
        console.log("success");
    }
    
});

module.exports= router; 