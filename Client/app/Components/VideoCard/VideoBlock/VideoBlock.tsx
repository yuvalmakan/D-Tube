import "./VideoBlock.css";
import Link from "next/link";

interface Prop {
  thumbnail: string;
  children: string;
  creatorPic: string;
  vref: string;
}

function VideoBlock({ thumbnail, children, creatorPic, vref }: Prop) {
  return (
    <div className="videoBlock">
      <Link href={vref}>
        <img src={thumbnail} alt={children} className="thumbnail" />
      </Link>
      <div className="videoInfo">
        <img src={creatorPic} alt="Creater's Picture" className="logo" />
        <div className="videoText">
          <h3 className="title">{children}</h3>
        </div>
      </div>
    </div>
  );
}

export default VideoBlock;
