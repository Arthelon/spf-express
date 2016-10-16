const express = require('express');
const spfExpress = require('spf-express');
const router = express.Router();

/* GET home page. */
router.get(spfExpress('/', (req, res, next) => {
    res.render('layouts/index');
}));

router.get(spfExpress('/about/', (req, res, next) => {
    res.render('layouts/about');
}));

module.exports = router;
