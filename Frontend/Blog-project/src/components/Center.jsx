import { Link } from "react-router-dom";
import blog from "../assets/bloggirl.png";

const Center = () => {
  return (
    <section className="w-full bg-[#17483e] text-white">
      <div className="mx-auto grid min-h-65 max-w-6xl items-center gap-5 px-5 py-7 sm:min-h-75 sm:grid-cols-[1.1fr_0.9fr] sm:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">
            Read widely. Write honestly.
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            Ideas worth sharing, stories worth staying for.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50 sm:text-base">
            Find a fresh perspective, follow a topic, or publish something of
            your own.
          </p>
          <Link
            to="/home#post-feed"
            className="mt-5 inline-flex rounded-sm bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Explore posts
          </Link>
        </div>
        <div className="hidden justify-end sm:flex">
          <img
            className="h-56 w-full max-w-sm object-contain"
            src={blog}
            alt="A writer at work"
          />
        </div>
      </div>
    </section>
  );
};

export default Center;
