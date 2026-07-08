"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./CreateVid.css";

export const DeleteVid = () => {
  const [videoId, setVideoId] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Quick confirmation box so users don't accidentally delete videos
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    const token = localStorage.getItem("dtube_token");

    try {
      const response = await fetch(`http://localhost:8000/delete/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Video Successfully deleted");
        setVideoId(""); // Clear the input box
      } else {
        alert(`Delete Failed: ${data.message}`);
      }
    } catch (err) {
      alert("Couldn't connect to the server");
    }
  };

  return (
    <div className="inputBox">
      <form onSubmit={handleSubmit} className="uploadForm">
        <div className="navLinks">
          <Link href="/create">Upload</Link>
          <Link href="/update">Update</Link>
          <Link href="/delete">Delete</Link>
        </div>

        <h2>Delete Video</h2>

        <div className="formGroup">
          <label htmlFor="videoId">Video ID to Delete:</label>
          <input
            type="text"
            id="videoId"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            required
            className="inpText"
          />
        </div>

        <button
          type="submit"
          className="submitBtn"
          style={{ backgroundColor: "#dc3545" }}
        >
          Delete Video
        </button>
      </form>
    </div>
  );
};
