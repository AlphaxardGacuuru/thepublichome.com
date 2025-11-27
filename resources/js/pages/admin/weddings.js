import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const weddings = (props) => {
	const [weddings, setWeddings] = useState([])

	useEffect(() => props.get("weddings", setWeddings), [])

	return (
		<div>
			{/* Wedding Announcements */}
			<h1 className="my-4 text-center">Wedding Announcements</h1>

			{/* Loading Wedding Announcement items */}
			{weddings.length < 1 && (
				<h5 className="text-muted text-center">No Wedding Announcements</h5>
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
						{weddings.map((wedding, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{wedding.locale}</td>
								<td className="text-capitalize">{wedding.tier}</td>
								<td className="text-capitalize">{wedding.title}</td>
								<td className="text-capitalize">{wedding.venue}</td>
								<td className="text-capitalize">
									{wedding.weddingDateFormated}
								</td>
								<td className="text-capitalize">
									{wedding.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{wedding.likes}</td>
								<td className="text-capitalize">{wedding.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/weddings/show/${wedding.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Wedding Announcements End */}
		</div>
	)
}

export default weddings
