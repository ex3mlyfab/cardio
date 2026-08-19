<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChildReading extends Model
{
    /** @use HasFactory<\Database\Factories\ChildReadingFactory> */
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'test_date' => 'date',
        'created_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
