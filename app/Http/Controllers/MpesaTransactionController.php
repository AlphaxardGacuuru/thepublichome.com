<?php

namespace App\Http\Controllers;

use App\Events\MpesaTransactionCreatedEvent;
use App\Http\Services\MpesaTransactionService;
use App\Models\MpesaTransaction;
use Illuminate\Http\Request;

class MpesaTransactionController extends Controller
{
	public function __construct(protected MpesaTransactionService $service)
	{
		//
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		return $this->service->index($request);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		[$saved, $message, $mpesaTransaction] = $this->service->store($request);

		MpesaTransactionCreatedEvent::dispatchIf($saved, $mpesaTransaction);

		return response([
			"status" => $saved ? "success" : "failed",
			"message" => $message,
			"data" => $mpesaTransaction,
		], 200);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\MpesaTransaction  $mpesaTransaction
	 * @return \Illuminate\Http\Response
	 */
	public function show(MpesaTransaction $mpesaTransaction)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\MpesaTransaction  $mpesaTransaction
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, MpesaTransaction $mpesaTransaction)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\MpesaTransaction  $mpesaTransaction
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(MpesaTransaction $mpesaTransaction)
	{
		//
	}

	/**
	 * Send STK Push to Kopokopo.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function stkPush(Request $request)
	{
		return $this->service->stkPush($request);
	}
}
