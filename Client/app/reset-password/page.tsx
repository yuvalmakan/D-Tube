"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "../login/auth.css";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setMessage("Error: No reset token found in the URL.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        alert("Success! You can now log in.");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("Error connecting to the backend server.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Reset Password</h2>

        {message && <p style={{ color: "red", fontSize: "14px" }}>{message}</p>}

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="auth-input"
        />

        <button type="submit" className="auth-btn">
          Save Password
        </button>

        <Link href="/login" className="auth-link">
          Back to Login
        </Link>
      </form>
    </div>
  );
}
