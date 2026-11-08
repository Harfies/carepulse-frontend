import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/client";

import "./Login.css";

export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <main className="cp-login">

      {/* Background overlay */}
      <div className="cp-login-overlay" />

      {/* Hospital branding at the top left */}
      <header className="cp-login-header">
        <div className="cp-login-brand">
          <div className="cp-login-brand-icon">
            <Activity size={25} />
          </div>

          <div>
            <strong>CarePulse</strong>
            <span>PRIMARY HEALTHCARE</span>
          </div>
        </div>
      </header>

      {/* Centred login form */}
      <section className="cp-login-card">

        <div className="cp-login-card-icon">
          <Activity size={25} />
        </div>

        <div className="cp-login-eyebrow">WELCOME BACK</div>

        <h2>Sign in to CarePulse</h2>

        <p className="cp-login-description">
          Enter your staff credentials to access your account.
        </p>

        {error && (
          <div className="cp-login-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="cp-login-form">

          {/* Email */}
          <div className="cp-login-field">
            <label htmlFor="cp-email">Email address</label>

            <div className="cp-login-input">
              <Mail size={18} />

              <input
                id="cp-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@healthcentre.com"
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="cp-login-field">
            <label htmlFor="cp-password">Password</label>

            <div className="cp-login-input">
              <LockKeyhole size={18} />

              <input
                id="cp-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="cp-login-reveal"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Sign in */}
          <button
            type="submit"
            className="cp-login-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={18} />}
          </button>

        </form>

        <div className="cp-login-card-footer">
          <ShieldCheck size={16} />
          <span>Protected staff access</span>
        </div>

      </section>

      {/* Footer */}
      <footer className="cp-login-footer">
        © {new Date().getFullYear()} CarePulse · Primary Healthcare Management
      </footer>

    </main>
  );
}