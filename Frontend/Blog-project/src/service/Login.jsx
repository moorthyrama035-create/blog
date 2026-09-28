import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Blogimage from "../assets/blog.png";
import bloggirl from "../assets/bloggirl.png";
import { Link } from "react-router-dom";
import { API_URL } from "./api";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handlesubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const { data } = await axios.post(`${API_URL}/api/Login`, {
        email: email.trim(),
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (requestError) {
      setSubmitError(
        requestError.response?.data?.message ||
          (requestError.response
            ? "Sign in failed. Please try again."
            : `Cannot reach the server at ${API_URL}. Make sure the backend is running.`),
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
        <img className="h-9 w-9 object-contain" src={Blogimage} alt="" />
        <span className="font-serif text-xl font-bold">Blogify</span>
      </header>
      <main className="mx-auto grid max-w-6xl overflow-hidden bg-white shadow-sm lg:min-h-[calc(100vh-88px)] lg:grid-cols-[1fr_0.9fr]">
        <section className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-[#17483e] p-6 text-white sm:p-10 lg:min-h-full">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Welcome back
            </p>
            <h1 className="mt-4 max-w-md font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Good stories bring us together.
            </h1>
          </div>
          <img
            className="mx-auto mt-5 h-40 w-full object-contain sm:h-56 lg:h-72"
            src={bloggirl}
            alt="Illustration of a person writing"
          />
        </section>
        <section className="flex items-center px-4 py-8 sm:px-10 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
              Your account
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">Sign in</h2>
            {location.state?.notice && (
              <p role="status" className="mt-3 text-sm text-emerald-800">
                {location.state.notice}
              </p>
            )}
            <form onSubmit={handlesubmit} className="mt-7 grid gap-4">
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Email
                <input
                  required
                  autoComplete="email"
                  onChange={(event) => setemail(event.target.value)}
                  className="rounded-sm border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-700 focus:outline-none"
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Password
                <input
                  required
                  autoComplete="current-password"
                  onChange={(event) => setpassword(event.target.value)}
                  className="rounded-sm border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-700 focus:outline-none"
                  type="password"
                  value={password}
                  placeholder="Your password"
                />
              </label>
              {submitError && (
                <p role="alert" className="text-sm text-red-700">
                  {submitError}
                </p>
              )}
              <button
                disabled={submitting}
                className="mt-1 rounded-sm bg-[#17483e] px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                type="submit"
              >
                {submitting ? "Signing you in..." : "Sign in"}
              </button>
              {submitting && (
                <p role="status" className="text-center text-sm text-slate-600">
                  Connecting securely to the server...
                </p>
              )}
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
              New to Blogify?{" "}
              <Link
                className="font-semibold text-emerald-800 hover:underline"
                to="/"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
