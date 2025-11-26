import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const celebrations = (props) => {
	const [celebrations, setCelebrations] = useState([])

	useEffect(() => props.get("celebrations", setCelebrations), [])

	return (
		<div>
			{/* Celebration Announcements */}
			<h1 className="my-2 text-center">Celebration Announcements</h1>

			{/* Loading Celebration Announcement items */}
			{celebrations.length < 1 && (
				<h5 className="text-muted text-center">No Celebration Announcements</h5>
			)}

			<div className="table-responsive">
				<table className="table table-hover table-light">
					<thead>
						<tr>
							<th></th>
							<th>Locale</th>
							<th>Tier</th>
							<th>Title</th>
							<th>Venue</th>
							<th>Date</th>
							<th>Has Recap</th>
							<th>Likes</th>
							<th>Date Created</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{celebrations.map((celebration, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{celebration.locale}</td>
								<td className="text-capitalize">{celebration.tier}</td>
								<td className="text-capitalize">{celebration.title}</td>
								<td className="text-capitalize">{celebration.venue}</td>
								<td className="text-capitalize">
									{celebration.celebrationDateFormated}
								</td>
								<td className="text-capitalize">
									{celebration.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{celebration.likes}</td>
								<td className="text-capitalize">{celebration.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/celebrations/show/${celebration.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Celebration Announcements End */}
		</div>
	)
}

export default celebrations
