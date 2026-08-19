<?php

namespace App\Policies;

use App\Models\ChildReading;
use App\Models\User;

class ChildReadingPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, ChildReading $childReading): bool
    {
        return true;
    }

    public function update(User $user, ChildReading $childReading): bool
    {
        return true;
    }

    public function delete(User $user, ChildReading $childReading): bool
    {
        return true;
    }
}
