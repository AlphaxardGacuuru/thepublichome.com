import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const deaths = (props) => {
	const [deaths, setDeaths] = useState([])

	useEffect(() => props.get("deaths", setDeaths), [])

	return (
		<div>
			{/* Death Announcements */}
			<h1 className="text-center mt-2">Death Announcements</h1>

			{/* Loading Death Announcement items */}
			{deaths.length < 1 && (
				<h5 className="text-muted text-center">No Death Announcements</h5>
			)}

			<div className="table-responsive">
				<table className="table table-hover table-light">
					<thead>
						<tr>
							<th>#</th>
							<th>Locale</th>
							<th>Tier</th>
							<th>Name</th>
							<th>Sunrise</th>
							<th>Sunset</th>
							<th>Burial</th>
							<th>Has Recap</th>
							<th>Likes</th>
							<th>Date Created</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{deaths.map((death, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{death.locale}</td>
								<td className="text-capitalize">{death.tier}</td>
								<td className="text-capitalize">{death.name}</td>
								<td className="text-capitalize">{death.sunriseFormated}</td>
								<td className="text-capitalize">{death.sunsetFormated}</td>
								<td className="text-capitalize">{death.burialDateFormated}</td>
								<td className="text-capitalize">
									{death.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{death.likes}</td>
								<td className="text-capitalize">{death.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/deaths/show/${death.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Death Announcements End */}
		</div>
	)
}

export default deaths
