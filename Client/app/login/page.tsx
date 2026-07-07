"use client";
import Link from "next/link";
import "./auth.css";

export default function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Successful!", data);
        alert("You are now logged in!");
      } else {
        console.error("Login Failed:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
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

        <button type="submit" className="auth-btn">
          Log In
        </button>
        <Link href="/signup" className="auth-link">
          Create an account
        </Link>
      </form>
    </div>
  );
}
