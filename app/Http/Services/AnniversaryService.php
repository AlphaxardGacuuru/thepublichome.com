<?php

namespace App\Http\Services;

use App\Http\Resources\AnniversaryResource;
use App\Models\Anniversary;
use App\Models\UserMembership;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AnniversaryService extends Service
{
    /*
     * Get All Anniversary s
     */
    public function index($request)
    {
        $anniversariesQuery = new Anniversary;

        $anniversariesQuery = $this->search($anniversariesQuery, $request);

        $anniversaries = $anniversariesQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

        return AnniversaryResource::collection($anniversaries);
    }

    /*
     * Get One Anniversary
     */
    public function show($id)
    {
        $getAnniversary = Anniversary::findOrFail($id);

        return new AnniversaryResource($getAnniversary);
    }

    /*
     * Store Anniversary
     */
    public function store($request)
    {
        $membershipQuery = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "pending");

        // Check if User Has Membership
        if ($membershipQuery->doesntExist()) {
            throw ValidationException::withMessages([
                'membership' => ['Membership Not Found.'],
            ]);
        }

        $anniversary = new Anniversary;
        $anniversary->user_id = $this->id;
        $anniversary->membership_id = $request->membershipId;
        $anniversary->locale = $request->locale;
        $anniversary->title = $request->title;
        $anniversary->poster = $request->poster;
        $anniversary->announcement = $request->announcement;
        $anniversary->venue = $request->venue;
        $anniversary->anniversary_date = $request->anniversaryDate;

        // Try and save Anniversary and update UserMembership
        $saved = DB::transaction(function () use ($anniversary, $membershipQuery) {
            $anniversary->save();

            // Update Membership
            $membership = $membershipQuery->first();
            $membership->status = "used";

            return $membership->save();
        });

        $message = $anniversary->title . " announcement created";

        return [$saved, $message, $anniversary];
    }

    /*
     * Update Anniversary
     */
    public function update($request, $id)
    {
        $anniversary = Anniversary::findOrFail($id);

        if ($request->locale) {
            $anniversary->locale = $request->locale;
        }

        if ($request->title) {
            $anniversary->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($anniversary->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $anniversary->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $anniversary->announcement = $request->announcement;
        }

        if ($request->venue) {
            $anniversary->venue = $request->venue;
        }

        if ($request->anniversaryDate) {
            $anniversary->anniversary_date = $request->anniversaryDate;
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $anniversary->photos = collect($anniversary->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $anniversary->videos = collect($anniversary->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $anniversary->save();

        // Define Message
        $message = $anniversary->title . " updated";

        return [$saved, $message, $anniversary];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $anniversary = Anniversary::findOrFail($id);

        // Get old poster and delete it
        $poster = substr($anniversary->poster, 8);

        if ($poster) {
            Storage::disk("public")->delete($poster);
        }

        // Delete Photos
        if ($anniversary->photos) {
            foreach ($anniversary->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($anniversary->videos) {
            foreach ($anniversary->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Anniversary
        $deleted = $anniversary->delete();

        return [$deleted, $anniversary->name . " announcement deleted"];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
		if ($request->filled("userId")) {
			$query = $query->where("user_id", $request->input("userId"));
		}

		if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->input("name") . "%");
        }

        if ($request->filled("locale")) {
            $query = $query->where("locale", $request->input("locale"));
        }

        $tier = $request->input("tier");

        if ($request->filled("tier")) {
            $query = $query
                ->whereHas("membership", function ($query) use ($tier) {
                    $query->where("tier", $tier);
                });
        }

        return $query;
    }
}
