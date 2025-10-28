"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false, // 🚀 Prevents server-side rendering
});

export default function Podcasts() {
	const router = useRouter()

	// States
	const [id, setId] = useState<string>("")
	const [title, setTitle] = useState<string>("")
	const [artistName, setArtistName] = useState<string>("")
	const [host, setHost] = useState<string>("")
	const [season, setSeason] = useState<number>(0)
	const [episode, setEpisode] = useState<number>(0)
	const [length, setLength] = useState<string>("")
	const [playlistName, setPlaylistName] = useState<string>("")
	const [youtubeLink, setYoutubeLink] = useState<string>("")
	const [tiktokLink, setTiktokLink] = useState<string>("")
	const [spotifyLink, setSpotifyLink] = useState<string>("")
	const [applePodcastLink, setApplePodcastLink] = useState<string>("")
	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [podcastHtml, setPodcastHtml] = useState<string>("")
	const [airDate, setAirdate] = useState<string>("")
	const [tags, setTags] = useState<string>("")

	// Reset form
	const handleResetForm = () => {
		setId("")
		setTitle("")
		setArtistName("")
		setHost("")
		setSeason(0)
		setEpisode(0)
		setLength("")
		setPlaylistName("")
		setYoutubeLink("")
		setTiktokLink("")
		setSpotifyLink("")
		setApplePodcastLink("")
		setThumbnail(null)
		setPodcastHtml("")
		setAirdate("")
		setTags("")
	}

	// Submit handler
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const finalId =
			id.trim() !== ""
				? id.trim().toLowerCase()
				: `podcast-${Date.now()}-${Math.random()
						.toString(36)
						.substring(2, 7)
						.toLowerCase()}`

		const formData = new FormData()
		formData.append("id", finalId)
		formData.append("title", title)
		formData.append("artist", artistName)
		formData.append("host", host)
		formData.append("season", season.toString())
		formData.append("episode", episode.toString())
		formData.append("length", length)
		formData.append("playlist", playlistName)
		formData.append("youtube_link", youtubeLink)
		formData.append("tiktok_link", tiktokLink)
		formData.append("spotify_link", spotifyLink)
		formData.append("apple_link", applePodcastLink)
		formData.append("podcastHtml", podcastHtml)
		formData.append("airDate", new Date(airDate).toISOString())
		formData.append("tags", tags)

		if (thumbnail) formData.append("podcast_thumbnail", thumbnail)

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/podcasts`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			)
			console.log(response.data)
			handleResetForm()
			alert(`✅ Podcast created successfully!\nID: ${finalId}`)
		} catch (error) {
			console.error("❌ Error creating podcast:", error)
			alert("Failed to create podcast. Please check console for details.")
		}
	}

	return (
		<div className="min-h-screen p-8 bg-gray-100">
			<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-black">Create Podcast</h1>
					<button
						onClick={() => router.back()}
						className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
					>
						← Back
					</button>
				</div>

				<form
					className="space-y-6"
					onSubmit={handleSubmit}
					encType="multipart/form-data"
				>
					{/* Custom ID */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Custom ID (optional)
						</label>
						<input
							type="text"
							value={id}
							onChange={(e) =>
								setId(
									e.target.value
										.toLowerCase()
										.replace(/[^a-z0-9\-]/g, "-")
								)
							}
							placeholder="e.g. protect-your-performance"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<p className="text-xs text-gray-500 mt-1">
							Allowed: lowercase letters, numbers, and dashes.
							Auto-generated if empty.
						</p>
					</div>

					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Artist */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Artist Name
						</label>
						<input
							type="text"
							value={artistName}
							onChange={(e) => setArtistName(e.target.value)}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Host */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Host
						</label>
						<input
							type="text"
							value={host}
							onChange={(e) => setHost(e.target.value)}
							placeholder="e.g. John Doe"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Airdate */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Air Date
						</label>
						<input
							type="date"
							value={airDate}
							onChange={(e) => setAirdate(e.target.value)}
							required
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Tags */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Tags
						</label>
						<input
							type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							placeholder="e.g. music, creativity, art"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<p className="text-xs text-gray-500 mt-1">
							Separate multiple tags with commas.
						</p>
					</div>

					{/* Season */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Season
						</label>
						<input
							type="number"
							value={season}
							onChange={(e) => setSeason(Number(e.target.value))}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Episode */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Episode
						</label>
						<input
							type="number"
							value={episode}
							onChange={(e) => setEpisode(Number(e.target.value))}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Length */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Length
						</label>
						<input
							type="text"
							value={length}
							onChange={(e) => setLength(e.target.value)}
							placeholder="e.g. 45:20"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Playlist */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Playlist Name
						</label>
						<input
							type="text"
							value={playlistName}
							onChange={(e) => setPlaylistName(e.target.value)}
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Podcast Thumbnail */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Podcast Thumbnail
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={(e) =>
								setThumbnail(e.target.files?.[0] || null)
							}
							className="w-full text-black"
						/>
						{thumbnail && (
							<p className="text-sm text-gray-600 mt-1">
								Selected: {thumbnail.name}
							</p>
						)}
					</div>

					{/* Podcast HTML */}
										<div>
						<label
							htmlFor="podcastHtml"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Podcast HTML
						</label>
						<TextEditor
							content={podcastHtml}
							setContent={setPodcastHtml}
						/>
					</div>
					{/* Links */}
					{[
						{ label: "YouTube Link", value: youtubeLink, setter: setYoutubeLink },
						{ label: "TikTok Link", value: tiktokLink, setter: setTiktokLink },
						{ label: "Spotify Link", value: spotifyLink, setter: setSpotifyLink },
						{ label: "Apple Podcast Link", value: applePodcastLink, setter: setApplePodcastLink },
					].map((field, i) => (
						<div key={i}>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								{field.label}
							</label>
							<input
								type="text"
								value={field.value}
								onChange={(e) => field.setter(e.target.value)}
								className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					))}

					{/* Submit */}
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
