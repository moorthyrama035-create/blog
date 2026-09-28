import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_URL } from "../service/api";
const Category = () => {
  const { categoryid, catname } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let requestIsActive = true;
    axios
      .get(`${API_URL}/api/category/${categoryid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        if (requestIsActive) setPosts(data);
      })
      .catch((requestError) => {
        if (requestIsActive) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load this topic right now.",
          );
        }
      })
      .finally(() => {
        if (requestIsActive) setLoading(false);
      });
    return () => {
      requestIsActive = false;
    };
  }, [categoryid]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-6 border-b border-slate-300 pb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Topic archive
          </p>
          <h1 className="mt-1 wrap-break-word font-serif text-3xl font-bold text-slate-900">
            {catname}
          </h1>
        </div>
        {error && (
          <p
            role="alert"
            className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        {loading ? (
          <div
            role="status"
            className="grid gap-4 py-3"
            aria-label="Loading topic posts"
          >
            {[0, 1].map((item) => (
              <div
                key={item}
                className="animate-pulse border-b border-slate-200 py-6"
              >
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-3 h-6 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : posts.length ? (
          <ul className="divide-y divide-slate-200">
            {posts.map((post) => (
              <li
                key={post._id}
                className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-center"
              >
                <div>
                  <p className="text-xs text-slate-500">
                    By {post.author?.name || "Unknown author"} ·{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/home/${post._id}`}
                    className="mt-2 block font-serif text-xl font-bold text-slate-900 hover:text-emerald-800 sm:text-2xl"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.description}
                  </p>
                  <Link
                    to={`/home/${post._id}`}
                    className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline"
                  >
                    Read story →
                  </Link>
                </div>
                {post.image && (
                  <Link
                    to={`/home/${post._id}`}
                    className="order-first block aspect-video overflow-hidden bg-slate-200 sm:order-last sm:aspect-4/3"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : !error ? (
          <div className="border-y border-slate-200 py-12 text-center">
            <h2 className="font-serif text-2xl font-semibold text-slate-800">
              No stories in this topic yet.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Try another topic or browse all posts.
            </p>
            <Link
              to="/home"
              className="mt-5 inline-flex rounded-sm bg-[#17483e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Browse all posts
            </Link>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Category;
