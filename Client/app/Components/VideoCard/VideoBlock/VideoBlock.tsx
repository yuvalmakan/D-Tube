import "./VideoBlock.css";

interface Prop {
  thumbnail: string;
  children: string;
  creatorPic: string;
}

function VideoBlock({ thumbnail, children, creatorPic }: Prop) {
  return (
    <a href="#" className="videoBlock">
      <img src={thumbnail} alt={children} className="thumbnail" />
      <div className="videoInfo">
        <img src={creatorPic} alt="Creater's Picture" className="logo" />
        <div className="videoText">
          <h3 className="title">{children}</h3>
        </div>
      </div>
    </a>
  );
}

export default VideoBlock;
