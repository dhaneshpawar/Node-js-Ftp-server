//express
var express = require('express');

//bodyParser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//MongoDB 
var mongoose = require('mongoose');

//requiring users databse controller
var userModel = require('../../../database-controllers/users-database-controller');
var sessionModel = require('../../../database-controllers/session-database-controller');
var postsSchema = require('../../communicate-database-contollers/posts-schema-contoller');
var friendschema = require('../../communicate-database-contollers/friends-schema-contoller');
var notificationSchema = require('../../communicate-database-contollers/notification-schema-controller'); 
 

//redering webpages
module.exports = function (app) 
{
    app.get('/post', urlencodedParser , function( req, res)
    {
        sessionModel.find({sessionid: req.session.id},function (err,data) {
            console.log(req.session.id)
            usernid = data[0].nid;
            usergmail = data[0].gmail;
            res.render('communicate-views/post');
        })      
    });
};
