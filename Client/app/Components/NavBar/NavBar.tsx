"use client";

import React, { useState } from "react";
import Image from "next/image";
import BaseIcon from "../SideBar/SideBarIcons/BaseIcon";
import "./NavBar.css";
import pfp from "../../../public/assets/default_pfp.png";
import { ProfilePic } from "./ProfilePic";

function NavBar() {
  const [Searched, setSearched] = useState("");

  const search = () => {
    alert(Searched);
  };

  return (
    <div className="navBar" style={{ gridArea: "navBar" }}>
      <a href="/" className="DTube">
        <BaseIcon
          iconName="icon"
          color="red"
          size={50}
          strokeWidth={0}
        ></BaseIcon>
      </a>
      <form onSubmit={search}>
        <input
          placeholder="Search"
          type="text"
          className="searchBar"
          value={Searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <button className="searchButton">
          <BaseIcon iconName="search" strokeWidth={0} color="black" />
        </button>
      </form>
      <ProfilePic
        pfp={pfp}
        style={{ marginLeft: "auto", flexShrink: 0 }}
        href="/login"
      />
    </div>
  );
}

export default NavBar;
