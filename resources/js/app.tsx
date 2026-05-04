import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Edrick Sinsuan';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: false, // This is to be implemented with nonce separately
});
