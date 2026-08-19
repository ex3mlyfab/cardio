<?php

namespace App\Providers;

use App\Models\ChildReading;
use App\Models\Patient;
use App\Models\TestRecord;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        if (request()->getSchemeAndHttpHost()) {
            URL::forceRootUrl(request()->getSchemeAndHttpHost());
        }

        Gate::policy(Patient::class, \App\Policies\PatientPolicy::class);
        Gate::policy(TestRecord::class, \App\Policies\TestRecordPolicy::class);
        Gate::policy(ChildReading::class, \App\Policies\ChildReadingPolicy::class);
    }
}
