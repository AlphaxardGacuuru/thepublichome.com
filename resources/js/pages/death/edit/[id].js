import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
// import Axios from "axios"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const DeathEdit = (props) => {
	// Get history for page location
	const router = useHistory()

	const { id } = useParams()

	// Declare states
	const [death, setDeath] = useState({})
	const [locale, setLocale] = useState()
	const [name, setName] = useState()
	const [poster, setPoster] = useState("")
	const [sunrise, setSunrise] = useState("")
	const [sunset, setSunset] = useState("")
	const [burialDate, setBurialDate] = useState("")
	const [announcement, setAnnouncement] = useState("")
	const [eulogyWords, setEulogyWords] = useState("")
	const [eulogyType, setEulogyType] = useState()
	const [eulogy, setEulogy] = useState("")
	const [loadingBtn, setLoadingBtn] = useState()
	const [loadingBtn2, setLoadingBtn2] = useState()

	useEffect(() => props.get(`deaths/${id}`, setDeath), [])

	const onSubmit = () => {
		// Show loader and disable button
		setLoadingBtn(true)

		// Check if announcement limit is reached
		if (announcement.length > death.wordLimit) {
			setLoadingBtn(false)

			return props.setErrors([
				`Announcement cannot be greater than ${death.wordLimit} words`,
			])
		}

		// Check if eulogy limit is reached
		if (eulogyWords.length > death.eulogyWordLimit) {
			setLoadingBtn(false)

			return props.setErrors([
				`Eulogy cannot be greater than ${death.eulogyWordLimit} words`,
			])
		}

		// Send data to PostsController
		// Get csrf cookie from Laravel inorder to send a POST request
		Axios.post(`/api/deaths/${id}`, {
			locale: locale,
			name: name,
			poster: poster,
			sunrise: sunrise,
			sunset: sunset,
			burialDate: burialDate,
			announcement: announcement,
			eulogyWords: eulogyWords,
			_method: "PUT",
		})
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove loader for button
				setLoadingBtn(false)
				// Reload page
				window.location.reload()
			})
			.catch((err) => {
				// Remove loader for button
				setLoadingBtn(false)
				props.getErrors(err)
			})
	}

	/*
	 * Delete Photos
	 */
	const onDeletePhotos = (photoPath) => {
		Axios.put(`api/deaths/${id}`, {
			photo: photoPath,
		})
			.then((res) => {
				// Set Messages
				props.setMessages([res.data.message])
				// Remove photos
				var filteredPhotos = death.photos.filter((photo) => photo != photoPath)

				death.photos = filteredPhotos

				setDeath(death)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Videos
	 */
	const onDeleteVideos = (videoPath) => {
		Axios.put(`api/deaths/${id}`, {
			video: videoPath,
		})
			.then((res) => {
				// Set Messages
				props.setMessages([res.data.message])
				// Remove videos
				var filteredVideos = death.videos.filter((video) => video != videoPath)

				death.videos = filteredVideos

				setDeath(death)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Death */
	const onDelete = () => {
		// Set Loader
		setLoadingBtn2(true)

		Axios.delete(`api/deaths/${id}`)
			.then((res) => {
				// Remove loader
				setLoadingBtn2(false)
				props.setMessages([res.data.message])
				// Redirect to parties
				setTimeout(() => router.push("/"), 500)
			})
			.catch((err) => {
				// Remove loader
				setLoadingBtn2(false)
				props.getErrors(err)
			})
	}

	return (
		<div className="mb-5">
			<div className="border rounded m-2 p-2">
				<h2 className="text-center">Edit your Death Announcement</h2>
			</div>

			<div className="row p-0">
				<div className="col-sm-4">
					<div className="text-center border rounded mx-2 my-2 px-2 py-5">
						<h3 className="text-center mb-4">Announcement Details</h3>

						<form>
							<div className="text-center bg-2 my-1 p-1 text-white text-uppercase">
								{death.tier}
							</div>

							{/* Locale */}
							<select
								type="text"
								name="locale"
								className="form-control mt-4"
								placeholder="locale"
								required={true}
								onChange={(e) => setLocale(e.target.value)}>
								<option value="">Choose Locale</option>
								<option
									value="home"
									selected={death.locale == "home"}>
									Home
								</option>
								<option
									value="international"
									selected={death.locale == "international"}>
									International
								</option>
							</select>
							{/* Locale End */}

							<br />

							{/* Name */}
							<input
								type="text"
								name="name"
								className="form-control text-secondary mb-2"
								placeholder="Name"
								defaultValue={death.name}
								required={true}
								onChange={(e) => setName(e.target.value)}
							/>
							{/* Name End */}

							{/* Sunrise */}
							<div className="ms-2 mb-2 d-flex justify-content-start">
								<label htmlFor="">Sunrise</label>
							</div>
							<input
								type="date"
								name="name"
								className="form-control text-secondary mb-2"
								defaultValue={death.sunrise}
								required={true}
								onChange={(e) => setSunrise(e.target.value)}
							/>
							{/* Sunrise End */}

							{/* Sunset */}
							<div className="ms-2 mb-2 d-flex justify-content-start">
								<label htmlFor="">Sunset</label>
							</div>

							<input
								type="date"
								name="name"
								className="form-control text-secondary mb-2"
								defaultValue={death.sunset}
								required={true}
								onChange={(e) => setSunset(e.target.value)}
							/>
							{/* Sunset End */}

							{/* Date of Burial */}
							<div className="ms-2 mb-2 d-flex justify-content-start">
								<label htmlFor="">Date of Burial</label>
							</div>

							<input
								type="date"
								name="name"
								className="form-control text-secondary mb-2"
								defaultValue={death.burialDate}
								required={true}
								onChange={(e) => setBurialDate(e.target.value)}
							/>
							{/* Date of Burial End */}

							{/* Announcement */}
							<div className="ms-2 mb-2 d-flex justify-content-start">
								<label htmlFor="">Announcement</label>
							</div>

							<textarea
								type="text"
								name="description"
								className="form-control"
								placeholder="Announcement"
								defaultValue={death.announcement}
								cols="30"
								rows="5"
								onChange={(e) => setAnnouncement(e.target.value)}
								required={true}></textarea>

							<div className="d-flex justify-content-end py-2">
								<small
									className={`p-1
									${
										announcement.length > death.wordLimit * 0.8
											? announcement.length <= death.wordLimit
												? "bg-warning-subtle"
												: "bg-danger-subtle"
											: "bg-secondary-subtle"
									}
								`}>
									Word Count: {announcement.length} /{" "}
									{death.wordLimit == 1000000 ? "Unlimited" : death.wordLimit}
								</small>
							</div>
							{/* Announcement End */}

							{/* Eulogy */}
							<div className="ms-2 mb-2 d-flex justify-content-start">
								<label htmlFor="">Eulogy</label>
							</div>

							{/* Eulogy Type */}
							<select
								className="form-control mb-2"
								onChange={(e) => setEulogyType(e.target.value)}>
								<option value="">Select Eulogy Type</option>
								<option value="written" selected={death.eulogyWords}>Written</option>
								<option value="file" selected={death.eulogy}>File</option>
							</select>
							{/* Eulogy Type End */}

							{/* Eulogy Written */}
							{eulogyType == "written" && (
								<React.Fragment>
									<textarea
										type="text"
										name="eulogyWords"
										className="form-control"
										placeholder="Eulogy"
										defaultValue={death.eulogyWords}
										cols="30"
										rows="10"
										onChange={(e) => setEulogyWords(e.target.value)}></textarea>

									<div className="d-flex justify-content-end py-2">
										<small
											className={`p-1
									${
										eulogyWords.length > death.eulogyWordLimit * 0.8
											? eulogyWords.length <= death.eulogyWordLimit
												? "bg-warning-subtle"
												: "bg-danger-subtle"
											: "bg-secondary-subtle"
									}
										`}>
											Word Count: {eulogyWords.length} /{" "}
											{death.eulogyWordLimit == 1000000
												? "Unlimited"
												: death.eulogyWordLimit}
										</small>
									</div>
								</React.Fragment>
							)}
							{/* Eulogy Written End */}

							{/* Eulogy Upload */}
							{eulogyType == "file" && (
								<div className="w-100 mb-4 mx-auto text-center">
									<label className="mb-2">Upload Eulogy</label>

									<FilePond
										name="filepond-eulogy"
										// labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
										// imageCropAspectRatio="16:9"
										acceptedFileTypes={["application/pdf"]}
										// stylePanelAspectRatio="16:9"
										allowRevert={true}
										server={{
											url: `/api/filepond`,
											process: {
												url: `/eulogy/${id}/${death.eulogyLimit}`,
												onload: (res) => props.get(`deaths/${id}`, setDeath),
												onerror: (err) =>
													props.setErrors([JSON.parse(err).message]),
											},
											revert: {
												url: `/eulogy/${eulogy.substr(9)}`,
												onload: (res) => {
													props.setMessages([res])
													// Clear Poster
													setEulogy("")
												},
											},
										}}
									/>
								</div>
							)}
							{/* Eulogy Upload End */}
							{/* Eulogy End */}

							{/* Buttons */}
							<div className="row w-75 mx-auto text-center">
								<Btn
									btnClass="mb-2"
									btnText="update death announcement"
									onClick={onSubmit}
									loading={loadingBtn}
									disabled={loadingBtn}
								/>

								{/* Collapse */}
								<button
									className="btn text-uppercase rounded-0 mb-2"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseExample"
									aria-expanded="false"
									aria-controls="collapseExample">
									delete death announcement
								</button>
								<div
									className="collapse"
									id="collapseExample">
									<div className="text-center mb-2 py-4">
										<h4>
											Are you sure you want to delete the death announcement
										</h4>
										<h5>This process is irreversible</h5>
										<br />
										<Btn
											btnText="delete death announcement"
											loading={loadingBtn2}
											disabled={loadingBtn2}
											onClick={(e) => {
												e.preventDefault()
												onDelete()
											}}
										/>
									</div>
								</div>
								{/* Collapse End */}

								<MyLink
									linkTo={`/deaths/show/${id}`}
									text="back to death announcement"
								/>
							</div>
							{/* Buttons End */}
						</form>
					</div>
				</div>

				<div className="col-sm-4">
					<div className="text-center border rounded mx-2 my-2 px-2 py-5">
						<h3 className="text-center mb-4">Upload Media</h3>

						{/* Poster */}
						<div className="w-100 mb-4 mx-auto text-center">
							<label className="mb-2">Upload Death Announcement Poster</label>
							<FilePond
								name="filepond-poster"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								// imageCropAspectRatio="16:9"
								acceptedFileTypes={["image/*"]}
								// stylePanelAspectRatio="16:9"
								allowReplace={true}
								allowRevert={true}
								server={{
									url: `/api/filepond`,
									process: {
										url: `/poster/death/${id}`,
										onload: () => props.get(`deaths/${id}`, setDeath),
										onerror: (err) => console.log(err.response.data),
									},
									revert: {
										url: `/death-poster/${poster.substr(14)}`,
										onload: (res) => {
											props.setMessages([res])
											// Clear Poster
											setPoster("")
										},
									},
								}}
							/>
						</div>
						{/* Poster End */}

						{/* Photos */}
						<div className="w-100 mb-4 mx-auto text-center">
							<label className="mb-2">Upload Related Photos</label>

							<FilePond
								name="filepond-photos"
								labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
								// imageCropAspectRatio="16:9"
								acceptedFileTypes={["image/*"]}
								allowMultiple={true}
								allowRevert={false}
								allowRemove={false}
								server={{
									url: `/api/filepond`,
									process: {
										url: `/photos/death/${id}/${death.photoLimit}`,
										onload: () => props.get(`deaths/${id}`, setDeath),
										onerror: (err) =>
											props.setErrors([JSON.parse(err).message]),
									},
								}}
							/>
						</div>
						{/* Photos End */}

						{/* Videos */}
						{death.videoLimit > 0 && (
							<div className="w-100 mb-4 mx-auto text-center">
								<label className="mb-2">Upload Related Videos</label>

								<FilePond
									name="filepond-videos"
									labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
									// imageCropAspectRatio="16:9"
									acceptedFileTypes={["video/*"]}
									allowMultiple={true}
									allowRevert={false}
									allowRemove={false}
									maxTotalFileSize={`${death.videoLimit}MB`}
									server={{
										url: `/api/filepond`,
										process: {
											url: `/videos/death/${id}/${death.videoLimit}`,
											onload: () => props.get(`deaths/${id}`, setDeath),
											onerror: (err) =>
												props.setErrors([JSON.parse(err).message]),
										},
									}}
								/>
							</div>
						)}
						{/* Videos End */}

						{/* Recap */}
						<div className="w-100 mb-4 mx-auto text-center">
							<label className="mb-2">Upload Recap</label>

							<FilePond
								name="filepond-recap"
								labelIdle='Drag & Drop your Video or <span class="filepond--label-action text-dark"> Browse </span>'
								// imageCropAspectRatio="16:9"
								acceptedFileTypes={["video/*"]}
								allowRevert={false}
								allowRemove={false}
								maxTotalFileSize={`${death.videoLimit}MB`}
								server={{
									url: `/api/filepond`,
									process: {
										url: `/recaps/death/${id}`,
										onload: () => props.get(`deaths/${id}`, setDeath),
										onerror: (err) =>
											props.setErrors([JSON.parse(err).message]),
									},
								}}
							/>
						</div>
						{/* Recap End */}
					</div>
				</div>

				<div className="col-sm-4">
					<div className="border rounded mx-2 my-2 px-2 py-5">
						<h3 className="text-center mb-4">Media Details</h3>

						{/* Poster */}
						<h5>Poster</h5>
						<div
							className="mb-4 card shadow p-2"
							style={{ width: "16.5em" }}>
							{death.poster != "/storage/" && (
								<Img
									src={death.poster}
									style={{ width: "15em", height: "auto" }}
								/>
							)}
						</div>
						{/* Poster End */}

						{/* List Images */}
						<h5>Photos</h5>
						<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll custom-scroll">
							{death.photos?.map((photo, key) => (
								<div
									key={key}
									className="shadow m-1 p-1">
									<div className="text-end">
										<span
											className="text-muted p-1"
											style={{ cursor: "pointer" }}
											onClick={() => onDeletePhotos(photo)}>
											<CloseSVG />
										</span>
									</div>
									<Img
										src={`/storage/${photo}`}
										className="mx-2"
										style={{ width: "8em", height: "auto" }}
									/>
								</div>
							))}
						</div>
						{/* List Images End */}

						{/* List Videos */}
						{death.videoLimit > 0 && (
							<React.Fragment>
								<h5>Videos</h5>
								<div className="d-flex justify-content-start mb-4 p-2 overflow-x-scroll">
									{death.videos?.map((video, key) => (
										<div
											key={key}
											className="shadow m-1 p-1">
											<div className="text-end">
												<span
													className="text-muted p-1"
													style={{ cursor: "pointer" }}
													onClick={() => onDeleteVideos(video)}>
													<CloseSVG />
												</span>
											</div>
											<video
												className="mx-2"
												style={{ width: "20em", height: "auto" }}
												controls>
												<source
													src={`/storage/${video}`}
													// type="video/mp4"
												/>
												Your browser does not support the video tag.
											</video>
										</div>
									))}
								</div>
							</React.Fragment>
						)}
						{/* List Videos End */}

						{/* Eulogy */}
						<h5>Eulogy</h5>
						{death.eulogy && (
							<div className="d-flex justify-content-center flex-wrap mb-4">
								<div className="card shadow p-2">
									<iframe
										src={`/storage/${death.eulogy}`}
										style={{ width: "15em", height: "30em" }}></iframe>
								</div>
							</div>
						)}
						{/* Eulogy End */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeathEdit
