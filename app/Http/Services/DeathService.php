<?php

namespace App\Http\Services;

use App\Http\Resources\DeathResource;
use App\Models\Death;
use App\Models\UserMembership;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class DeathService extends Service
{
    /*
     * Get All Deaths
     */
    public function index($request)
    {
        $deathsQuery = new Death;

        $deathsQuery = $this->search($deathsQuery, $request);

        $deaths = $deathsQuery
            ->orderBy("id", "DESC")
            ->cursorPaginate(20);

        return DeathResource::collection($deaths);
    }

    /*
     * Get One Death
     */
    public function show($id)
    {
        $getDeath = Death::findOrFail($id);

        return new DeathResource($getDeath);
    }

    /*
     * Store Death
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

        $death = new Death;
        $death->user_id = $this->id;
        $death->membership_id = $request->membershipId;
        $death->locale = $request->locale;
        $death->name = $request->name;
        $death->sunrise = $request->sunrise;
        $death->sunset = $request->sunset;
        $death->burial_date = $request->burialDate;
        $death->announcement = $request->announcement;
        $death->eulogy_words = $request->eulogyWords;

        // Try and save Death and update UserMembership
        $saved = DB::transaction(function () use ($death, $membershipQuery) {
            $death->save();

            // Update Membership
            $membership = $membershipQuery->first();
            $membership->status = "used";

            return $membership->save();
        });

        $message = $death->name . " announcement created";

        return [$saved, $message, $death];
    }

    /*
     * Update Death
     */
    public function update($request, $id)
    {
        $death = Death::findOrFail($id);

        if ($request->locale) {
            $death->locale = $request->locale;
        }

        if ($request->name) {
            $death->name = $request->name;
        }

        if ($request->sunrise) {
            $death->sunrise = $request->sunrise;
        }

        if ($request->sunset) {
            $death->sunset = $request->sunset;
        }

        if ($request->burialDate) {
            $death->burial_date = $request->burialDate;
        }

        if ($request->announcement) {
            $death->announcement = $request->announcement;
        }

        if ($request->eulogyWords) {
            $death->eulogy_words = $request->eulogyWords;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($death->poster, 9);

            Storage::disk("public")->delete($oldPoster);

            $death->poster = $request->input("poster");
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $death->photos = collect($death->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $death->videos = collect($death->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $death->save();

        // Define Message
        $message = $death->name . " updated";

        return [$saved, $message, $death];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $death = Death::findOrFail($id);

        // Get old poster and delete it
        $poster = substr($death->poster, 8);

        if ($poster) {
            Storage::disk("public")->delete($poster);
        }

        // Delete Photos
        if ($death->photos) {
            foreach ($death->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($death->videos) {
            foreach ($death->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Eulogy
        if ($death->eulogy) {
            Storage::disk("public")->delete($death->eulogy);
        }

        // Delete Death
        $deleted = $death->delete();

        $message = $death->name . " announcement deleted";

        return [$deleted, $message];
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
