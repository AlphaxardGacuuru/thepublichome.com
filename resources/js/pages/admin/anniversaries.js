import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const anniversaries = (props) => {
	const [anniversaries, setAnniversariess] = useState([])

	useEffect(() => props.get("anniversaries", setAnniversariess), [])

	return (
		<div>
			{/* Anniversary Announcements */}
			<h1 className="my-4 text-center">Anniversary Announcements</h1>

			{/* Loading Anniversary Announcement items */}
			{anniversaries.length < 1 && (
				<h5 className="text-muted text-center">No Anniversary Announcements</h5>
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
						{anniversaries.map((anniversary, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{anniversary.locale}</td>
								<td className="text-capitalize">{anniversary.tier}</td>
								<td className="text-capitalize">{anniversary.title}</td>
								<td className="text-capitalize">{anniversary.venue}</td>
								<td className="text-capitalize">
									{anniversary.anniversaryDateFormated}
								</td>
								<td className="text-capitalize">
									{anniversary.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{anniversary.likes}</td>
								<td className="text-capitalize">{anniversary.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/anniversaries/show/${anniversary.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Anniversary Announcements End */}
		</div>
	)
}

export default anniversaries
