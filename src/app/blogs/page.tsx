"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false,
});

interface BlogSummary {
  id: string;
  title: string;
  thumbnail?: string;
}

interface Blog extends BlogSummary {
  bannerImage?: string;
  blogHtml: string;
  isFeatured?: boolean;
}

export default function Blogs() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");

  const [id, setId] = useState<string>(""); // custom slug
  const [title, setTitle] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [blogHtml, setBlogHtml] = useState<string>("");

  const [existingBannerUrl, setExistingBannerUrl] = useState<string>("");
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://model-api.godimi.com/api/v1";

  // Fetch list of all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Load full blog when selected
  useEffect(() => {
    if (!selectedBlogId) {
      handleResetForm();
      return;
    }

    const loadBlog = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/blogs/${selectedBlogId}`);
        const blog: Blog = response.data;

        setId(blog.id);
        setTitle(blog.title);
        setBlogHtml(blog.blogHtml || "");
        setIsFeatured(blog.isFeatured ?? false);

        // Construct image URLs (adjust based on your actual image serving)
        const baseUrl = "https://model-api.godimi.com"; // or your CDN/domain

        if (blog.bannerImage) {
          setExistingBannerUrl(
            blog.bannerImage.startsWith("https")
              ? blog.bannerImage
              : `${baseUrl}/uploads/blog_banner_images/${blog.bannerImage}`
          );
        }

        if (blog.thumbnail) {
          setExistingThumbnailUrl(
            blog.thumbnail.startsWith("https")
              ? blog.thumbnail
              : `${baseUrl}/uploads/blog_thumbnails/${blog.thumbnail}`
          );
        }

        setBannerImage(null);
        setThumbnail(null);
      } catch (error) {
        console.error("Failed to load blog:", error);
        alert("Could not load blog data.");
        setSelectedBlogId("");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [selectedBlogId]);

  const handleResetForm = () => {
    setId("");
    setTitle("");
    setBannerImage(null);
    setThumbnail(null);
    setIsFeatured(false);
    setBlogHtml("");
    setExistingBannerUrl("");
    setExistingThumbnailUrl("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const formData = new FormData();

    // Only append fields that changed or are new
    formData.append("title", title);
    formData.append("blogHtml", blogHtml);
    formData.append("isFeatured", isFeatured.toString());

    if (bannerImage) formData.append("bannerImage", bannerImage);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    // For new blog: only if no blog selected
    if (!selectedBlogId) {
      if (id) formData.append("id", id); // optional custom slug
    }

    try {
      if (selectedBlogId) {
        // UPDATE using PATCH
        await axios.patch(`${API_BASE}/blogs/${selectedBlogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully!");
      } else {
        // CREATE using POST
        await axios.post(`${API_BASE}/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created successfully!");
      }

      // Refresh the list
      const response = await axios.get(`${API_BASE}/blogs`);
      setBlogs(response.data);

      // Reset form
      setSelectedBlogId("");
      handleResetForm();
    } catch (error: any) {
      console.error("Submit error:", error);
      alert(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">
            {selectedBlogId ? "Edit Blog" : "Create Blog"}
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
        </div>

        {/* Dropdown to select blog */}
        <div className="mb-6">
          <label
            htmlFor="blog-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Blog to Edit
          </label>
          <select
            id="blog-select"
            value={selectedBlogId}
            onChange={(e) => setSelectedBlogId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Create New Blog --</option>
            {blogs.map((blog) => (
              <option key={blog.id} value={blog.id}>
                {blog.title} ({blog.id})
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-600 py-8">Loading blog data...</p>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ID - only shown and editable when creating */}
            {!selectedBlogId && (
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ID (optional)
                </label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. protect-your-performance"
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  If empty, backend will auto-generate an ID.
                </p>
              </div>
            )}

            {/* Show read-only ID when editing */}
            {selectedBlogId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID (slug)
                </label>
                <p className="px-3 py-2 bg-gray-100 rounded-md font-mono text-sm">
                  {id}
                </p>
              </div>
            )}

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Image
              </label>
              {existingBannerUrl && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Current banner:</p>
                  <img
                    src={existingBannerUrl}
                    alt="Current banner"
                    className="max-w-full max-h-96 rounded border object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload new to replace or leave empty to keep current.
              </p>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail
              </label>
              {existingThumbnailUrl && (
                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Current thumbnail:</p>
                  <img
                    src={existingThumbnailUrl}
                    alt="Current thumbnail"
                    className="h-48 w-48 object-cover rounded border"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload new to replace or leave empty to keep current.
              </p>
            </div>

            {/* Is Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isFeatured"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Is Featured
              </label>
            </div>

            {/* Blog HTML */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog HTML
              </label>
              <TextEditor content={blogHtml} setContent={setBlogHtml} />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 font-medium"
              >
                {selectedBlogId ? "Update Blog" : "Create Blog"}
              </button>

              {selectedBlogId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBlogId("");
                    handleResetForm();
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}