import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const deaths = (props) => {
	const [deaths, setDeaths] = useState([])

	useEffect(() => props.get("deaths", setDeaths), [])

	return (
		<div>
			{/* Recap */}
			<h1 className="text-center">Recaps</h1>

			{/* Loading Recap Announcement items */}
			{deaths.length < 1 && (
				<h5 className="text-muted text-center">No Recaps</h5>
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
						{deaths.map((recap, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{recap.locale}</td>
								<td className="text-capitalize">{recap.tier}</td>
								<td className="text-capitalize">{recap.name}</td>
								<td className="text-capitalize">{recap.sunriseFormated}</td>
								<td className="text-capitalize">{recap.sunsetFormated}</td>
								<td className="text-capitalize">{recap.burialDateFormated}</td>
								<td className="text-capitalize">
									{recap.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{recap.likes}</td>
								<td className="text-capitalize">{recap.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/deaths/show/${recap.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Recap End */}
		</div>
	)
}

export default deaths
