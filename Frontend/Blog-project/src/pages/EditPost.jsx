import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { API_URL } from "../service/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postDraft, setPostDraft] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setPostDraft({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category?.name || "",
        });
        setImagePreview(res.data.image || "");
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message || "Unable to load this post.",
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setPostDraft((current) => ({ ...current, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData();
    formData.append("title", postDraft.title);
    formData.append("description", postDraft.description);
    formData.append("category", postDraft.category);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.put(`${API_URL}/api/posts/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate(`/home/${id}`);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to save post changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 border-b border-slate-300 pb-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Your writing
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Edit post</h1>
        </div>
        {error && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            {error}
          </p>
        )}
        {loading ? (
          <p role="status" className="py-8 text-slate-600">
            Loading post...
          </p>
        ) : (
          !error && (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-sm border border-slate-200 bg-white p-4 sm:p-6"
            >
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Title
                <input
                  required
                  maxLength={160}
                  name="title"
                  value={postDraft.title}
                  onChange={handleChange}
                  className="rounded-sm border border-slate-300 px-3 py-2 font-normal focus:border-emerald-700 focus:outline-none"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Story
                <textarea
                  required
                  rows={8}
                  name="description"
                  value={postDraft.description}
                  onChange={handleChange}
                  className="resize-y rounded-sm border border-slate-300 px-3 py-2 font-normal focus:border-emerald-700 focus:outline-none"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-slate-700">
                Category
                <input
                  required
                  name="category"
                  value={postDraft.category}
                  onChange={handleChange}
                  className="rounded-sm border border-slate-300 px-3 py-2 font-normal focus:border-emerald-700 focus:outline-none"
                />
              </label>
              <div className="grid gap-2">
                <label
                  htmlFor="post-image"
                  className="text-sm font-semibold text-slate-700"
                >
                  Cover image
                </label>
                <input
                  id="post-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-sm border border-slate-300 bg-white text-sm file:mr-3 file:border-0 file:bg-emerald-800 file:px-4 file:py-2 file:font-semibold file:text-white"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Post cover preview"
                    className="mt-2 max-h-80 w-full rounded-sm bg-slate-100 object-contain"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  disabled={saving}
                  className="rounded-sm bg-emerald-800 px-5 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/home/${id}`)}
                  className="rounded-sm border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          )
        )}
      </main>
    </div>
  );
};

export default EditPost;
