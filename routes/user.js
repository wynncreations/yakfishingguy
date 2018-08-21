const express   = require('express')
const router    = express.Router()
const mongoose  = require('mongoose')
const request   = require('request')
const User      = require('../models/user')

var options = {
  useNewUrlParser: true
};

router.post('/facebook/save', (req, res) => {
  mongoose.connect(process.env.DEVURL, options, (err) => {
    var saveUser = new User(req.body);
    console.log(req.body);

    // look up if the user exists already or not
    User.findOne({id:saveUser.id}, (err, foundUser) => {
      if(err) console.log('There was an error looking up existing users:', err)
      // if there is no user found, save this user
      if(!foundUser) {
        saveUser.save((err, resp) => {
          if(err) console.log('There was an error saving this user:', err)

          // log to server we saved user
          console.log('Saved user:', resp);

          // send up code to redirect to user page
          res.send({code: 200, message: 'User saved - redirect to user page', user: resp})
    
          // close the connection when we're done
          mongoose.connection.close();
        })
      } else {
        // otherwise redirect to user page
        res.send({code: 200, message: 'User exists - redirect to user page', user: foundUser})
      }
    })
  })
})

router.post('/facebook/saveAccessToken', (req, res) => {
  //console.log("req: ",req);//There is req data with a new ID/access token.
  //console.log("UserID: ", req.body.authResponse.userID);
  mongoose.connect(process.env.DEVURL, options, (err) => {
    if(err){
      console.log('There was an error connecting to DB:', err)
    }else{

      //console.log(req.body.authResponse.accessToken);
      // User.findOne({
      //   id: req.body.authResponse.userID
      // }, (err, user) => {
      //   console.log(err);
      //   user.set({
      //     accessToken: req.body.authResponse.accessToken
      //   })
      //   user.save((err, resp) => {
      //     if (err) console.log('There was an error looking up and updating this user:', err)
      //     res.send({
      //       code: 200,
      //       message: 'User updated - redirect to user page',
      //       user: user
      //     })
      //   })
      // });





    }
  });
})

router.get('/', (req,res) => {
  mongoose.connect(process.env.DEVURL, options, (err) => {
    if(err) console.log('There was an error connecting to the database', err);

    User.findOne({id: req.query.id}, (err, user) => {
      if(err) console.log('There was an error looking up user:', err)
      // close the connection when we're done
      mongoose.connection.close();

      var fields = 'fields=id,media_type,media_url,owner,timestamp';
      var accessToken = 'access_token='+user.accessToken;

      request.get('https://graph.facebook.com/'+user.id+'?'+fields+'&'+accessToken, (err, resp) => {
        if(err) console.log('There was an error getting info back from facebook:', err)
        console.log('from facebook:', resp.body);
      })

      res.render('user', {user:user});
    })
  });
});

// internal tool only to clear db of all users
router.get('/deleteAllUsers', (req, res) => {
  mongoose.connect(process.env.DEVURL, options, (err) => {
    User.remove({}, (err, resp) => {
      res.send('All users cleared')
    })
  })
})

// internal tool only to see all users
router.get('/getAllUsers', (req, res) => {
  mongoose.connect(process.env.DEVURL, options, (err) => {
    User.find({}, (err, resp) => {
      if(err) console.log('There was an error finding all users:', err)
      // close the connection when we're done
      mongoose.connection.close();     

      res.send(resp)
    })
  });
})

module.exports = router;