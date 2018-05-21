var express = require('express');
var router = express.Router();
var formApi = require('../controllers/formApiController');
/* GET users listing. */
router.post('/makeForm', function(req, res, next) {
  formApi.create(req.body)
  .then(result => {
      console.log(result)
  })

  res.send('respond with a resource');
});

module.exports = router;
