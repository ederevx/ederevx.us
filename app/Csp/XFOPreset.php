<?php

namespace App\Csp;

use Illuminate\Support\Facades\App;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class XFOPreset implements Preset
{
    public function configure(Policy $policy): void
    {
        // Implement frame-ancestors, cannot be added to header
        $policy->add(Directive::FRAME_ANCESTORS, Keyword::SELF);
    }
}