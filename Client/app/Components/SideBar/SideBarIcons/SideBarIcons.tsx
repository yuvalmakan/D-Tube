import "./SideBarIcons.css";
import BaseIcon from "./BaseIcon";
import { ReactNode } from "react";
import { IconName } from "../../../../public/assets/iconLibrary";
import Link from "next/link";

interface Prop {
  children: ReactNode;
  iconName: IconName;
  type: "main icon" | "Subscribed" | "no link";
  imgSrc?: string;
  alt?: string;
  href: string;
}

function SideBarIcon({ children, iconName, type, imgSrc, alt, href }: Prop) {
  const image =
    type !== "Subscribed" ? (
      <BaseIcon iconName={iconName} />
    ) : (
      <img src={imgSrc} alt={alt} className="sidebar-icon-img" />
    );

  return (
    <Link href={href} className="sidebar-link">
      {image}
      <span className="sidebar-title">{children}</span>
    </Link>
  );
}

export default SideBarIcon;
