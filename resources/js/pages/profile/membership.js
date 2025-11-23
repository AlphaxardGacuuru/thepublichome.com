import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"
import PayModal from "@/components/Membership/PayModal"

const membership = (props) => {
	// Get history for page location
	const router = useHistory()

	const [groupedMemberships, setGroupedMemberships] = useState([
		[],
		[],
		[],
		[],
		[],
		[],
	])
	const [loading, setLoading] = useState("")

	useEffect(() => {
		Axios.get("api/memberships").then((res) => {
			// Format data
			var data = [
				res.data.data.death,
				res.data.data.wedding,
				res.data.data.graduation,
				res.data.data.success_card,
				res.data.data.anniversary,
				res.data.data.celebration,
			].filter((item) => item != null)

			setGroupedMemberships(data)
		})
	}, [])

	const onMembership = (membershipId) => {
		// Show Loader
		setLoading(membershipId)

		Axios.post("api/user-memberships", { membershipId: membershipId })
			.then((res) => {
				// Remove loader
				setLoading()
				// Set Messages
				props.setMessages([res.data.message])
				// Redirect to Create page
				Axios.get("api/auth").then((res2) => {
					// Set Auth
					props.setAuth(res2.data.data)
					// Push to edit page
					// router.push(createUrl(res.data.data.membership.name))
				})
			})
			.catch((err) => {
				// Remove loader
				setLoading()
				// Set Errors
				props.getErrors(err)
			})
	}

	/*
	 * Function for generating url
	 */
	const createUrl = (membership) => {
		switch (membership) {
			case "success_card":
				return `/success-cards/create`
				break

			case "anniversary":
				return `/anniversaries/create`
				break

			default:
				return `/${membership}s/create`
				break
		}
	}

	return (
		<React.Fragment>
			{/* Background Image */}
			<div
				className="d-flex justify-content-center flex-wrap"
				style={{
					// height: "50vh",
					backgroundImage: 'url("/storage/img/our_projects-1.jpg")',
					backgroundSize: "cover",
					backgroundPosition: "top",
				}}>
				{/* Membership Cards Start */}
				{groupedMemberships.map((memberships, key) => (
					<div
						key={key}
						className="card bg-2 border-0 mb-3 mt-5"
						style={{
							maxWidth: "20rem",
							minWidth: "19rem",
							backgroundImage:
								"linear-gradient(to bottom, rgb(186, 173, 123), rgb(255, 255, 255))",
						}}>
						<div className="card-header text-white border-0 py-4">
							<h5 className="card-title text-center">
								{memberships[0]?.name.split("_").map((name, key) => (
									<span
										key={key}
										className="me-1 text-capitalize">
										{name}
									</span>
								))}
							</h5>
						</div>
						<div className="card-body pt-4 pb-5">
							{memberships.map((membership, key) => (
								<div
									key={key}
									className="card-text mb-2">
									<div className="d-flex justify-content-between">
										<h4 className="text-capitalize">{membership.tier}</h4>
										{props.auth.membershipName ? (
											<React.Fragment>
												{props.auth.membershipName.match(memberships[0].name) &&
												props.auth.membershipTier.match(membership.tier) ? (
													<React.Fragment>
														{props.auth.membershipStatus == "paid" ? (
															<MyLink
																linkTo={createUrl(memberships[0].name)}
																text="current"
															/>
														) : (
															<PayModal
																{...props}
																index={`payModal${key}`}
																membership={membership}
																urlTo={createUrl(memberships[0].name)}
															/>
														)}
													</React.Fragment>
												) : (
													<React.Fragment>
														{props.auth.membershipStatus == "pending" ? (
															<Btn
																btnText="get"
																btnClass="btn-sm px-4"
																onClick={() => onMembership(membership.id)}
																loading={loading == membership.id}
															/>
														) : (
															""
														)}
													</React.Fragment>
												)}
											</React.Fragment>
										) : (
											<Btn
												btnText="get"
												btnClass="btn-sm px-4"
												onClick={() => onMembership(membership.id)}
												loading={loading == membership.id}
											/>
										)}
									</div>
									<div>
										Announcement:{" "}
										{membership.features.announcement == 1000000
											? "Unlimited"
											: membership.features.announcement}{" "}
										words
									</div>
									<div>
										Photos:{" "}
										{membership.features.photos == 1000000
											? "Unlimited"
											: membership.features.photos}{" "}
										photos
									</div>
									{membership.features.videos ? (
										<div>
											Videos:{" "}
											{membership.features.videos == 1000000
												? "Unlimited"
												: membership.features.videos}{" "}
											MBs
										</div>
									) : (
										""
									)}
									{membership.features.eulogy && (
										<div>
											Eulogy:{" "}
											<span>
												{membership.features.eulogy[0] == 1000000
													? "Unlimited"
													: membership.features.eulogy[0]}{" "}
												pages
											</span>
											<span className="mx-1">/</span>
											<span>
												{membership.features.eulogy[1] == 1000000
													? "Unlimited"
													: membership.features.eulogy[1]}{" "}
												words
											</span>
										</div>
									)}
									<div>Price: ${membership.price}</div>
								</div>
							))}
						</div>
						<div className="card-footer text-center border-0 py-4"></div>
					</div>
				))}
				{/* Membership Cards End */}
			</div>
		</React.Fragment>
	)
}

export default membership
