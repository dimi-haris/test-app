"use client"

import { useRouter } from "next/navigation"

export default function Podcasts() {
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push("/home")
	}

	return (
		<div className="min-h-screen p-8 bg-gray-100">
			<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-black">
						Create Podcasts
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
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="artistName"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Artist Name
						</label>
						<input
							type="text"
							id="artistName"
							name="artistName"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="season"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Season
						</label>
						<input
							type="number"
							id="season"
							name="season"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="episode"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Episode
						</label>
						<input
							type="number"
							id="episode"
							name="episode"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="length"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Length
						</label>
						<input
							type="text"
							id="length"
							name="length"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="playlistName"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Playlist Name
						</label>
						<input
							type="text"
							id="playlistName"
							name="playlistName"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="youtubeLink"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Youtube Link
						</label>
						<input
							type="text"
							id="youtubeLink"
							name="youtubeLink"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="tiktokLink"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Tik Tok Link
						</label>
						<input
							type="text"
							id="tiktokLink"
							name="tiktokLink"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="spotifyLink"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Spotify Link
						</label>
						<input
							type="text"
							id="spotifyLink"
							name="spotifyLink"
							className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="applePodcastLink"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Apple Podcast Link
						</label>
						<input
							type="text"
							id="applePodcastLink"
							name="applePodcastLink"
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
