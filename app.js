var http = require('http');

//express
var express = require('express');
var app = express();
//MongoDB 
var mongoose = require('mongoose');

//session
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const passport = require('passport');
//sign in with Google
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
app.use('/auth',authRoutes);


//socket.io
var socket = require('socket.io');


//BodyParser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());

// ejs and static files
app.set('view engine','ejs');
app.use('/',express.static('./public'));
app.use('/',express.static('./public/uploads/mindmatch/profile'));

// requiring controllers for Databases
var usersDatabaseController = require('./controllers/database-controllers/users-database-controller');
var sessionDatabaseController = require('./controllers/database-controllers/session-database-controller');
var helpDatabaseController = require('./controllers/database-controllers/help-database-controller');
var feedbackDatabaseController = require('./controllers/database-controllers/feedback-database-controller');
var mindmatchDatabaseController = require('./controllers/database-controllers/mindmatch-database-controller');

// requiring controllers for webpages
var sessionController = require('./controllers/session-controller');
var indexController = require('./controllers/index-controller');
var infoController = require('./controllers/info-controller');
var nestimaticController = require('./controllers/nestimatic-controller');
var settingsController = require('./controllers/settings-controller');
var helpAndFeedbackController = require('./controllers/help-and-feedback-controller');
var mindmatchController = require('./controllers/mindmatch-controller');
var crackmiContoller = require('./controllers/crackmi-controller');
var crackmiUploadController = require('./controllers/crackmi-upload-controller');
var profileController = require('./controllers/communicate-controllers/profile-page-controllers/profile-page-controller');
var changeProfileController = require('./controllers/communicate-controllers/profile-page-controllers/changes-profile-page-controller');

//---------------------------- communicate controllers ---------------------------------//

//home-page contollers
var communicateController = require('./controllers/communicate-controllers/home-page-controllers/communicate-controller');
var dateController = require('./controllers/communicate-controllers/home-page-controllers/date-controller');
var detailsController = require('./controllers/communicate-controllers/home-page-controllers/details-controller');

//post data controllers 
var commmentContoller = require('./controllers/communicate-controllers/home-page-controllers/post-data-controllers/comment-controller');
//var postController = require('./controllers/communicate-controllers/home-page-controllers/post-data-controllers/post-controller'); 

//friend controller
var friendsController = require('./controllers/communicate-controllers/friends-contoller');
var friendProfileController = require('./controllers/communicate-controllers/friend-profile-controller');

//post controllers - one for image and one for video
var postOfImageController = require('./controllers/communicate-controllers/home-page-controllers/post-data-controllers/image-post-controller');
var postOfVideoController = require('./controllers/communicate-controllers/home-page-controllers/post-data-controllers/video-post-controller');

//notification controller
var notificationController = require('./controllers/communicate-controllers/home-page-controllers/notification-controller');

//like and delete controllers 
var likeController = require('./controllers/communicate-controllers/home-page-controllers/post-data-controllers/like-controller');
var deleteController = require('./controllers/communicate-controllers/home-page-controllers/post-data-controllers/delete-controller');
//global variables for user 

/*var usernid = 0;
var usergmail;
var maxid = 0;
var maxhelpid;
var maxfeedbackid;
var username;
var usersurname;
*/

//Mongodb
//To run mongoDB Database "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
//To run mongoDB Shell    "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"

//requiring multer
var multer  = require('multer');

// server listening
var server = http.createServer(app).listen(3000,function () 
{
console.log('! ---------------------- Server is running on 3000 ---------------------- ! ');
console.log('http://localhost:3000/')
});

//socket setup
var io = socket(server);


// firing controllers
sessionController(app);
indexController(app);
infoController(app);
nestimaticController(app);
settingsController(app);
helpAndFeedbackController(app);
mindmatchController(app);
crackmiContoller(app);
crackmiUploadController(app);

//------------------------------ firing communicate controllers ----------------------------// 

//home-page contollers
communicateController(app,io);
dateController(app); 
detailsController(app,io)

//post data contollers
commmentContoller(app,io);
//postController(app);

//profile page controller
profileController(app,io);
changeProfileController(app);

//friends controller
friendsController(app,io);
friendProfileController(app);

//post controllers - one for image and one for video
postOfImageController(app,io);
postOfVideoController(app,io);

//notification controller
notificationController(app,io);

//like and delete controllers 
likeController(app,io);
deleteController(app,io);

