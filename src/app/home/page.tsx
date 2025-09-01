export default function Home() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="grid grid-cols-3 gap-8">
				<a href="/news" className="block">
					<div className="bg-white p-5 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-64">
						<h2 className="text-2xl font-bold text-gray-800">
							News
						</h2>
					</div>
				</a>

				<a href="/blogs" className="block">
					<div className="bg-white p-5 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-64">
						<h2 className="text-2xl font-bold text-gray-800">
							Blogs
						</h2>
					</div>
				</a>

				<a href="/podcasts" className="block">
					<div className="bg-white p-5 flex items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-64">
						<h2 className="text-2xl font-bold text-gray-800">
							Podcasts
						</h2>
					</div>
				</a>
			</div>
		</div>
	)
}
