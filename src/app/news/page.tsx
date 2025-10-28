"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false, // 🚀 Prevents server-side rendering
});

export default function News() {
	const router = useRouter()

	// States
	const [id, setId] = useState<string>("")
	const [title, setTitle] = useState<string>("")
	const [date, setDate] = useState<string>("")
	const [slug, setSlug] = useState<string>("")
	const [bannerImage, setBannerImage] = useState<File | null>(null)
	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [isFeatured, setIsFeatured] = useState<boolean>(false)
	const [newsHtml, setNewsHtml] = useState<string>("")

	// Reset form
	const handleResetForm = () => {
		setId("")
		setTitle("")
		setDate("")
		setSlug("")
		setBannerImage(null)
		setThumbnail(null)
		setIsFeatured(false)
		setNewsHtml("")
	}

	// Submit handler
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// If user provided ID → use it, otherwise generate one (slug-style)
		const finalId =
			id.trim() !== ""
				? id.trim().toLowerCase()
				: `news-${Date.now()}-${Math.random()
						.toString(36)
						.substring(2, 7)
						.toLowerCase()}`

		const formData = new FormData()
		formData.append("id", finalId)
		formData.append("title", title)
		formData.append("date", new Date(date).toISOString())
		formData.append("slug", slug)
		formData.append("newsHtml", newsHtml)
		formData.append("isFeatured", isFeatured.toString())
		if (bannerImage) formData.append("bannerImage", bannerImage)
		if (thumbnail) formData.append("thumbnail", thumbnail)

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/news`,
				formData
			)
			console.log(response.data)
			handleResetForm()
			alert(`✅ News created successfully!\nID: ${finalId}`)
		} catch (error) {
			console.error("❌ Error creating news:", error)
			alert("Failed to create news. Please check console for details.")
		}
	}

	return (
		<div className="min-h-screen p-8 bg-gray-100">
			<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-black">Create News</h1>
					<button
						onClick={() => router.back()}
						className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
					>
						← Back
					</button>
				</div>

				<form className="space-y-6" onSubmit={handleSubmit}>
					{/* Custom ID Field */}
					<div>
						<label
							htmlFor="id"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Custom ID (optional)
						</label>
						<input
							type="text"
							id="id"
							name="id"
							value={id}
							onChange={(e) =>
								setId(
									e.target.value
										.toLowerCase()
										.replace(/[^a-z0-9\-]/g, "-")
								)
							}
							placeholder="e.g. from-a-dream-to-a-platform"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<p className="text-xs text-gray-500 mt-1">
							Only lowercase letters, numbers, and dashes allowed.  
							If left blank, an ID like <code>news-1730042472-abcd1</code> will be auto-generated.
						</p>
					</div>

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
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Date */}
					<div>
						<label
							htmlFor="date"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Date
						</label>
						<input
							type="date"
							id="date"
							name="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Slug */}
					<div>
						<label
							htmlFor="slug"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Slug
						</label>
						<input
							type="text"
							id="slug"
							name="slug"
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							required
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Banner Image */}
					<div>
						<label
							htmlFor="bannerImage"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Banner Image
						</label>
						<input
							type="file"
							id="bannerImage"
							name="bannerImage"
							accept="image/*"
							onChange={(e) =>
								setBannerImage(e.target.files?.[0] || null)
							}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Thumbnail */}
					<div>
						<label
							htmlFor="thumbnail"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Thumbnail
						</label>
						<input
							type="file"
							id="thumbnail"
							name="thumbnail"
							accept="image/*"
							onChange={(e) =>
								setThumbnail(e.target.files?.[0] || null)
							}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Featured Checkbox */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="isFeatured"
							name="isFeatured"
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

					{/* News HTML */}
										<div>
						<label
							htmlFor="newsHtml"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							News HTML
						</label>
						<TextEditor
							content={newsHtml}
							setContent={setNewsHtml}
						/>
					</div>
					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}
