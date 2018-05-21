const express = require('express');
const formApi = require('../controllers/formApiController')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  formApi.authenticate()
  .then(redirectUrl => {
    res.redirect(redirectUrl);
  })
  .catch(err => {
    console.log("error: ", err)
  })
  
});

router.get('/form', function(req, res, next) {
  res.render('form');
})

module.exports = router;
