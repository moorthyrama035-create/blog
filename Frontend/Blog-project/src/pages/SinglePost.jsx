import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_URL } from "../service/api";
const SinglePost = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  let [post, setpost] = useState({});
  let [err, seterr] = useState("");
  let [loading, setloading] = useState(true);
  let [currentUserId, setCurrentUserId] = useState("");
  let [commentText, setCommentText] = useState("");
  let [commentError, setCommentError] = useState("");
  let [sendingComment, setSendingComment] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [actionError, setActionError] = useState("");
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(`${API_URL}/api/posts/${id}`, { headers })
      .then(({ data }) => setpost(data))
      .catch((requestError) =>
        seterr(
          requestError.response?.data?.message || "Unable to load this post.",
        ),
      )
      .finally(() => setloading(false));
    axios
      .get(`${API_URL}/api/users/me`, { headers })
      .then(({ data }) => setCurrentUserId(data._id))
      .catch(() => {});
  }, [id]);

  async function submitComment(event) {
    event.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    setSendingComment(true);
    setCommentError("");
    try {
      const { data } = await axios.post(
        `${API_URL}/api/posts/${id}/comments`,
        { text },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setpost((current) => ({
        ...current,
        comments: [...(current.comments || []), data],
      }));
      setCommentText("");
    } catch (requestError) {
      setCommentError(
        requestError.response?.data?.message || "Unable to post comment.",
      );
    } finally {
      setSendingComment(false);
    }
  }
  async function deletehandle() {
    const confirmation = await Swal.fire({
      title: "Delete this post?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete post",
      confirmButtonColor: "#b91c1c",
    });
    if (!confirmation.isConfirmed) return;

    setDeleting(true);
    setActionError("");
    try {
      await axios.delete(`${API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/home");
    } catch (requestError) {
      setActionError(
        requestError.response?.data?.message || "Unable to delete this post.",
      );
    } finally {
      setDeleting(false);
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8f4]">
        <Header />
        <main
          role="status"
          className="mx-auto max-w-4xl animate-pulse px-4 py-10"
        >
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-5 h-10 max-w-2xl rounded bg-slate-200" />
          <div className="mt-8 aspect-16/8 rounded-sm bg-slate-200" />
          <div className="mt-8 grid gap-3">
            <div className="h-4 rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  if (err || !post._id) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
        <Header />
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
          <p
            role="alert"
            className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-red-800"
          >
            {err || "Post not found."}
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-5 font-semibold text-emerald-800 hover:underline"
          >
            Back to all posts
          </button>
        </main>
        <Footer />
      </div>
    );
  }
  const isOwner = String(post.author?._id) === String(currentUserId);
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f4]">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-7 sm:px-6 sm:py-10">
        <article>
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span className="font-semibold text-emerald-900">
              {post.category?.name || "Story"}
            </span>
            <span>By {post.author?.name || "Unknown author"}</span>
            <time dateTime={post.updatedAt}>
              Updated {new Date(post.updatedAt).toLocaleDateString()}
            </time>
          </div>
          <h1 className="max-w-3xl wrap-break-word font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          {post.image && (
            <div className="mt-7 flex max-h-[70vh] min-h-48 items-center justify-center overflow-hidden bg-slate-200 sm:mt-9">
              <img
                className="max-h-[70vh] w-full object-contain"
                src={post.image}
                alt={post.title}
              />
            </div>
          )}
          <div className="mx-auto mt-7 max-w-3xl whitespace-pre-wrap text-base leading-8 text-slate-700 sm:mt-10 sm:text-lg">
            {post.description}
          </div>
          {actionError && (
            <p role="alert" className="mt-5 text-sm text-red-700">
              {actionError}
            </p>
          )}
          {isOwner && (
            <div className="mt-7 flex flex-wrap gap-3 border-b border-slate-200 pb-7">
              <button
                onClick={() => navigate(`/editpost/${post._id}`)}
                className="rounded-sm bg-[#17483e] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Edit post
              </button>
              <button
                disabled={deleting}
                onClick={deletehandle}
                className="rounded-sm border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete post"}
              </button>
            </div>
          )}
        </article>

        <section
          aria-labelledby="comments-heading"
          className="mx-auto mt-10 max-w-3xl"
        >
          <div className="flex items-baseline justify-between border-b border-slate-300 pb-3">
            <h2
              id="comments-heading"
              className="font-serif text-2xl font-bold text-slate-900"
            >
              Conversation
            </h2>
            <span className="text-sm text-slate-500">
              {post.comments?.length || 0} comments
            </span>
          </div>
          <form onSubmit={submitComment} className="mt-5 grid gap-3">
            <label
              htmlFor="comment"
              className="text-sm font-semibold text-slate-700"
            >
              Add your perspective
            </label>
            <textarea
              id="comment"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              maxLength={2000}
              rows={4}
              required
              className="w-full resize-y rounded-sm border border-slate-300 bg-white p-3 text-sm focus:border-emerald-700 focus:outline-none"
              placeholder="Write a thoughtful comment..."
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {commentText.length}/2000
              </span>
              <button
                disabled={sendingComment}
                className="rounded-sm bg-amber-500 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-400 disabled:cursor-wait disabled:opacity-60"
              >
                {sendingComment ? "Posting..." : "Post comment"}
              </button>
            </div>
            {commentError && (
              <p role="alert" className="text-sm text-red-700">
                {commentError}
              </p>
            )}
          </form>
          {post.comments?.length ? (
            <ul className="mt-5 divide-y divide-slate-200">
              {post.comments.map((comment) => (
                <li key={comment._id} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-semibold text-slate-900">
                      {comment.user?.name || "Former user"}
                    </h3>
                    <time
                      className="text-xs text-slate-500"
                      dateTime={comment.createdAt}
                    >
                      {new Date(comment.createdAt).toLocaleString()}
                    </time>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {comment.text}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-b border-slate-200 py-6 text-sm text-slate-500">
              No comments yet. Start the conversation.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default SinglePost;
