import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const successCards = (props) => {
	const [successCards, setSuccessCards] = useState([])

	useEffect(() => props.get("success-cards", setSuccessCards), [])

	return (
		<div>
			{/* Success Card Announcements */}
			<h1 className="my-2 text-center">Success Card Announcements</h1>

			{/* Loading Success Card Announcement items */}
			{successCards.length < 1 && (
				<h5 className="text-muted text-center">
					No Success Card Announcements
				</h5>
			)}

			<div className="table-responsive">
				<table className="table table-hover table-light">
					<thead>
						<tr>
							<th></th>
							<th>Locale</th>
							<th>Tier</th>
							<th>Title</th>
							<th>Has Recap</th>
							<th>Likes</th>
							<th>Date Created</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{successCards.map((successCard, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td className="text-capitalize">{successCard.locale}</td>
								<td className="text-capitalize">{successCard.tier}</td>
								<td className="text-capitalize">{successCard.title}</td>
								<td className="text-capitalize">
									{successCard.recap ? "Yes" : "No"}
								</td>
								<td className="text-capitalize">{successCard.likes}</td>
								<td className="text-capitalize">{successCard.createdAt}</td>
								<td>
									<MyLink
										linkTo={`/success-cards/show/${successCard.id}`}
										className="btn-sm"
										text="view"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Success Card Announcements End */}
		</div>
	)
}

export default successCards
