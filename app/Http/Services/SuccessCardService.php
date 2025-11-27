<?php

namespace App\Http\Services;

use App\Http\Resources\SuccessCardResource;
use App\Models\SuccessCard;
use App\Models\UserMembership;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class SuccessCardService extends Service
{
    /*
     * Get All Success Cards
     */
    public function index($request)
    {
        $successCardsQuery = new SuccessCard;

        $successCardsQuery = $this->search($successCardsQuery, $request);

        $successCards = $successCardsQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

        return SuccessCardResource::collection($successCards);
    }

    /*
     * Get One SuccessCard
     */
    public function show($id)
    {
        $getSuccessCard = SuccessCard::findOrFail($id);

        return new SuccessCardResource($getSuccessCard);
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

        $successCard = new SuccessCard;
        $successCard->user_id = $this->id;
        $successCard->membership_id = $request->membershipId;
        $successCard->locale = $request->locale;
        $successCard->title = $request->title;
        $successCard->poster = $request->poster;
        $successCard->announcement = $request->announcement;

        // Try and save Success Card and update UserMembership
        $saved = DB::transaction(function () use ($successCard, $membershipQuery) {
            $successCard->save();

            // Update Membership
            $membership = $membershipQuery->first();
            $membership->status = "used";

            return $membership->save();
        });

        $message = $successCard->title . " announcement created";

        return [$saved, $message, $successCard];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $successCard = SuccessCard::findOrFail($id);

        if ($request->locale) {
            $successCard->locale = $request->locale;
        }

        if ($request->title) {
            $successCard->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($successCard->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $successCard->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $successCard->announcement = $request->announcement;
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $successCard->photos = collect($successCard->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $successCard->videos = collect($successCard->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $successCard->save();

        // Define Message
        $message = $successCard->title . " updated";

        return [$saved, $message, $successCard];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $successCard = SuccessCard::findOrFail($id);

        // Get old poster and delete it
        $poster = substr($successCard->poster, 8);

        if ($poster) {
            Storage::disk("public")->delete($poster);
        }

        // Delete Photos
        if ($successCard->photos) {
            foreach ($successCard->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($successCard->videos) {
            foreach ($successCard->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Club
        $deleted = $successCard->delete();

        return [$deleted, $successCard->name . " announcement deleted"];
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
