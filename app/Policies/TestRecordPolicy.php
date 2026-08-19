<?php

namespace App\Policies;

use App\Models\TestRecord;
use App\Models\User;

class TestRecordPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, TestRecord $testRecord): bool
    {
        return true;
    }

    public function update(User $user, TestRecord $testRecord): bool
    {
        return true;
    }

    public function delete(User $user, TestRecord $testRecord): bool
    {
        return true;
    }
}
