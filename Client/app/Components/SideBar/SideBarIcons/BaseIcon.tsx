import React from "react";
import Link from "next/link";
import { IconPaths, IconName } from "../../../../public/assets/iconLibrary";

interface Prop {
  className?: string;
  color?: string;
  size?: string | number;
  stroke?: string;
  strokeWidth?: Number;
  onclick?: () => void;
  iconName: IconName;
  link?: string;
}

function BaseIcon({
  iconName,
  className,
  color = "none",
  size = 24,
  stroke = "black",
  strokeWidth = 1.5,
  onclick,
  link,
}: Prop) {
  const icon = (
    <svg
      className={className}
      onClick={onclick}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={stroke}
      strokeWidth={Number(strokeWidth)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={IconPaths[iconName]} />
    </svg>
  );

  return link ? <Link href={link}>{icon}</Link> : icon;
}

export default BaseIcon;
