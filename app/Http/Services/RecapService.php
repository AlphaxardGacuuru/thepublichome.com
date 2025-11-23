<?php

namespace App\Http\Services;

use App\Http\Resources\RecapResource;
use App\Models\Recap;
use Illuminate\Support\Facades\Storage;

class RecapService extends Service
{
    /*
     * Get Recaps
     */
    public function index($request)
    {
        $recapsQuery = new Recap();

        $recapsQuery = $this->search($recapsQuery, $request);

        $recaps = $recapsQuery
            ->orderBy("id", "DESC")
            ->cursorPaginate(20);

        return RecapResource::collection($recaps);
    }

    /*
     * Delete Recap
     */

    public function destroy($id)
    {
        $recap = Recap::findOrFail($id);

        // Delete Old Video
        $oldVideo = substr($recap->video, 8);

        Storage::disk("public")->delete($oldVideo);

        $deleted = $recap->delete();

        return [$deleted, "Recap deleted successfully", $recap];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
		if ($request->filled("userId")) {
			$query = $query->where("user_id", $request->input("userId"));
		}

		$locale = $request->input("locale");

        if ($request->filled("locale")) {
            $query = $query
                ->whereHas("death", function ($query) use ($locale) {
                    $query->where("locale", $locale);
                })->orWhereHas("wedding", function ($query) use ($locale) {
                $query->where("locale", $locale);
            })->orWhereHas("successCard", function ($query) use ($locale) {
                $query->where("locale", $locale);
            })->orWhereHas("graduation", function ($query) use ($locale) {
                $query->where("locale", $locale);
            })->orWhereHas("celebration", function ($query) use ($locale) {
                $query->where("locale", $locale);
            });
        }

        return $query;
    }
}
