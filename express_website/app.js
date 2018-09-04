var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  res.render('index');
})

app.get('/about', function(req, res){
  res.render('about');
})

app.get('/contact', function(req, res){
  res.render('contact');
})

app.post('/contact/send', function(req, res){
  var transporter = nodemailer.createTransport({
   service: "Gmail",
   auth: {
     user: 'tahamazari@gmail.com',
     pass: 'seecsest111'
   }
 });

   var mailOptions = {
     from: 'Taha Mazari <tahamazari@gmail.com>',
     to: 'tahamazari@gmail.com',
     subject: 'Node.js App',
     text: 'This is the text of email by Name: ' + req.body.email + 'Message: ' + req.body.message,
     html: '<p>Hey there!</p>' + req.body.name + '<p> is my name and email is ' + req.body.email + 'and Message:' + req.body.message
   };
   transporter.sendMail(mailOptions, function(error, info){
     if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent ' + info.response);
      res.redirect('/');
    }
   });

});

app.listen(3001);
console.log("Server is running here!")
