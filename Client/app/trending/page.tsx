import React from "react";
import VideoCardTrending from "../Components/VideoCard/VideoCardTrending";
import SideBar from "../Components/SideBar/SideBar";
import NavBar from "../Components/NavBar/NavBar";
import "../page.css";

export default function HomePage() {
  return (
    <div className="homePage">
      <NavBar></NavBar>
      <SideBar></SideBar>
      <VideoCardTrending></VideoCardTrending>
    </div>
  );
}
