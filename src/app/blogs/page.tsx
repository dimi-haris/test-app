"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Blogs() {
	const router = useRouter()

	const [title, setTitle] = useState<string>("")
	const [slug, setSlug] = useState<string>("")
	const [bannerImage, setBannerImage] = useState<File | null>(null)
	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [isFeatured, setIsFeatured] = useState<boolean>(false)
	const [blogHtml, setBlogHtml] = useState<string>("")

	const handleResetForm = () => {
		setTitle("")
		setSlug("")
		setBannerImage(null)
		setThumbnail(null)
		setIsFeatured(false)
		setBlogHtml("")
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append("title", title)
		formData.append("slug", slug)
		formData.append("blogHtml", blogHtml)
		formData.append("isFeatured", isFeatured.toString())
		if (bannerImage) formData.append("bannerImage", bannerImage)
		if (thumbnail) formData.append("thumbnail", thumbnail)

		await axios
			.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, formData)
			.then((response) => {
				console.log(response.data)
				handleResetForm()
				alert("Blog created successfully!")
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<div className="min-h-screen p-8 bg-gray-100">
			<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-black">
						Create Blogs
					</h1>
					<button
						onClick={() => router.back()}
						className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
					>
						← Back
					</button>
				</div>
				<form className="space-y-6" onSubmit={handleSubmit}>
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
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

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
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

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

					<div>
						<label
							htmlFor="newsHtml"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Blog HTML
						</label>
						<textarea
							id="newsHtml"
							name="newsHtml"
							rows={6}
							value={blogHtml}
							onChange={(e) => setBlogHtml(e.target.value)}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

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
