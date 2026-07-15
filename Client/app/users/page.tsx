"use client";

import React from "react";
import "./Users.css";
import { User } from "./user/User";

const page = () => {
  async function getUsers() {
    const token = localStorage.getItem("dtube_token");
    const res = await fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("DATA: ", data);
    return data;
  }

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  console.log("USERS: ", users);

  const handleDelete = async (userId: string) => {
    const token = await localStorage.getItem("dtube_token");
    const res = await fetch(`http://localhost:8000/delete-channel/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log("DELETE DATA: ", data);
    setUsers(users.filter((user: any) => user._id != userId));
  };

  return (
    <div className="allUsers">
      {users.map((user: any) => (
        <User key={user._id} userId={user._id} onDelete={handleDelete}>
          {user.username}
        </User>
      ))}
      {users.length === 0 && <p>No users found.</p>}
    </div>
  );
};

export default page;
