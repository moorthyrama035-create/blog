import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_URL } from "../service/api";

const Account = () => {
  const [account, setAccount] = useState(null);
  const [draft, setDraft] = useState({ name: "", bio: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${API_URL}/api/users/me`, { headers })
      .then(({ data }) => {
        setAccount(data);
        setDraft({ name: data.name || "", bio: data.bio || "" });
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message || "Unable to load account.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function saveProfile(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { data } = await axios.put(`${API_URL}/api/users/me`, draft, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAccount((current) => ({ ...current, ...data }));
      setDraft({ name: data.name || "", bio: data.bio || "" });
      setEditing(false);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to save profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between border-b border-slate-300 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Your space
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Account</h1>
          </div>
          {!loading && account && !editing && (
            <button
              className="rounded-sm bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              onClick={() => setEditing(true)}
            >
              Edit profile
            </button>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        )}
        {loading ? (
          <p className="py-8 text-slate-600">Loading account...</p>
        ) : account ? (
          <>
            <section className="border-b border-slate-200 py-6">
              {editing ? (
                <form onSubmit={saveProfile} className="grid max-w-xl gap-4">
                  <label className="grid gap-1 text-sm font-semibold text-slate-700">
                    Username
                    <input
                      required
                      maxLength={80}
                      value={draft.name}
                      onChange={(event) =>
                        setDraft({ ...draft, name: event.target.value })
                      }
                      className="rounded-sm border border-slate-300 bg-white px-3 py-2 font-normal"
                    />
                  </label>
                  <label className="grid gap-1 text-sm font-semibold text-slate-700">
                    Bio
                    <textarea
                      maxLength={500}
                      rows={4}
                      value={draft.bio}
                      onChange={(event) =>
                        setDraft({ ...draft, bio: event.target.value })
                      }
                      className="resize-y rounded-sm border border-slate-300 bg-white px-3 py-2 font-normal"
                    />
                    <span className="text-right font-normal text-slate-500">
                      {draft.bio.length}/500
                    </span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      disabled={saving}
                      className="rounded-sm bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                    <button
                      type="button"
                      className="rounded-sm border border-slate-300 px-4 py-2 font-semibold text-slate-700"
                      onClick={() => {
                        setDraft({
                          name: account.name || "",
                          bio: account.bio || "",
                        });
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {account.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{account.email}</p>
                  <p className="mt-4 max-w-2xl whitespace-pre-wrap text-slate-700">
                    {account.bio || "No bio added yet."}
                  </p>
                </>
              )}
            </section>

            <section className="py-6">
              <div className="mb-4 flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-slate-900">Your posts</h2>
                <span className="text-sm text-slate-500">
                  {account.posts?.length || 0}
                </span>
              </div>
              {account.posts?.length ? (
                <ul className="divide-y divide-slate-200">
                  {account.posts.map((post) => (
                    <li
                      key={post._id}
                      className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {post.image && (
                        <Link
                          to={`/home/${post._id}`}
                          className="block h-44 w-full shrink-0 overflow-hidden rounded-sm bg-slate-200 sm:h-28 sm:w-44"
                          aria-label={`Open ${post.title}`}
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </Link>
                      )}
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/home/${post._id}`}
                          className="font-semibold text-slate-900 hover:underline"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                          {post.description}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {post.category?.name || "Uncategorized"} ·{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to={`/editpost/${post._id}`}
                        className="shrink-0 text-sm font-semibold text-emerald-800 hover:underline"
                      >
                        Edit post
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-4 text-slate-600">
                  You have not published any posts yet.
                </p>
              )}
            </section>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Account;
