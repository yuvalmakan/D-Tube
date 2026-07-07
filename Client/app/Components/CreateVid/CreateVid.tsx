"use client";
import React from "react";
import "./CreateVid.css";

export const CreateVid = () => {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("dtube_token");
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("http://localhost:8000/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Video Successfuly uploaded");
      } else {
        alert(`Upload Failed ${data.message}`);
      }
    } catch (err) {
      alert("Couldn't connect to the server");
    }
  };

  return (
    <div className="inputBox">
      <form
        onSubmit={handleSubmit}
        className="uploadForm"
        action="/create"
        method="POST"
      >
        <h2>Upload Video</h2>

        <div className="formGroup">
          <label htmlFor="title">Video Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="inpText"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="video">Video File:</label>
          <input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            required
            className="inFile"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="thumbnail">Thumbnail Image:</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            required
            className="inFile"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="description">Description:</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            required
            className="inpText"
          ></textarea>
        </div>

        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
};
