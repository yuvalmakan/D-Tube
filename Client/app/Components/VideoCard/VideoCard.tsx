import VideoBlock from "./VideoBlock/VideoBlock";
import thumbnail from "../../../public/assets/thumbnail.png";
import image from "../../../public/assets/github.png";
import "./VideoCard.css";

function VideoCard() {
  return (
    <div className="videoCard" style={{ gridArea: "videoCard" }}>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        2 Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        3 Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        4 Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        5 Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        6 Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        Video where people r stupid
      </VideoBlock>
      <VideoBlock thumbnail={thumbnail.src} creatorPic={image.src}>
        Video where people r stupid
      </VideoBlock>
    </div>
  );
}

export default VideoCard;
