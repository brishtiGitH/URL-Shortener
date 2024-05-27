const express = require('express')
const router = express.Router()
const { generateNewURL, handleRedirectURL, handleGetAnalytics } = require('../controllers/url')

router.post('/', generateNewURL)
router.get('/:id', handleRedirectURL)
router.get('/analytics/:id', handleGetAnalytics)

module.exports = router;