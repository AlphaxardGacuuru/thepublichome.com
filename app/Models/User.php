<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'name',
		'email',
		'avatar',
		'password',
	];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
	];

	/**
	 * Accesors.
	 *
	 * @return \Illuminate\Database\Eloquent\Casts\Attribute
	 */
	protected function avatar(): Attribute
	{
		return Attribute::make(
			get: fn($value) => preg_match("/http/", $value) ? $value : "/storage/" . $value
		);
	}

	protected function updatedAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->format('d M Y'),
		);
	}

	protected function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->format('d M Y'),
		);
	}

	/*
     * Relationships
     */

	public function death()
	{
		return $this->belongsTo(Death::class);
	}

	public function userMemberships()
	{
		return $this->hasMany(UserMembership::class);
	}

	/*
     * Custom functions
     */
	
	public function activeUserMembership()
	{
		return $this->userMemberships()
			->with("membership")
			->where("status", "pending")
			->orWhere("status", "paid")
			->first();
	}
}
