<?php

namespace App\Http\Services;

use App\Models\UserMembership;

class UserMembershipService extends Service
{
	/*
     * Store User Membership
     */
	public function store($request)
	{
		$userMembership = new UserMembership;

		$userMembershipQuery = UserMembership::where('user_id', $this->id)
		->where('status', 'pending');

		if ($userMembershipQuery->exists()) {
			$userMembership = $userMembershipQuery->first();
		}

		$userMembership->user_id = $this->id;
		$userMembership->membership_id = $request->membershipId;

		$saved = $userMembership->save();

		$userMembershipWithMembership = $userMembership
		->with('membership')
		->find($userMembership->id);
		
		$membershipName = $userMembershipWithMembership->membership->name;
		$membershipTier = $userMembershipWithMembership->membership->tier;

		$message = ucfirst($membershipName) . " " . ucfirst($membershipTier) . " Membership Selected Successfully";

		return [$saved, $message, $userMembershipWithMembership];
	}
}
