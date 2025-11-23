<?php

namespace App\Http\Controllers;

use App\Http\Services\CelebrationService;
use App\Models\Celebration;
use Illuminate\Http\Request;

class CelebrationController extends Controller
{
    public function __construct(protected CelebrationService $service)
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
            "celebrationDate" => "required|string",
        ]);

        [$saved, $message, $celebration] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $celebration,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Celebration  $celebration
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
     * @param  \App\Models\Celebration  $celebration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "title" => "nullable|string",
            "announcement" => "nullable|string",
            "venue" => "nullable|string",
            "graduationDate" => "nullable|string",
        ]);

        [$saved, $message, $celebration] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $celebration,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Celebration  $celebration
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
