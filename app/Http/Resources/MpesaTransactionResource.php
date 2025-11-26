<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MpesaTransactionResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		return [
			"userName" => $this->user->name,
			"senderPhoneNumber" => $this->sender_phone_number,
			"amount" => number_format($this->amount),
			"currency" => $this->currency,
			"kopokopoId" => $this->kopokopo_id,
			"type" => $this->type,
			"initiationTime" => $this->initiation_time->format('d M Y H:i:s'),
			"status" => $this->status,
			"eventType" => $this->event_type,
			"resourceId" => $this->resource_id,
			"reference" => $this->reference,
			"originationTime" => $this->origination_time->format('d M Y H:i:s'),
			"tillNumber" => $this->till_number,
			"system" => $this->system,
			"resourceStatus" => $this->resource_status,
			"updatedAt" => $this->updated_at->format('d M Y H:i:s'),
			"createdAt" => $this->created_at->format('d M Y H:i:s'),
		];
	}
}
