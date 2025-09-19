"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Podcasts() {
	const router = useRouter()

	const [title, setTitle] = useState<string>("")
	const [artistName, setArtistName] = useState<string>("")
	const [season, setSeason] = useState<number>(0)
	const [episode, setEpisode] = useState<number>(0)
	const [length, setLength] = useState<string>("")
	const [playlistName, setPlaylistName] = useState<string>("")
	const [youtubeLink, setYoutubeLink] = useState<string>("")
	const [tiktokLink, setTiktokLink] = useState<string>("")
	const [spotifyLink, setSpotifyLink] = useState<string>("")
	const [applePodcastLink, setApplePodcastLink] = useState<string>("")

	const handleResetForm = () => {
		setTitle("")
		setArtistName("")
		setSeason(0)
		setEpisode(0)
		setLength("")
		setPlaylistName("")
		setYoutubeLink("")
		setTiktokLink("")
		setSpotifyLink("")
		setApplePodcastLink("")
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const payload = {
			title: title,
			artist: artistName,
			season: season,
			episode: episode,
			length: length,
			playlist: playlistName,
			youtube_link: youtubeLink,
			tiktok_link: tiktokLink,
			spotify_link: spotifyLink,
			apple_link: applePodcastLink
		}

		await axios
			.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/podcasts`, payload)
			.then((response) => {
				console.log(response.data)
				handleResetForm()
				alert("Podcast created successfully!")
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
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
							value={artistName}
							onChange={(e) => setArtistName(e.target.value)}
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
							value={season}
							onChange={(e) => setSeason(Number(e.target.value))}
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
							value={episode}
							onChange={(e) => setEpisode(Number(e.target.value))}
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
							value={length}
							onChange={(e) => setLength(e.target.value)}
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
							value={playlistName}
							onChange={(e) => setPlaylistName(e.target.value)}
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
							value={youtubeLink}
							onChange={(e) => setYoutubeLink(e.target.value)}
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
							value={tiktokLink}
							onChange={(e) => setTiktokLink(e.target.value)}
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
							value={spotifyLink}
							onChange={(e) => setSpotifyLink(e.target.value)}
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
							value={applePodcastLink}
							onChange={(e) =>
								setApplePodcastLink(e.target.value)
							}
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
