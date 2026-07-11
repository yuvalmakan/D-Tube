const Video = require('../models/videos');
const User = require('../models/user');
const Like = require('../models/likeSchema');

const toggleLike = (req, res) => {
    try{
        console.log(req);

        const currVid = req.params.id;
        const userID = req.user._id;

        const liked = await Like.findOne( {userId: userID, videoId: currVid} );

        if (!liked){
            const like = new Like( {userId: userID, videoId: currVid} );
            alert("Liked");
        }
        else{
            findOneAndDelete({userId: userID, videoId: currVid});
            alert("Disliked");
        }
    }
    catch(error) {
        alert("Couldn't connect to database");
    }
}