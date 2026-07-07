import React from "react";
import { IconPaths, IconName } from "../../../../public/assets/iconLibrary";

interface Prop {
  color?: string;
  size?: string | number;
  stroke?: string;
  strokeWidth?: Number;
  iconName: IconName;
}

function BaseIcon({
  iconName,
  color = "none",
  size = 24,
  stroke = "black",
  strokeWidth = 1.5,
}: Prop) {
  return (
    <svg
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
}

export default BaseIcon;
