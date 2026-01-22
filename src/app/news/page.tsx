"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false,
});

interface NewsSummary {
  id: string;
  title: string;
}

interface News extends NewsSummary {
  date?: string;
  bannerImage?: string;
  thumbnail?: string;
  newsHtml: string;
  isFeatured?: boolean;
}

export default function NewsPage() {
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
	
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [newsList, setNewsList] = useState<NewsSummary[]>([]);
  const [selectedNewsId, setSelectedNewsId] = useState("");

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [newsHtml, setNewsHtml] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [existingBannerUrl, setExistingBannerUrl] = useState("");
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all news
  useEffect(() => {
    const fetchNewsList = async () => {
      try {
        const res = await fetch(`${API_BASE}/news`);
        const result = await res.json();
        setNewsList(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        console.error("Failed to fetch news list", err);
      }
    };
    fetchNewsList();
  }, [API_BASE]);

  // Load selected news
  useEffect(() => {
    if (!selectedNewsId) {
      resetForm();
      return;
    }

    const loadNews = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/news/${selectedNewsId}`);
        const news: News = await res.json();

        setId(news.id);
        setTitle(news.title);
        setDate(news.date?.slice(0, 10) || "");
        setNewsHtml(news.newsHtml || "");
        setIsFeatured(news.isFeatured || false);

        if (news.bannerImage) {
          setExistingBannerUrl(
            news.bannerImage.startsWith("http")
              ? news.bannerImage
              : `${API_URL}/uploads/blog_banner_images/${news.bannerImage}`
          );
        }

        if (news.thumbnail) {
          setExistingThumbnailUrl(
            news.thumbnail.startsWith("http")
              ? news.thumbnail
              : `${API_URL}/uploads/blog_thumbnails/${news.thumbnail}`
          );
        }

        setBannerImage(null);
        setThumbnail(null);
      } catch (err) {
        console.error("Failed to load news", err);
        alert("Failed to load news");
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [selectedNewsId, API_BASE]);

  const resetForm = () => {
    setId("");
    setTitle("");
    setDate("");
    setBannerImage(null);
    setThumbnail(null);
    setNewsHtml("");
    setIsFeatured(false);
    setExistingBannerUrl("");
    setExistingThumbnailUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    // Convert date to ISO-8601 if provided
    if (date) {
      const isoDate = new Date(date + "T00:00:00Z").toISOString();
      formData.append("date", isoDate);
    }

    formData.append("newsHtml", newsHtml);
    formData.append("isFeatured", isFeatured.toString());

    if (bannerImage) formData.append("bannerImage", bannerImage);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    if (!selectedNewsId && id) formData.append("id", id);

    try {
      let res: Response;
      if (selectedNewsId) {
        res = await fetch(`${API_BASE}/news/${selectedNewsId}`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        res = await fetch(`${API_BASE}/news`, {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) throw new Error("Network response was not ok");

      alert(selectedNewsId ? "News updated successfully!" : "News created successfully!");

      // Refresh list
      const listRes = await fetch(`${API_BASE}/news`);
      const listResult = await listRes.json();
      setNewsList(Array.isArray(listResult) ? listResult : listResult.data || []);

      setSelectedNewsId("");
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {selectedNewsId ? "Edit News" : "Create News"}
          </h1>
          <button onClick={() => router.back()}>← Back</button>
        </div>

        {/* Select existing news */}
        <select
          value={selectedNewsId}
          onChange={(e) => setSelectedNewsId(e.target.value)}
          className="mb-6 w-full border p-2 rounded"
        >
          <option value="">-- Create New News --</option>
          {newsList.map((n) => (
            <option key={n.id} value={n.id}>
              {n.title}
            </option>
          ))}
        </select>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Slug */}
            {!selectedNewsId ? (
              <div>
                <label className="block text-sm mb-1">Slug (optional)</label>
                <input
                  value={id}
                  onChange={(e) =>
                    setId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm mb-1">Slug</label>
                <div className="bg-gray-100 p-2 rounded font-mono">{id}</div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                Select date of news (optional)
              </p>
            </div>

            {/* Banner */}
            <div>
              <label className="block text-sm mb-1">Banner Image</label>
              {existingBannerUrl && (
                <img src={existingBannerUrl} className="mb-2 max-h-60 rounded" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm mb-1">Thumbnail</label>
              {existingThumbnailUrl && (
                <img src={existingThumbnailUrl} className="mb-2 h-40 w-40 object-cover rounded" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <label>Featured</label>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm mb-1">News Content</label>
              <TextEditor content={newsHtml} setContent={setNewsHtml} />
            </div>

            <div className="flex gap-3 pt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded">
                {selectedNewsId ? "Update News" : "Create News"}
              </button>

              {selectedNewsId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNewsId("");
                    resetForm();
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded"
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
