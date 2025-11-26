import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const graduations = (props) => {
	const [graduations, setGraduations] = useState([])

	useEffect(() => props.get("graduations", setGraduations), [])

	return (
		<div>
			{/* Graduation Announcements */}
			<h1 className="my-2 text-center">Graduation Announcements</h1>

			{/* Loading Graduation Announcement items */}
			{graduations.length < 1 && (
				<h5 className="text-muted text-center">No Graduation Announcements</h5>
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
						{graduations.map((graduation, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{graduation.locale}</td>
								<td className="text-capitalize">{graduation.tier}</td>
								<td className="text-capitalize">{graduation.title}</td>
								<td className="text-capitalize">{graduation.venue}</td>
								<td className="text-capitalize">
									{graduation.graduationDateFormated}
								</td>
								<td className="text-capitalize">
									{graduation.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{graduation.likes}</td>
								<td className="text-capitalize">{graduation.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/graduations/show/${graduation.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Graduation Announcements End */}
		</div>
	)
}

export default graduations
