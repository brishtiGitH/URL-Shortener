const URL = require('../models/url')
const ssid = require('ssid')

const generateNewURL = async (req, res) => {
    const shortId = ssid();
    const body = req.body;

    console.log(`body: `, body)

    if (!body.url) res.status(400).send({ msg: "url is required." })

    const newURL = await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    // res.status(200).send({ id: shortId })
    res.render('home', {
        link: `http://localhost:8000/url/${shortId}`
    })
}
const handleRedirectURL = async (req, res) => {
    const id = req.params.id;
    // const entry = await URL.findOne({ shortID: id })
    const entry = await URL.findOneAndUpdate({ shortID: id },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })
    res.redirect(entry.redirectURL);
}
const handleGetAnalytics = async (req, res) => {
    const id = req.params.id
    const entry = await URL.findOne({ shortID: id })
    res.send({
        totalClicks: entry.visitHistory.length, analytics: entry.visitHistory
    })
}
module.exports = { generateNewURL, handleRedirectURL, handleGetAnalytics }