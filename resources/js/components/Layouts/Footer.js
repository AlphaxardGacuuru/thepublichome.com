import React from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"
import PrivacySVG from "@/svgs/PrivacySVG"
import ChatSVG from "@/svgs/ChatSVG"
import PersonSVG from "@/svgs/PersonSVG"
import ChevronUpSVG from "@/svgs/ChevronUpSVG"
import TermsSVG from "@/svgs/TermsSVG"
import HelpSVG from "@/svgs/HelpSVG"
import PhoneSVG from "@/svgs/PhoneSVG"
import EmailSVG from "@/svgs/EmailSVG"
import WhatsAppSVG from "@/svgs/WhatsAppSVG"

const Footer = () => {
	const location = useLocation()

	const onScroll = () => {
		// Smooth scroll to top
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const hide =
		location.pathname.match("/celebrations/edit") ||
		location.pathname.match("/celebrations/create") ||
		location.pathname.match("/anniversaries/edit") ||
		location.pathname.match("/anniversaries/create") ||
		location.pathname.match("/success-cards/edit") ||
		location.pathname.match("/success-cards/create") ||
		location.pathname.match("/graduations/edit") ||
		location.pathname.match("/graduations/create") ||
		location.pathname.match("/weddings/edit") ||
		location.pathname.match("/weddings/create") ||
		location.pathname.match("/deaths/edit") ||
		location.pathname.match("/deaths/create") ||
		location.pathname.match("/admin") ||
		location.pathname.match("/profile")
			? "d-none"
			: ""

	return (
		<div
			className={`mt-5 p-5 ${hide}`}
			style={{ backgroundColor: "rgb(36, 37, 37)" }}>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<h1 className="text-white">The Public Home</h1>
					<p className="text-white">
						The Public Home is an online funeral and burial announcement
						platform that seeks to provide more tailored death, anniversary,
						celebration, success card and wedding announcements.
					</p>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<div className="d-flex flex-column">
						<h1 className="text-white">Quick Links</h1>
						<Link
							to="/terms-and-conditions"
							className="text-white">
							<span className="me-2">
								<TermsSVG />
							</span>
							Terms and Conditions
						</Link>
						<Link
							to="/privacy-policy"
							className="text-white">
							<span className="me-2">
								<PrivacySVG />
							</span>
							Privacy Policy
						</Link>
						<a
							href="mailto:thepublichome@gmail.com?subject=Feedback&body=Enquiry"
							className="text-white">
							<span className="me-2">
								<ChatSVG />
							</span>
							Feedback
						</a>
						<a
							href="mailto:thepublichome@gmail.com?subject=Help&body=Enquiry"
							className="text-white">
							<span className="me-2">
								<HelpSVG />
							</span>
							Help
						</a>
						<Link
							to="/about"
							className="text-white">
							<span className="me-2">
								<PrivacySVG />
							</span>
							About Us
						</Link>
						<a
							href="mailto:thepublichome@gmail.com?subject=ReportProblem&body=Enquiry"
							className="text-white">
							<span className="me-2">
								<HelpSVG />
							</span>
							Report Problem
						</a>
					</div>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3">
					<h1 className="text-white">Contact Us</h1>
					<p className="text-white"><span className="me-2"><PhoneSVG /></span>+254721946369</p>
					<p className="text-white"><span className="me-2"><WhatsAppSVG /></span>+254727334114</p>
					<p className="text-white"><span className="me-2"><EmailSVG /></span>thepublichomes@gmail.com</p>
				</div>
			</div>
			<div className="row">
				<center>
					<div
						id="scrollUpBtn"
						onClick={onScroll}>
						<ChevronUpSVG />
					</div>
					<br className="anti-hidden" />
				</center>
			</div>
		</div>
	)
}

export default Footer
