import { useState } from "react";

export default function Bookmarks() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Passwords</h1>
        <p className="text-gray-500 mt-1">
          Securely manage your Passwords
        </p>
      </div>

      {/* Add Bookmark Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex gap-4 flex-col">
            <input
            type="text"
            placeholder="Website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <input
            type="text"
            placeholder="Username"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="url"
            placeholder="Enter Your Password"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-[2] border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
          >
            Add
          </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Passwords</h2>

        <p className="text-gray-500">
          No passwords yet.
        </p>
      </div>
    </div>
  );
}