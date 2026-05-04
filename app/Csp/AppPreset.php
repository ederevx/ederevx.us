<?php

namespace App\Csp;

use Illuminate\Support\Facades\App;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class AppPreset implements Preset
{
    public function configure(Policy $policy): void
    {
        // Establish base preset based on basic laravel-csp preset
        $policy
            ->add(Directive::BASE, Keyword::SELF)
            ->add(Directive::CONNECT, Keyword::SELF)
            ->add(Directive::DEFAULT, Keyword::NONE)
            ->add(Directive::FONT, Keyword::SELF)
            ->add(Directive::FORM_ACTION, Keyword::SELF)
            ->add(Directive::FRAME, Keyword::SELF)
            ->add(Directive::IMG, Keyword::SELF)
            ->add(Directive::MEDIA, Keyword::SELF)
            ->add(Directive::OBJECT, Keyword::NONE)
            ->add(Directive::SCRIPT, Keyword::SELF)
            ->add(Directive::STYLE, Keyword::SELF)
            ->addNonce(Directive::SCRIPT)
            ->addNonce(Directive::STYLE);

        // Implement frame-ancestors
        $policy
            ->add(Directive::FRAME_ANCESTORS, Keyword::SELF);

        // Needed by react/shadcn
        $policy
            ->add(Directive::STYLE, 'https://fonts.bunny.net')
            ->add(Directive::FONT, 'https://fonts.bunny.net');

        // Specific inline styles policies (due to used templates/components)
        // Generate these sha256-* using the following command:
        //      echo -n "*insert exact style here*" | openssl dgst -sha256 -binary | openssl enc -base64
        $policy
            ->add(Directive::STYLE, Keyword::UNSAFE_HASHES)
            // For NavigationBar/NavigationMenuList/div
            ->add(Directive::STYLE, 'sha256-KpSV7LuPYEu58+3u9LJr9v5Drm0uIKEv0h3u/+NVNm8=');

        // Non-production policies wherein it is ran locally
        if (!App::environment('production')) {
            $policy
                ->add(Directive::SCRIPT, '127.0.0.1:*')
                ->add(Directive::CONNECT, 'ws://127.0.0.1:*')
                ->add(Directive::FONT, '127.0.0.1:*');
        }
    }
}