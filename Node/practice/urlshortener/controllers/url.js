const shortid = require('shortid');
const url = require('../models/url');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    console.log("📦 Received URL in body:", body.url); // Debug log
    
    if (!body.url)
        return res.status(400).json({ error: "A url is required as input!" });

    const shortID = shortid();
    await url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
        createdBy : req.user._id
    })
    
    return res.render("home",{
        id : shortID
    });
}

async function handleTotalVisits(req, res) {
    const id = req.params.id;

    const required = await url.findOne({ shortId: id });

    return res.json({ "Total Clicks": required.visitHistory.length , Analytics : required.visitHistory})
}

async function handleRedirect(req, res) {
    const id = req.params.id;

    const entry = await url.findOneAndUpdate(
        {
            shortId: id
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    console.log(entry)
    return res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateShortUrl, handleTotalVisits, handleRedirect
}