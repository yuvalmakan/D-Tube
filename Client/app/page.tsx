import React from "react";
import VideoCard from "./Components/VideoCard/VideoCard";
import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/NavBar/NavBar";
import "./page.css";

export default function HomePage() {
  return (
    <div className="homePage">
      <NavBar></NavBar>
      <SideBar></SideBar>
      <VideoCard></VideoCard>
    </div>
  );
}
