<?php

namespace App\Http\Services;

use App\Http\Resources\GraduationResource;
use App\Models\Graduation;
use App\Models\UserMembership;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class GraduationService extends Service
{
    /*
     * Get All Graduations
     */
    public function index($request)
    {
        $graduationsQuery = new Graduation;

        $graduationsQuery = $this->search($graduationsQuery, $request);

        $graduations = $graduationsQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

        return GraduationResource::collection($graduations);
    }

    /*
     * Get One Graduation
     */
    public function show($id)
    {
        $getGraduation = Graduation::findOrFail($id);

        return new GraduationResource($getGraduation);
    }

    /*
     * Store Club
     */
    public function store($request)
    {
        $membershipQuery = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "paid");

        // Check if User Has Membership
        if ($membershipQuery->doesntExist()) {
            throw ValidationException::withMessages([
                'membership' => ['Membership Not Found.'],
            ]);
        }

        $graduation = new Graduation;
        $graduation->user_id = $this->id;
        $graduation->membership_id = $request->membershipId;
        $graduation->locale = $request->locale;
        $graduation->title = $request->title;
        $graduation->poster = $request->poster;
        $graduation->announcement = $request->announcement;
        $graduation->venue = $request->venue;
        $graduation->graduation_date = $request->graduationDate;

        // Try and save Graduation and update UserMembership
        $saved = DB::transaction(function () use ($graduation, $membershipQuery) {
            $graduation->save();

            // Update Membership
            $membership = $membershipQuery->first();
            $membership->status = "used";

            return $membership->save();
        });

        $message = $graduation->title . " announcement created";

        return [$saved, $message, $graduation];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $graduation = Graduation::findOrFail($id);

        if ($request->locale) {
            $graduation->locale = $request->locale;
        }

        if ($request->title) {
            $graduation->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($graduation->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $graduation->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $graduation->announcement = $request->announcement;
        }

        if ($request->venue) {
            $graduation->venue = $request->venue;
        }

        if ($request->graduationDate) {
            $graduation->graduation_date = $request->graduationDate;
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $graduation->photos = collect($graduation->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $graduation->videos = collect($graduation->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $graduation->save();

        // Define Message
        $message = $graduation->title . " updated";

        return [$saved, $message, $graduation];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $graduation = Graduation::findOrFail($id);

        // Get old poster and delete it
        $poster = substr($graduation->poster, 8);

        if ($poster) {
            Storage::disk("public")->delete($poster);
        }

        // Delete Photos
        if ($graduation->photos) {
            foreach ($graduation->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($graduation->videos) {
            foreach ($graduation->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Club
        $deleted = $graduation->delete();

        return [$deleted, $graduation->name . " announcement deleted"];
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
