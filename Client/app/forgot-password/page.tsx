"use client";
import Link from "next/link";
import "../login/auth.css";

export default function ForgotPassword() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    try {
      const response = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("If an account exists, a password reset link has been sent!");
        window.location.href = "/login";
      } else {
        const data = await response.json().catch(() => ({}));
        alert(`Error: ${data.message || "Failed to send reset link"}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Reset Password</h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#666",
            marginBottom: "10px",
          }}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="auth-input"
        />

        <button type="submit" className="auth-btn">
          Send Link
        </button>

        <Link href="/login" className="auth-link">
          Back to Login
        </Link>
        <Link href="/signup" className="auth-link">
          Create an account
        </Link>
      </form>
    </div>
  );
}
