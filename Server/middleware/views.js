const Video = require("../models/videos");

async function viewed (req, res, next) {
    const videoId = req.params.id;
    const video = await Video.findOne( { _id: videoId } );

    video.views += 1;

    await video.save();
    next();
}

module.exports = { viewed };