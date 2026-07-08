"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./CreateVid.css";

export const UpdateVid = () => {
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("dtube_token");

    try {
      const response = await fetch(`http://localhost:8000/update/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Video Successfully updated");
      } else {
        alert(`Update Failed: ${data.message}`);
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

        <h2>Update Video</h2>

        <div className="formGroup">
          <label htmlFor="videoId">Video ID:</label>
          <input
            type="text"
            id="videoId"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            required
            className="inpText"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="title">New Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="inpText"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">New Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
            className="inpText"
          ></textarea>
        </div>

        <button type="submit" className="submitBtn">
          Update
        </button>
      </form>
    </div>
  );
};
