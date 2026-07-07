import React from "react";
import Image, { StaticImageData } from "next/image";
import "./ProfilePic.css";

interface Prop {
  pfp: StaticImageData;
  style?: object;
  href?: string;
}

export const ProfilePic = ({ pfp, style, href }: Prop) => {
  return (
    <a href={href} style={style}>
      <Image
        src={pfp}
        alt="profile picture"
        width={40}
        height={40}
        className="profile_pic"
      />
    </a>
  );
};
