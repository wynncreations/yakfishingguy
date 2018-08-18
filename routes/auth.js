const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const request   = require('request');
const Auth      = require('../models/auth')
const User      = require('../models/user')

var options = {
  useNewUrlParser: true
};


// just in case we wanted to delete all users for some reason
router.get('/facebook/deleteAllUsers', (req, res) => {
  mongoose.connect(process.env.DEVURL, options, (err) => {
    // not passing any args to remove targets everything
    Auth.remove({}, (err, resp) => {
      // should build a global error handler class
      if(!err) res.send('All users auth deleted');
    })
  });
})

router.post('/facebook/save', (req, res) => {
  // connect to db
  mongoose.connect(process.env.DEVURL, options, (err) => {
    // need a global error handler probably
    if(err) console.log('There was an error connecting to the database', err);
    // find any existing auth users based on user id we can tap into this later
    // and deal with refreshing the access tokens etc
    Auth.findOne({userID: req.body.userID}, (err, user) => {
      // should build a global error handler class
      if(err) console.log('There was an error connecting to the database');
      // if there is no user lets save the credentials and redirect them to user page
      if(!user) {
        // create new user
        var saveAuth = new Auth(req.body);

        // save new user
        saveAuth.save( (err, resp) => {
          // should build a global error handler class
          if(err) console.log('There was an error saving the new authentication...:', err);

          // log in server
          console.log('New auth saved!', resp)

          // redirect to user page with user creds
          // might be worth implementing to express session here
          // so people dont have to keep re-logging in
          res.send({code: 200, message: 'User saved - redirect to user page', user: resp})
        })
      } else {
        // this user already exists - log it and redirect
        console.log('This user already exists:', user)

        if(req.body.accessToken != user.accessToken) {
          // if the access tokens dont match lets update the user
          // with the new info
          Auth.update({userID: user.userID}, {$set: {accessToken: req.body.accessToken, expiresIn: req.body.expiresIn}}, (err, resp) => {
            if(err) console.log('There was an error updating the users auth:', err)
            console.log('Users auth updated');
            // redirect to user page
            res.send({code: 200, message: 'User exists - redirect to user page', user: user})
          })
        } else {
          // this user is logged in and has an up to date access token
          // redirect to user page
          res.send({code: 200, message: 'User exists - redirect to user page', user: user})
        }
      }
    })
  });
})

module.exports = router;