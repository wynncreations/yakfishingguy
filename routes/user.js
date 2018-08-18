const express   = require('express')
const router    = express.Router()
const mongoose  = require('mongoose')
const request   = require('request')
const User      = require('../models/user')
const Auth      = require('../models/auth')
const FB        = require('fb')

var options = {
  useNewUrlParser: true
};

router.get('/',(req,res) => {
  mongoose.connect(process.env.DEVURL, options, (err) => {
    if(err) console.log('There was an error connecting to the database', err);

    Auth.findOne({userID: req.query.id}, (err, resp) => {
      if(err) console.log('There was an error looking up the user', err);
      request.get('https://graph.facebook.com/'+resp.userID+'?fields=name,email&access_token='+resp.accessToken, (err, resp) => {
        if(err) console.log('There was an error getting the user back', err)
        console.log('user details:', JSON.parse(resp.body));
        if(JSON.parse(resp.body).error) {
          if( JSON.parse(resp.body).error.code == 190) {
            // users token has expired - redirect to login page
            res.redirect('/login')
          }
        } else {
          res.render('user')
        }
      })      
    })
  });
});

module.exports = router;