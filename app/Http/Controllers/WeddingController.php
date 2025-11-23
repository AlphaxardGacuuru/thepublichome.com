<?php

namespace App\Http\Controllers;

use App\Http\Services\WeddingService;
use App\Models\Wedding;
use Illuminate\Http\Request;

class WeddingController extends Controller
{
    public function __construct(protected WeddingService $service)
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
        $this->validate($request, [
            "title" => "required|string",
            "announcement" => "required|string",
            "venue" => "required|string",
            "weddingDate" => "required|string",
        ]);

        [$saved, $message, $wedding] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $wedding,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Wedding  $wedding
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Wedding  $wedding
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "title" => "nullable|string",
            "poster" => "nullable|string",
            "announcement" => "nullable|string",
            "venue" => "nullable|string",
            "weddingDate" => "nullable|string",
        ]);

        [$saved, $message, $wedding] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $wedding,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Wedding  $wedding
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
        ], 200);
    }
}