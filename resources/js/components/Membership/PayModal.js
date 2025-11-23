import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import ForwardSVG from "@/svgs/ForwardSVG"
import BackSVG from "@/svgs/BackSVG"
import CheckCircleSVG from "@/svgs/CheckCircleSVG"

const PayModal = (props) => {
	const isMountedRef = useRef(true)
	const cancelBtn = useRef()
	const history = useHistory()

	const [subscriptionPlan, setSubscriptionPlan] = useState({})
	const [phone, setPhone] = useState(props.auth.phone)
	const [showUpdatePhone, setShowUpdatePhone] = useState(true)

	const [stkPushed, setStkPushed] = useState("d-none")
	const [updateLoading, setUpdateLoading] = useState(false)
	const [mpesaLoading, setMpesaLoading] = useState(false)
	const [subscribeLoading, setSubscribeLoading] = useState(false)
	const [finishLoading, setFinishLoading] = useState(false)

	useEffect(() => {
		// Cleanup function to stop checking when component unmounts
		return () => {
			isMountedRef.current = false
		}
	}, [])

	useEffect(() => {
		// Cleanup function to stop checking when component unmounts
		return () => {
			isMountedRef.current = false
		}
	}, [])

	const onUpdatePhone = (e) => {
		e.preventDefault()

		setUpdateLoading(true)
		Axios.put(`/api/users/${props.auth.id}`, {
			phone: phone,
		})
			.then((res) => {
				setUpdateLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setUpdateLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Send STK Push
	 */
	const onSTKPush = () => {
		setMpesaLoading(true)

		Axios.post("/api/stk-push", {
			amount: props.membership.price,
		})
			.then((res) => {
				setMpesaLoading(false)
				setStkPushed("d-block")
				props.setMessages([res.data.message])

				onCheckSubscription()
			})
			.catch((err) => {
				setMpesaLoading(false)
				setStkPushed("d-none")
				props.getErrors(err)
			})
	}

	const onCheckSubscription = () => {
		// Stop checking if component is unmounted
		if (!isMountedRef.current) {
			return
		}

		Axios.get("/api/auth")
			.then((res) => {
				// Check again if component is still mounted before proceeding
				if (!isMountedRef.current) {
					return
				}

				if (res.data.data.membershipStatus == "paid") {
					props.setMessages(["Membership Acquired Successfully."])
					setSubscribeLoading(true)
					setStkPushed("d-none")
				} else {
					// Only continue checking if component is still mounted
					if (isMountedRef.current) {
						setTimeout(() => onCheckSubscription(), 5000)
					}
				}
			})
			.catch((err) => {
				// Only show error if component is still mounted
				if (isMountedRef.current) {
					props.setErrors(["Failed to Fetch Auth"])
				}
			})
	}

	const onFinish = () => {
		setFinishLoading(true)

		Axios.get("/api/auth")
			.then((res) => {
				setFinishLoading(false)
				// Click Cancel Button to close modal
				cancelBtn.current.click()
				props.setLocalStorage("auth", res.data.data)
				props.setAuth(res.data.data)
				// Redirect to props.urlTo
				history.push(props.urlTo)
			})
			.catch((err) => {
				setFinishLoading(false)
				console.info(err)
				props.setErrors(["Failed to Finish"])
			})
	}

	return (
		<React.Fragment>
			{/* Confirm Delete Modal End */}
			<div
				className="modal fade"
				id={`payModal${props.index}`}
				tabIndex="-1"
				aria-labelledby="payModalLabel"
				aria-hidden="true"
				data-bs-backdrop="static"
				data-bs-keyboard="false">
				<div className="modal-dialog">
					<div
						className="modal-content rounded-0"
						style={{
							backgroundImage:
								"linear-gradient(to bottom, rgb(186, 173, 123), rgb(255, 255, 255))",
						}}>
						<div className="modal-header card-header border-0">
							<h1
								id="payModalLabel"
								className="modal-title text-white fs-5">
								Pay
							</h1>

							{/* Close Start */}
							<span
								ref={cancelBtn}
								type="button"
								className="text-white"
								data-bs-dismiss="modal">
								<CloseSVG />
							</span>
							{/* Close End */}
						</div>
						<div className="modal-body text-start text-wrap">
							{showUpdatePhone ? (
								<div>
									{/* Update Phone Start */}
									<form
										onSubmit={onUpdatePhone}
										className="was-validated mx-auto">
										<label htmlFor="phone">Mpesa Phone Number</label>
										<div className="d-flex align-items-center bg-white mb-3">
											{/* <div className="p-2">+254</div> */}
											<input
												type="text"
												id="phone"
												name="phone"
												pattern="[0-9]{10}"
												className="form-control has-validation rounded-0"
												placeholder="0712345678"
												defaultValue={props.auth.phone}
												onChange={(e) => setPhone(e.target.value)}
												required={true}
												title="Please enter a valid 10-digit phone number"
											/>
										</div>
										{props.formErrors
											.filter((error) => error.field == "phone")
											.map((error, key) => (
												<div
													key={key}
													className="text-danger">
													{error.message}
												</div>
											))}

										<div className="d-flex justify-content-center">
											<Btn
												btnText="update"
												className="white-btn btn-2"
												loading={updateLoading}
											/>
										</div>
									</form>
									{/* Update Phone End */}
								</div>
							) : (
								<React.Fragment>
									{!subscribeLoading && stkPushed == "d-none" && (
										<div>
											<h6 className="text-capitalize text-center">
												You're about to acquire {props.membership.name}{" "}
												{props.membership.tier}
											</h6>
											<div className="d-flex justify-content-center mt-4 mb-2 mx-auto">
												{/* Pay Button Start */}
												<button
													className="btn sonar-btn mb-4 mx-auto text-uppercase rounded-0"
													onClick={() => {
														if (props.auth.phone) {
															onSTKPush()
														} else {
															props.setErrors([
																"Please update your phone number first.",
															])
															// Redirect to Previous Tab
															setShowUpdatePhone(true)
														}
													}}
													disabled={!props.membership.id}>
													<div className="d-flex justify-content-center align-items-center">
														<div className="ms-2">
															<Img
																src="img/mpesa-logo.jpg"
																style={{ width: "44px", height: "auto" }}
															/>
														</div>
														<div className="mx-2">
															pay{" "}
															<span className="fs-6">
																<small className="fw-lighter me-1">KES</small>
																{props.membership.price?.toLocaleString()}
															</span>{" "}
															with mpesa
														</div>
														{/* Loading Start */}
														{mpesaLoading && (
															<div
																className="spinner-border my-auto"
																style={{ color: "inherit" }}></div>
														)}
														{/* Loading End */}
													</div>
												</button>
												{/* Pay Button End */}
											</div>
										</div>
									)}

									<div className={stkPushed}>
										<center>
											<h5>
												Request was sent to
												<span className=""> {props.auth.phone}</span>
											</h5>
											<br />

											<h6>Checking payment</h6>
											<div
												className="spinner-border border-2 my-4 mx-2"
												style={{
													width: "3rem",
													height: "3rem",
													color: "rgb(186, 173, 123)",
												}}></div>
											<h5>
												Do not leave the page while we process your payment
											</h5>
										</center>
									</div>

									{subscribeLoading && (
										<center>
											<h5 className="text-success">Payment Received</h5>
											<div className="text-success fs-1">
												<CheckCircleSVG />
											</div>
										</center>
									)}
								</React.Fragment>
							)}
						</div>
						<div className="modal-footer card-footer justify-content-between py-4 border-0">
							{showUpdatePhone ? (
								<button
									type="button"
									className="btn text-uppercase rounded-0"
									data-bs-dismiss="modal">
									cancel
								</button>
							) : (
								<button
									type="button"
									className="btn text-uppercase rounded-0"
									onClick={() => setShowUpdatePhone(true)}>
									<span className="me-1">{<BackSVG />}</span>
									back
								</button>
							)}
							{/* Hidden Button End */}

							{showUpdatePhone ? (
								<button
									type="button"
									className="btn text-uppercase rounded-0"
									onClick={() => setShowUpdatePhone(false)}>
									<span className="me-1">{<ForwardSVG />}</span>
									next
								</button>
							) : (
								<button
									type="button"
									className="btn text-uppercase rounded-0"
									onClick={onFinish}
									disabled={!subscribeLoading}>
									<span className="me-1">{<PaymentSVG />}</span>
									finish
									{/* Loading Start */}
									{finishLoading && (
										<div
											className="spinner-border my-auto"
											style={{ color: "inherit" }}></div>
									)}
									{/* Loading End */}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* Confirm Pay Modal End */}

			{/* Button trigger modal */}
			<button
				className="btn btn-sm text-uppercase rounded-0"
				data-bs-toggle="modal"
				data-bs-target={`#payModal${props.index}`}>
				pay
			</button>
			{/* Button trigger modal End */}
		</React.Fragment>
	)
}

export default PayModal
