import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

const ProfileShow = (props) => {
	let { id } = useParams()

	const [user, setUser] = useState({})
	const [deaths, setDeaths] = useState([])
	const [weddings, setWeddings] = useState([])
	const [graduations, setGraduations] = useState([])
	const [successCards, setSuccesCards] = useState([])
	const [anniversaries, setAnniversaries] = useState([])
	const [celebrations, setCelebrations] = useState([])
	const [recaps, setRecaps] = useState([])
	const [pageLoader, setPageLoader] = useState(true)

	useEffect(() => {
		Axios.get(`api/users/${id}`)
			.then((res) => {
				// Remove loader
				setPageLoader(false)
				setUser(res.data.data)
			})
			.catch((err) => props.getErrors(err))

		// Set Current User to hide Side Nav links
		props.setIsAuth(props.auth.id == id)

		props.get(`deaths?userId=${id}`, setDeaths)
		props.get(`weddings?userId=${id}`, setWeddings)
		props.get(`graduations?userId=${id}`, setGraduations)
		props.get(`success-cards?userId=${id}`, setSuccesCards)
		props.get(`anniversaries?userId=${id}`, setAnniversaries)
		props.get(`celebrations?userId=${id}`, setCelebrations)
		props.get(`recaps?userId=${id}`, setRecaps)

		/* Fetch every time id changes, 
			fix for clicking profile link when viewing another user's profile */
	}, [id])

	return (
		<div
			className="row"
			style={{ backgroundColor: "rgba(36, 37, 37, 0.1)" }}>
			{/* Page Loader */}
			{pageLoader && (
				<div
					id="preloader"
					style={{ top: 60 }}>
					<div className="preload-content mb-3">
						<div
							className="spinner-grow text-secondary"
							style={{ width: "10em", height: "10em" }}></div>
					</div>
				</div>
			)}
			{/* Page Loader End */}

			<div className="col-sm-1"></div>
			<div className="col-sm-10">
				<center>
					{/* Profile Area */}
					<div
						className="avatar-thumbnail mt-4"
						style={{ borderRadius: "50%" }}>
						<Link to={"/profile/show/" + user.id}>
							<Img
								src={user.avatar}
								width="150px"
								height="150px"
							/>
						</Link>
					</div>

					<br />

					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<h3>{user.phone}</h3>

					{/* Show edit button */}
					{user.id == props.auth?.id && (
						<React.Fragment>
							<hr className="w-75 mx-auto" />

							{/* Edit button */}
							<MyLink
								linkTo="/profile/edit"
								text="edit profile"
							/>
							{/* Edit button End */}
							{/* End of Profile Area */}
						</React.Fragment>
					)}

					<hr className="w-75 mx-auto" />

					{/* Death Announcements */}
					<h1 className="my-2">Death Announcements</h1>

					{/* Loading Death Announcement items */}
					{deaths.length < 1 && (
						<h5 className="text-muted text-center">No Death Announcements</h5>
					)}

					<div className="d-flex flex-wrap justify-content-center mb-2">
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
											<td className="text-capitalize">
												{death.sunriseFormated}
											</td>
											<td className="text-capitalize">
												{death.sunsetFormated}
											</td>
											<td className="text-capitalize">
												{death.burialDateFormated}
											</td>
											<td className="text-capitalize">
												{death.hasRecap ? "Yes" : "No"}
											</td>
											<td className="text-capitalize">{death.likes}</td>
											<td className="text-capitalize">{death.createdAt}</td>
											<td>
												<div className="d-flex justify-content-between">
													<MyLink
														linkTo={`/deaths/show/${death.id}`}
														className="btn-sm"
														text="view"
													/>

													{props.auth.id == id && (
														<MyLink
															linkTo={`/deaths/edit/${death.id}`}
															className="btn-sm ms-2"
															style={{ minWidth: "10em" }}
															text="add recap"
														/>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Death Announcements End */}

					<hr className="w-75 mx-auto" />

					{/* Wedding Announcements */}
					<h1 className="my-2">Wedding Announcements</h1>

					{/* Loading Wedding Announcement items */}
					{weddings.length < 1 && (
						<h5 className="text-muted text-center">No Wedding Announcements</h5>
					)}

					<div className="d-flex flex-wrap justify-content-center mb-2">
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
												{wedding.hasRecap ? "Yes" : "No"}
											</td>
											<td className="text-capitalize">{wedding.likes}</td>
											<td className="text-capitalize">{wedding.createdAt}</td>
											<td>
												<div className="d-flex justify-content-between">
													<MyLink
														linkTo={`/weddings/show/${wedding.id}`}
														className="btn-sm"
														text="view"
													/>

													{props.auth.id == id && (
														<MyLink
															linkTo={`/weddings/edit/${wedding.id}`}
															className="btn-sm ms-2"
															style={{ minWidth: "10em" }}
															text="add recap"
														/>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Wedding Announcements End */}

					<hr className="w-75 mx-auto" />

					{/* Graduation Announcements */}
					<h1 className="my-2">Graduation Announcements</h1>

					{/* Loading Graduation Announcement items */}
					{graduations.length < 1 && (
						<h5 className="text-muted text-center">
							No Graduation Announcements
						</h5>
					)}

					<div className="d-flex flex-wrap justify-content-center mb-2">
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
												{graduation.hasRecap ? "Yes" : "No"}
											</td>
											<td className="text-capitalize">{graduation.likes}</td>
											<td className="text-capitalize">
												{graduation.createdAt}
											</td>
											<td>
												<div className="d-flex justify-content-between">
													<MyLink
														linkTo={`/graduations/show/${graduation.id}`}
														className="btn-sm"
														text="view"
													/>

													{props.auth.id == id && (
														<MyLink
															linkTo={`/graduations/edit/${graduation.id}`}
															className="btn-sm ms-2"
															style={{ minWidth: "10em" }}
															text="add recap"
														/>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Graduation Announcements End */}

					<hr className="w-75 mx-auto" />

					{/* Success Card Announcements */}
					<h1 className="my-2">Success Card Announcements</h1>

					{/* Loading Success Card Announcement items */}
					{successCards.length < 1 && (
						<h5 className="text-muted text-center">
							No Success Card Announcements
						</h5>
					)}

					<div className="d-flex flex-wrap justify-content-center mb-2">
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
												{successCard.hasRecap ? "Yes" : "No"}
											</td>
											<td className="text-capitalize">{successCard.likes}</td>
											<td className="text-capitalize">
												{successCard.createdAt}
											</td>
											<td>
												<div className="d-flex justify-content-between">
													<MyLink
														linkTo={`/success-cards/show/${successCard.id}`}
														className="btn-sm"
														text="view"
													/>

													{props.auth.id == id && (
														<MyLink
															linkTo={`/success-cards/edit/${successCard.id}`}
															className="btn-sm ms-2"
															style={{ minWidth: "10em" }}
															text="add recap"
														/>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Success Card Announcements End */}

					<hr className="w-75 mx-auto" />

					{/* Anniversary Announcements */}
					<h1 className="my-2">Anniversary Announcements</h1>

					{/* Loading Anniversary Announcement items */}
					{anniversaries.length < 1 && (
						<h5 className="text-muted text-center">
							No Anniversary Announcements
						</h5>
					)}

					<div className="d-flex flex-wrap justify-content-center mb-2">
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
												{anniversary.hasRecap ? "Yes" : "No"}
											</td>
											<td className="text-capitalize">{anniversary.likes}</td>
											<td className="text-capitalize">
												{anniversary.createdAt}
											</td>
											<td>
												<div className="d-flex justify-content-between">
													<MyLink
														linkTo={`/anniversaries/show/${anniversary.id}`}
														className="btn-sm"
														text="view"
													/>

													{props.auth.id == id && (
														<MyLink
															linkTo={`/anniversaries/edit/${anniversary.id}`}
															className="btn-sm ms-2"
															style={{ minWidth: "10em" }}
															text="add recap"
														/>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Anniversary Announcements End */}

					<hr className="w-75 mx-auto" />

					{/* Celebration Announcements */}
					<h1 className="my-2">Celebration Announcements</h1>

					{/* Loading Celebration Announcement items */}
					{celebrations.length < 1 && (
						<h5 className="text-muted text-center">
							No Celebration Announcements
						</h5>
					)}

					<div className="d-flex flex-wrap justify-content-center mb-2">
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
												{celebration.hasRecap ? "Yes" : "No"}
											</td>
											<td className="text-capitalize">{celebration.likes}</td>
											<td className="text-capitalize">
												{celebration.createdAt}
											</td>
											<td>
												<div className="d-flex justify-content-between">
													<MyLink
														linkTo={`/celebrations/show/${celebration.id}`}
														className="btn-sm"
														text="view"
													/>

													{props.auth.id == id && (
														<MyLink
															linkTo={`/celebrations/edit/${celebration.id}`}
															className="btn-sm ms-2"
															style={{ minWidth: "10em" }}
															text="add recap"
														/>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Celebration Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
		</div>
	)
}

export default ProfileShow
