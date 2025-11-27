import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

const mpesaTransactions = (props) => {
	const [mpesaTransactions, setMpesaTransactions] = useState([])

	useEffect(() => props.get("mpesa-transactions", setMpesaTransactions), [])

	return (
		<div>
			{/* Mpesa Transactions */}
			<h1 className="my-4 text-center">Mpesa Transactions</h1>

			{/* Loading Mpesa Transaction Announcement items */}
			{mpesaTransactions.length < 1 && (
				<h5 className="text-muted text-center">No Mpesa Transactions</h5>
			)}

			<div className="table-responsive">
				<table className="table table-hover table-light">
					<thead>
						<tr>
							<th>#</th>
							<th>User Name</th>
							<th>Sender Phone Number</th>
							<th>Amount</th>
							<th>Currency</th>
							<th>Kopokopo ID</th>
							<th>Type</th>
							<th>Initiation Time</th>
							<th>Status</th>
							<th>Event Type</th>
							<th>Resource ID</th>
							<th>Reference</th>
							<th>Origination Time</th>
							<th>Till Number</th>
							<th>System</th>
							<th>Resource Status</th>
							<th>Created At</th>
						</tr>
					</thead>
					<tbody>
						{mpesaTransactions.map((mpesaTransaction, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td>{mpesaTransaction.userName}</td>
								<td>{mpesaTransaction.senderPhoneNumber}</td>
								<td>{mpesaTransaction.amount}</td>
								<td>{mpesaTransaction.currency}</td>
								<td>{mpesaTransaction.kopokopoId}</td>
								<td className="text-capitalize">{mpesaTransaction.type}</td>
								<td>{mpesaTransaction.initiationTime}</td>
								<td className="text-capitalize">{mpesaTransaction.status}</td>
								<td>{mpesaTransaction.eventType}</td>
								<td>{mpesaTransaction.resourceId}</td>
								<td>{mpesaTransaction.reference}</td>
								<td>{mpesaTransaction.originationTime}</td>
								<td>{mpesaTransaction.tillNumber}</td>
								<td className="text-capitalize">{mpesaTransaction.system}</td>
								<td className="text-capitalize">
									{mpesaTransaction.resourceStatus}
								</td>
								<td>{mpesaTransaction.createdAt}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Mpesa Transaction Announcements End */}
		</div>
	)
}

export default mpesaTransactions
