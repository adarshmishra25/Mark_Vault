import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaGlobe,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

export default function Bookmarks() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const formatUrl = (url) => {
    try {
      const full = url.startsWith("http") ? url : `https://${url}`;

      const parsed = new URL(full);

      let display = parsed.hostname + parsed.pathname;

      if (display.length > 42) {
        display = display.substring(0, 42) + "...";
      }

      return display;
    } catch {
      return url;
    }
  };
  const copyUrl = async (id, url) => {
    try {
      await navigator.clipboard.writeText(url);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = filter === "All" || bookmark.category === filter;

    return matchesSearch && matchesCategory;
  });

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/bookmarks");
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const startEditing = (bookmark) => {
    setEditingId(bookmark._id);
    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setCategory(bookmark.category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setTitle("");
    setUrl("");
    setCategory("General");
  };

  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) return;

    try {
      setLoading(true);

      await api.post("/bookmarks", {
        title,
        url,
        category,
      });

      clearForm();
      fetchBookmarks();
    } finally {
      setLoading(false);
    }
  };

  const updateBookmark = async () => {
    if (!title.trim() || !url.trim()) return;

    try {
      setLoading(true);

      await api.put(`/bookmarks/${editingId}`, {
        title,
        url,
        category,
      });

      clearForm();
      fetchBookmarks();
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    if (!window.confirm("Delete this bookmark?")) return;

    try {
      await api.delete(`/bookmarks/${id}`);
      fetchBookmarks();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900">Bookmarks</h1>

        <p className="text-lg text-gray-500">
          Save, organize and access your favorite websites instantly.
        </p>
      </div>

      {/* Add Bookmark Card */}
      <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "Edit Bookmark" : "Add Bookmark"}
            </h2>
          </div>

          {editingId && (
            <button
              onClick={clearForm}
              className="rounded-xl border border-red-200 px-4 py-2 text-red-500 transition hover:bg-red-50"
            >
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            editingId ? updateBookmark() : addBookmark();
          }}
          className="flex flex-wrap items-end gap-4"
        >
          <div className="flex-1 min-w-[220px]">
            <label className="mb-2 block text-sm font-semibold text-gray-600">
              Title
            </label>
            <input
              type="text"
              placeholder="LeetCode"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full lg:flex-[2] lg:min-w-0">
            <label className="mb-2 block text-sm font-semibold text-gray-600">
              Website URL
            </label>

            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-52">
            <label className="mb-2 block text-sm font-semibold text-gray-600">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>General</option>
              <option>Development</option>
              <option>Learning</option>
              <option>Entertainment</option>
              <option>Work</option>
              <option>Shopping</option>
              <option>Personal</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-[50px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
                ? "Update"
                : "Add"}
          </button>
        </form>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl border border-gray-300 bg-white px-6 py-3 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>General</option>
          <option>Development</option>
          <option>Learning</option>
          <option>Entertainment</option>
          <option>Work</option>
          <option>Shopping</option>
          <option>Personal</option>
        </select>
      </div>

      {/* Bookmark List */}
      <div>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Your Bookmarks</h2>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {filteredBookmarks.length} Saved
          </span>
        </div>
        {filteredBookmarks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <FaGlobe className="text-3xl text-blue-600" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-700">
              {bookmarks.length === 0
                ? "No bookmarks yet"
                : "No matching bookmarks"}
            </h3>

            <p className="mt-3 text-gray-500">
              {bookmarks.length === 0
                ? "Start saving your favourite websites."
                : "Try another search or category."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="group w-full overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  {/* Left */}
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                      <FaGlobe className="text-2xl text-blue-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Title + Category */}
                      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                        <h3 className="flex-1 truncate text-xl font-bold text-gray-800">
                          {bookmark.title}
                        </h3>

                        <span className="w-fit rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {bookmark.category}
                        </span>
                      </div>

                      {/* URL */}
                      <a
                        href={
                          bookmark.url.startsWith("http")
                            ? bookmark.url
                            : `https://${bookmark.url}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        title={bookmark.url}
                        className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-blue-600 hover:underline"
                      >
                        <span className="break-all">
                          {formatUrl(bookmark.url)}
                        </span>

                        <FaExternalLinkAlt
                          size={12}
                          className="hidden sm:block opacity-0 transition group-hover:opacity-100"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex shrink-0 items-center gap-3 md:w-[180px] md:justify-end">
                    <button
                      onClick={() => copyUrl(bookmark._id, bookmark.url)}
                      title={copiedId === bookmark._id ? "Copied!" : "Copy URL"}
                      className="rounded-xl border border-green-200 bg-green-50 p-3 text-green-600 transition hover:bg-green-500 hover:text-white"
                    >
                      {copiedId === bookmark._id ? <FaCheck /> : <FaCopy />}
                    </button>
                    <button
                      onClick={() => startEditing(bookmark)}
                      className="rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-yellow-600 transition hover:bg-yellow-500 hover:text-white"
                      title="Edit Bookmark"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteBookmark(bookmark._id)}
                      className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 transition hover:bg-red-500 hover:text-white"
                      title="Delete Bookmark"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
