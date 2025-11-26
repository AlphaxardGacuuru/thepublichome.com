<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MpesaTransaction extends Model
{
    use HasFactory;

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		'initiation_time' => 'datetime:d M Y',
		'origination_time' => 'datetime:d M Y',
		'updated_at' => 'datetime:d M Y',
		'created_at' => 'datetime:d M Y',
	];

	/*
     * Relationships
     */

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
