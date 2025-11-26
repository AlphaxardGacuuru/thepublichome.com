import React, { useEffect, useState } from "react"
import { Link, useLocation, useHistory, withRouter } from "react-router-dom"

import Img from "@/components/Core/Img"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import MenuSVG from "@/svgs/MenuSVG"

const AdminMenu = (props) => {
	const location = useLocation()
	const router = useHistory()

	const [bottomMenu, setBottomMenu] = useState()
	const [avatarVisibility, setAvatarVisibility] = useState("")

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Redirect
				// window.location.href = `/#/admin/login`
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

	// Show Admin Nav based on Location
	const showAdminNav =
		location.pathname.match("/admin") &&
		!location.pathname.match("/admin/login") &&
		!location.pathname.match("/admin/register")
			? "d-block"
			: "d-none"

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"border-start border-light border-2 p-2"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"border-start border-light border-2 p-2"
		)
	}

	return (
		<React.Fragment>
			<div
				id="MyElement"
				className={props.adminMenu + " " + showAdminNav}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header className="header-area bg-primary shadow">
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12">
								<div className="menu-area d-flex justify-content-between">
									<div className="d-flex align-items-center">
										{/* <!-- Left Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="text-white me-3"
											onClick={(e) => {
												e.preventDefault()
												// Open Admin Menu
												props.setAdminMenu(props.adminMenu ? "" : "left-open")
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Left Menu Icon End --> */}

										{/* <!-- Logo Area  --> */}
										<div className="logo-area">
											<Link
												to="/"
												className="text-white fs-2">
												The Public Home
												{/* <span className="main-logo">Party People</span> */}
											</Link>
										</div>
									</div>

									{/* Top Nav Links Area */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="header-social-area d-flex align-items-center">
											<>
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
															setAvatarVisibility("block")
														}}>
														<Img
															src={props.auth?.avatar}
															className="rounded-circle bg-light p-1 anti-hidden"
															width="30px"
															height="30px"
															alt="Avatar"
														/>
													</span>
													{/* Avatar End */}
													<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
														<Link
															to={`/admin/staff/edit/${props.auth.id}`}
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
																	<h6 className="text-wrap fs-6">
																		{props.auth?.name}
																	</h6>
																	<p className="text-wrap text-capitalize text-primary">
																		{props.auth?.accountType}
																	</p>
																</div>
															</div>
														</Link>
														<Link
															to="/download"
															className="p-2 px-3 dropdown-item"
															style={{
																display: props.downloadLink ? "block" : "none",
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
															<h6 className="fs-6">
																<span className="me-2">
																	<LogoutSVG />
																</span>
																Logout
															</h6>
														</Link>
													</div>
												</div>
												{/* Avatar Dropdown End */}
											</>
										</div>
									</div>
									{/* Top Nav Links Area End */}
								</div>
							</div>
						</div>
					</div>
				</header>

				<span>
					<br />
					<br />
					<br className="hidden" />
					<br className="hidden" />
				</span>

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div className="leftMenu d-flex align-items-center justify-content-start bg-primary">
					<div
						className="sonarNav wow fadeInUp w-100 mt-4"
						data-wow-delay="1s">
						<nav>
							<ul className="p-0">
								{/* Dashboard Link */}
								<li className="nav-item">
									<Link
										to={`/admin`}
										className={`nav-link ${activeStrict("/admin")}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Dashboard</div>
									</Link>
								</li>
								{/* Dashboard Link End */}
								{/* Deaths Link */}
								<li className="nav-item">
									<Link
										to={`/admin/deaths`}
										className={`nav-link ${activeStrict("/admin/deaths")}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Deaths</div>
									</Link>
								</li>
								{/* Deaths Link End */}
								{/* Weddings Link */}
								<li className="nav-item">
									<Link
										to={`/admin/weddings`}
										className={`nav-link ${activeStrict("/admin/weddings")}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Weddings</div>
									</Link>
								</li>
								{/* Weddings Link End */}
								{/* Graduations Link */}
								<li className="nav-item">
									<Link
										to={`/admin/graduations`}
										className={`nav-link ${activeStrict(
											"/admin/graduations"
										)}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Graduations</div>
									</Link>
								</li>
								{/* Graduations Link End */}
								{/* Success Cards Link */}
								<li className="nav-item">
									<Link
										to={`/admin/success-cards`}
										className={`nav-link ${activeStrict(
											"/admin/success-cards"
										)}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Success Cards</div>
									</Link>
								</li>
								{/* Success Cards Link End */}
								{/* Anniversaries Link */}
								<li className="nav-item">
									<Link
										to={`/admin/anniversaries`}
										className={`nav-link ${activeStrict(
											"/admin/anniversaries"
										)}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Anniversaries</div>
									</Link>
								</li>
								{/* Anniversaries Link End */}
								{/* Celebrations Link */}
								<li className="nav-item">
									<Link
										to={`/admin/celebrations`}
										className={`nav-link ${activeStrict(
											"/admin/celebrations"
										)}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Celebrations</div>
									</Link>
								</li>
								{/* Celebrations Link End */}
								{/* Recaps Link */}
								<li className="nav-item">
									<Link
										to={`/admin/recaps`}
										className={`nav-link ${activeStrict("/admin/recaps")}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Recaps</div>
									</Link>
								</li>
								{/* Recaps Link End */}
								{/* Mpesa Transactions Link */}
								<li className="nav-item">
									<Link
										to={`/admin/mpesa-transactions`}
										className={`nav-link ${activeStrict("/admin/mpesa-transactions")}`}>
										<div className="nav-link-icon">{/* <HomeSVG /> */}</div>
										<div className="nav-link-text">Mpesa Transactions</div>
									</Link>
								</li>
								{/* Mpesa Transactions Link End */}
							</ul>
						</nav>
					</div>

					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
				<div className="left-main px-4">{props.children}</div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon mt-2 me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Avatar Bottom */}
					<div
						className="m-0 p-0"
						style={{ display: avatarVisibility }}>
						<Link
							to={`/admin/staff/edit/${props.auth.id}`}
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
						<Link
							to="/download"
							className="p-2 text-start"
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
							to="#"
							className="p-2 text-start"
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
		</React.Fragment>
	)
}

export default withRouter(AdminMenu)
