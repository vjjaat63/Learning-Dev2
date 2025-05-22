const express = require('express');
const router = express.Router();
const {handleGenerateShortUrl,handleTotalVisits,handleRedirect} = require('../controllers/url')


router.post('/', handleGenerateShortUrl);
router.get('/:id',handleRedirect);
router.get('/analytics/:id',handleTotalVisits);

module.exports = router;