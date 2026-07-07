import "./SideBarIcons.css";
import BaseIcon from "./BaseIcon";
import { ReactNode } from "react";
import { IconName } from "../../../../public/assets/iconLibrary";

interface Prop {
  children: ReactNode;
  iconName: IconName;
  type: "main icon" | "Subscribed" | "no link";
  imgSrc?: string;
  alt?: string;
}

function SideBarIcon({ children, iconName, type, imgSrc, alt }: Prop) {
  const linkProps = type !== "no link" ? { href: "#" } : {};
  const image =
    type !== "Subscribed" ? (
      <BaseIcon iconName={iconName} />
    ) : (
      <img src={imgSrc} alt={alt} className="sidebar-icon-img" />
    );

  return (
    <a {...linkProps} className="sidebar-link">
      {image}
      <span className="sidebar-title">{children}</span>
    </a>
  );
}

export default SideBarIcon;
