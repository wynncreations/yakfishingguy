var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){

    //Get request for the page's ID
    request('graph.facebook.com/240049356649866?fields=business_discovery.username(yakfishingguy){followers_count,media_count,media{media_url}', {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body.url);
        console.log(body.explanation);
    }); 

    // //Request media url for the most recent post.
    // request('graph.facebook.com/'+body.id+'/media?fields=id,media_type,media_url,owner,timestamp', {
    //     json: true
    // }, (err, res, media) => {
    //     if (err) {
    //         return console.log(err);
    //     }

    // });

    //send media url to the landing page.
    res.render("landing",{mediaURL: media.media_url});
});

router.get("/tos", function (req, res) {
    res.render("tos");
});

router.get("/privacy", function (req, res) {
    res.render("privacy");
});



module.exports = router;