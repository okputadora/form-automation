const express = require('express');
const { google } = require('googleapis');
const formApi = require('../controllers/formApiController')
require('dotenv').config(); // strange that I need this here when it's already in app.js
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3000/form",
  process.env.API_KEY,
  process.env.SCRIPT_KEY
);
const router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(oAuth2Client)
  formApi.authenticate(oAuth2Client)
  .then(redirectUrl => {
    console.log("redirecting to ", redirectUrl)
    res.redirect(redirectUrl);
  })
  .catch(err => {
    console.log("error: ", err)
  })

});

router.get('/form', function(req, res, next) {
  // code passed from google oAuth
  const code = req.query.code
  oAuth2Client.getToken(code, (err, token) => {
      // if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      res.render('form');
  });

})

router.post('/makeForm', function(req, res, next) {
  console.log("in the post route")
  formApi.create(req.body, oAuth2Client)
  .then(result => {
      console.log("RESULT ", result.data)
      res.send('respond with a resource');
  })
  .catch(err => res.send(err))
});

module.exports = router;
