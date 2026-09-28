import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { API_URL } from "../service/api";
const Createpost = () => {
  const [postDraft, setPostDraft] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { value, name, files } = event.target;
    if (name === "image" && files?.[0]) {
      setPostDraft((current) => ({ ...current, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
      return;
    }
    setPostDraft((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData();
    formData.append("title", postDraft.title.trim());
    formData.append("description", postDraft.description.trim());
    formData.append("category", postDraft.category.trim());
    if (postDraft.image) formData.append("image", postDraft.image);

    try {
      await axios.post(`${API_URL}/api/posts`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await Swal.fire({ title: "Post published", icon: "success" });
      navigate("/home");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to publish this post.",
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
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Create a post
          </h1>
        </div>
        {error && (
          <p role="alert" className="mb-4 text-sm text-red-700">
            {error}
          </p>
        )}
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
              onChange={handleInputChange}
              className="rounded-sm border border-slate-300 px-3 py-2 font-normal focus:border-emerald-700 focus:outline-none"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">
            Story
            <textarea
              required
              rows={9}
              name="description"
              value={postDraft.description}
              onChange={handleInputChange}
              className="resize-y rounded-sm border border-slate-300 px-3 py-2 font-normal focus:border-emerald-700 focus:outline-none"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">
            Category
            <input
              required
              name="category"
              value={postDraft.category}
              onChange={handleInputChange}
              className="rounded-sm border border-slate-300 px-3 py-2 font-normal focus:border-emerald-700 focus:outline-none"
            />
          </label>
          <div className="grid gap-2">
            <label
              htmlFor="new-post-image"
              className="text-sm font-semibold text-slate-700"
            >
              Cover image{" "}
              <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="new-post-image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full rounded-sm border border-slate-300 bg-white text-sm file:mr-3 file:border-0 file:bg-emerald-800 file:px-4 file:py-2 file:font-semibold file:text-white"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected cover preview"
                className="mt-2 max-h-80 w-full rounded-sm bg-slate-100 object-contain"
              />
            )}
          </div>
          <button
            disabled={saving}
            className="w-fit rounded-sm bg-emerald-800 px-5 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            type="submit"
          >
            {saving ? "Publishing..." : "Publish post"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Createpost;
