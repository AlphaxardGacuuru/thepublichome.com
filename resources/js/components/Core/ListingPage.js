import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import Media from "@/components/Core/Media"
import LoadingMedia from "@/components/Core/LoadingMedia"

import PlusSVG from "@/svgs/PlusSVG"

const ListingPage = (props) => {
	const [name, setName] = useState("")
	const [locale, setLocale] = useState("")
	const [tier, setTier] = useState("")
	const [loader, setLoader] = useState()
	const [page, setPage] = useState(5)

	// Set Ref to reference the Intersection Observer
	const observerRef = useRef(null)

	const fetchAnnouncements = () => {
		props.getPaginated(
			`${formatedAnnouncement()}s?
			name=${name}&
			locale=${locale}&
			tier=${tier}`,
			props.setAnnouncements,
			`${formatedAnnouncement()}s`
		)
	}

	/*
	 * Fetch Announcements on load and on every search
	 */
	useEffect(() => {
		fetchAnnouncements()
	}, [name, locale, tier])

	/*
	 * Fetch Announcements when nth element is in view
	 */
	const fetchNextAnnouncement = () => {
		Axios.get(
			`${props.announcements.links.next}&
						name=${name}&
						locale=${locale}&
						tier=${tier}`
		)
			.then((res) => {
				props.setAnnouncements({
					data: [...props.announcements.data, ...res.data.data],
					links: res.data.links,
					meta: res.data.meta,
				})
			})
			.catch((err) => {
				// Set Errors
				// props.setErrors([`Failed to fetch ${formatedAnnouncement()}s`])
			})
	}

	/*
	 * Intersection Observer API Callback function */
	let callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// Disconnect Previous Intersection Observer
				observerRef.current.disconnect()
				// Increment page
				setPage(page + 5)

				requestIdleCallback(fetchNextAnnouncement)
			}
		})
	}

	useEffect(() => {
		/*
		 * Intersection Observer API
		 * Fetch on every change of the state page
		 */
		observerRef.current = new IntersectionObserver(callback, {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		})

		const mediaItem = document.getElementById(`media${page}`)

		if (mediaItem) {
			observerRef.current.observe(mediaItem)
		}
	}, [page])

	const activeLocale = (current) => {
		if (locale == current) {
			return "active"
		}
	}

	const activeTier = (current) => {
		if (tier == current) {
			return "active"
		}
	}

	const formatedAnnouncement = () => {
		return props.announcement == "anniversary"
			? props.announcement.replace("y", "ie")
			: props.announcement
	}

	const dummyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	return (
		<div
			className="row p-0"
			style={{ minHeight: "60vh" }}>
			<div className="col-sm-1"></div>
			<div className="col-sm-10 p-0">
				{/* Create Link */}
				{props.auth.id && (
					<Link
						to={
							props.auth?.membershipName == props.announcement &&
							props.auth.membershipStatus == "paid"
								? `/${formatedAnnouncement()}s/create`
								: "/profile/membership"
						}
						id="chatFloatBtn">
						<PlusSVG />
					</Link>
				)}
				{/* Create Link End */}

				<center>
					<h1>{props.title}</h1>

					<form className="mt-4 mx-auto w-75">
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control rounded-0"
								placeholder={`Search ${props.title} by Name`}
								required={true}
								onChange={(e) => setName(e.target.value)}
							/>
							<button
								id="button-addon2"
								type="submit"
								className="btn btn-outline-primary rounded-0"
								disabled={loader}>
								Search
								{loader && (
									<div
										className="spinner-border my-auto"
										style={{ color: "inherit" }}></div>
								)}
							</button>
						</div>
					</form>

					{/* Locales */}
					<div className="d-flex justify-content-center flex-wrap mb-2">
						<div
							className={`${activeLocale("")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("")}>
							All
						</div>
						<div
							className={`${activeLocale("home")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("home")}>
							Home
						</div>
						<div
							className={`${activeLocale("international")} px-4 py-2`}
							style={{ cursor: "pointer" }}
							onClick={() => setLocale("international")}>
							International
						</div>
					</div>
					{/* Locales End */}

					{/* Tiers */}
					<div className="d-none d-lg-block">
						<div className="d-flex justify-content-center flex-wrap">
							<div
								className={`${activeTier("")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("")}>
								All
							</div>
							<div
								className={`${activeTier("standard")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("standard")}>
								Standard
							</div>
							<div
								className={`${activeTier("vip")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("vip")}>
								VIP
							</div>
							<div
								className={`${activeTier("executive")} px-3 py-2`}
								style={{ cursor: "pointer" }}
								onClick={() => setTier("executive")}>
								Executive
							</div>
						</div>
					</div>
					{/* Tiers End */}

					{/* Announcements */}
					<div className="d-flex flex-wrap justify-content-center mb-2">
						{/* Loading Announcement items */}
						{dummyArray
							.filter(() => props.announcements.length < 1)
							.map((item, key) => (
								<LoadingMedia key={key} />
							))}

						{/* Real Announcement items */}
						{props.announcements.data?.map((announcement, key) => (
							<Media
								{...props}
								key={key}
								index={key}
								title={props.title}
								announcement={announcement}
								announcementToGet={props.announcement}
								fetchAnnouncements={fetchAnnouncements}
							/>
						))}
					</div>
					{/* Announcements End */}
				</center>
			</div>
			<div className="col-sm-1"></div>
			{/* Bottom Filter */}
			<div className="d-sm-none">
				<div className="fixed-bottom bg text-white p-1 d-flex justify-content-center flex-wrap">
					<div
						className={`${activeTier("")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("")}>
						All
					</div>
					<div
						className={`${activeTier("standard")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("standard")}>
						Standard
					</div>
					<div
						className={`${activeTier("vip")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("vip")}>
						VIP
					</div>
					<div
						className={`${activeTier("executive")} px-3 py-2`}
						style={{ cursor: "pointer" }}
						onClick={() => setTier("executive")}>
						Executive
					</div>
				</div>
			</div>
			{/* Bottom Filter End */}
		</div>
	)
}

export default ListingPage
