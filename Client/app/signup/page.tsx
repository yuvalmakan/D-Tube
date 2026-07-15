"use client";
import Link from "next/link";
import "../login/auth.css";

export default function SignUp() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      return alert("Passwords do not match!");
    }

    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      profilePicture: "default",
    };

    const res = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <input
          name="username"
          type="text"
          placeholder="Username"
          required
          className="auth-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="auth-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="auth-input"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          className="auth-input"
        />

        <button type="submit" className="auth-btn">
          Sign Up
        </button>

        <Link href="/login" className="auth-link" style={{ marginTop: "5px" }}>
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
}
