<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasUlids;
    //
    protected $guarded = ['id'];

    public function testRecords() :HasMany
    {
        return $this->hasMany(TestRecord::class);
    }
   public function childReadings(): HasMany
   {
       return $this->hasMany(ChildReading::class);
   }
}
