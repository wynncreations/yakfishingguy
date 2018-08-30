const express   = require('express');
const router    = express.Router();

router.get('/',(req,res) => {
  console.log(req.currentUser);
  res.render('login')
});

router.post("/",(req,res)=>{
  console.log(req.user);
});

module.exports = router;