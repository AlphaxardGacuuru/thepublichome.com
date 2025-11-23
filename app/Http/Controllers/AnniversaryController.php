<?php

namespace App\Http\Controllers;

use App\Http\Services\AnniversaryService;
use App\Models\Anniversary;
use Illuminate\Http\Request;

class AnniversaryController extends Controller
{
    public function __construct(protected AnniversaryService $service)
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
            "anniversaryDate" => "required|string",
        ]);

        [$saved, $message, $anniversary] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $anniversary,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Anniversary  $anniversary
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
     * @param  \App\Models\Anniversary  $anniversary
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "title" => "nullable|string",
            "announcement" => "nullable|string",
            "venue" => "nullable|string",
            "anniversaryDate" => "nullable|string",
        ]);

        [$saved, $message, $anniversary] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $anniversary,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Anniversary  $anniversary
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
