import { useEffect, useState } from "react";
import api from "../services/api";

export default function Bookmarks() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("General");
  const [editingId, setEditingId] = useState(null);

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/bookmarks");
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      console.error(err);
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

      setEditingId(null);
      setTitle("");
      setUrl("");
      setCategory("General");

      await fetchBookmarks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (bookmark) => {
    setEditingId(bookmark._id);

    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setCategory(bookmark.category);
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

      setTitle("");
      setUrl("");
      setCategory("General");

      await fetchBookmarks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    if (!window.confirm("Delete this bookmark?")) return;
    try {
      await api.delete(`/bookmarks/${id}`);
      await fetchBookmarks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Bookmarks</h1>
        <p className="mt-1 text-gray-500">
          Save and manage your favorite websites.
        </p>
      </div>

      {/* Add Bookmark Form */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <form
          className="flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            if (editingId) {
              updateBookmark();
            } else {
              addBookmark();
            }
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-[2] rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>General</option>
              <option>Development</option>
              <option>Learning</option>
              <option>Entertainment</option>
              <option>Work</option>
              <option>Shopping</option>
              <option>Personal</option>
            </select>

            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {/* Bookmark List */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Your Bookmarks</h2>

        {bookmarks.length === 0 ? (
          <p className="py-10 text-center text-gray-500">
            No bookmarks yet. Add your first bookmark 🚀
          </p>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{bookmark.title}</h3>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {bookmark.category}
                    </span>
                  </div>
                  <a
                    href={
                      bookmark.url.startsWith("http://") ||
                      bookmark.url.startsWith("https://")
                        ? bookmark.url
                        : `https://${bookmark.url}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-blue-600 hover:underline"
                  >
                    {bookmark.url}
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => startEditing(bookmark)}
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBookmark(bookmark._id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
