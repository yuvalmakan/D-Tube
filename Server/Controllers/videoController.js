const fs = require('fs');
const path = require('path');
const Video = require('../models/videos');

const streamVideo = async (req, res) => {
    try {
        const id = req.params.id;
        
        const videoDoc = await Video.findById(id);
        
        if (!videoDoc) {
            return res.status(404).send("Video not found in database.");
        }

        const range = req.headers.range;
        if (!range) {
            return res.status(400).send("Requires Range Header");
        }     
        
        const videoPath = path.join(__dirname, '..', videoDoc.videoUrl);
        
        const videoSize = fs.statSync(videoPath).size;

        const chunkSize = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunkSize, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
        
    } catch (error) {
        console.error("Streaming Error:", error);
        res.status(500).send("Internal Server Error while streaming.");
    }
}

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);

  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos from database" });
  }
};

const uploadVideo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const uploaderId = req.user?.user || req.user?._id;

        const videoFile = req.files['video']?.[0];
        const thumbnailFile = req.files['thumbnail']?.[0];

        if (!videoFile || !thumbnailFile) {
            return res.status(400).json({ message: 'Video and thumbnail files are required.' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Description is required.' });
        }

        if (!uploaderId) {
            return res.status(401).json({ message: 'Uploader information is missing.' });
        }

        const video = new Video({
            title: title,
            description: description,
            uploaderId: uploaderId,
            videoUrl: `/uploads/videos/${videoFile.filename}`,
            thumbnailUrl: `/uploads/thumbnails/${thumbnailFile.filename}`
        });

        await video.save();

        res.status(201).json({ message: "Video uploaded successfully!" });

    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ message: "Failed to save video data." });
    }
}

module.exports = {
    streamVideo,
    getAllVideos,
    uploadVideo
}