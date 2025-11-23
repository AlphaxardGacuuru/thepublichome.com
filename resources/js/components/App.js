import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route } from "react-router-dom"

import TopNav from "@/components/Layouts/TopNav"
import Footer from "@/components/Layouts/Footer"

import ScrollToTop from "@/components/Core/ScrollToTop"
import Messages from "@/components/Core/Messages"
import LoginPopUp from "@/components/Auth/LoginPopUp"
import RouteList from "@/components/Core/RouteList"

const App = () => {
	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function for checking local storage
	const getLocalStorageAuth = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return {
				name: "Guest",
				avatar: "/storage/avatars/male-avatar.png",
				accountType: "normal",
				decos: 0,
				posts: 0,
				fans: 0,
			}
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	const url = process.env.MIX_APP_URL

	// Declare states
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])
	const [formErrors, setFormErrors] = useState([])
	const [login, setLogin] = useState(false)
	const [leftMenu, setLeftMenu] = useState("")
	const [adminMenu, setAdminMenu] = useState("left-open")
	const [auth, setAuth] = useState(getLocalStorageAuth("auth"))
	const [isAuth, setIsAuth] = useState(true)

	const [deaths, setDeaths] = useState(getLocalStorage("deaths"))
	const [weddings, setWeddings] = useState(getLocalStorage("weddings"))
	const [graduations, setGraduations] = useState(getLocalStorage("graduations"))
	const [successCards, setSuccessCards] = useState(
		getLocalStorage("successCards")
	)
	const [anniversaries, setAnniversaries] = useState(
		getLocalStorage("anniversaries")
	)
	const [celebrations, setCelebrations] = useState(
		getLocalStorage("celebrations")
	)
	const [recaps, setRecaps] = useState(getLocalStorage("recaps"))

	/*
	 * Function for fetching data from API
	 */
	const get = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				var data = res.data ? res.data.data : []
				setState(data)
				storage && setLocalStorage(storage, data)
			})
			.catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	/*
	 * Function for fetching paginated data from API
	 */
	const getPaginated = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				// Set State
				var data = res.data ? res.data : []
				setState(data)
				// Set Local Storage
				storage && setLocalStorage(storage, data)
			})
			.catch(() => {
				// Set Errors
				errors && setErrors([`Failed to fetch ${endpoint}`])
			})
	}

	/*
	 * Function for showing iteration
	 */
	const iterator = (key, list) => {
		return key + 1 + list.meta.per_page * (list.meta.current_page - 1)
	}

	/*
	 * Function for getting errors from responses
	 */
	const getErrors = (err, message = false) => {
		const resErrors = err.response.data.errors
		var newError = []
		for (var resError in resErrors) {
			newError.push(resErrors[resError])
		}
		// Get other errors
		message && newError.push(err.response.data.message)
		errors && setErrors(errorsAsArray)
		formErrors && setFormErrors(arraysWithFieldNames)
	}

	// Fetch data on page load
	useEffect(() => get("auth", setAuth, "auth", false), [])

	useEffect(() => {
		getPaginated("deaths", setDeaths, "deaths")
		getPaginated("anniversaries", setAnniversaries, "anniversaries")
		getPaginated("celebrations", setCelebrations, "celebrations")
		getPaginated("graduations", setGraduations, "graduations")
		getPaginated("success-cards", setSuccessCards, "success-cards")
		getPaginated("weddings", setWeddings, "weddings")
	}, [auth])

	/*
	 *
	 * Register service worker */
	if (window.location.href.match(/https/)) {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker.register("/sw.js")
				// .then((reg) => console.log('Service worker registered', reg))
				// .catch((err) => console.log('Service worker not registered', err));
			})
		}
	}

	/*
	 *
	 * PWA Install button */
	let deferredPrompt
	var btnAdd = useRef()
	const [downloadLink, setDownloadLink] = useState()
	const [downloadLinkText, setDownloadLinkText] = useState("")

	// Listen to the install prompt
	window.addEventListener("beforeinstallprompt", (e) => {
		deferredPrompt = e

		// Show the button
		setDownloadLink(true)

		// Action when button is clicked
		btnAdd.current.addEventListener("click", (e) => {
			// Show install banner
			deferredPrompt.prompt()
			// Check if the user accepted
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					setDownloadLinkText("User accepted")
				}
				deferredPrompt = null
			})

			window.addEventListener("appinstalled", (evt) => {
				setDownloadLinkText("Installed")
			})
		})
	})

	// All states
	const GLOBAL_STATE = {
		get,
		getPaginated,
		iterator,
		getErrors,
		getLocalStorage,
		setLocalStorage,
		login,
		setLogin,
		leftMenu,
		setLeftMenu,
		adminMenu,
		setAdminMenu,
		url,
		auth,
		setAuth,
		messages,
		setMessages,
		errors,
		setErrors,
		formErrors,
		isAuth,
		setIsAuth,

		// State
		deaths,
		setDeaths,
		weddings,
		setWeddings,
		graduations,
		setGraduations,
		successCards,
		setSuccessCards,
		anniversaries,
		setAnniversaries,
		celebrations,
		setCelebrations,
		recaps,
		setRecaps,

		// PWA
		btnAdd,
		downloadLink,
		setDownloadLink,
		downloadLinkText,
		setDownloadLinkText,
	}

	return (
		<HashRouter>
			<ScrollToTop />
			<TopNav {...GLOBAL_STATE} />
			<RouteList {...GLOBAL_STATE} />
			<LoginPopUp {...GLOBAL_STATE} />
			<Messages {...GLOBAL_STATE} />
			<Footer {...GLOBAL_STATE} />

			{/* Install button */}
			<button
				ref={btnAdd}
				style={{ display: "none" }}>
				test
			</button>
		</HashRouter>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
