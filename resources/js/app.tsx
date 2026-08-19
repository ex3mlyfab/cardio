import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { NotificationProvider } from '@/hooks/use-notification';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name: string) => import(`./pages/${name}.tsx`).then(m => m.default as React.ComponentType),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <NotificationProvider>
                <App {...props} />
            </NotificationProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
