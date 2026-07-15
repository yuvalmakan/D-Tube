"use client";

import React from "react";
import BaseIcon from "../../Components/SideBar/SideBarIcons/BaseIcon";
import "./User.css";

interface prop {
  userId: string;
  children?: string;
  onDelete?: (userId: string) => void;
}

export const User = ({ userId, children, onDelete }: prop) => {
  return (
    <div className="user">
      <div className="userText">{children}</div>
      <BaseIcon
        className="userIcon"
        iconName="deleteUser"
        color="red"
        stroke="red"
        size={40}
        onclick={onDelete ? () => onDelete(userId) : undefined}
      />
    </div>
  );
};
