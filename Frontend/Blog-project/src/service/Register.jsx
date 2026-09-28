import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Blogimage from "../assets/blog.png";
import bloggirl from "../assets/bloggirl.png";
import { Link } from "react-router-dom";
import { API_URL } from "./api";
const Register = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const userschema = yup.object({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^[a-zA-Z]+[0-9]+$/, "Use letters followed by numbers"),
    Cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password doesn't match")
      .required("Confirm password is required"),
  });
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userschema),
  });
  async function handlesubmit(data) {
    setSubmitError("");
    try {
      await axios.post(`${API_URL}/api/Register`, data);
      navigate("/login", {
        state: { notice: "Account created. Please sign in." },
      });
    } catch (requestError) {
      setSubmitError(
        requestError.response?.data?.message ||
          "Registration failed. Check your connection and try again.",
      );
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
              Make room for good ideas
            </p>
            <h1 className="mt-4 max-w-md font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              Your next story starts here.
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
              Join the community
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Create your account
            </h2>
            <p className="mt-2 text-slate-600">
              A place for your writing and the people who read it.
            </p>
            <form
              onSubmit={handleSubmit(handlesubmit)}
              className="mt-7 grid gap-4"
            >
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Name
                <input
                  {...register("name")}
                  autoComplete="name"
                  className="rounded-sm border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-700 focus:outline-none"
                  placeholder="Your name"
                  type="text"
                />
                {errors.name && (
                  <span className="font-normal text-red-700">
                    {errors.name.message}
                  </span>
                )}
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Email
                <input
                  {...register("email")}
                  autoComplete="email"
                  className="rounded-sm border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-700 focus:outline-none"
                  placeholder="you@example.com"
                  type="email"
                />
                {errors.email && (
                  <span className="font-normal text-red-700">
                    {errors.email.message}
                  </span>
                )}
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Password
                <input
                  {...register("password")}
                  autoComplete="new-password"
                  className="rounded-sm border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-700 focus:outline-none"
                  placeholder="Letters followed by numbers"
                  type="password"
                />
                {errors.password && (
                  <span className="font-normal text-red-700">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Confirm password
                <input
                  {...register("Cpassword")}
                  autoComplete="new-password"
                  className="rounded-sm border border-slate-300 px-3 py-2.5 font-normal focus:border-emerald-700 focus:outline-none"
                  placeholder="Enter your password again"
                  type="password"
                />
                {errors.Cpassword && (
                  <span className="font-normal text-red-700">
                    {errors.Cpassword.message}
                  </span>
                )}
              </label>
              {submitError && (
                <p role="alert" className="text-sm text-red-700">
                  {submitError}
                </p>
              )}
              <button
                disabled={isSubmitting}
                className="mt-1 rounded-sm bg-[#17483e] px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                type="submit"
              >
                {isSubmitting ? "Creating your account..." : "Create account"}
              </button>
              {isSubmitting && (
                <p role="status" className="text-center text-sm text-slate-600">
                  Connecting securely to the server...
                </p>
              )}
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                className="font-semibold text-emerald-800 hover:underline"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
