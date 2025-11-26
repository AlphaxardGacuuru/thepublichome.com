import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory, withRouter } from "react-router-dom"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import PrivacySVG from "@/svgs/PrivacySVG"
import MenuSVG from "@/svgs/MenuSVG"
import BellSVG from "@/svgs/BellSVG"
import PersonSVG from "@/svgs/PersonSVG"

import DeathSVG from "@/svgs/DeathSVG"
import RecapSVG from "@/svgs/RecapSVG"
import CelebrationSVG from "@/svgs/CelebrationSVG"
import AnniversarySVG from "@/svgs/AnniversarySVG"
import SuccessCardSVG from "@/svgs/SuccessCardSVG"
import GraduationSVG from "@/svgs/GraduationSVG"
import WeddingSVG from "@/svgs/WeddingSVG"
import LogoSVG from "@/svgs/LogoSVG"

const TopNav = (props) => {
	const location = useLocation()
	const router = useHistory()

	const [menu, setMenu] = useState("")
	const [bottomMenu, setBottomMenu] = useState("")

	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		var isInCreatePage = location.pathname.match("/create")

		// Handle Redirects for Admin
		if (isInCreatePage && props.auth?.membershipStatus !== "paid") {
			setTimeout(() => router.push("/profile/membership"), 2000)
		}

		// Fetch Notifications
		props.get("notifications", setNotifications)
	}, [props.location])

	const onNotification = () => {
		Axios.put(`/api/notifications/update`).then((res) => {
			// Update notifications
			props.get("notifications", setNotifications)
		})
	}

	const onDeleteNotifications = (id) => {
		// Clear the notifications array
		setNotifications([])

		Axios.delete(`/api/notifications/${id}`).then((res) => {
			// Update Notifications
			props.get("notifications", setNotifications)
		})
	}

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
			.catch((err) => {
				props.getErrors(err)
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
	}

	// Hide TopNav from various pages
	const display =
		location.pathname.match("/404") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register") ||
		location.pathname.match("/admin")
			? "d-none"
			: ""

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) ? "active" : "text-white"
	}
	const activeStrict = (check) => {
		return location.pathname == check ? "active" : "text-white"
	}

	// Function for showing active color
	const active2 = (check) => {
		return location.pathname.match(check) ? "active" : "text-white"
	}

	// Function for showing active color
	const activeStrict2 = (check) => {
		return location.pathname == check ? "active" : "text-white"
	}

	return (
		<>
			<div
				id="MyElement"
				className={`${menu} ${display}`}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header className="header-area">
					<div className="container-fluid p-0">
						<div className="row">
							<div
								className="col-12"
								style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									<div className="d-flex align-items-center">
										{/* <!-- Left Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className={` text-white me-3 ${
												location.pathname.match("/profile/")
													? "d-block"
													: "d-none"
											}`}
											onClick={(e) => {
												e.preventDefault()
												props.setLeftMenu(props.leftMenu ? "" : "left-open")
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Left Menu Icon End --> */}

										{/* <!-- Logo Area  --> */}
										<div className="logo-area mb-2">
											<Link
												to="/"
												className="text-white">
												<LogoSVG />
											</Link>
										</div>
									</div>

									{/* Nav Links */}
									<div className="d-flex align-items-center justify-content-between hidden">
										<div className="hidden">
											<Link
												to="/"
												className={`mx-4 ${
													activeStrict("/") || active("/deaths")
												}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<DeathSVG />
												</span>
												Deaths
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/weddings"
												className={`mx-4 ${active("/weddings")}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<WeddingSVG />
												</span>
												Weddings
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/graduations"
												className={`mx-4 ${active("/graduations")}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<GraduationSVG />
												</span>
												Graduations
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/success-cards"
												className={`mx-4 ${active("/success-cards")}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<SuccessCardSVG />
												</span>
												Success Cards
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/anniversaries"
												className={`mx-4 ${active("/anniversaries")}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<AnniversarySVG />
												</span>
												Anniversaries
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/celebrations"
												className={`mx-4 ${active("/celebrations")}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<CelebrationSVG />
												</span>
												Celebrations
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/recaps"
												className={`mx-4 ${active("/recaps")}`}
												onClick={() => setMenu("")}>
												<span className="me-2">
													<RecapSVG />
												</span>
												Recaps
											</Link>
										</div>
									</div>
									{/* Nav Links End */}

									<div className="menu-content-area d-flex align-items-center">
										{/* <!-- Header Social Area --> */}
										<div className="header-social-area d-flex align-items-center">
											{props.auth.name == "Guest" ? (
												<Link
													to="#"
													className="display-4 text-white"
													onClick={() => props.setLogin(true)}>
													Login
												</Link>
											) : (
												<React.Fragment>
													{/* Notification Dropdown */}
													<div className="dropdown-center me-3">
														<Link
															to="#"
															role="button"
															id="dropdownMenua"
															className="text-white"
															data-bs-toggle="dropdown"
															aria-haspopup="true"
															aria-expanded="false"
															style={{
																textAlign: "center",
																fontWeight: "100",
																position: "relative",
															}}
															onClick={onNotification}>
															<BellSVG />
															<span
																className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
																style={{ fontSize: "0.6em", top: "0.2em" }}>
																{notifications.filter(
																	(notification) => !notification.isRead
																).length > 0 &&
																	notifications.filter(
																		(notification) => !notification.isRead
																	).length}
															</span>
														</Link>
														<div
															style={{
																borderRadius: "0",
																minWidth: "20em",
																maxWidth: "40em",
															}}
															className="dropdown-menu m-0 p-0"
															aria-labelledby="dropdownMenuButton">
															<div className="dropdown-header border border-secondary-subtle border-start-0 border-end-0">
																Notifications
															</div>
															<div
																style={{
																	maxHeight: "500px",
																	overflowY: "scroll",
																}}>
																{/* Get Notifications */}
																{notifications.map((notification, key) => (
																	<Link
																		key={key}
																		to={notification.url}
																		className="p-2 dropdown-item text-dark text-wrap"
																		onClick={() =>
																			onDeleteNotifications(notification.id)
																		}>
																		<small>{notification.message}</small>
																	</Link>
																))}
															</div>
															{notifications.length > 0 && (
																<div
																	className="dropdown-header"
																	style={{ cursor: "pointer" }}
																	onClick={() => onDeleteNotifications(0)}>
																	Clear notifications
																</div>
															)}
														</div>
													</div>
													{/* Notification Dropdown End */}
													{/* Avatar Dropdown */}
													<div className="dropdown-center">
														{/* Avatar */}
														<a
															href="#"
															role="button"
															className="hidden"
															data-bs-toggle="dropdown"
															aria-expanded="false">
															<Img
																src={props.auth?.avatar}
																className="rounded-circle bg-light p-1"
																width="40px"
																height="40px"
																alt="Avatar"
															/>
														</a>
														{/* For small screens */}
														<span
															className="anti-hidden me-2"
															onClick={() => {
																setBottomMenu(bottomMenu ? "" : "menu-open")
															}}>
															<Img
																src={props.auth?.avatar}
																className="rounded-circle anti-hidden"
																width="20px"
																height="20px"
																alt="Avatar"
															/>
														</span>
														{/* Avatar End */}
														<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
															<Link
																to={`/profile/show/${props.auth.id}`}
																className="p-2 px-3 pt-3 dropdown-item">
																<div className="d-flex">
																	<div className="align-items-center">
																		<Img
																			src={props.auth?.avatar}
																			className="rounded-circle"
																			width="25px"
																			height="25px"
																			alt="Avatar"
																		/>
																	</div>
																	<div className="ps-2">
																		<h5 className="text-wrap">
																			{props.auth?.name}
																		</h5>
																	</div>
																</div>
															</Link>
															{props.auth.accountType == "admin" && (
																<Link
																	to="/admin"
																	className="p-2 px-3 dropdown-item">
																	<h6>
																		<span className="me-2">
																			<PersonSVG />
																		</span>
																		Admin
																	</h6>
																</Link>
															)}
															<Link
																to="/download-app"
																className="p-2 px-3 dropdown-item"
																style={{
																	display: props.downloadLink
																		? "block"
																		: "none",
																}}>
																<h6>
																	<span className="me-2">
																		<DownloadSVG />
																	</span>
																	Get App
																</h6>
															</Link>
															<Link
																to="#"
																className="p-2 px-3 dropdown-item"
																onClick={(e) => logout(e)}>
																<h6>
																	<span className="me-2">
																		<LogoutSVG />
																	</span>
																	Logout
																</h6>
															</Link>
														</div>
													</div>
													{/* Avatar Dropdown End */}
												</React.Fragment>
											)}
										</div>
										{/* <!-- Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="text-white anti-hidden"
											onClick={(e) => {
												e.preventDefault()
												setMenu("menu-open")
											}}>
											<MenuSVG />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				{/* Remove for profile page for better background image */}
				{location.pathname.match(/profile/) ? (
					<br className="hidden" />
				) : (
					<span>
						<br />
						<br className="hidden" />
					</span>
				)}

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon"
						onClick={() => setMenu("")}>
						<CloseSVG />
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area me-5">
						<Link to="/">The Public Home</Link>
					</div>
					{/* <!-- Nav --> */}
					<div
						className="sonarNav wow fadeInUp"
						data-wow-delay="1s">
						<nav>
							<ul>
								<li className="nav-items">
									<Link
										to="/"
										className={`nav-link ${
											activeStrict2("/") || active2("/deaths")
										}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<DeathSVG />
										</span>
										Deaths
									</Link>
								</li>
								<li className="nav-items">
									<Link
										to="/weddings"
										className={`nav-link ${active2("/weddings")}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<WeddingSVG />
										</span>
										Weddings
									</Link>
								</li>
								<li className="nav-items">
									<Link
										to="/graduations"
										className={`nav-link ${active2("/graduations")}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<GraduationSVG />
										</span>
										Graduations
									</Link>
								</li>
								<li className="nav-items">
									<Link
										to="/success-cards"
										className={`nav-link ${active2("/success-cards")}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<SuccessCardSVG />
										</span>
										Success Cards
									</Link>
								</li>
								<li className="nav-items">
									<Link
										to="/anniversaries"
										className={`nav-link ${active2("/anniversaries")}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<AnniversarySVG />
										</span>
										Anniversaries
									</Link>
								</li>
								<li className="nav-items">
									<Link
										to="/celebrations"
										className={`nav-link ${active2("/celebrations")}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<CelebrationSVG />
										</span>
										Celebrations
									</Link>
								</li>
								<li className="nav-items">
									<Link
										to="/recaps"
										className={`nav-link ${active2("/recaps")}`}
										onClick={() => setMenu("")}>
										<span className="fs-5">
											<RecapSVG />
										</span>
										Recaps
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon float-end  mt-2 me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>
					<br />

					{/* Avatar Bottom */}
					<div className="m-0 p-0">
						<Link
							to={`/profile/show/${props.auth?.id}`}
							style={{ padding: "0px", margin: "0px" }}
							className="border-bottom text-start"
							onClick={() => setBottomMenu("")}>
							<div className="d-flex">
								<div className="ms-3 me-3">
									<Img
										src={props.auth?.avatar}
										className="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar"
									/>
								</div>
								<div>
									<h5>{props.auth?.name}</h5>
								</div>
							</div>
						</Link>
						{props.auth.accountType == "admin" && (
							<Link
								to="/admin"
								className="p-3 text-start"
								onClick={() => setBottomMenu("")}
								title="Admin">
								<h6>
									<span className="ms-3 me-4">
										<PersonSVG />
									</span>
									Admin
								</h6>
							</Link>
						)}
						<Link
							to="/download-app"
							className="p-3 text-start"
							style={{
								display: props.downloadLink ? "inline" : "none",
								textAlign: "left",
							}}
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="ms-3 me-4">
									<DownloadSVG />
								</span>
								Get App
							</h6>
						</Link>
						<Link
							to="/privacy"
							className="p-3 text-start"
							onClick={() => setBottomMenu("")}
							title="Privacy Policy">
							<h6>
								<span className="ms-3 me-4">
									<PrivacySVG />
								</span>
								Privacy Policy
							</h6>
						</Link>
						<Link
							to="#"
							className="p-3 text-start"
							onClick={(e) => {
								e.preventDefault()
								setBottomMenu("")
								logout()
							}}>
							<h6>
								<span className="ms-3 me-4">
									<LogoutSVG />
								</span>
								Logout
							</h6>
						</Link>
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</>
	)
}

export default withRouter(TopNav)
